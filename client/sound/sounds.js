angular.module('chat.sounds', [])

.factory('Sounds', function() {
  //HATS
  function hiHat(pattern, start, stop) {
    //filtering the hi-hats a bit
    //to make them sound nicer
    var lowPass = new Tone.Filter({
      "frequency": 12000,
    }).toMaster();

    //we can make our own hi hats with 
    //the noise synth and a sharp filter envelope
    var openHiHat = new Tone.NoiseSynth({
      "volume" : -10,
        "filter": {
          "Q": 1
        },
        "envelope": {
          "attack": 0.01,
          "decay": 0.3
        },
        "filterEnvelope": {
          "attack": 0.01,
          "decay": 0.03,
          "baseFrequency": 4000,
          "octaves": -2.5,
          "exponent": 4,
        }
    }).connect(lowPass);

    var openHiHatPart = new Tone.Part(function(time){
      openHiHat.triggerAttack(time);
    }, pattern).start(start).stop(stop);
  }


  //BASS
  function bass(pattern, start, stop) {
    var notes = ['A2','C2','E2','A3'];
    pattern = pattern.map(function(time) {
      var random = Math.floor(Math.random()*3);
      return [time, notes[random]];
    });
    var bassEnvelope = new Tone.AmplitudeEnvelope({
        "attack": 0.05,
        "decay": 1,
        "sustain": 0,
        "release": 0,
    }).toMaster();

    var bassFilter = new Tone.Filter({
        "frequency": 200,
        "Q": 8
    });

    var bass = new Tone.PulseOscillator("A2", 0.4).chain(bassFilter, bassEnvelope);
    bass.start();

    var bassPart = new Tone.Part(function(time, note){
      bass.frequency.setValueAtTime(note, time);
      bassEnvelope.triggerAttack(time);
    }, pattern).start(start).stop(stop);
  }

  // MONOSYNTH
  function synth(pattern, start, stop) {
    var notes = ['C2','E2','G2','C3'];
    pattern = pattern.map(function(time) {
      var random = Math.floor(Math.random()*3);
      return [time, notes[random]];
    });

    var synthA = new Tone.MonoSynth({
      "portamento" : 0.01,
      "volume": -10,
      "oscillator" : {
        "type" : "square"
      },
      "envelope" : {
        "attack" : 0.005,
        "decay" : 0.2,
        "sustain" : 0.4,
        "release" : 1.4,
      },
      "filterEnvelope" : {
        "attack" : 0.005,
        "decay" : 0.1,
        "sustain" : 0.05,
        "release" : 0.8,
        "baseFrequency" : 300,
        "octaves" : 4
      }
    }).toMaster();

    var synth = new Tone.DrumSynth().toMaster();
    var synthPart = new Tone.Part(function(time, note) {
      synthA.triggerAttackRelease(note, "8n", time);
    }, pattern).start(start).stop(stop);
  }

  //BLEEP
  function bleep(pattern, start, stop) {
    var bleepEnvelope = new Tone.AmplitudeEnvelope({
        "attack": 0.01,
        "decay": 0.8,
        "sustain": 0,
        "release": 0,
    }).toMaster();

    var bleep = new Tone.Oscillator("D5").connect(bleepEnvelope);
    bleep.start();

    var bleepPart = new Tone.Part(function(time){
       bleepEnvelope.triggerAttack(time);
    }, pattern).start(start).stop(stop);
  }

  //KICK
  function kick(pattern, start, stop) {
    var kickEnvelope = new Tone.AmplitudeEnvelope({
        "attack": 0.01,
        "decay": 0.2,
        "sustain": 0,
        "release": 0
    }).toMaster();

    var kick = new Tone.Oscillator("A2").connect(kickEnvelope).start();

    kickSnapEnv = new Tone.FrequencyEnvelope({
        "attack": 0.005,
        "decay": 0.01,
        "sustain": 0,
        "release": 0,
        "baseFrequency": "A2",
        "octaves": 2.7
    }).connect(kick.frequency);

    var kickPart = new Tone.Part(function(time){
      kickEnvelope.triggerAttack(time);
      kickSnapEnv.triggerAttack(time);
    }, pattern).start(start).stop(stop);
  }

  return {
    createParts: function(patterns, start, stop) {
      hiHat(patterns[0], start + ':0', stop + ':0');
      bass(patterns[1], start + ':0', stop + ':0');
      synth(patterns[2], start + ':0', stop + ':0');
      bleep(patterns[3], start + ':0', stop + ':0');
      // kick(patterns[2], start + ':0', stop + ':0');
    }
  };
});
//HATS

//filtering the hi-hats a bit
//to make them sound nicer
var lowPass = new Tone.Filter({
    "frequency": 14000,
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

// var openHiHatPart = new Tone.Part(function(time){
//   openHiHat.triggerAttack(time);
// }, ["2*8n", "6*8n"]).start(0);

var closedHiHat = new Tone.NoiseSynth({
  "volume" : -10,
    "filter": {
        "Q": 1
    },
    "envelope": {
        "attack": 0.01,
        "decay": 0.15
    },
    "filterEnvelope": {
        "attack": 0.01,
        "decay": 0.03,
        "baseFrequency": 4000,
        "octaves": -2.5,
        "exponent": 4,

    }
}).connect(lowPass);

// var closedHatPart = new Tone.Part(function(time){
//   closedHiHat.triggerAttack(time);
// }, ["0*8n", "1*16n", "1*8n", "3*8n", "4*8n", "5*8n", "7*8n", "8*8n"]).start(0);

// var closedHatPart2 = new Tone.Part(function(time){
//   closedHiHat.triggerAttack(time);
// }, ["0*8n", "1*8n", "2*8n", "3*16n", "4*16n", "5*8n"]).start(0);

//BASS
var bassEnvelope = new Tone.AmplitudeEnvelope({
    "attack": 0.01,
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

// var bassPart = new Tone.Part(function(time, note){
//   bass.frequency.setValueAtTime(note, time);
//   bassEnvelope.triggerAttack(time);
// }, [["0:0", "G2"],
//   ["0:1", "D2"],
//   ["0:2", "B2"],
//   ["0:3", "A2"]]).start(0);

// MONOSYNTH
var synthA = new Tone.MonoSynth({
  "portamento" : 0.01,
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

var synthB = new Tone.SimpleSynth({
  "oscillator": {
    "detune": 0,
    "type": "custom",
    "partials" : [2, 1, 2, 2],
    "phase": 0,
    "volume": 0
  },
  "envelope": {
    "attack": 0.005,
    "decay": 0.3,
    "sustain": 0.2,
    "release": 1,
  },
  "portamento": 0.01,
  "volume": -20
}).toMaster();

// var synthPart = new Tone.Part(function(time, note) {
//   synthA.triggerAttackRelease(note, "8n", time);
// }, [[0, "A3"], ["0:1", "B2"], ["0:2:3", "C3"]]).start("0:0:0");

// var synthPart = new Tone.Part(function(time, note) {
//   // console.log(synthB);
//   synthB.triggerAttackRelease(note, "8n", time);
// }, [[0, "A5"], ["0:1", "B5"], ["0:2:3", "C5"]]).start();

// var partB = new Tone.Sequence(function(time, note){
//   synthB.triggerAttackRelease(note, "8n", time);
// }, ["E4", "F#4", "B4", "C#5", "D5", "F#4", "E4", "C#5", "B4", "F#4", "C#5", "B4"], "8n").start();

//BLEEP
var bleepEnvelope = new Tone.AmplitudeEnvelope({
    "attack": 0.01,
    "decay": 0.8,
    "sustain": 0,
    "release": 0,
}).toMaster();


var bleep = new Tone.Oscillator("A#5").connect(bleepEnvelope);
bleep.start();

var bleepLoop = new Tone.Loop(function(time){
   bleepEnvelope.triggerAttack(time);
}, "2n").start(0);

//KICK
// var kickEnvelope = new Tone.AmplitudeEnvelope({
//     "attack": 0.01,
//     "decay": 0.2,
//     "sustain": 0,
//     "release": 0
// }).toMaster();

// var kick = new Tone.Oscillator("A2").connect(kickEnvelope).start();

// kickSnapEnv = new Tone.FrequencyEnvelope({
//     "attack": 0.005,
//     "decay": 0.01,
//     "sustain": 0,
//     "release": 0,
//     "baseFrequency": "A2",
//     "octaves": 2.7
// }).connect(kick.frequency);

// var kickPart = new Tone.Part(function(time){
//   kickEnvelope.triggerAttack(time);
//   kickSnapEnv.triggerAttack(time);
// }, ["0", "0:0:3", "0:2:0", "0:3:1"]).start(0);

//TRANSPORT
Tone.Transport.loopStart = 0;
Tone.Transport.loopEnd = "1:0";
Tone.Transport.loop = true;


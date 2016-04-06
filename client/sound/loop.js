angular.module('chat.loop', [])

.factory('Loop', function(Sounds) {
  var translate = function(string) {
    string = string || '1';
    var length = string.length;
    var wSpaces = string.match(/[^0-9a-zA-z]/g) || '1';
    var ratio = wSpaces.length / length;
    var gap = 4;
    if (ratio === 1) {gap = 1;}
    else if (ratio >= 0.3) {gap = 2;}
    else if (ratio >= 0.2) {gap = 3;}
    
    var note = 4;
    if (length >= 24) {note = 16;}
    else if (length >= 8) {note = 8;}

    var pattern = [];
    for (var i = 0; i < note; i++) {
      if (gap === 1 || i % gap) {
        var time = (4 / note) < 1 ? '0:' + i*16/note : i*4 / note;
        pattern.push('0:' + time);
      }
    }

    return pattern;
  };

  return {
    update: function(messages) {
      messages.forEach(function(column, index) {
        var patterns = column.map(function(obj) {
          return translate(obj.text);
        });
        Sounds.createParts(patterns, index, index + 1);
      });
    },
    start: function(config) {
      Tone.Transport.loopStart = 0;
      Tone.Transport.loopEnd = '8:0';
      Tone.Transport.loop = true;
      Tone.Transport.start();
    },
    stop: function() {
      Tone.Transport.stop();
    }
  };
});
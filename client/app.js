angular.module('chat', ['chat.services'])

.controller('ChatCtrl', function($scope, Socket, Message) {
  $scope.messages = [];
  $scope.playOrPause = {
    text: 'Play',
    value: false
  };
  
  function makeColumns(array, size) {
    var newArray = [];
    for (var i=0; i<array.length; i+=size) {
      newArray.push(array.slice(i, i+size));
    }
    return newArray;
  }

  $scope.fetchMessages = function() {
    Message.getMsg()
    .then(function(data) {
      data.reverse();
      $scope.messages = makeColumns(data, 4);
    });
  };

  $scope.sendMessage = function(msg) {
    var textObj = {text: msg};
    Message.addMsg(textObj);
    Socket.emit('chat message', textObj);
    $scope.textInput = '';
  };

  $scope.togglePlay = function() {
    $scope.playOrPause.text = $scope.playOrPause.text === 'Pause' ? 'Play' : 'Pause';
    if ($scope.playOrPause.value) {
      Tone.Transport.stop();
    } else {
      Tone.Transport.start();
    }
    $scope.playOrPause.value = !$scope.playOrPause.value;
  };

  Socket.on('chat message', function(msg) {
    $scope.fetchMessages();
  });

  $scope.fetchMessages();
});

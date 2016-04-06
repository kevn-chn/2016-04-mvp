angular.module('chat', ['chat.services', 'chat.sounds', 'chat.loop'])

.controller('ChatCtrl', function($scope, Socket, Message, Sounds, Loop) {
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
      Loop.update($scope.messages);
    });
  };

  $scope.sendMessage = function(msg) {
    var textObj = {text: msg};
    Message.addMsg(textObj);
    Socket.emit('chat message', textObj);
    $scope.textInput = '';
  };

  $scope.togglePlay = function() {
    if ($scope.playOrPause.value) {
      $scope.playOrPause.text = 'Play';
      Loop.stop();
    } else {
      $scope.playOrPause.text = 'Pause';
      Loop.start();
    }
    $scope.playOrPause.value = !$scope.playOrPause.value;
  };

  Socket.on('chat message', function(msg) {
    $scope.fetchMessages();
  });

  $scope.fetchMessages();
});

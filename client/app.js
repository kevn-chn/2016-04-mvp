angular.module('chat', ['chat.services'])

.controller('ChatCtrl', function($scope, Socket, Message) {
  $scope.messages = [];
  $scope.playOrPause = {
    text: 'Play',
    value: false
  };
  
  $scope.fetchMessages = function() {
    Message.getMsg()
    .then(function(data) {
      $scope.messages = data;
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

angular.module('chat', ['chat.services'])

.controller('ChatCtrl', function($scope, Socket, Message) {
  $scope.messages = [];
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

  Socket.on('chat message', function(msg) {
    $scope.fetchMessages();
  });

  $scope.fetchMessages();
});

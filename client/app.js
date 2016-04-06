angular.module('chat', ['chat.services', 'chat.sounds', 'chat.loop'])

.controller('ChatCtrl', function($scope, Socket, Message, Sounds, Loop) {
  $scope.messages = [];
  $scope.playOrPause = {
    text: 'Play',
    value: false
  };
  $scope.highlightCol = -1;

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
    var check = $scope.playOrPause.value;
    $scope.playOrPause.value = !$scope.playOrPause.value;
    if (check) {
      $scope.playOrPause.text = 'Play';
      Loop.stop();
      $scope.highlightCol = -1;
    } else {
      $scope.playOrPause.text = 'Pause';
      Loop.start();
      $scope.highlight();
    }
  };

  $scope.highlight = function() {
    console.log($scope.highlightCol);
    if ($scope.playOrPause.value) {
      setTimeout($scope.highlight, 2000);
      var index = $scope.highlightCol;
      var length = $scope.messages.length;
      $scope.highlightCol = index == length - 1 ? 0: index+1;
    }
    console.log($scope.highlightCol);
    $scope.$apply();
  };

  Socket.on('chat message', function(msg) {
    $scope.fetchMessages();
  });

  $scope.fetchMessages();
});

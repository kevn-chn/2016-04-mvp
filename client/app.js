
angular.module('chatApp', [])

.controller('Chat', function($scope) {
  var socket = io();
  $scope.messages = [];
  $scope.sendMessage = function(msg) {
    msg = msg || ' ';
    var textObj = {text: msg};
    socket.emit('chat message', textObj);
    $scope.textInput = '';
  };
  socket.on('chat message', function(msg) {
    $scope.messages.push(msg);
    console.log('hearing', $scope.messages);
    $scope.$apply();
  });
})
.factory('Socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
});

angular.module('chatApp', [])

.controller('Chat', function($scope) {
  var socket = io();
  // $scope.text;
  $scope.sendMessage = function() {
    // console.log('testing', $scope.text);
    socket.emit('chat message', $scope.text);
    $scope.text = '';
  };
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
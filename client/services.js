angular.module('chat.services', [])

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
})
.factory('Message', function ($http) {
  return {
    getMsg: function() {
      return $http({
        method: 'GET',
        url: '/messages',
      })
      .then(function(obj) {
        return obj.data;
      });
    },
    addMsg: function(data) {
      return $http({
        method: 'POST',
        url: '/messages',
        data: data
      });
    }
  };
});
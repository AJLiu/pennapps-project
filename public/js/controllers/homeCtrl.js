app.controller('HomeCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$http',
  function($scope, $rootScope, $state, $http) {

    $scope.register = function() {
      var data = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        grade: grade
      };
      $http.post('/register', data).then(function(response) {
        console.log(response.data);
      }, function(error) {
        console.log(JSON.stringify(error.data));
      });
    };

    $scope.login = function() {
      var data = {
        email: loginEmail,
        password: loginPassword
      };
      $http.post('/login', data).then(function(response) {
        console.log(response.data);
      }, function(error) {
        console.log(JSON.stringify(error.data));
      });
    };

  }
]);

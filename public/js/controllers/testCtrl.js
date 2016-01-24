app.controller('TestCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$http',
  'auth',
  function($scope, $rootScope, $state, $http, auth) {

    $scope.testCreate = function() {
      var o = {
        name: "Test Competition",
        start_date: new Date(2016, 0, 22, 0, 0, 0, 0),
        end_date: new Date(2016, 0, 24, 23, 59, 59, 999),
        prompt: "Make something awesome",
        students: [],
        submissions: []
      };
      $http.post('/competitions', o).then(function(response) {
        console.log(JSON.stringify(response.data));
      }, function(error) {
        console.log(error);
      });
    };

    $scope.testRegister = function() {
      $http.post('/competitions/56a3d91f7919977415c6e075/register', null, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).then(function(response) {
        console.log(JSON.stringify(response.data));
      }, function(error) {
        console.log(error);
      });
    };

    $scope.testWithdraw = function() {
      $http.post('/competitions/56a3d91f7919977415c6e075/withdraw', null, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).then(function(response) {
        console.log(JSON.stringify(response.data));
      }, function(error) {
        console.log(error);
      });
    };

    $scope.test1 = $scope.testCreate;
    $scope.test2 = $scope.testRegister;
    $scope.test3 = $scope.testWithdraw;

  }
]);

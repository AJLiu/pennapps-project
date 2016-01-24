app.controller('NavbarCtrl', [
  '$scope',
  '$rootScope',
  'utils',
  '$http',
  '$state',
  'auth',
  function($scope, $rootScope, utils, $http, $state, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;
    auth.currentUser().then(function(user) {
      $scope.currentUser = user;
    }, function(error) {
      console.log(error);
    });
  }
]);

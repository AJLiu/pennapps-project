app.controller('HomeCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  'auth',
  function($scope, $rootScope, $state, auth) {
    if (auth.isLoggedIn()) {
      $state.go('dash');
    }
  }
]);

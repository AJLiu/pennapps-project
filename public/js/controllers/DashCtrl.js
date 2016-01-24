app.controller('DashCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  'auth',
  '$http',
  function($scope, $rootScope, $state, auth, $http) {


    $http.get('/users/'+auth.currentUserId()+'/livecompetitions').then(function(response) {
      $scope.liveCompetitions = response.data;
    });

  }
]);

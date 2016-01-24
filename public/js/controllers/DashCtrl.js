app.controller('DashCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  'auth',
  '$http',
  function($scope, $rootScope, $state, auth, $http) {

    $scope.noCompetitions = true;

    $http.get('/users/'+auth.currentUserId()+'/competitions/current').then(function(response) {
      $scope.currentCompetitions = response.data;
      if ($scope.currentCompetitions.length > 0) {
        $scope.noCompetitions = false;
      }
    });

    $http.get('/users/'+auth.currentUserId()+'/competitions/upcoming').then(function(response) {
      $scope.upcomingCompetitions = response.data;
      if ($scope.upcomingCompetitions.length > 0) {
        $scope.noCompetitions = false;
      }
    });

    $http.get('/users/'+auth.currentUserId()+'/competitions/past').then(function(response) {
      $scope.pastCompetitions = response.data;
      if ($scope.pastCompetitions.length > 0) {
        $scope.noCompetitions = false;
      }
    });

  }
]);

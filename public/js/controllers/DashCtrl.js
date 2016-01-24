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

    $http.get('/users/'+auth.currentUserId()+'/pastcompetitions').then(function(response) {
      $scope.pastCompetitions = response.data;
    })

    $scope.archive = function(competitionId) {
      console.log('archiving ' + competitionId);
      $http.post('/competitions/'+competitionId+'/archive', null, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).then(function(response) {
        console.log(JSON.stringify(response.data));
      }, function(error) {
        console.log(error);
      });
    };

    $scope.unarchive = function(competitionId) {
      console.log('unarchiving ' + competitionId);
      $http.post('/competitions/'+competitionId+'/unarchive', null, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).then(function(response) {
        console.log(JSON.stringify(response.data));
      }, function(error) {
        console.log(error);
      });
    };

  }
]);

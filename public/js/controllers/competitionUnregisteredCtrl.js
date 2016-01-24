app.controller('CompetitionUnregisteredCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  'auth',
  '$http',
  'competition',
  '$stateParams',
  function($scope, $rootScope, $state, auth, $http, competition, $stateParams) {
  	$scope.competition = competition;

  	$scope.redirect() = function(){
      $http.post('/competitions/'+competition._id+'/register', null, {
      	headers: {Authorization: 'Bearer '+auth.getToken()}
      }).then(function(response) {
      	console.log(JSON.stringify(response.data));
      	$state.go('dash');
      }, function(error) {
      	console.log(error);
      });
    };
  }
]);
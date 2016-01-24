app.controller('BrowseCtrl', [
	'$scope',
	'$rootScope',
	'$state',
	'auth',
	'$http',
	function($scope, $rootScope, $state, auth, $http) {

	 

		$http.get('/competitions/type/current').then(function(response) {
	      var current = response.data;
	      $http.get('/competitions/type/upcoming').then(function(response) {
	        var all = response.data;
	        for (var i=0; i<current.length; i++) {
	          all.push(current[i]);
	        }
	        $scope.allCompetitions = all;
	    }, function(error) {
	        console.log(error);
	      });
	    }, function(error) {
	      console.log(error);
	    });
        //var hash = auth.currentUserId().toString().hashCode();
	}
]);
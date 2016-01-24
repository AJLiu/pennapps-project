app.controller('JudgeLoginCtrl', [
	'$scope',
	'$rootScope',
	'$state',
	'jauth',
	function($scope, $rootScope, $state, jauth) {

    $scope.logIn = function(){
      jauth.logIn($scope.user).error(function(error){
        console.log(JSON.stringify(error));
      }).then(function(){
        $state.go('jvote');
      });
    };

	}
]);

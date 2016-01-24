app.controller('HomeCtrl', [
	'$scope',
	'$rootScope',
	'$state',
	'auth',
	function($scope, $rootScope, $state, auth) {

		// $scope.register = function(){
		//   auth.register($scope.user).error(function(error){
		//     console.log(JSON.stringify(error));
		//   }).then(function(){
		//     //$state.go('home');
		//   });
		// };
		//
		// $scope.logIn = function(){
		//   auth.logIn($scope.loginUser).error(function(error){
		//     console.log(JSON.stringify(error));
		//   }).then(function(){
		//     //$state.go('home');
		//   });
		// };

	}
]);

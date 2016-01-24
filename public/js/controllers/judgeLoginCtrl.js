app.controller('JudgeLoginCtrl', [
	'$scope',
	'$rootScope',
	'$state',
	'jauth',
	function($scope, $rootScope, $state, jauth) {
		if (auth.isLoggedIn()) {
			$state.go('dash');
		}
	}
]);

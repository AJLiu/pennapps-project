app.controller('JudgeVoteCtrl', [
	'$scope',
	'$rootScope',
	'$state',
	'jauth',
	function($scope, $rootScope, $state, jauth) {
		if (!jauth.isLoggedIn()) {
			$state.go('jlogin');
		}
	}
]);

app.controller('JudgeVoteCtrl', [
	'$scope',
	'$rootScope',
	'$state',
	'jauth',
	function($scope, $rootScope, $state, jauth) {
		$scope.waiting = false;
		if (!jauth.isLoggedIn()) {
			$state.go('jlogin');
		}

		$scope.voteLeft = function() {
			$scope.waiting = true;
		}

		$scope.voteRight = function() {
			$scope.waiting = true;
		}

	}
]);

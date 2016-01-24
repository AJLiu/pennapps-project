app.controller('JudgeVoteCtrl', [
	'$scope',
	'$rootScope',
	'$state',
	'jauth',
	function($scope, $rootScope, $state, jauth) {

		if (!jauth.isLoggedIn()) {
			$state.go('jlogin');
		}

		$scope.voteLeft = function() {

		}

		$scope.voteRight = function() {
			
		}

	}
]);

app.controller('LoginCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  'auth',
  function($scope, $rootScope, $state, auth) {

    $scope.logIn = function(){
      auth.logIn($scope.loginUser).error(function(error){
        console.log(JSON.stringify(error));
      }).then(function(){
        $state.go('home');
      });
    };

  }
]);

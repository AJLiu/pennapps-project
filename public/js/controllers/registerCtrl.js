app.controller('RegisterCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  'auth',
  'scrollTo',
  function($scope, $rootScope, $state, auth) {

    $scope.register = function(){
      auth.register($scope.user).error(function(error){
        console.log(JSON.stringify(error));
      }).then(function(){
        $state.go('home');
      });
    };

  }
]);

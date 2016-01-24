app.controller('DashCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  'auth',
  '$http',
  function($scope, $rootScope, $state, auth, $http) {

    String.prototype.hashCode = function() {
      var hash = 0, i, chr, len;
      if (this.length === 0) return hash;
      for (i = 0, len = this.length; i < len; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    };

    $scope.noCompetitions = true;

    $http.get('/users/'+auth.currentUserId()+'/competitions/current').then(function(response) {
      $scope.currentCompetitions = response.data;
      if ($scope.currentCompetitions.length > 0) {
        $scope.noCompetitions = false;
      }
    });

    $http.get('/users/'+auth.currentUserId()+'/competitions/upcoming').then(function(response) {
      $scope.upcomingCompetitions = response.data;
      if ($scope.upcomingCompetitions.length > 0) {
        $scope.noCompetitions = false;
      }
    });

    $http.get('/users/'+auth.currentUserId()+'/competitions/past').then(function(response) {
      $scope.pastCompetitions = response.data;
      if ($scope.pastCompetitions.length > 0) {
        $scope.noCompetitions = false;
      }
    });

    $http.get('/competitions/type/current').then(function(response) {
      var current = response.data;
      $http.get('/competitions/type/upcoming').then(function(response) {
        var all = response.data;
        for (var i=0; i<current.length; i++) {
          all.push(current[i]);
        }
        var hash = auth.currentUserId().toString().hashCode();
        var numberOfComps = all.length;
        var numberInRow = 3;
        var i = hash % Math.floor(numberOfComps/numberInRow);
        var floorNK= Math.floor(numberOfComps/numberInRow);
        $scope.suggestedCompetitions=[];
        if (all[i + floorNK])
        $scope.suggestedCompetitions.push(all[i + floorNK]);
        if (all[i + 2 * floorNK])
        $scope.suggestedCompetitions.push(all[i + 2 * floorNK]);
        if (all[i + 3 * floorNK])
        $scope.suggestedCompetitions.push(all[i + 3 * floorNK]);
        console.log(JSON.stringify($scope.suggestedCompetitions));
        //return this stuff
      }, function(error) {
        console.log(error);
      });
    }, function(error) {
      console.log(error);
    });

  }

]);

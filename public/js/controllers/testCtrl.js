app.controller('TestCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$http',
  'auth',
  function($scope, $rootScope, $state, $http, auth) {

    $scope.testCreate = function() {
      var events = [
        {
          name: "PennApps",
          start_date: new Date(2016, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2016, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          students: [],
          image: "assets/clock.jpg",
          submissions: []
        }, {
          name: "HackArizona",
          start_date: new Date(2016, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2016, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          students: [],
          image: "assets/clock.jpg",
          submissions: []
        }, {
          name: "Unregistered Hackathon",
          start_date: new Date(2016, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2016, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          image: "assets/clock.jpg",
          students: [],
          submissions: []
        }, {
          name: "Some Old Event",
          start_date: new Date(2015, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2015, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          students: [],
          image: "assets/clock.jpg",
          submissions: []
        }, {
          name: "Some Old Event 2",
          start_date: new Date(2015, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2015, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          students: [],
          image: "assets/clock.jpg",
          submissions: []
        }, {
          name: "Unregistered Some Old Event",
          start_date: new Date(2015, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2015, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          students: [],
          image: "assets/clock.jpg",
          submissions: []
        }, {
          name: "Future Event",
          start_date: new Date(2017, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2017, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          students: [],
          image: "assets/clock.jpg",
          submissions: []
        }, {
          name: "Future Event 2",
          start_date: new Date(2017, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2017, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          students: [],
          image: "assets/clock.jpg",
          submissions: []
        }, {
          name: 'Unregistered Future Event',
          start_date: new Date(2017, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2017, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          students: [],
          image: "assets/clock.jpg",
          submissions: []
        }
      ];
      var requests = events.map(function(event) {
        return $http.post('/competitions', event);
      });
      Promise.all(requests).then(function(responses) {
        var data = responses.map(function(response) {
          return response.data;
        });
        console.log(JSON.stringify(data));
      }, function(error) {
        console.log(error);
      });

    };

    $scope.testRegister = function() {
      $http.get('/competitions').then(function(response) {
        var competitions = response.data;
        var requests = competitions.map(function(competition) {
          if (competition.name.indexOf('Unregistered') > -1) {
            return Promise.resolve({data: 'skipped'});
          } else {
            return $http.post('/competitions/'+competition._id+'/register', null, {
              headers: {Authorization: 'Bearer '+auth.getToken()}
            });
          }
        });
        Promise.all(requests).then(function(responses) {
          var data = responses.map(function(response) {
            return response.data;
          });
          console.log(JSON.stringify(data));
        }, function(error) {
          console.log(error);
        });
      });
    };

    $scope.testWithdraw = function() {
      $http.get('/users/'+auth.currentUserId()+'/competitions').then(function(response) {
        var competitions = response.data;
        var requests = competitions.map(function(competition) {
          return $http.post('/competitions/'+competition._id+'/withdraw', null, {
            headers: {Authorization: 'Bearer '+auth.getToken()}
          });
        });
        Promise.all(requests).then(function(responses) {
          var data = responses.map(function(response) {
            return response.data;
          });
          console.log(JSON.stringify(data));
        }, function(error) {
          console.log(error);
        });
      });
    };

    $scope.testDelete = function() {
      $http.get('/competitions').then(function(response) {
        var competitions = response.data;
        var deletes = competitions.map(function(competition) {
          return $http.delete('/competitions/'+competition._id);
        });
        Promise.all(deletes).then(function(responses) {
          var data = responses.map(function(response) {
            return response.data;
          });
          console.log(JSON.stringify(data));
        }, function(error) {
          console.log(error);
        });
      });
    };

    $scope.test1 = $scope.testCreate;
    $scope.test2 = $scope.testRegister;
    $scope.test3 = $scope.testWithdraw;
    $scope.test4 = $scope.testDelete;

  }
]);

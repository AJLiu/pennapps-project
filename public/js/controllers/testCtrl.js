app.controller('TestCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$http',
  'auth',
  'jauth',
  function($scope, $rootScope, $state, $http, auth, jauth) {

    $scope.testCreate = function() {
      var events = [
        {
          name: "PennApps",
          start_date: new Date(2016, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2016, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          students: [],
          image: "assets/clock.jpg",
          description: "This is a description",
          submissions: []
        }, {
          name: "HackArizona",
          start_date: new Date(2016, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2016, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          students: [],
          image: "assets/clock.jpg",
          description: "This is a description",
          submissions: []
        }, {
          name: "Unregistered Hackathon",
          start_date: new Date(2016, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2016, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          image: "assets/clock.jpg",
          description: "This is a description",
          students: [],
          submissions: []
        }, {
          name: "Some Old Event",
          start_date: new Date(2015, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2015, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          students: [],
          image: "assets/clock.jpg",
          description: "This is a description",
          submissions: []
        }, {
          name: "Some Old Event 2",
          start_date: new Date(2015, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2015, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          students: [],
          image: "assets/clock.jpg",
          description: "This is a description",
          submissions: []
        }, {
          name: "Unregistered Some Old Event",
          start_date: new Date(2015, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2015, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          students: [],
          image: "assets/clock.jpg",
          description: "This is a description",
          submissions: []
        }, {
          name: "Future Event",
          start_date: new Date(2017, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2017, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          students: [],
          image: "assets/clock.jpg",
          description: "This is a description",
          submissions: []
        }, {
          name: "Future Event 2",
          start_date: new Date(2017, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2017, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          description: "This is a description",
          students: [],
          image: "assets/clock.jpg",
          submissions: []
        }, {
          name: 'Unregistered Future Event',
          start_date: new Date(2017, 0, 22, 0, 0, 0, 0),
          end_date: new Date(2017, 0, 24, 23, 59, 59, 999),
          prompt: "Make something awesome",
          description: "This is a description",
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

    $scope.testRegisterJudge = function() {
      var user = {
        first_name: 'TestJudge',
        last_name: 'SomeLastName',
        email: 'test.judge@ivonliu.com',
        password: '123467890',
        previousMatches: [],
        currentMatches: []
      }
      jauth.register(user).error(function(error){
        console.log(JSON.stringify(error));
      }).then(function(){
        console.log('Created new judge');
      });
    }

    $scope.logOutJudge = jauth.logOut;

    $scope.generateSchools = function() {
      $http.post('/schools', {
        school_name: 'Moscrop Secondary School',
        students: ["56a3af43e3f0f5bc3553b492"],
      }).then(function() {
        return $http.post('/schools', {
          school_name: 'Alpharetta High School',
          students: ["56a4d3210dcc6df32bd3d58a"]
        });
      }).then(function() {
        return $http.post('/schools', {
          school_name: 'Gunn High School',
          students: ["56a4d33e0dcc6df32bd3d58b"]
        });
      }).then(function() {
        console.log('done');
      });
    };

    $scope.test1 = $scope.testCreate;
    $scope.test2 = $scope.testRegister;
    $scope.test3 = $scope.testWithdraw;
    $scope.test4 = $scope.testDelete;
    $scope.test5 = $scope.testRegisterJudge;
    $scope.test6 = $scope.logOutJudge;
    $scope.test7 = $scope.generateSchools;
  }
]);

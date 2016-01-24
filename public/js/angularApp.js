var app = angular.module('pennguinHackers', ['ui.router', 'smoothScroll']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
    .state('index', {
      abstract: true,
      views: {
        '@': {
          templateUrl: 'layout.html',
          controller: 'IndexCtrl'
        },
        'navbar@index': {
          templateUrl: 'partials/navbar.html',
          controller: 'NavbarCtrl'
        }
      }
    })

    .state('home', {
      parent: 'index',
      url: '/home',
      views: {
        'main@index': {
          templateUrl: 'partials/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('test', {
      parent: 'index',
      url: '/test',
      views: {
        'main@index': {
          templateUrl: 'partials/test.html',
          controller: 'TestCtrl'
        }
      }
    })
    .state('register', {
      parent: 'index',
      url:'/register',
      views: {
        'main@index': {
          templateUrl: 'partials/register.html',
          controller: 'RegisterCtrl'
        }
      }
    })
    .state('login', {
      parent: 'index',
      url: '/login',
      views: {
        'main@index': {
          templateUrl: 'partials/login.html',
          controller: 'LoginCtrl'
        }
      }
    })

    .state('dash', {
      parent: 'index',
      url: '/dash',
      views: {
        'main@index': {
          templateUrl: 'partials/dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('competition', {
      parent: 'index',
      url: '/competitions/{id}',
      resolve: {
        competition: ['$stateParams', 'auth', '$http',
          function($stateParams, auth, $http) {
            return $http.get('/competitions/'+$stateParams.id).then(function(response) {
              return response.data;
            });
          }
        ]
      },
      views: {
        'main@index': {
          templateUrl: '',
          controller: 'CompetitionCtrl'
        }
      }
    })
      .state('competition.registered', {
        url: '',
        views: {
          'main@index': {
            templateUrl: 'partials/competition.registered.html',
            controller: 'CompetitionRegisteredCtrl'
          }
        }
      })
      .state('competition.unregistered', {
        url: '',
        views: {
          'main@index': {
            templateUrl: 'partials/competition.unregistered.html',
            controller: 'CompetitionUnregisteredCtrl'
          }
        }
      })

    .state('jlogin', {
      parent: 'index',
      url: '/jlogin',
      views: {
        'main@index': {
          templateUrl: 'partials/jlogin.html',
          controller: 'JudgeLoginCtrl'
        }
      }
    })

    .state('jvote', {
      parent: 'index',
      url: '/jvote',
      views: {
        'main@index': {
          templateUrl: 'partials/jvote.html',
          controller: 'JudgeVoteCtrl'
        }
      }
    });

    //$locationProvider.html5Mode({ enabled: true, requireBase: false });
    $urlRouterProvider.otherwise('home');
  }
]);

app.run(['$rootScope', '$state', 'auth',
  function ($rootScope, $state, auth) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (toState.name !== 'home' && toState.name !== 'login' && toState.name !== 'register' && !auth.isLoggedIn()) {
        event.preventDefault();
        $state.go('login');
      }
    });
  }]
);

app.factory('auth', ['$http', '$window', function($http, $window) {
  var auth = {};

  auth.saveToken = function (token){
    $window.localStorage['pennguin-token'] = token;
  };

  auth.getToken = function (){
    return $window.localStorage['pennguin-token'];
  }

  auth.isLoggedIn = function(){
    var token = auth.getToken();

    if(token){
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.currentUserId = function(){
    if(auth.isLoggedIn()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload._id;
    }
  };

  auth.currentUser = function() {
    var id = auth.currentUserId();
    if (id) {
      return $http.get('/users/'+id).then(function(response) {
        return response.data;
      });
    } else {
      return Promise.reject('Not logged in');
    }
  };

  auth.register = function(user){
    return $http.post('/users/register', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logIn = function(user){
    return $http.post('/users/login', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logOut = function(){
    $window.localStorage.removeItem('pennguin-token');
  };

  return auth;
}]);

app.factory('jauth', ['$http', '$window', function($http, $window) {
  var auth = {};

  auth.saveToken = function (token){
    $window.localStorage['pennguin-judge-token'] = token;
  };

  auth.getToken = function (){
    return $window.localStorage['pennguin-judge-token'];
  }

  auth.isLoggedIn = function(){
    var token = auth.getToken();

    if(token){
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.currentUserId = function(){
    if(auth.isLoggedIn()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload._id;
    }
  };

  auth.currentUser = function() {
    var id = auth.currentUserId();
    if (id) {
      return $http.get('/users/'+id).then(function(response) {
        return response.data;
      });
    } else {
      return Promise.reject('Not logged in');
    }
  };

  auth.register = function(user){
    return $http.post('/users/register', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logIn = function(user){
    return $http.post('/users/login', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logOut = function(){
    $window.localStorage.removeItem('pennguin-judge-token');
  };

  return auth;
}]);

app.factory('utils', [function() {
  var utils = {

    handleError: function(error) {
      console.log(error);
    }

  };
  return utils;
}]);

app.controller('IndexCtrl', [
  '$scope',
  '$rootScope',
  'utils',
  '$http',
  '$state',
  '$window',
  'auth',
  function($scope, $rootScope, utils, $http, $state, $window, auth) {
    $rootScope.logOut = auth.logOut;
  }
]);

app.controller('CompetitionCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  'auth',
  '$http',
  'competition',
  function($scope, $rootScope, $state, auth, $http, competition) {
    auth.currentUser().then(function(user) {
      console.log(user.competitions);
      console.log(competition);
      if (user.competitions.indexOf(competition._id) > -1) {
        $state.go('.registered');
      } else {
        $state.go('.unregistered');
      }
    });
  }
]);

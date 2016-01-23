var app = angular.module('pennguinHackers', ['ui.router']);

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
        'register@index': {
          templateUrl: 'partials/register.html',
          controller: 'RegisterCtrl'
        }
      }
    })
    .state('login', {
      parent: 'index',
      url: '/login',
      views: {
        'login@index': {
          templateUrl: 'partials/login.html',
          controller: 'LoginCtrl'
        }
      }
    });

    //$locationProvider.html5Mode({ enabled: true, requireBase: false });
    $urlRouterProvider.otherwise('home');
  }
]);

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
  }

  auth.register = function(user){
    console.log('register');
    console.log(JSON.stringify(user));
    return $http.post('/users/register', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logIn = function(user){
    console.log('login');
    console.log(JSON.stringify(user));
    return $http.post('/users/login', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logOut = function(){
    $window.localStorage.removeItem('flapper-news-token');
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
  function($scope, $rootScope, utils, $http, $state) {

  }
]);

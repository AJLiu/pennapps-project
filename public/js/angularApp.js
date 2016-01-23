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
    });

    //$locationProvider.html5Mode({ enabled: true, requireBase: false });
    $urlRouterProvider.otherwise('home');
  }
]);

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

'use strict';

/**
 * @ngdoc overview
 * @name tweetsOnMapApp
 * @description
 * # tweetsOnMapApp
 *
 * Main module of the application.
 */
angular
  .module('tweetsOnMapApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps',
    'satellizer',
    'angular-cache',
    'ui.router'
  ])
  .config(function ($routeProvider, $authProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
    $authProvider.linkedin({
      clientId: 'WWboRCBkqoRDqwPE26hAAe3pt'
    });
    $urlRouterProvider.otherwise("main");
    $locationProvider.hashPrefix('!');
    $stateProvider
      .state('main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        url: '/'
      });
  })
  .constant('apiUrl', 'https://mayurkathale.com/t/web/app.php/api/v1')
  .constant('authLink', 'https://api.twitter.com/oauth/authorize?oauth_token=')
  .run(function ($http, CacheFactory) {
    $http.defaults.cache = CacheFactory('httpCache', {
      maxAge: 60 * 60 * 1000,
      deleteOnExpire: 'aggressive'
    });
  });

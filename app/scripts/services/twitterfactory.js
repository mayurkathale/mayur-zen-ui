'use strict';

/**
 * @ngdoc service
 * @name tweetsOnMapApp.twitterFactory
 * @description
 * # twitterFactory
 * Factory in the tweetsOnMapApp.
 */
angular.module('tweetsOnMapApp')
  .factory('twitterFactory', function ($q, $cookies, apiService) {
    var authorizationResult = false;
    var auth = false;
    return {
      initialize: function() {
        return apiService.auth().then(function(data){
          $cookies.putObject('auth', data);
          return data;
        });
      }
    };
  });

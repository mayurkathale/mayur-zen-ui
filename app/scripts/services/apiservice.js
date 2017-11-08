'use strict';

/**
 * @ngdoc service
 * @name tweetsOnMapApp.apiService
 * @description
 * # apiService
 * Service in the tweetsOnMapApp.
 */
angular.module('tweetsOnMapApp')
  .service('apiService', function ($http, $q, apiUrl) {
    this.auth = function() {
      return $http.get(apiUrl+'/auth').then(function(response) {
         return response.data;
      });
    };
    this.getAccessToken = function(oauth_token, oauth_token_secret, oauth_verifier) {
      return $http.post(apiUrl+'/accesstoken',
        {
          oauth_token : oauth_token,
          oauth_token_secret: oauth_token_secret,
          oauth_verifier: oauth_verifier
        }).then(function(response) {
        return response.data;
      });
    };
    this.getUserData = function(access_token_data){
      return $http.post(apiUrl+'/user', access_token_data).then(function(data){
        return data;
      });
    };
    this.search = function(access_token_data, q , location) {
      return $http({
        url: apiUrl+'/searchtweets',
        method: "GET",
        params: {
          oauth_token: access_token_data.oauth_token,
          oauth_token_secret: access_token_data.oauth_token_secret,
          query: q,
          latlong: location,
          count: 100
        }
      }, {
        cache: true
      }).then(function(data){
        return data.data;
      });
    };
    this.searchPlace = function(q) {
      return $http({
        url:"https://maps.googleapis.com/maps/api/geocode/json?address="+q,
        method: "GET"
      }).then(function(data){
        return data.data.results;
      });
    };
    this.getHistory = function() {
      return $http.get(apiUrl+'/history', {cache: false}).then(function(response) {
        return response.data;
      });
    };
    this.saveHistory = function(q) {
      return $http.post(apiUrl+'/history',{searchfield: q}).then(function(response) {
        return response.data;
      });
    };
  });

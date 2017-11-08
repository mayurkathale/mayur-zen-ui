'use strict';

/**
 * @ngdoc function
 * @name tweetsOnMapApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the tweetsOnMapApp
 */
angular.module('tweetsOnMapApp')
  .controller('NavCtrl', function ($scope, $location, $auth, $cookies, $rootScope, authLink, apiService, twitterFactory) {
    var oauth_token = $location.search().oauth_token;
    var oauth_verifier = $location.search().oauth_verifier;
    var mySlider = $("input#ex1").bootstrapSlider({tooltip_position: "bottom"});
    var oauth_data = $cookies.getObject('oauth_data');
    $scope.authdata = oauth_data;
    var access_token_data = $cookies.getObject('access_token_data');
    var user_data = $cookies.getObject('user_data');
    $scope.userdata = user_data;
    $scope.showSignIn = false;
    $scope.showUser = false;
    $scope._getAccessToken = function(oauth_token, auth_token_secret, oauth_verifier) {
      apiService.getAccessToken(oauth_token, auth_token_secret, oauth_verifier).then(function (data) {
        $cookies.putObject('access_token_data', data);
        $scope._getUserData(data);
      });
    };
    $scope._getUserData = function(data) {
      apiService.getUserData(data).then(function(userdata) {
        userdata = JSON.parse(userdata.data);
        var cookieUser = {'picture' : userdata.profile_image_url, 'name': userdata.name};
        $cookies.putObject('user_data', cookieUser);
        $scope.userdata = cookieUser;
        $scope.showSignIn = false;
        $scope.showUser = true;
      });
    };

    if(user_data == undefined) {
      if(oauth_data == undefined && oauth_token == undefined && oauth_verifier == undefined) {
        twitterFactory.initialize().then(function (data) {
          $scope.authdata = data;
          $cookies.putObject('oauth_data', $scope.authdata);
        });
      }
      if(oauth_token != undefined && oauth_verifier != undefined) {
        if(access_token_data == undefined && oauth_data != undefined) {
          $scope._getAccessToken(oauth_token, oauth_data.auth_token_secret, oauth_verifier);
        }
      }
    } else {
      $scope.userdata = user_data;
      $scope.showUser = true;
      $scope.showSignIn = false;
    }

    $scope.$watch(function () {return $scope.authdata}, function(newAuthData, oldAuthData) {
      if($scope.authdata != undefined) {
        $('#btn-sign-in').attr('href', authLink+$scope.authdata.auth_token);
        $scope.showSignIn = true;
      }
    }, true);

    $scope.$watch(function () {return $scope.userdata}, function(newUserData, oldUserData) {
      if($scope.userdata != undefined) {
        $scope.showSignIn = false;
        $scope.showUser = true;
      }
    }, true);

    $scope.prepareSearchQuery = function(query) {
      var qSearch;
      var original = query.replace(/\s\s+/g, ' ');;
      query = query.replace(/\s+/, "");
      var spacetrimmed = query;
      var mentioned = '#'+spacetrimmed;
      if(original.match(' '))
        qSearch = 'q='+original.replace(/ /g,"+")+"+"+spacetrimmed;
      else
        qSearch = 'q='+original.replace(/ /g,"+");
      return qSearch;
    };

    $scope.search = function(query) {

      var q = $scope.prepareSearchQuery(query);
      apiService.searchPlace(q).then(function (data) {
        if(data.length > 0) {
          apiService.saveHistory($scope.searchCity).then(function(data){
            apiService.getHistory().then(function(history){
              $rootScope.$emit("updateHistory", {history:history});
            });
          });
          $rootScope.latitude = data[0].geometry.location.lat;
          $rootScope.longitude = data[0].geometry.location.lng;
          var radius = $('input#ex1').val();
          var latlong = data[0].geometry.location.lat+","+data[0].geometry.location.lng+","+radius+"km";
          apiService.search($cookies.getObject('access_token_data'), q, latlong).then(function(data){
            $scope.tweets = JSON.parse(data);
            //var filtered = $scope.filterResult($scope.tweets.statuses);
            $rootScope.resultlist = $scope.tweets.statuses;
          });
        }
      });
    };

    $rootScope.$on("CallSearchMethod", function(event, query){
      $scope.search(query.q);
    });
  });

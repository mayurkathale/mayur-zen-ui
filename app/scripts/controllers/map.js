'use strict';

/**
 * @ngdoc function
 * @name tweetsOnMapApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the tweetsOnMapApp
 */
angular.module('tweetsOnMapApp')
  .controller('MapCtrl', function ($scope, $rootScope) {
    $rootScope.latitude = 18.5245649;
    $rootScope.longitude = 73.7228812;
    $scope.map = { center: { latitude: $rootScope.latitude, longitude: $rootScope.longitude }, zoom: 11 };
    $scope.markersOnMap = [];

    $scope.$watch(function(){return $rootScope.latitude} , function (newVal, oldVal) {
      $scope.map = {
        center: {
          latitude: $rootScope.latitude,
          longitude: $rootScope.longitude
        },
        zoom: 11,
        markersEvents: {
          click: function(marker, eventName, model, args) {
            $scope.map.window.model = model;
            $scope.map.window.show = true;
          }
        },
        window: {
          model: {},
          show: false,
          options: {
            pixelOffset: {width:-1,height:-20}
          }
        }
      };
    });
    $scope.$watch(function(){return $rootScope.resultlist},function(newVal, oldVal){
      $scope.markersOnMap = [];
      if($rootScope.resultlist != undefined) {
        for(var i = 0; i < $rootScope.resultlist.length; i++){
         if($rootScope.resultlist[i].geo != null) {
           $scope.markersOnMap.push( {
              latitude: $rootScope.resultlist[i].geo.coordinates[0],
              longitude: $rootScope.resultlist[i].geo.coordinates[1],
              title: 'm' + i,
              id: 'm' + i,
              icon: $rootScope.resultlist[i].user.profile_image_url,
              text: $rootScope.resultlist[i].text,
              name: $rootScope.resultlist[i].user.name
            });
          }
        }
      }
    }, true);
  })
  .controller('templateController',function(){})
  .config(function (uiGmapGoogleMapApiProvider) {
    //Set Google Map API key which will be used to fetch data while searching
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyCcJIJsH6jGODiXH92tQcUIEXImUGDQK5s',
      v: '3.22',
      libraries: 'weather,geometry,visualization'
    });
  });

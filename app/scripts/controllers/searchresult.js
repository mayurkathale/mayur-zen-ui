'use strict';

/**
 * @ngdoc function
 * @name tweetsOnMapApp.controller:SearchresultCtrl
 * @description
 * # SearchresultCtrl
 * Controller of the tweetsOnMapApp
 */
angular.module('tweetsOnMapApp')
  .controller('SearchresultCtrl', function ($scope, $rootScope) {
    $scope.list = [];
    $scope.$watch(function(){return $rootScope.resultlist},function(newVal, oldVal){
      $scope.list = $rootScope.resultlist;
    }, true);
  });

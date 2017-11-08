'use strict';

/**
 * @ngdoc function
 * @name tweetsOnMapApp.controller:HistoryCtrl
 * @description
 * # HistoryCtrl
 * Controller of the tweetsOnMapApp
 */
angular.module('tweetsOnMapApp')
  .controller('HistoryCtrl', function ($scope, $rootScope, apiService) {
    $scope.history = [];
    apiService.getHistory().then(function(history){
      $scope.history = history;
    });
    $scope.search = function (q) {
      $rootScope.$emit("CallSearchMethod", {q:q});
    }
    $rootScope.$on("updateHistory", function(event, data){
      $scope.history = data.history;
    });
  });

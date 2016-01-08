/**
 * Created by Peter on 31.12.2015.
 */
'use strict';

angular.module('aleApp.controllers', [])

  .controller('CompanyIndexCtrl', ['$scope', 'CompanyService', function($scope, CompanyService) {
    $scope.list = CompanyService.query();
  }])

  .controller('AleIndexCtrl', ['$scope', 'AleService', function($scope, AleService) {
    $scope.ale = AleService.query();
    $scope.orders = {};
    $scope.orderAle = function(name, total, price) {
      $scope.orders["name"]["total"] += total;
      $scope.orders["name"]["price"] += total*price;
      //total = 0;
      console.log($scope.orders);
    };
  }])

  .controller('AleDetailCtrl', ['$scope', '$routeParams', 'AleService', function($scope, $routeParams, AleService) {
    $scope.ale = AleService.get({aleId: $routeParams.aleId});
  }]);
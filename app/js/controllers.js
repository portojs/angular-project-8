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
    $scope.plusAle = function($index) {
      $scope.ale[$index].total += 1;
    };
    $scope.minusAle = function($index) {
      $scope.ale[$index].total <= 0 ? $scope.ale[$index].total = 0 : $scope.ale[$index].total -= 1;
    };
    $scope.orderAle = function($index) {
      if ($scope.orders[$scope.ale[$index].name]) {
        $scope.orders[$scope.ale[$index].name].total += $scope.ale[$index].total;
        $scope.orders[$scope.ale[$index].name].price += $scope.ale[$index].total * $scope.ale[$index].price;
      } else {
        $scope.orders[$scope.ale[$index].name] = {};
        $scope.orders[$scope.ale[$index].name].name = $scope.ale[$index].name;
        $scope.orders[$scope.ale[$index].name].total = $scope.ale[$index].total;
        $scope.orders[$scope.ale[$index].name].price = $scope.ale[$index].total * $scope.ale[$index].price;
      }
      $scope.ale[$index].total = 0;
      console.log($scope.orders);
    };
  }])

  .controller('AleDetailCtrl', ['$scope', '$routeParams', 'AleService', function($scope, $routeParams, AleService) {
    $scope.ale = AleService.get({aleId: $routeParams.aleId});
  }]);
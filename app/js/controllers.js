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
    $scope.total = 0;
    $scope.price = 0;
  }])

  .controller('AleDetailCtrl', ['$scope', '$routeParams', 'AleService', function($scope, $routeParams, AleService) {
    $scope.ale = AleService.get({aleId: $routeParams.aleId});
  }]);
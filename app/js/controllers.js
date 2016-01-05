/**
 * Created by Peter on 31.12.2015.
 */
'use strict';

angular.module('aleApp.controllers', [])
  .controller('CompanyIndexCtrl', ['$scope', 'CompanyService', function($scope, CompanyService) {
    $scope.list = CompanyService.query();
  }]);
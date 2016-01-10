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

  .controller('AleDetailCtrl', ['$scope', '$routeParams', 'AleService', 'GravatarProvider', function($scope, $routeParams, AleService, GravatarProvider) {
    $scope.gravatarUrl = function (email) {
      return GravatarProvider(email);
    };
    $scope.ale = AleService.get({aleId: $routeParams.aleId}, function (ale) {
      $scope.mainImg = ale.img[0];
    });
    $scope.changeImg = function (image) {
      $scope.mainImg = image;
    };
    $scope.feedbacks = [
      {
        name: "Bob",
        email: "bob@yahoo.com",
        rating: 5,
        desc: "Incredibly good"
      },
      {
        name: "Bill",
        email: "bill@yahoo.com",
        rating: 4,
        desc: "Quite good actually"
      },
      {
        name: "Jove",
        email: "jove@yahoo.com",
        rating: 3,
        desc: "So-so"
      }
    ];
    $scope.showSection = 0;
    $scope.showFeedbackForm = false;
    $scope.showSectionAct = function(section) {
      if (section === 1) {
        $scope.showFeedbackForm = false;
        $scope.showSection = 1;
      } else {
        $scope.showSection = 2;
      }
    };
    $scope.showFeedbackFormAct = function() {
      $scope.showFeedbackForm = !$scope.showFeedbackForm;
    };
    $scope.ratingsArray = [1,2,3,4,5];
  }]);
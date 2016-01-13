/**
 * Created by Peter on 31.12.2015.
 */
'use strict';

angular.module('aleApp.controllers', [])

  .controller('CompanyIndexCtrl', ['$scope', 'CompanyService', function($scope, CompanyService) {
    $scope.list = CompanyService.query();
  }])

  .controller('AleIndexCtrl', ['$scope', 'AleService', 'OrderService', function($scope, AleService, OrderService) {
    $scope.ale = AleService.query();
    $scope.sortCats = [
      {
        text: 'By price: high to low',
        value: '-price'
      },
      {
        text: 'By price: low to high',
        value: 'price'
      },
      {
        text: 'By name',
        value: 'name'
      }
    ];
    $scope.aleSort = '';
    $scope.orders = {};
    $scope.form = {};
    $scope.plusAle = function($index) {
      $scope.ale[$index].total += 1;
    };
    $scope.minusAle = function($index) {
      $scope.ale[$index].total <= 0 ? $scope.ale[$index].total = 0 : $scope.ale[$index].total -= 1;
    };
    $scope.orderAle = function($index) {
      OrderService.setOrder($scope.ale[$index].name, $scope.ale[$index].total, $scope.ale[$index].price);
      $scope.ale[$index].total = 0;
    };
  }])

  .controller('AleDetailCtrl', ['$scope', '$routeParams', 'AleService', 'GravatarProvider', function($scope, $routeParams, AleService, GravatarProvider) {
    $scope.ale = AleService.get({aleId: $routeParams.aleId}, function (ale) {
      $scope.mainImg = ale.img[0];
    });
    $scope.total = 0;
    $scope.orders = [];
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
    $scope.ratingsArray = [1,2,3,4,5];
    $scope.showSection = 1;
    $scope.showFeedbackForm = false;
    $scope.buttonText = "Fill in all required fields";
    $scope.gravatarUrl = function (email) {
      return GravatarProvider(email);
    };
    $scope.changeImg = function (image) {
      $scope.mainImg = image;
    };
    $scope.plusAle = function() {
      $scope.total++;
    };
    $scope.minusAle = function() {
      if ($scope.total > 0) {
        $scope.total--;
      }
    };
    $scope.orderAle = function() {
      if ($scope.total > 0) {
        $scope.orders.push({name: $scope.ale.name, total: $scope.total, price: $scope.total * $scope.ale.price});
      }
      console.log($scope.orders);
    };
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
    $scope.checkForm = function() {
      if ($scope.feedbackForm.$valid) {
        $scope.buttonText = "Submit";
      } else {
        $scope.buttonText = "Fill in all required fields";
      }
    };
    $scope.checkFormField = function() {
    };
    $scope.submitForm = function() {
      $scope.feedbacks.push($scope.form);
      $scope.form = {};
    };
  }])

  .controller('YouIndexCtrl', ['$scope', 'OrderService', 'GravatarProvider', function($scope, OrderService, GravatarProvider) {
    $scope.regUser = {};
    $scope.submitForm = function() {
      $scope.regUser["name"] = $scope.form.name;
      $scope.regUser["email"] = $scope.form.email;
      console.log($scope.regUser);
      $scope.form = {};
    };
  }]);
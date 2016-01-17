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
    $scope.plusAle = function(item) {
      item.pcs += 1;
    };
    $scope.minusAle = function(item) {
      item.pcs <= 0 ? item.pcs = 0 : item.pcs -= 1;
    };
    $scope.orderAle = function(item) {
      OrderService.setOrder(item.name, item.pcs, item.price);
//      console.log(item.price);
      item.pcs = 0;
    };
  }])

  .controller('AleDetailCtrl', ['$scope', '$routeParams', 'AleService', 'OrderService', 'GravatarProvider', function($scope, $routeParams, AleService, OrderService, GravatarProvider) {
    $scope.ale = AleService.get({aleId: $routeParams.aleId}, function (ale) {
      $scope.mainImg = ale.img[0];
    });
    $scope.pcs = 0;
//    $scope.orders = [];
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
      $scope.pcs++;
    };
    $scope.minusAle = function() {
      if ($scope.pcs > 0) {
        $scope.pcs--;
      }
    };
    $scope.orderAle = function() {
      if ($scope.pcs > 0) {
        OrderService.setOrder($scope.ale.name, $scope.pcs, $scope.ale.price);
        $scope.pcs = 0;
      }
//      console.log($scope.orders);
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

  .controller('YouIndexCtrl', ['$scope', 'OrderService', 'UserService', 'GravatarProvider', function($scope, OrderService, UserService, GravatarProvider) {
    $scope.buttonText = "Fill in all fields";
    $scope.changeButtonText = "Change";
    $scope.regUser = UserService.getUser();
    $scope.orders = OrderService.getOrders();
    $scope.oldHtml = "";
    $scope.submitForm = function() {
      UserService.setUser($scope.form);
      $scope.form = {};
    };
    $scope.checkForm = function() {
      if ($scope.userForm.$valid) {
        $scope.buttonText = "Submit";
      } else {
        $scope.buttonText = "Fill in all fields";
      }
    };
    $scope.userImage = function(email) {
      return GravatarProvider(email);
    };
    $scope.cancelOrder = function(order) {
      OrderService.deleteOrder(order);
    };
    $scope.changeOrder = function(order) {
      var thisOrder = $(".order-" + order.name);
      if (thisOrder.hasClass('changing')) {
        OrderService.changeOrder(order.pcs, order.name);
        thisOrder.removeClass('changing');
        thisOrder.find('.button-change').html('Change');
        thisOrder.find('.edit-details').css({'display' : 'none'});
        thisOrder.find('.show-details').css({'display' : 'block'});
      } else {
        thisOrder.addClass('changing');
        thisOrder.find('.button-change').html('Confirm');
        thisOrder.find('.show-details').css({'display' : 'none'});
        thisOrder.find('.edit-details').css({'display' : 'block'});
      }
    };
    $scope.closeEditMode = function(order) {
      console.log('Blur-blurring!');
      var thisOrder = $(".order-" + order.name);
      OrderService.changeOrder(order.pcs, order.name);
      thisOrder.removeClass('changing');
      thisOrder.find('.button-change').html('Change');
      thisOrder.find('.edit-details').css({'display' : 'none'});
      thisOrder.find('.show-details').css({'display' : 'block'});
    }
  }]);
/**
 * Created by Peter on 31.12.2015.
 */
'use strict';

angular.module('aleApp.routes', [
  'ngRoute'
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/company', {
        templateUrl: 'partials/pages/company/index.html',
        controller: 'CompanyIndexCtrl'
      })
      .when('/ale', {
        templateUrl: 'partials/pages/ale/index.html',
        controller: 'AleIndexCtrl'
      })
      .when('/ale/:aleId', {
        templateUrl: 'partials/pages/ale/detail.html',
        controller: 'AleDetailCtrl'
      })
      .when('/you', {
        templateUrl: 'partials/pages/you/index.html'
      })
      .when('/', {
        templateUrl: 'partials/pages/company/index.html',
        controller: 'CompanyIndexCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  }]);
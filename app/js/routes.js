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
        templateUrl: 'partials/pages/company/index.html'
      })
      .when('/ale', {
        templateUrl: 'partials/pages/ale/index.html'
      })
      .when('/you', {
        templateUrl: 'partials/pages/you/index.html'
      })
      .when('/', {
        templateUrl: 'partials/pages/company/index.html'
      })
      .otherwise({
        redirectTo: '/'
      })
  }]);
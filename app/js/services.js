/**
 * Created by Peter on 31.12.2015.
 */
'use strict';

angular.module('aleApp.services', [
  'ngResource'
])

  .service('CompanyService',['$resource', function($resource) {
    return $resource('json/company.json', {}, {});
  }])

  .service('TableService', ['$resource', function($resource) {
    return $resource('json/table.json', {}, {});
  }])

  .service('AleService', ['$resource', function($resource) {
    return $resource('json/:aleId.json', {}, {
      query: {method: 'GET', params: {aleId: 'ale'}, isArray: true}
    });
  }]);
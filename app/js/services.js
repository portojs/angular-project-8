/**
 * Created by Peter on 31.12.2015.
 */
'use strict';

angular.module('aleApp.services', [
  'ngResource'
])
  //.config('$resourceProvider', function($resourceProvider) {
  //  $resourceProvider.default.stripTrailingSlashes = false;
  //})
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
  }])

  .provider('GravatarProvider', function() {
    var avatarSize = 80;
    var avatarUrl = 'http://www.gravatar.com/avatar/';
    this.$get = function() {
      return function(email) {
        return avatarUrl + CryptoJS.MD5(email) + "?size:=" + avatarSize.toString();
      };
    };
  })

  .service('OrderService', function() {
    var orders = {};
    return {
      getOrders: function() {
        return orders;
      },
      setOrder: function(name, total, price) {
        if (orders[name]) {
          orders[name].total += total;
          orders[name].price += total * price;
        } else {
          orders[name] = {};
          orders[name].name = name;
          orders[name].total = total;
          orders[name].price = total * price;
        }
        console.log(orders);
      }
    };
  });
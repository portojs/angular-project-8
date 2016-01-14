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
    var orders = [];
    return {
      getOrders: function() {
        return orders;
      },
      setOrder: function(name, total, price) {
        if (orders.length > 0) {
          for (var i = 0, len = orders.length; i < len; i++) {
            if (orders[i].name === name) {
              orders[i].total += total;
              orders[i].price += total * price;
              return;
            }
          }
          orders.push({'name':name, 'total':total, 'price': total * price});
        } else {
          orders.push({'name':name, 'total':total, 'price': total * price});
        }
      },
      deleteOrder: function (order) {
        orders.splice(orders.indexOf(order), 1);
        console.log(orders.indexOf(order));
      }
    };
  })

  .service('UserService', function() {
    var user = {};
    return {
      getUser: function() {
        return user;
      },
      setUser: function(userDetails) {
        user.name = userDetails.name;
        user.email = userDetails.email;
      }
    };
  });
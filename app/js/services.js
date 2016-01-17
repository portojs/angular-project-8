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
      setOrder: function(name, pcs, price) {
        if (orders.length > 0) {
          for (var i = 0, len = orders.length; i < len; i++) {
            if (orders[i].name === name) {
              orders[i].pcs += pcs;
              orders[i].total += pcs * price;
              orders[i].price = price;
              return;
            }
          }
          orders.push({'name':name, 'pcs':pcs, 'total': pcs * price, 'price': price});
        } else {
          orders.push({'name':name, 'pcs':pcs, 'total': pcs * price, 'price': price});
        }
      },
      changeOrder: function (pcs, name) {
        orders.map(function(element, index, array) {
          if (element.name === name) {
            element.pcs = pcs;
            element.total = pcs * element.price;
          }
        });
      },
      deleteOrder: function (order) {
        orders.splice(orders.indexOf(order), 1);
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
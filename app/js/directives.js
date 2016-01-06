/**
 * Created by Peter on 31.12.2015.
 */
'use strict';

angular.module('aleApp.directives', [])

  .directive('mainFooter', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/directives/main-footer.html'
    }
  })

  .directive('mainHeader', ['$location', function($location) {
    return {
      restrict: 'E',
      templateUrl: 'partials/directives/main-header.html',
      link: function(scope, element, attrs) {
        scope.selectedClass = 0;
        scope.onLoadCheck = function() {
          if ($location.path() === '/company') {
            return 1;
          } else if ($location.path() === '/ale') {
            return 2;
          } else if ($location.path() === '/you') {
            return 3
          } else {
            return 1;
          }
        };
        scope.selectedClassTrue = scope.onLoadCheck();
        scope.addClass = function(newClass) {
          scope.selectedClass = newClass;
        };
        scope.removeClass = function() {
          scope.selectedClass = 0;
        };
        scope.checkClass = function(newClass) {
          if (newClass === scope.selectedClassTrue) {
            return true;
          } else if (newClass === scope.selectedClass) {
            return true;
          }
          return false;
        };
        scope.selectLink = function(newClass) {
          scope.selectedClassTrue = newClass;
        };
      }
    }
  }])

  .directive('mainTable', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/directives/main-table.html',
      controller: function($scope, TableService) {
        $scope.table = TableService.query();
      }
    }
  })

  .directive('mainList', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/directives/main-list.html'
    }
  })

  .directive('mainCategories', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/directives/main-categories.html'
    }
  })

  .directive('mainCategoriesItems', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/directives/main-categories-items.html'
    }
  });
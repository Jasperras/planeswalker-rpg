'use strict';

/**
 * @ngdoc filter
 * @name sheetApp.filter:filterAttributes
 * @function
 * @description
 * # filterAttributes
 * Filter in the sheetApp.
 */
angular.module('sheetApp')
  .filter('filterSecondaryAttributes', function () {
    return function (items) {
        var filtered = [];

        angular.forEach(items, function (item) {
            if(item.secondary == false) {
                filtered.push(item);
            }
        });

        return filtered;
    };
  });

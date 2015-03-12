'use strict';

/**
 * @ngdoc filter
 * @name sheetApp.filter:filterByColor
 * @function
 * @description
 * # filterByColor
 * Filter in the sheetApp.
 */
angular.module('sheetApp')
    .filter('filterByColor', function () {
        return function (items, color) {
            var filtered = [];

            angular.forEach(items, function (item) {
                if (item.color.name === color.name) {
                    filtered.push(item);
                }
            });

            return filtered;
        };
    });

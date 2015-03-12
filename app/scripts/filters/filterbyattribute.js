'use strict';

/**
 * @ngdoc filter
 * @name sheetApp.filter:filterByAttribute
 * @function
 * @description
 * # filterByAttribute
 * Filter in the sheetApp.
 */
angular.module('sheetApp')
    .filter('filterByAttribute', function () {
        return function (items, attribute) {
            var filtered = [];

            angular.forEach(items, function (item) {
                if(item.attribute != null) {
                    if (item.attribute.name === attribute.name) {
                        filtered.push(item);
                    }
                }
                else {
                    if(item.skill.attribute.name === attribute.name) {
                        filtered.push(item);
                    }
                }
            });

            return filtered;
        };
    });

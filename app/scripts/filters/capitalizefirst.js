'use strict';

/**
 * @ngdoc filter
 * @name sheetApp.filter:capitalizeFirst
 * @function
 * @description
 * # capitalizeFirst
 * Filter in the sheetApp.
 */
angular.module('sheetApp')
  .filter('capitalize', function () {
    return function (input) {
        return input.toUpperCase();
    };
  });

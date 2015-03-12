'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Color
 * @description
 * # Color
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('ColorService', function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/colors', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    });

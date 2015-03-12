'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Attribute
 * @description
 * # Attribute
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('AttributeService', function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/attributes', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    });

'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Consumable
 * @description
 * # Consumable
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('ConsumableService', function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/consumables', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    });

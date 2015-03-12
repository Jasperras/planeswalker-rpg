'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Equipment
 * @description
 * # Equipment
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('EquipmentService', function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/equipment', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    });

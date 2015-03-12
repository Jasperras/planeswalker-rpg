'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Passive
 * @description
 * # Passive
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('PassiveService', function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/passives', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    });

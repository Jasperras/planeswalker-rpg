'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Race
 * @description
 * # Race
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('RaceService', function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/races', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    });

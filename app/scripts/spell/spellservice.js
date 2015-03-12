'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Spell
 * @description
 * # Spell
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('SpellService', function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/spells', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    });

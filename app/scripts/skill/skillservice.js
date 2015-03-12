'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Skill
 * @description
 * # Skill
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('SkillService', function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/skills', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    });

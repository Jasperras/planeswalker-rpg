'use strict';

/**
 * @ngdoc service
 * @name sheetApp.CharacterService
 * @description
 * # CharacterService
 * Service in the sheetApp.
 */
angular.module('sheetApp')
    .service('CharacterService', function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/characters/:link', {}, {
            getUser: {method: 'GET', params: {link: 'user', name: '@name'}, isArray: true},
            getChar: {method: 'GET', params: {link: 'character', name: '@name'}},
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    });

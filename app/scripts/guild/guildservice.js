'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Guild
 * @description
 * # Guild
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('GuildService', function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/guilds', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    });

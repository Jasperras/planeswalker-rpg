'use strict';

/**
 * @ngdoc service
 * @name sheetApp.User
 * @description
 * # User
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('UserService', function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/user/:method', {}, {
            login: {method: 'POST', params: {method: 'login'}},
            create: {method: 'POST', params: {method: 'create'}}
        });
    });

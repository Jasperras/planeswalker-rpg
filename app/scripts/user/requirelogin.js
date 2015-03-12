'use strict';

/**
 * @ngdoc service
 * @name sheetApp.RequireLoginService
 * @description
 * # RequireLoginService
 * Service in the sheetApp.
 */
angular.module('sheetApp')
    .service('RequireLogin', function ($rootScope, $timeout, $state, $q) {
        return {
            loginRequired: function () {
                var deferred = $q.defer();
                if (!$rootScope.user.loggedIn) {
                    deferred.reject();

                    $timeout(function () {
                        $state.go('login');
                    });
                } else {
                    deferred.resolve()
                }

                return deferred.promise;
            }
        }
    });

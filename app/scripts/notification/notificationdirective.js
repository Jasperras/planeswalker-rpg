'use strict';

/**
 * @ngdoc directive
 * @name sheetApp.directive:myNotification
 * @description
 * # myNotification
 */
angular.module('sheetApp')
    .directive('myNotification', function ($timeout) {
        return {
            template: '<div class="alert alert-{{notification.type}} notification" ng-if="notification.show" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '{{notification.text}}' +
            '</div>',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                scope.$watch('notification.timer', function () {
                    $timeout(function () {
                        scope.notification.show = false;
                        scope.notification.timer = 0;
                    }, scope.notification.timer);
                });
            }
        };
    });

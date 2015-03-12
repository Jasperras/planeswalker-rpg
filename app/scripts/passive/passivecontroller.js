'use strict';

/**
 * @ngdoc function
 * @name sheetApp.controller:PassiveCtrl
 * @description
 * # PassiveCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('PassiveCtrl', function ($scope, $state) {

        $scope.addPassiveToCharacter = function (passive) {
            // character.addPassive returns false if an entry is added.
            if (!$scope.character.addPassive(passive)) {
                $scope.$parent.notification = {
                    type: "success",
                    text: "Added passive " + passive.name + " to character.",
                    show: true,
                    timer: 5000
                };
            }
            else {
                $scope.$parent.notification = {
                    type: "danger",
                    text: "Character already has " + passive.name,
                    show: true,
                    timer: 5000
                };
            }
        };
    });

'use strict';

/**
 * @ngdoc function
 * @name sheetApp.controller:SpellCtrl
 * @description
 * # SpellCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('SpellCtrl', function ($scope, $state) {

        $scope.addSpellToCharacter = function (spell) {
            // character.addSpell returns true if an entry is added.
            if (!$scope.character.addSpell(spell)) {
                $scope.$parent.notification = {
                    type: "success",
                    text: "Added spell " + spell.name + " to character.",
                    show: true,
                    timer: 5000
                };
            }
            else {
                $scope.$parent.notification = {
                    type: "danger",
                    text: "Character already has " + spell.name,
                    show: true,
                    timer: 5000
                };
            }
        };
    });

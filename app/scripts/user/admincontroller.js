'use strict';

/**
 * @ngdoc function
 * @name sheetApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('AdminCtrl', function ($scope, $timeout, RaceService, GuildService, AttributeService,
                                       PassiveService, SkillService, SpellService, EquipmentService, ConsumableService) {

        $scope.race = {};
        $scope.racialTraits = [{}];
        $scope.guild = {};
        $scope.guildBoon = {};
        $scope.attribute = {};
        $scope.passive = {};
        $scope.skill = {};
        $scope.spell = {};
        $scope.equipment = {};
        $scope.consumable = {};

        $scope.saveRace = function () {
            $scope.race.racialTraits = $scope.racialTraits;
            RaceService.save($scope.race);

            $timeout(function () {
                $scope.race = {};
                $scope.racialTraits = [{}];
            });
        };

        $scope.saveGuild = function () {
            $scope.guild.boon = $scope.guildBoon;
            GuildService.save($scope.guild);

            $timeout(function () {
                $scope.guild = {};
                $scope.guildBoon = {};
            });
        };

        $scope.saveAttribute = function () {
            AttributeService.save($scope.attribute);

            $timeout(function () {
                $scope.attribute = {};
            });
        };

        $scope.savePassive = function () {
            PassiveService.save($scope.passive);

            $timeout(function () {
                $scope.passive = {};
            });
        };

        $scope.saveSkill = function () {
            SkillService.save($scope.skill);

            $timeout(function () {
                $scope.skill = {};
            });
        };

        $scope.saveSpell = function () {
            SpellService.save($scope.spell);

            $timeout(function () {
                $scope.spell = {};
            });
        };

        $scope.saveEquipment = function () {
            EquipmentService.save($scope.equipment);

            $timeout(function () {
                $scope.equipment = {};
            });
        };

        $scope.saveConsumable = function () {
            ConsumableService.save($scope.consumable);

            $timeout(function () {
                $scope.consumable = {};
            });
        };
    });

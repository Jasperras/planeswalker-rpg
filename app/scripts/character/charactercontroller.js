'use strict';

/**
 * @ngdoc function
 * @name sheetApp.controller:CharacterCtrl
 * @description
 * # CharacterCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('CharacterCtrl', function ($rootScope, $scope, $state, $timeout, $interval,
                                           User, Character, CharacterService,
                                           AttributeService, ColorService, ConsumableService,
                                           EquipmentService, GuildService, PassiveService, RaceService,
                                           SkillService, SpellService) {
        // Initialize
        $scope.attributes = AttributeService.query();
        $scope.colors = ColorService.query();
        $scope.consumables = ConsumableService.query();
        $scope.equipment = EquipmentService.query();
        $scope.guilds = GuildService.query();
        $scope.passives = PassiveService.query();
        $scope.races = RaceService.query();
        $scope.skills = SkillService.query();
        $scope.spells = SpellService.query();

        $scope.character = {};
        $scope.notification = {type: "", text: "", show: false, timer: 0};

        // Functions
        $scope.newCharacter = function (username) {
            $scope.character = new Character(username);
            $scope.character.skills = Character.buildSkills($scope.skills);
        };

        $scope.getCharacterNames = function () {
            $rootScope.user.characters = [];

            CharacterService.getUser({name: $rootScope.user.username}).$promise.then(
                function (data) {
                    angular.forEach(data, function (char) {
                        $rootScope.user.characters.push(char);
                    });
                }
            );
        };

        $scope.getCharacterByName = function (name) {
            CharacterService.getChar({name: name}).$promise.then(
                function (data) {
                    $scope.character = Character.build(data);
                    $scope.notification = {
                        type: "success",
                        text: "Successfully loaded: " + name,
                        show: true,
                        timer: 5000
                    };
                },
                function () {
                    $scope.notification = {
                        type: "danger",
                        text: "Could not load: " + name,
                        show: true,
                        timer: 5000
                    };
                }
            );
        };

        $scope.saveCharacter = function () {
            if($scope.character.name !== "") {
                var canWeSaveIt = true;
                angular.forEach($rootScope.user.characters, function (name) {
                    if(name === $scope.character.name && $scope.character.isNew) {
                        canWeSaveIt = false;
                        alert(name + " already exists.");
                    }
                });
                if(canWeSaveIt) {
                    CharacterService.save($scope.character).$promise.then(
                        function () {
                            $scope.notification = {
                                type: "success",
                                text: "Successfully saved: " + $scope.character.name,
                                show: true,
                                timer: 5000
                            };
                            $scope.character.isNew = false;
                            $scope.getCharacterNames();
                        },
                        function () {
                            $scope.notification = {
                                type: "danger",
                                text: "Could not save: " + $scope.character.name,
                                show: true,
                                timer: 5000
                            };
                        }
                    );
                }
            }
        };

        $scope.removeCharacter = function () {
            CharacterService.delete($scope.character).$promise.then(
                function () {
                    $scope.notification = {
                        type: "success",
                        text: "Successfully removed: " + $scope.character.name,
                        show: true,
                        timer: 5000
                    };
                    $scope.character.isNew = false;
                    $scope.getCharacterNames();
                },
                function () {
                    $scope.notification = {
                        type: "danger",
                        text: "Could not remove: " + $scope.character.name,
                        show: true,
                        timer: 5000
                    };
                }
            );
        };

        $scope.newName = "";
        $scope.renameCharacter = function (name) {
            $scope.character.name = name;
        };

        $scope.logoutUser = function () {
            $rootScope.user = new User();
            $state.go('login');
        };

        // Apply watch on Character object, if change was made set characterUpdated = true.
        var saveCharacter = false;

        $scope.$watch('character', function () {
            if($rootScope.user.loggedIn) {
                saveCharacter = true;
            }
        }, true);

        $interval(function () {
            if(saveCharacter) {
                $scope.saveCharacter();
                saveCharacter = false;
            }
        }, 15000);

    });
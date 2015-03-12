'use strict';
/**
 * @ngdoc overview
 * @name sheetApp
 * @description
 * # sheetApp
 *
 * Main module of the application.
 */
var app = angular.module('sheetApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'mgcrea.ngStrap',
    'mgcrea.ngStrap.helpers.dimensions'
]);

app.config(["$urlRouterProvider", "$stateProvider", "$locationProvider", function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise("sheet");

    $stateProvider
        .state('sheet', {
            url: "/",
            templateUrl: "views/character/index.html",
            resolve: {
                loginRequired: ["RequireLogin", function (RequireLogin) {
                    return RequireLogin.loginRequired();
                }]
            }
        })
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: 'UserCtrl'
        })
        .state('skills', {
            url: "/skills",
            templateUrl: "views/skills.html",
            controller: 'SkillCtrl'
        })
        .state('spells', {
            url: "/spells",
            templateUrl: "views/spells.html",
            controller: 'SpellCtrl'
        })
        .state('passives', {
            url: "/passives",
            templateUrl: "views/passives.html",
            controller: 'PassiveCtrl'
        })
        .state('attributes', {
            url: "/attributes",
            templateUrl: "views/attributes.html",
            controller: 'AttributeCtrl'
        })
        .state('races', {
            url: "/races",
            templateUrl: "views/races.html",
            controller: 'RaceCtrl'
        })
        .state('guilds', {
            url: "/guilds",
            templateUrl: "views/guilds.html",
            controller: 'GuildCtrl'
        })
        .state('admin', {
            url: "/admin",
            templateUrl: "views/admin.html",
            controller: 'AdminCtrl'
        })
        .state('admin.colors', {
            url: "/colors",
            templateUrl: "views/admin/admin-colors-list.html"
        })
        .state('admin.colorsAdd', {
            url: "/colors/add",
            templateUrl: "views/admin/admin-colors-add.html"
        })
        .state('admin.attributes', {
            url: "/colors/add",
            templateUrl: "views/admin/admin-attributes-add.html"
        })
        .state('admin.passives', {
            url: "/passives/add",
            templateUrl: "views/admin/admin-passives-add.html"
        })
        .state('admin.spells', {
            url: "/spells/add",
            templateUrl: "views/admin/admin-spells-add.html"
        })
        .state('admin.skills', {
            url: "/skills/add",
            templateUrl: "views/admin/admin-skills-add.html"
        })
        .state('admin.equipment', {
            url: "/equipment/add",
            templateUrl: "views/admin/admin-equipment-add.html"
        })
        .state('admin.consumables', {
            url: "/consumables/add",
            templateUrl: "views/admin/admin-consumables-add.html"
        })
        .state('info', {
            url: "/info",
            templateUrl: "views/info.html"
        });
}]);

app.run(["$rootScope", "$state", "User", function ($rootScope, $state, User) {
    $rootScope.user = new User();
    $state.go('sheet');
}]);



'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Attribute
 * @description
 * # Attribute
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('AttributeService', ["$resource", "ApiLocation", function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/attributes', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    }]);

'use strict';

/**
 * @ngdoc function
 * @name sheetApp.controller:AttributecontrollerCtrl
 * @description
 * # AttributecontrollerCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('AttributeCtrl', function () {
    });

'use strict';

/**
 * @ngdoc service
 * @name sheetApp.CharacterModel
 * @description
 * # CharacterModel
 * Service in the sheetApp.
 */
angular.module('sheetApp')
    .factory('Character', function () {

        /*
         *  Constructor
         */
        function Character(username) {
            this.name = "";
            this.level = 1;
            this.health = 1;
            this.mana = 1;
            this.race = null;
            this.guild = null;
            this.colors = {};
            this.attributes = {Strength: 1, Intelligence: 1, Dexterity: 1, Endurance: 1, Charisma: 1};
            this.passives = [];
            this.skills = [];
            this.spells = [];
            this.equipment = [];
            this.consumables = [];
            this.user = username;
            this.isNew = true;
        }

        /*
         *  Public methods
         */
        Character.prototype.setRace = function (race) {
            this.race = race;
        };

        Character.prototype.setGuild = function (guild) {
            this.guild = guild;
        };

        Character.prototype.addPassive = function (passive) {
            var duplicate = false;

            angular.forEach(this.passives, function (pas) {
                if (passive.name === pas.name) {
                    duplicate = true;
                }
            });

            if(duplicate != true) {
                this.passives.push(passive);
            }

            return duplicate;
        };

        Character.prototype.addSpell = function (spell) {
            var duplicate = false;

            angular.forEach(this.spells, function (sp) {
                if (spell.name === sp.name) {
                    duplicate = true;
                }
            });

            if(duplicate != true) {
                this.spells.push(spell);
            }

            return duplicate;
        };

        Character.prototype.resetSkillPoints = function () {
            angular.forEach(this.skills, function (skill) {
                for (var i = 0; i <= 4; i++) {
                    if (skill.points[i] == true) {
                        skill.level += 1;
                    }
                    skill.points[i] = false;
                }
            });
        };

        Character.build = function (data) {
            var tmp = new Character();

            tmp.name = data.name;
            tmp.level = data.level;
            tmp.health = data.health;
            tmp.mana = data.mana;
            tmp.race = data.race;
            tmp.guild = data.guild;
            tmp.colors = data.colors;
            tmp.attributes = data.attributes;
            tmp.passives = data.passives;
            tmp.skills = data.skills;
            tmp.spells = data.spells;
            tmp.equipment = data.equipment;
            tmp.consumables = data.consumables;
            tmp.user = data.user;
            tmp.isNew = false;

            return tmp;
        };

        Character.buildSkills = function (skills) {
            var result = [];

            angular.forEach(skills, function (skill) {
                this.push({skill: skill, points: [false, false, false, false, false], level: 0});
            }, result);

            return result;
        };

        return ( Character );
    });

'use strict';

/**
 * @ngdoc service
 * @name sheetApp.CharacterService
 * @description
 * # CharacterService
 * Service in the sheetApp.
 */
angular.module('sheetApp')
    .service('CharacterService', ["$resource", "ApiLocation", function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/characters/:link', {}, {
            getUser: {method: 'GET', params: {link: 'user', name: '@name'}, isArray: true},
            getChar: {method: 'GET', params: {link: 'character', name: '@name'}},
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    }]);

'use strict';

/**
 * @ngdoc function
 * @name sheetApp.controller:CharacterCtrl
 * @description
 * # CharacterCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('CharacterCtrl', ["$rootScope", "$scope", "$state", "$timeout", "$interval", "User", "Character", "CharacterService", "AttributeService", "ColorService", "ConsumableService", "EquipmentService", "GuildService", "PassiveService", "RaceService", "SkillService", "SpellService", function ($rootScope, $scope, $state, $timeout, $interval,
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

    }]);
'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Color
 * @description
 * # Color
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('ColorService', ["$resource", "ApiLocation", function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/colors', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    }]);

/**
 * @ngdoc function
 * @name sheetApp.controller:ColorCtrl
 * @description
 * # ColorCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('ColorCtrl', function () {
    });

'use strict';

/**
 * @ngdoc service
 * @name sheetApp.ApiLocation
 * @description
 * # ApiLocation
 * Constant in the sheetApp.
 */
angular.module('sheetApp')
    .constant('ApiLocation', 'http://jasperras.nl:8080/planeswalkers-api');

'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Consumable
 * @description
 * # Consumable
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('ConsumableService', ["$resource", "ApiLocation", function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/consumables', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    }]);

'use strict';

/**
 * @ngdoc function
 * @name sheetApp.controller:ConsumableCtrl
 * @description
 * # ConsumableCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('ConsumableCtrl', function () {
    });

'use strict';

/**
 * @ngdoc directive
 * @name sheetApp.directive:myNotification
 * @description
 * # myNotification
 */
angular.module('sheetApp')
    .directive('myNotification', ["$timeout", function ($timeout) {
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
    }]);

'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Equipment
 * @description
 * # Equipment
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('EquipmentService', ["$resource", "ApiLocation", function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/equipment', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    }]);

'use strict';

/**
 * @ngdoc function
 * @name sheetApp.controller:EquipmentCtrl
 * @description
 * # EquipmentCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('EquipmentCtrl', function () {
    });

'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Guild
 * @description
 * # Guild
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('GuildService', ["$resource", "ApiLocation", function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/guilds', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    }]);

'use strict';

/**
 * @ngdoc function
 * @name sheetApp.controller:GuildCtrl
 * @description
 * # GuildCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('GuildCtrl', function () {

    });

'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Passive
 * @description
 * # Passive
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('PassiveService', ["$resource", "ApiLocation", function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/passives', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    }]);

'use strict';

/**
 * @ngdoc function
 * @name sheetApp.controller:PassiveCtrl
 * @description
 * # PassiveCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('PassiveCtrl', ["$scope", "$state", function ($scope, $state) {

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
    }]);

'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Race
 * @description
 * # Race
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('RaceService', ["$resource", "ApiLocation", function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/races', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    }]);

'use strict';

/**
 * @ngdoc function
 * @name sheetApp.controller:RaceCtrl
 * @description
 * # RaceCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('RaceCtrl', function () {
    });

'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Skill
 * @description
 * # Skill
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('SkillService', ["$resource", "ApiLocation", function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/skills', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    }]);

'use strict';

/**
 * @ngdoc function
 * @name sheetApp.controller:SkillCtrl
 * @description
 * # SkillCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('SkillCtrl', function () {
    });

'use strict';

/**
 * @ngdoc service
 * @name sheetApp.Spell
 * @description
 * # Spell
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('SpellService', ["$resource", "ApiLocation", function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/spells', {}, {
            save: {method: 'POST'},
            query: {method: 'GET', isArray: true, cache: true},
            remove: {method: 'DELETE'},
            delete: {method: 'DELETE'}
        });
    }]);

'use strict';

/**
 * @ngdoc function
 * @name sheetApp.controller:SpellCtrl
 * @description
 * # SpellCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('SpellCtrl', ["$scope", "$state", function ($scope, $state) {

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
    }]);

'use strict';

/**
 * @ngdoc service
 * @name sheetApp.User
 * @description
 * # User
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('User', function () {

        function User() {
            this.username = "";
            this.password = "";
            this.type = "";
            this.characters = [];
            this.loggedIn = false;
        }

        User.prototype.setUsername = function (username) {
            this.username = username;
        };

        User.prototype.setPassword = function (password) {
            this.password = password;
        };

        User.prototype.setType = function (type) {
            this.type = type;
        };

        User.prototype.setCharacters = function (characters) {
            this.characters = characters;
            alert(characters);
        };

        User.prototype.setLoggedIn = function (loggedIn) {
            this.loggedIn = loggedIn;
        };


        User.build = function (data) {
            var tmp = new User();
            tmp.setUsername(data.username);
            tmp.setPassword(data.password);
            tmp.setType(data.type);
            tmp.setLoggedIn(true);
            return tmp;
        };

        return ( User );
    });

'use strict';

/**
 * @ngdoc service
 * @name sheetApp.User
 * @description
 * # User
 * Factory in the sheetApp.
 */
angular.module('sheetApp')
    .factory('UserService', ["$resource", "ApiLocation", function ($resource, ApiLocation) {
        return $resource(ApiLocation + '/user/:method', {}, {
            login: {method: 'POST', params: {method: 'login'}},
            create: {method: 'POST', params: {method: 'create'}}
        });
    }]);

'use strict';

/**
 * @ngdoc function
 * @name sheetApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('UserCtrl', ["$rootScope", "$scope", "$state", "$timeout", "User", "UserService", function ($rootScope, $scope, $state, $timeout, User, UserService) {

        $scope.credentials = {
            username: null,
            password: null
        };

        // Go and do the login stuff pl0x.
        $scope.doLogin = function () {
            UserService.login($scope.credentials).$promise.then(
                // success callback
                function (data) {
                    $scope.newCharacter(data.username);

                    $timeout(function () {
                        $rootScope.user = User.build(data);
                        $scope.getCharacterNames();
                        $state.go('sheet');
                    });
                },
                // error callback
                function (data) {
                    if (data.status == 404) {
                        alert("Username not found.")
                    }
                    else if (data.status == 401) {
                        alert("Invalid password.");
                    }
                    else {
                        alert("Aren't you forgetting something?");
                    }
                }
            );
        };

        // Go and do the create user stuff.
        $scope.doCreate = function () {
            if ($scope.credentials.username == null && $scope.credentials.password == null) {
                alert("To create an account, fill in the form and press the create button.");
            }
            else if ($scope.credentials.password == null) {
                alert("Please enter a password.")
            }
            else {
                $scope.credentials.type = "player";

                UserService.create($scope.credentials).$promise.then
                (
                    // success callback
                    function () {
                        alert("Account successfully created!")
                    },
                    // error callback
                    function (data) {
                        if (data.status == 409) {
                            alert("Username already taken.")
                        }
                    }
                )
            }
        };
    }]);

'use strict';

/**
 * @ngdoc function
 * @name sheetApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('AdminCtrl', ["$scope", "$timeout", "RaceService", "GuildService", "AttributeService", "PassiveService", "SkillService", "SpellService", "EquipmentService", "ConsumableService", function ($scope, $timeout, RaceService, GuildService, AttributeService,
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
    }]);

'use strict';

/**
 * @ngdoc service
 * @name sheetApp.RequireLoginService
 * @description
 * # RequireLoginService
 * Service in the sheetApp.
 */
angular.module('sheetApp')
    .service('RequireLogin', ["$rootScope", "$timeout", "$state", "$q", function ($rootScope, $timeout, $state, $q) {
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
    }]);

'use strict';

/**
 * @ngdoc filter
 * @name sheetApp.filter:filterByColor
 * @function
 * @description
 * # filterByColor
 * Filter in the sheetApp.
 */
angular.module('sheetApp')
    .filter('filterByColor', function () {
        return function (items, color) {
            var filtered = [];

            angular.forEach(items, function (item) {
                if (item.color.name === color.name) {
                    filtered.push(item);
                }
            });

            return filtered;
        };
    });

'use strict';

/**
 * @ngdoc filter
 * @name sheetApp.filter:filterByAttribute
 * @function
 * @description
 * # filterByAttribute
 * Filter in the sheetApp.
 */
angular.module('sheetApp')
    .filter('filterByAttribute', function () {
        return function (items, attribute) {
            var filtered = [];

            angular.forEach(items, function (item) {
                if(item.attribute != null) {
                    if (item.attribute.name === attribute.name) {
                        filtered.push(item);
                    }
                }
                else {
                    if(item.skill.attribute.name === attribute.name) {
                        filtered.push(item);
                    }
                }
            });

            return filtered;
        };
    });

'use strict';

/**
 * @ngdoc filter
 * @name sheetApp.filter:filterAttributes
 * @function
 * @description
 * # filterAttributes
 * Filter in the sheetApp.
 */
angular.module('sheetApp')
  .filter('filterSecondaryAttributes', function () {
    return function (items) {
        var filtered = [];

        angular.forEach(items, function (item) {
            if(item.secondary == false) {
                filtered.push(item);
            }
        });

        return filtered;
    };
  });

$(document).ready(function () {
    $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active');
    });
});
'use strict';

/**
 * @ngdoc filter
 * @name sheetApp.filter:capitalizeFirst
 * @function
 * @description
 * # capitalizeFirst
 * Filter in the sheetApp.
 */
angular.module('sheetApp')
  .filter('capitalize', function () {
    return function (input) {
        return input.toUpperCase();
    };
  });

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

app.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise("sheet");

    $stateProvider
        .state('sheet', {
            url: "/",
            templateUrl: "views/character/index.html",
            resolve: {
                loginRequired: function (RequireLogin) {
                    return RequireLogin.loginRequired();
                }
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
});

app.run(function ($rootScope, $state, User) {
    $rootScope.user = new User();
    $state.go('sheet');
});



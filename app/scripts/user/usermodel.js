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

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

        Character.prototype.removePassive = function (passive) {
            var index = this.passives.indexOf(passive);

            if (index > -1) {
                this.passives.splice(index, 1);
            }
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

        Character.prototype.removeSpell = function (spell) {
            var index = this.spells.indexOf(spell);

            if (index > -1) {
                this.spells.splice(index, 1);
            }
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

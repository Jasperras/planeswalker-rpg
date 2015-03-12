'use strict';

/**
 * @ngdoc function
 * @name sheetApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the sheetApp
 */
angular.module('sheetApp')
    .controller('UserCtrl', function ($rootScope, $scope, $state, $timeout, User, UserService) {

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
    });

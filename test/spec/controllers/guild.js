'use strict';

describe('Controller: GuildCtrl', function () {

  // load the controller's module
  beforeEach(module('sheetApp'));

  var GuildCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GuildCtrl = $controller('GuildCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

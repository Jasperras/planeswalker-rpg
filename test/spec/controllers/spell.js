'use strict';

describe('Controller: SpellCtrl', function () {

  // load the controller's module
  beforeEach(module('sheetApp'));

  var SpellCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpellCtrl = $controller('SpellCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

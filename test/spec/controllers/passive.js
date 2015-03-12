'use strict';

describe('Controller: PassiveCtrl', function () {

  // load the controller's module
  beforeEach(module('sheetApp'));

  var PassiveCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PassiveCtrl = $controller('PassiveCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

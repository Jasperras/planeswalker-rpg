'use strict';

describe('Controller: AttributecontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('sheetApp'));

  var AttributecontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AttributecontrollerCtrl = $controller('AttributecontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Controller: ConsumableCtrl', function () {

  // load the controller's module
  beforeEach(module('sheetApp'));

  var ConsumableCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConsumableCtrl = $controller('ConsumableCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

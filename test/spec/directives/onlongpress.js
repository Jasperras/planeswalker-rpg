'use strict';

describe('Directive: onLongPress', function () {

  // load the directive's module
  beforeEach(module('sheetApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<on-long-press></on-long-press>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the onLongPress directive');
  }));
});

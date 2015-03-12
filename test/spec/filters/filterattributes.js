'use strict';

describe('Filter: filterAttributes', function () {

  // load the filter's module
  beforeEach(module('sheetApp'));

  // initialize a new instance of the filter before each test
  var filterAttributes;
  beforeEach(inject(function ($filter) {
    filterAttributes = $filter('filterAttributes');
  }));

  it('should return the input prefixed with "filterAttributes filter:"', function () {
    var text = 'angularjs';
    expect(filterAttributes(text)).toBe('filterAttributes filter: ' + text);
  });

});

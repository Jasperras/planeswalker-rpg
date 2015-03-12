'use strict';

describe('Filter: filterByAttribute', function () {

  // load the filter's module
  beforeEach(module('sheetApp'));

  // initialize a new instance of the filter before each test
  var filterByAttribute;
  beforeEach(inject(function ($filter) {
    filterByAttribute = $filter('filterByAttribute');
  }));

  it('should return the input prefixed with "filterByAttribute filter:"', function () {
    var text = 'angularjs';
    expect(filterByAttribute(text)).toBe('filterByAttribute filter: ' + text);
  });

});

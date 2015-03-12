'use strict';

describe('Filter: filterByColor', function () {

  // load the filter's module
  beforeEach(module('sheetApp'));

  // initialize a new instance of the filter before each test
  var filterByColor;
  beforeEach(inject(function ($filter) {
    filterByColor = $filter('filterByColor');
  }));

  it('should return the input prefixed with "filterByColor filter:"', function () {
    var text = 'angularjs';
    expect(filterByColor(text)).toBe('filterByColor filter: ' + text);
  });

});

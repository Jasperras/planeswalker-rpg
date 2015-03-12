'use strict';

describe('Filter: filterCharSkillByAttribute', function () {

  // load the filter's module
  beforeEach(module('sheetApp'));

  // initialize a new instance of the filter before each test
  var filterCharSkillByAttribute;
  beforeEach(inject(function ($filter) {
    filterCharSkillByAttribute = $filter('filterCharSkillByAttribute');
  }));

  it('should return the input prefixed with "filterCharSkillByAttribute filter:"', function () {
    var text = 'angularjs';
    expect(filterCharSkillByAttribute(text)).toBe('filterCharSkillByAttribute filter: ' + text);
  });

});

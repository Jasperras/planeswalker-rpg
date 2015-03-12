'use strict';

describe('Service: CharacterService', function () {

  // load the service's module
  beforeEach(module('sheetApp'));

  // instantiate service
  var CharacterService;
  beforeEach(inject(function (_CharacterService_) {
    CharacterService = _CharacterService_;
  }));

  it('should do something', function () {
    expect(!!CharacterService).toBe(true);
  });

});

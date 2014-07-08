'use strict';

describe('region', function() {

  beforeEach(function() {
    ibeacon.identifier = 'my-app-identifier';
  });

  it('should create a new region', function() {

    new ibeacon.Region({
      identifier: 'my-identifier',
      uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
    });

  });

  it('should create a new region with app identifier', function() {

    var region = new ibeacon.Region({
      uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
    });

    expect(region.identifier).toBe('my-app-identifier');

  });

  it('should create a new region with major', function() {

    new ibeacon.Region({
      uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
      major: 12345,
    });

  });

  it('should create a new region with major and with minor', function() {

    new ibeacon.Region({
      uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
      major: 12345,
      minor: 67890,
    });

  });

  it('should throw an error because of missing uuid', function() {

    var createRegion = function() {
      new ibeacon.Region({});
    };

    expect(createRegion).toThrow(new Error('Parameter "uuid" has to be a valid universally unique identifier.'));

  });

  it('should throw an error because of wrong uuid', function() {

    var createRegion = function() {
      new ibeacon.Region({
        uuid: 'C53AD5170815410BB12468FFDFBFE0B3',
      });
    };

    expect(createRegion).toThrow(new Error('Parameter "uuid" has to be a valid universally unique identifier.'));

  });

  it('should calculate a hash for full region', function() {

    var region = new ibeacon.Region({
      identifier: 'my-identifier',
      uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
      major: 12345,
      minor: 67890,
    });

    expect(region.hash()).toBe('1351029138');

  });

  it('should calculate a hash for minimum region', function() {

    var region = new ibeacon.Region({
      uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
    });

    expect(region.hash()).toBe('453592305');

  });

});

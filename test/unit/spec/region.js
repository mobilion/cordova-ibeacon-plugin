'use strict';

describe('region', function() {

  it('should create a new region without major and without minor', function() {

    new ibeacon.Region({
      identifier: 'my-identifier',
      uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
    });

  });

  it('should create a new region with default identifier', function() {

    var region = new ibeacon.Region({
      uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
    });

    expect(region.identifier).toBe('default-identifier');

  });

  it('should create a new region with major and without minor', function() {

    new ibeacon.Region({
      identifier: 'my-identifier',
      uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
      major: 12345,
    });

  });

  it('should create a new region with major and with minor', function() {

    new ibeacon.Region({
      identifier: 'my-identifier',
      uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
      major: 12345,
      minor: 67890,
    });

  });

  it('should throw an error because of missing uuid', function() {

    var createRegion = function() {
      new ibeacon.Region({
        identifier: 'my-identifier',
      });
    };

    expect(createRegion).toThrow(new Error('Parameter "uuid" has to be a valid universally unique identifier.'));

  });

});

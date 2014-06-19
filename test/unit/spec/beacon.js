'use strict';

describe('beacon', function() {

  it('should create a new beacon', function() {

    new ibeacon.Beacon({
      identifier: 'my-identifier',
      uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
      major: 12345,
      minor: 67890,
      power: -60,
    });

  });

  it('should throw an error because of missing major', function() {

    var createRegion = function() {
      new ibeacon.Beacon({
        uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
        minor: 67890,
      });
    };

    expect(createRegion).toThrow(new Error('Parameter "major" has to be an integer value.'));

  });

  it('should throw an error because of wrong major', function() {

    var createRegion = function() {
      new ibeacon.Beacon({
        uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
        major: 'wrong',
        minor: 67890,
      });
    };

    expect(createRegion).toThrow(new Error('Parameter "major" has to be an integer value.'));

  });

  it('should throw an error because of missing minor', function() {

    var createRegion = function() {
      new ibeacon.Beacon({
        uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
        major: 67890,
      });
    };

    expect(createRegion).toThrow(new Error('Parameter "minor" has to be an integer value.'));

  });

  it('should throw an error because of wrong minor', function() {

    var createRegion = function() {
      new ibeacon.Beacon({
        uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
        major: 67890,
        minor: 'wrong',
      });
    };

    expect(createRegion).toThrow(new Error('Parameter "minor" has to be an integer value.'));

  });

  it('should throw an error because of wrong power', function() {

    var createRegion = function() {
      new ibeacon.Beacon({
        uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
        major: 67890,
        minor: 12345,
        power: 'wrong'
      });
    };

    expect(createRegion).toThrow(new Error('Parameter "power" has to be an integer value.'));

  });

  it('should create a new beacon with immediate proximity', function() {

    new ibeacon.Beacon({
      uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
      major: 67890,
      minor: 12345,
      proximity: 'immediate'
    });

  });

  it('should create a new beacon with near proximity', function() {

    new ibeacon.Beacon({
      uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
      major: 67890,
      minor: 12345,
      proximity: 'near'
    });

  });

  it('should create a new beacon with far proximity', function() {

    new ibeacon.Beacon({
      uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
      major: 67890,
      minor: 12345,
      proximity: 'far'
    });

  });

  it('should create a new beacon with unknown proximity', function() {

    new ibeacon.Beacon({
      uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
      major: 67890,
      minor: 12345,
      proximity: 'unknown'
    });

  });

  it('should throw an error because of wrong proximity', function() {

    var createRegion = function() {
      new ibeacon.Beacon({
        uuid: 'C53AD517-0815-410B-B124-68FFDFBFE0B3',
        major: 67890,
        minor: 12345,
        proximity: 'wrong'
      });
    };

    expect(createRegion).toThrow(new Error('Parameter "proximity" has to be a valid string.'));

  });

});

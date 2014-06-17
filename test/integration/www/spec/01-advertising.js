'use strict';

describe('advertising', function() {

  var testUuid = uuid.v4();

  var beaconA = new ibeacon.Beacon({
    uuid: testUuid,
    major: 11111,
    minor: 22222,
  });

  var beaconB = new ibeacon.Beacon({
    uuid: testUuid,
    major: 11111,
    minor: 22223,
  });

  it('should advertise one beacon', function(done) {

    var options = {
      beacon: beaconA,
    };

    ibeacon.startAdvertising(options);

    scan(beaconA.uuid, beaconA.major, beaconA.minor, function(beaconWasFound) {
      
      expect(beaconWasFound).toBe(true);
      done();

    });

  });

});

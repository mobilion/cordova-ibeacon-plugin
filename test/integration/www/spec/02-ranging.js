'use strict';

describe('ranging', function() {

  var testUuid = uuid.v4();

  var region = new ibeacon.Region({
    identifier: 'monitoring-test',
    uuid: testUuid,
  });

  var regionWithMajor = new ibeacon.Region({
    identifier: 'monitoring-test',
    uuid: testUuid,
    major: 11111,
  });

  var regionWithMajorAndMinor = new ibeacon.Region({
    identifier: 'monitoring-test',
    uuid: testUuid,
    major: 11111,
    minor: 22222,
  });

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

  var beaconC = new ibeacon.Beacon({
    uuid: testUuid,
    major: 11112,
    minor: 22223,
  });

  var tolerance;

  beforeEach(function() {

    tolerance = 1;

  });

  afterEach(clean);

  it('should range one beacon', function(done) {

    advertise(beaconA.uuid, beaconA.major, beaconA.minor);

    var didRangeBeacons = function(result) {

      if (tolerance-- > 0 && result.beacons.length !== 1) return;

      expect(result.beacons.length).toBe(1);
      expect(beaconA.equals(result.beacons[0])).toBe(true);
      expect(regionWithMajorAndMinor.equals(result.region)).toBe(true);

      ibeacon.stopRangingBeaconsInRegion({
        region: regionWithMajorAndMinor
      });

      done();

    };

    var options = {
      region: regionWithMajorAndMinor,
      didRangeBeacons: didRangeBeacons,
    };

    ibeacon.startRangingBeaconsInRegion(options);

  });

  xit('should range two beacons', function(done) {

    advertise(beaconA.uuid, beaconA.major, beaconA.minor);
    advertise(beaconB.uuid, beaconB.major, beaconB.minor);

    var didRangeBeacons = function(result) {

      if (tolerance-- > 0 && result.beacons.length !== 2) return;

      expect(result.beacons.length).toBe(2);
      expect(regionWithMajor.equals(result.region)).toBe(true);

      ibeacon.stopRangingBeaconsInRegion({
        region: regionWithMajor
      });

      done();

    };

    var options = {
      region: regionWithMajor,
      didRangeBeacons: didRangeBeacons,
    };

    ibeacon.startRangingBeaconsInRegion(options);

  });

  xit('should range three beacons', function(done) {

    advertise(beaconA.uuid, beaconA.major, beaconA.minor);
    advertise(beaconB.uuid, beaconB.major, beaconB.minor);
    advertise(beaconC.uuid, beaconC.major, beaconC.minor);

    var didRangeBeacons = function(result) {

      if (tolerance-- > 0 && result.beacons.length !== 3) return;

      expect(result.beacons.length).toBe(3);
      expect(region.equals(result.region)).toBe(true);

      ibeacon.stopRangingBeaconsInRegion({
        region: region
      });

      done();

    };

    var options = {
      region: regionWithMajor,
      didRangeBeacons: didRangeBeacons,
    };

    ibeacon.startRangingBeaconsInRegion(options);

  });

});

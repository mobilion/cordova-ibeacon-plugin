'use strict';

describe('ranging', function() {

  var region = new ibeacon.Region({
    identifier: 'monitoring-test',
    uuid: uuid.v4(),
  });

  afterEach(clean);

  it('should range on beacon', function(done) {

    var major = 12345;
    var minor = 67890;

    advertise(region.uuid, major, minor);

    ibeacon.startRangingBeaconsInRegion(region, function(result) {

      expect(result.beacons.length).toBe(1);
      expect(result.beacons[0].uuid).toBe(region.uuid);
      expect(result.beacons[0].major).toBe(major);
      expect(result.beacons[0].minor).toBe(minor);
      expect(region.equals(new ibeacon.Region(result.region))).toBe(true);
      
      ibeacon.stopRangingBeaconsInRegion(region);
      done();

    });

  });

});

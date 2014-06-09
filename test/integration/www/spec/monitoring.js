'use strict';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000;

describe('monitoring', function() {

  var region = new ibeacon.Region({
    identifier: 'monitoring-test',
    uuid: uuid.v4(),
  });

  it('should be inside', function(done) {

    advertise(4000, region.uuid);

    ibeacon.startMonitoringForRegion(region, function(result) {

      expect(result.state).toBe('inside');
      expect(region.equals(new ibeacon.Region(result.region))).toBe(true);

      clean();
      ibeacon.stopMonitoringForRegion(region);
      done();

    });

  });

  it('should be outside', function(done) {

    ibeacon.startMonitoringForRegion(region, function(result) {

      expect(result.state).toBe('outside');
      expect(region.equals(new ibeacon.Region(result.region))).toBe(true);

      clean();
      ibeacon.stopMonitoringForRegion(region);
      done();

    });

  });

  it('should switch from inside to outside', function(done) {

    var callbackCounter = 0;

    advertise(4000, region.uuid);

    ibeacon.startMonitoringForRegion(region, function(result) {

      if (callbackCounter === 0) {

        expect(result.state).toBe('inside');
        expect(region.equals(new ibeacon.Region(result.region))).toBe(true);

        callbackCounter++;

      } else {

        expect(result.state).toBe('outside');
        expect(region.equals(new ibeacon.Region(result.region))).toBe(true);

        ibeacon.stopMonitoringForRegion(region);
        done();

      }

    });

  });

  it('should kill server after all tests', function() {
    killServer();
  });

});

'use strict';

describe('monitoring', function() {

  var region = new ibeacon.Region({
    identifier: 'monitoring-test',
    uuid: uuid.v4(),
  });

  var tolerance;

  beforeEach(function() {
    tolerance = 1;
  });

  afterEach(clean);

  it('should be inside', function(done) {

    advertise(region.uuid);

    ibeacon.startMonitoringForRegion(region, function(result) {

      if (tolerance-- > 0 && result.state !== 'inside') return;

      expect(result.state).toBe('inside');
      expect(region.equals(new ibeacon.Region(result.region))).toBe(true);

      ibeacon.stopMonitoringForRegion(region);

      done();

    });

  });

  it('should be outside', function(done) {

    ibeacon.startMonitoringForRegion(region, function(result) {

      if (tolerance-- > 0 && result.state !== 'outside') return;

      expect(result.state).toBe('outside');
      expect(region.equals(new ibeacon.Region(result.region))).toBe(true);

      ibeacon.stopMonitoringForRegion(region);
      done();

    });

  });

  it('should switch from inside to outside', function(done) {

    var callbackCounter = 0;

    advertise(region.uuid);

    ibeacon.startMonitoringForRegion(region, function(result) {

      if (callbackCounter === 0) {

        if (tolerance-- > 0 && result.state !== 'inside') return;

        expect(result.state).toBe('inside');
        expect(region.equals(new ibeacon.Region(result.region))).toBe(true);

        clean();

        callbackCounter++;

      } else {

        expect(result.state).toBe('outside');
        expect(region.equals(new ibeacon.Region(result.region))).toBe(true);

        ibeacon.stopMonitoringForRegion(region);
        done();

      }

    });

  });

  it('should switch from outside to inside', function(done) {

    var callbackCounter = 0;

    ibeacon.startMonitoringForRegion(region, function(result) {

      if (callbackCounter === 0) {

        if (tolerance-- > 0 && result.state !== 'outside') return;

        expect(result.state).toBe('outside');
        expect(region.equals(new ibeacon.Region(result.region))).toBe(true);

        advertise(region.uuid);

        callbackCounter++;

      } else {

        expect(result.state).toBe('inside');
        expect(region.equals(new ibeacon.Region(result.region))).toBe(true);

        ibeacon.stopMonitoringForRegion(region);
        done();

      }

    });

  });

});

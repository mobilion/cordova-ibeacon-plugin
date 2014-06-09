'use strict';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

var IBEACON_TIMEOUT_INTERVAL = 1200;

describe('monitoring', function() {

  var region = new ibeacon.Region({
    identifier: 'monitoring-test',
    uuid: uuid.v4(),
  });

  afterEach(clean);

  it('should be inside', function(done) {

    advertise(region.uuid);

    setTimeout(function() {

      ibeacon.startMonitoringForRegion(region, function(result) {

        expect(result.state).toBe('inside');
        expect(region.equals(new ibeacon.Region(result.region))).toBe(true);

        ibeacon.stopMonitoringForRegion(region);

        setTimeout(function() {
          done();
        }, IBEACON_TIMEOUT_INTERVAL);

      });

    }, IBEACON_TIMEOUT_INTERVAL);

  });

  it('should be outside', function(done) {

    ibeacon.startMonitoringForRegion(region, function(result) {

      expect(result.state).toBe('outside');
      expect(region.equals(new ibeacon.Region(result.region))).toBe(true);

      ibeacon.stopMonitoringForRegion(region);
      done();

    });

  });

  it('should switch from inside to outside', function(done) {

    var callbackCounter = 0;

    advertise(region.uuid);

    setTimeout(function() {

      ibeacon.startMonitoringForRegion(region, function(result) {

        if (callbackCounter === 0) {

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

    }, IBEACON_TIMEOUT_INTERVAL);

  });

  it('should switch from outside to inside', function(done) {

    var callbackCounter = 0;

    ibeacon.startMonitoringForRegion(region, function(result) {

      if (callbackCounter === 0) {

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


  it('should kill server after all tests', function() {
    killServer();
  });

});

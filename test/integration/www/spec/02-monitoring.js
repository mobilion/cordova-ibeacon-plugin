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

  afterEach(function() {

    ibeacon.stopMonitoringForRegion({
      region: region

    });

    clean();

  });

  it('should callback didDetermineState with inside', function(done) {

    advertise(region.uuid);

    var didDetermineState = function(result) {

      if (tolerance-- > 0 && result.state !== 'inside') return;

      expect(result.state).toBe('inside');
      expect(region.equals(result.region)).toBe(true);

      done();

    };

    var options = {
      region: region,
      didDetermineState: didDetermineState,
    };

    ibeacon.startMonitoringForRegion(options);

  });

  it('should callback didEnter', function(done) {

    advertise(region.uuid);

    var didEnter = function(result) {

      expect(region.equals(result.region)).toBe(true);

      done();

    };

    var options = {
      region: region,
      didEnter: didEnter,
    };

    ibeacon.startMonitoringForRegion(options);

  });

  it('should callback didDetermineState with outside', function(done) {

    var didDetermineState = function(result) {

      if (tolerance-- > 0 && result.state !== 'outside') return;

      expect(result.state).toBe('outside');
      expect(region.equals(result.region)).toBe(true);

      done();

    };

    var options = {
      region: region,
      didDetermineState: didDetermineState,
    };

    ibeacon.startMonitoringForRegion(options);

  });

  it('should callback didExit', function(done) {

    var didExit = function(result) {

      expect(region.equals(result.region)).toBe(true);

      done();

    };

    var options = {
      region: region,
      didExit: didExit,
    };

    ibeacon.startMonitoringForRegion(options);

  });

  it('should switch from inside to outside', function(done) {

    var callbackCounter = 0;

    advertise(region.uuid);

    var didDetermineState = function(result) {

      if (callbackCounter === 0) {

        if (tolerance-- > 0 && result.state !== 'inside') return;

        expect(result.state).toBe('inside');
        expect(region.equals(result.region)).toBe(true);

        clean();

        callbackCounter++;

      } else {

        expect(result.state).toBe('outside');
        expect(region.equals(result.region)).toBe(true);

        done();

      }

    };

    var options = {
      region: region,
      didDetermineState: didDetermineState,
    };

    ibeacon.startMonitoringForRegion(options);

  });

  it('should switch from outside to inside', function(done) {

    var callbackCounter = 0;

    var didDetermineState = function(result) {

      if (callbackCounter === 0) {

        if (tolerance-- > 0 && result.state !== 'outside') return;

        expect(result.state).toBe('outside');
        expect(region.equals(result.region)).toBe(true);

        advertise(region.uuid);

        callbackCounter++;

      } else {

        expect(result.state).toBe('inside');
        expect(region.equals(result.region)).toBe(true);

        done();

      }

    };

    var options = {
      region: region,
      didDetermineState: didDetermineState,
    };

    ibeacon.startMonitoringForRegion(options);

  });

});

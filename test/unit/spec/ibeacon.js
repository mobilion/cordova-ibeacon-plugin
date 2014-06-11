'use strict';

describe('ibeacon', function() {

  afterEach(function() {
    execCache.forEach(function(args) {
      expect(args.className).toBe('IBeaconPlugin');
    });
    execCache.length = 0;
  });

  var regionA = new ibeacon.Region({
    uuid: '96CF4DC3-4F67-4AEE-9CA9-E1069DF00C51',
    identifier: 'test-region-a'
  });
  var regionB = new ibeacon.Region({
    uuid: '0E5F5C63-DC29-46A4-93F9-1170759F8956',
    identifier: 'test-region-b'
  });
  var regions = [regionA, regionB];

  describe('advertising', function() {

    it('should start advertising without measured power', function() {

      var onDidStartAdvertising = function() {};

      ibeacon.startAdvertising(regionA, onDidStartAdvertising);

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('startAdvertising');
      expect(execCache[0].onSuccess).toBe(onDidStartAdvertising);

    });

    it('should start advertising with measured power', function() {

      var onDidStartAdvertising = function() {};
      var measuredPower = 3;

      ibeacon.startAdvertising(regionA, onDidStartAdvertising, measuredPower);

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('startAdvertising');
      expect(execCache[0].onSuccess).toBe(onDidStartAdvertising);
      expect(execCache[0].commandArguments[0]).toBe(regionA);
      expect(execCache[0].commandArguments[1]).toBe(measuredPower);

    });

    it('should stop advertising', function() {

      var onSuccess = function() {};

      ibeacon.stopAdvertising(onSuccess);

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('stopAdvertising');
      expect(execCache[0].onSuccess).toBe(onSuccess);

    });

    it('should call isAdvertising', function() {

      var onSuccess = function() {};

      ibeacon.isAdvertising(onSuccess);

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('isAdvertising');
      expect(execCache[0].onSuccess).toBe(onSuccess);

    });

  });

  describe('ranging', function() {

    it('should start ranging beacons for single region', function() {

      var didRangeBeaconsCallback = function() {};

      ibeacon.startRangingBeaconsInRegion(regionA, didRangeBeaconsCallback);

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('startRangingBeaconsInRegion');
      expect(execCache[0].onSuccess).toBe(didRangeBeaconsCallback);
      expect(execCache[0].commandArguments[0]).toBe(regionA);

    });

    it('should start ranging beacons for multiple regions', function() {

      var didRangeBeaconsCallback = function() {};

      ibeacon.startRangingBeaconsInRegion(regions, didRangeBeaconsCallback);

      expect(execCache.length).toBe(2);
      expect(execCache[0].actionName).toBe('startRangingBeaconsInRegion');
      expect(execCache[0].onSuccess).toBe(didRangeBeaconsCallback);
      expect(execCache[0].commandArguments[0]).toBe(regionA);
      expect(execCache[1].actionName).toBe('startRangingBeaconsInRegion');
      expect(execCache[1].onSuccess).toBe(didRangeBeaconsCallback);
      expect(execCache[1].commandArguments[0]).toBe(regionB);

    });

    it('should stop ranging beacons for single region', function() {

      ibeacon.stopRangingBeaconsInRegion(regionA);

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('stopRangingBeaconsInRegion');
      expect(execCache[0].commandArguments[0]).toBe(regionA);

    });

    it('should stop ranging beacons for single region', function() {

      ibeacon.stopRangingBeaconsInRegion(regions);

      expect(execCache.length).toBe(2);
      expect(execCache[0].actionName).toBe('stopRangingBeaconsInRegion');
      expect(execCache[0].commandArguments[0]).toBe(regionA);
      expect(execCache[1].actionName).toBe('stopRangingBeaconsInRegion');
      expect(execCache[1].commandArguments[0]).toBe(regionB);

    });

  });

  describe('monitoring', function() {

    it('should start monitoring beacons for single region', function() {

      var didDetermineStateCallback = function() {};

      ibeacon.startMonitoringForRegion(regionA, didDetermineStateCallback);

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('startMonitoringForRegion');
      expect(execCache[0].onSuccess).toBe(didDetermineStateCallback);
      expect(execCache[0].commandArguments[0]).toBe(regionA);

    });

    it('should start monitoring beacons for multiple regions', function() {

      var didDetermineStateCallback = function() {};

      ibeacon.startMonitoringForRegion(regions, didDetermineStateCallback);

      expect(execCache.length).toBe(2);
      expect(execCache[0].actionName).toBe('startMonitoringForRegion');
      expect(execCache[0].onSuccess).toBe(didDetermineStateCallback);
      expect(execCache[0].commandArguments[0]).toBe(regionA);
      expect(execCache[1].actionName).toBe('startMonitoringForRegion');
      expect(execCache[1].onSuccess).toBe(didDetermineStateCallback);
      expect(execCache[1].commandArguments[0]).toBe(regionB);

    });

    it('should stop monitoring beacons for single region', function() {

      ibeacon.stopMonitoringForRegion(regionA);

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('stopMonitoringForRegion');
      expect(execCache[0].commandArguments[0]).toBe(regionA);

    });

    it('should stop monitoring beacons for single region', function() {

      ibeacon.stopMonitoringForRegion(regions);

      expect(execCache.length).toBe(2);
      expect(execCache[0].actionName).toBe('stopMonitoringForRegion');
      expect(execCache[0].commandArguments[0]).toBe(regionA);
      expect(execCache[1].actionName).toBe('stopMonitoringForRegion');
      expect(execCache[1].commandArguments[0]).toBe(regionB);

    });

  });

});

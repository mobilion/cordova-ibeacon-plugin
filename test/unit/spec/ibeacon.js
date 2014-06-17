'use strict';

describe('ibeacon', function() {

  afterEach(function() {

    execCache.forEach(function(args) {
      expect(args.className).toBe('IBeaconPlugin');
    });

    // hack to empty array without losing references
    execCache.length = 0;

  });

  var regionA = new ibeacon.Region({
    uuid: '96CF4DC3-4F67-4AEE-9CA9-E1069DF00C51',
  });

  var regionB = new ibeacon.Region({
    uuid: '0E5F5C63-DC29-46A4-93F9-1170759F8956',
  });

  var regions = [regionA, regionB];

  var beaconA = new ibeacon.Beacon({
    uuid: '96CF4DC3-4F67-4AEE-9CA9-E1069DF00C51',
    major: 12345,
    minor: 67890,
  });

  var beaconB = new ibeacon.Beacon({
    uuid: '0E5F5C63-DC29-46A4-93F9-1170759F8956',
    major: 12345,
    minor: 67890,
  });

  var beacons = [beaconA, beaconB];

  describe('advertising', function() {

    it('should run startAdvertising for single beacon', function() {

      ibeacon.startAdvertising({
        beacon: beaconA,
      });

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('startAdvertising');

    });

    it('should run startAdvertising for multiple beacons', function() {

      ibeacon.startAdvertising({
        beacon: beacons,
      });

      expect(execCache.length).toBe(2);

    });

    it('should run stopAdvertising for single beacon', function() {

      ibeacon.stopAdvertising({
        beacon: beaconA,
      });

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('stopAdvertising');

    });

    it('should run stopAdvertising for multiple beacons', function() {

      ibeacon.stopAdvertising({
        beacon: beacons,
      });

      expect(execCache.length).toBe(2);

    });

    it('should run isAdvertising for single beacon', function() {

      ibeacon.isAdvertising({
        beacon: beaconA,
        isAdvertising: function() {},
      });

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('isAdvertising');

    });

    it('should run isAdvertising for multiple beacons', function() {

      ibeacon.isAdvertising({
        beacon: beacons,
        isAdvertising: function() {},
      });

      expect(execCache.length).toBe(2);

    });

  });

  xdescribe('ranging', function() {

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

  xdescribe('monitoring', function() {

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

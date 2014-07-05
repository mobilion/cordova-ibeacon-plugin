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

    it('should run stopAdvertising', function() {

      ibeacon.stopAdvertising();

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('stopAdvertising');

    });

    it('should run isAdvertising', function() {

      ibeacon.isAdvertising({
        isAdvertising: function() {},
      });

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('isAdvertising');

    });

  });

  describe('monitoring', function() {

    it('should run startMonitoringForRegion for single region', function() {

      ibeacon.startMonitoringForRegion({
        region: regionA,
        didDetermineState: function() {},
      });

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('startMonitoringForRegion');

    });

    it('should run startMonitoringForRegion for multiple regions', function() {

      ibeacon.startMonitoringForRegion({
        region: regions,
        didDetermineState: function() {},
      });

      expect(execCache.length).toBe(2);

    });

    it('should run stopMonitoringForRegion for single region', function() {

      ibeacon.stopMonitoringForRegion({
        region: regionA,
      });

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('stopMonitoringForRegion');

    });

    it('should run stopMonitoringForRegion for multiple regions', function() {

      ibeacon.stopMonitoringForRegion({
        region: regions,
      });

      expect(execCache.length).toBe(2);

    });

  });

  describe('ranging', function() {

    it('should run startRangingBeaconsInRegion for single region', function() {

      ibeacon.startRangingBeaconsInRegion({
        region: regionA,
        didRangeBeacons: function() {},
      });

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('startRangingBeaconsInRegion');

    });

    it('should run startRangingBeaconsInRegion for multiple regions', function() {

      ibeacon.startRangingBeaconsInRegion({
        region: regions,
        didRangeBeacons: function() {},
      });

      expect(execCache.length).toBe(2);

    });

    it('should run stopRangingBeaconsInRegion for single region', function() {

      ibeacon.stopRangingBeaconsInRegion({
        region: regionA,
      });

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('stopRangingBeaconsInRegion');

    });

    it('should run stopRangingBeaconsInRegion for multiple regions', function() {

      ibeacon.stopRangingBeaconsInRegion({
        region: regions,
      });

      expect(execCache.length).toBe(2);

    });

  });

});

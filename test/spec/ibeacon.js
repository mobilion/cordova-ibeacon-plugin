describe('ibeacon', function() {

  afterEach(function() {
    execCache.forEach(function(args) {
      expect(args.className).toBe('IBeacon');
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

  describe('ranging', function() {

    it('should start ranging beacons for single region', function() {

      var didRangeBeaconsCallback = function() {};

      ibeacon.startRangingBeaconsInRegion(regions[0], didRangeBeaconsCallback);

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('startRangingBeaconsInRegion');
      expect(execCache[0].onSuccess).toBe(didRangeBeaconsCallback);
      expect(execCache[0].commandArguments[0]).toBe(regions[0]);

    });

    it('should start ranging beacons for multiple regions', function() {

      var didRangeBeaconsCallback = function() {};

      ibeacon.startRangingBeaconsInRegion(regions, didRangeBeaconsCallback);

      expect(execCache.length).toBe(2);
      expect(execCache[0].actionName).toBe('startRangingBeaconsInRegion');
      expect(execCache[0].onSuccess).toBe(didRangeBeaconsCallback);
      expect(execCache[0].commandArguments[0]).toBe(regions[0]);
      expect(execCache[1].actionName).toBe('startRangingBeaconsInRegion');
      expect(execCache[1].onSuccess).toBe(didRangeBeaconsCallback);
      expect(execCache[1].commandArguments[0]).toBe(regions[1]);

    });

    it('should stop ranging beacons for single region', function() {

      ibeacon.stopRangingBeaconsInRegion(regions[0]);

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('stopRangingBeaconsInRegion');
      expect(execCache[0].commandArguments[0]).toBe(regions[0]);

    });

    it('should stop ranging beacons for single region', function() {

      ibeacon.stopRangingBeaconsInRegion(regions);

      expect(execCache.length).toBe(2);
      expect(execCache[0].actionName).toBe('stopRangingBeaconsInRegion');
      expect(execCache[0].commandArguments[0]).toBe(regions[0]);
      expect(execCache[1].actionName).toBe('stopRangingBeaconsInRegion');
      expect(execCache[1].commandArguments[0]).toBe(regions[1]);

    });

  });

  describe('monitoring', function() {

    it('should start monitoring beacons for single region', function() {

      var didRangeBeaconsCallback = function() {};

      ibeacon.startMonitoringForRegion(regions[0], didRangeBeaconsCallback);

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('startMonitoringForRegion');
      expect(execCache[0].onSuccess).toBe(didRangeBeaconsCallback);
      expect(execCache[0].commandArguments[0]).toBe(regions[0]);

    });

    it('should start monitoring beacons for multiple regions', function() {

      var didRangeBeaconsCallback = function() {};

      ibeacon.startMonitoringForRegion(regions, didRangeBeaconsCallback);

      expect(execCache.length).toBe(2);
      expect(execCache[0].actionName).toBe('startMonitoringForRegion');
      expect(execCache[0].onSuccess).toBe(didRangeBeaconsCallback);
      expect(execCache[0].commandArguments[0]).toBe(regions[0]);
      expect(execCache[1].actionName).toBe('startMonitoringForRegion');
      expect(execCache[1].onSuccess).toBe(didRangeBeaconsCallback);
      expect(execCache[1].commandArguments[0]).toBe(regions[1]);

    });

    it('should stop monitoring beacons for single region', function() {

      ibeacon.stopMonitoringForRegion(regions[0]);

      expect(execCache.length).toBe(1);
      expect(execCache[0].actionName).toBe('stopMonitoringForRegion');
      expect(execCache[0].commandArguments[0]).toBe(regions[0]);

    });

    it('should stop monitoring beacons for single region', function() {

      ibeacon.stopMonitoringForRegion(regions);

      expect(execCache.length).toBe(2);
      expect(execCache[0].actionName).toBe('stopMonitoringForRegion');
      expect(execCache[0].commandArguments[0]).toBe(regions[0]);
      expect(execCache[1].actionName).toBe('stopMonitoringForRegion');
      expect(execCache[1].commandArguments[0]).toBe(regions[1]);

    });

  });

});
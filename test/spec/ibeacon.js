describe('ibeacon', function() {

  describe('ranging', function() {

    it('should start ranging beacons in single region', function() {

      var region = new ibeacon.Region({
        uuid: '96CF4DC3-4F67-4AEE-9CA9-E1069DF00C51',
        identifier: 'test-region'
      });
      var didRangeBeaconsCallback = function() {};

      ibeacon.startRangingBeaconsInRegion(region, didRangeBeaconsCallback);

      expect(execCache.length).toBe(1);
      expect(execCache[0].className).toBe('IBeacon');
      expect(execCache[0].actionName).toBe('startRangingBeaconsInRegion');
      expect(execCache[0].onSuccess).toBe(didRangeBeaconsCallback);

    });

  });

});
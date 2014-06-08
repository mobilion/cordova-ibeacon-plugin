'use strict';

describe('monitoring', function() {

  it('should be inside', function(done) {

    var region = new ibeacon.Region({
      identifier: 'monitoring-test',
      uuid: 'CCEF41AC-03BA-4A89-B14F-CC81CB48B59E',
    });

    advertise(2000, region.uuid);

    ibeacon.startMonitoringForRegion(region, function(result) {
      expect(result.state).toBe('inside');
      expect(region.equals(new ibeacon.Region(result.region))).toBe(true);
      ibeacon.stopMonitoringForRegion(region);
      killServer();
      done();
    });

  });

});

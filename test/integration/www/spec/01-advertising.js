'use strict';

describe('advertising', function() {

  this.timeout(60000);

  afterEach(function(done) {
    _.delay(done, 1000);
  });

  var testUuid = uuid.v4();

  var beacon = new ibeacon.Beacon({
    uuid: testUuid,
    major: 11111,
    minor: 22222,
  });

  it('should advertise', function(done) {

    var options = {
      beacon: beacon,
    };

    ibeacon.startAdvertising(options);

    scan(beacon.uuid, beacon.major, beacon.minor, function(beaconWasFound) {

      expect(beaconWasFound).to.be(true);

      ibeacon.stopAdvertising(options);

      done();

    });

  });

  it('should call back isAdvertising with true when advertising', function(done) {

    var options = {
      beacon: beacon,
    };

    ibeacon.startAdvertising(options);

    scan(beacon.uuid, beacon.major, beacon.minor, function(beaconWasFound) {

      expect(beaconWasFound).to.be(true);

      ibeacon.isAdvertising({
        isAdvertising: function(result) {

          expect(result.isAdvertising).to.be(true);

          ibeacon.stopAdvertising(options);

          done();

        }
      });

    });

  });

  it('should call back isAdvertising with false when not advertising at all', function(done) {

    ibeacon.isAdvertising({
      isAdvertising: function(result) {

        expect(result.isAdvertising).to.be(false);

        done();

      }
    });

  });

  it('should call back isAdvertising with false when not advertising anymore', function(done) {

    var options = {
      beacon: beacon,
    };

    ibeacon.startAdvertising(options);

    scan(beacon.uuid, beacon.major, beacon.minor, function(beaconWasFound) {

      expect(beaconWasFound).to.be(true);

      ibeacon.isAdvertising({
        isAdvertising: function(result) {

          expect(result.isAdvertising).to.be(true);

          ibeacon.stopAdvertising(options);

          ibeacon.isAdvertising({
            isAdvertising: function(result) {

              expect(result.isAdvertising).to.be(false);

              done();

            }
          });

        }
      });

    });

  });

});

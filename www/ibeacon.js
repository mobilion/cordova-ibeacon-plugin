'use strict';

var exec = require('cordova/exec');
var Region = require('./region');
var Beacon = require('./beacon');

var callNative = function(actionName, region, onSuccess, onFailure, extraArgs) {

  var commandArguments = [];

  if (region) {
    region.validate();
    commandArguments.push(region);
  }

  if (extraArgs instanceof Array) {
    commandArguments = commandArguments.concat(extraArgs);
  }

  exec(onSuccess, onFailure, 'IBeaconPlugin', actionName, commandArguments);

};

var checkParam = function(object) {

  var properties = Array.prototype.slice.apply(arguments, [1]);
  var propertyFound = false;
  var missingProperties = [];

  properties.forEach(function(property) {

    if (object.hasOwnProperty(property)) {
      propertyFound = true;
    } else {
      missingProperties.push(property);
    }

  });

  if (!propertyFound) {
    throw new Error('Missing option. None of the following properties are specified: ' +
      missingProperties.join(', '));
  }

};

var ibeacon = {

  Region: Region,

  Beacon: Beacon,

  //  startAdvertising: function(region, onDidStartAdvertising, measuredPower) {
  //
  //    if (measuredPower) {
  //      return callNative('startAdvertising', region, onDidStartAdvertising, null, [measuredPower]);
  //    } else {
  //      return callNative('startAdvertising', region, onDidStartAdvertising);
  //    }
  //
  //  },
  //
  //  stopAdvertising: function(onSuccess) {
  //    callNative('stopAdvertising', null, onSuccess);
  //  },
  //
  //  isAdvertising: function(onSuccess) {
  //    callNative('isAdvertising', null, onSuccess);
  //  },

  /**
   * startMonitoringForRegion() let's you know whether you see any beacon
   *
   * ### Example
   *
   * ```js
   * var region = new ibeacon.Region({
   *   identifier: 'my-app',
   *   uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
   * });
   *
   * startMonitoringForRegion(region, {
   *   didDetermineState: function(result) {
   *     if (result.state === 'inside') console.log('I see you!')
   *     else console.log('Where are you?');
   *   };
   * });
   * ```
   *
   * @name startMonitoringForRegion
   * @param {Object} options
   * @param {Region} options.region Region where to start monitoring
   * @param {Function} options.didDetermineState Function gets called when state changes
   * @param {Function} options.didEnter Function gets called when at least one beacon was found
   * @param {Function} options.didDetermineState Function gets called when no beacon was found
   */
  startMonitoringForRegion: function(options) {

    checkParam(options, 'region');
    checkParam(options, 'didDetermineState', 'didEnter', 'didExit');

    var successCallback = function(result) {

      var region = new Region(result.region);

      if (options.hasOwnProperty('didDetermineState')) {
        options.didDetermineState({
          region: region,
          state: result.state
        });
      }

      if (options.hasOwnProperty('didEnter') && result.state === 'inside') {
        options.didEnter({
          region: region
        });
      }

      if (options.hasOwnProperty('didExit') && result.state === 'outside') {
        options.didExit({
          region: region
        });
      }

    };

    if (!(options.region instanceof Array)) {
      options.region = [options.region];
    }

    for (var i = 0; i < options.region.length; i++) {
      callNative('startMonitoringForRegion', options.region[i], successCallback);
    }

  },

  stopMonitoringForRegion: function(options) {

    checkParam(options, 'region');

    if (!(options.region instanceof Array)) {
      options.region = [options.region];
    }

    for (var i = 0; i < options.region.length; i++) {
      callNative('stopMonitoringForRegion', options.region[i]);
    }

  },

  startRangingBeaconsInRegion: function(options) {

    checkParam(options, 'region');
    checkParam(options, 'didRangeBeacons');

    var successCallback = function(result) {

      var beacons = result.beacons.map(function(beacon) {
        return new Beacon(beacon);
      });

      var region = new Region(result.region);

      options.didRangeBeacons({
        region: region,
        beacons: beacons,
      });

    };

    if (!(options.region instanceof Array)) {
      options.region = [options.region];
    }

    for (var i = 0; i < options.region.length; i++) {
      callNative('startRangingBeaconsInRegion', options.region[i], successCallback);
    }

  },

  stopRangingBeaconsInRegion: function(options) {

    checkParam(options, 'region');

    if (!(options.region instanceof Array)) {
      options.region = [options.region];
    }

    for (var i = 0; i < options.region.length; i++) {
      callNative('stopRangingBeaconsInRegion', options.region[i]);
    }

  },

};

module.exports = ibeacon;

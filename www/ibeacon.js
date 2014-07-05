'use strict';

var exec = require('cordova/exec');
var defaults = require('./defaults');
var Region = require('./region');
var Beacon = require('./beacon');

var callNative = function(actionName, regionOrBeacon, onSuccess, onFailure) {

  var commandArguments = [];

  if (regionOrBeacon) {
    regionOrBeacon.validate();
    commandArguments.push(regionOrBeacon);
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

  /**
   * `identifier` is the global default identifier for your application. It
   * should be set somewhere in configuration process. Each `Region` or
   * `Beacon` can also have an individual identifier.
   *
   * ### Example:
   *
   * ```js
   * ibeacon.identifier = 'my-unique-identifier';
   *
   * var region = new ibeacon.Region({
   *   uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
   * });
   *
   * console.log(region.identifier); // 'my-unique-identifier'
   * ```
   *
   * @name identifier
   */
  get identifier() {
    return defaults.identifier;
  },

  set identifier(identifier) {
    defaults.identifier = identifier;
  },

  /**
   * `startAdvertising()` lets the specified beacon start sending.
   *
   * ### Example:
   *
   * ```js
   * var beacon = new ibeacon.Beacon({
   *   uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2',
   *   major: 10000,
   *   minor: 10000
   * });
   *
   * ibeacon.startAdvertising({
   *   beacon: beacon
   * });
   * ```
   *
   * @name startAdvertising
   * @param {Object} options
   * @param {Beacon|Array} options.beacon Beacon(s) to advertise
   */
  startAdvertising: function(options) {

    checkParam(options, 'beacon');

    if (!(options.beacon instanceof Array)) {
      options.beacon = [options.beacon];
    }

    for (var i = 0; i < options.beacon.length; i++) {
      callNative('startAdvertising', options.beacon[i]);
    }

  },

  /**
   * `stopAdvertising()` stops the signal transmission of the current
   * advertised beacon.
   *
   * ### Example:
   *
   * ```js
   * ibeacon.stopAdvertising();
   * ```
   *
   * @name stopAdvertising
   */
  stopAdvertising: function() {

    callNative('stopAdvertising');

  },

  /**
   * `isAdvertising()` calls back with the result whether the device is
   * advertising or not.
   *
   * ### Example:
   *
   * ```js
   * ibeacon.isAdvertising({
   *   isAdvertising: function(result) {
   *     if (result.isAdvertising) console.log('I am advertising');
   *     else console.log('I am not advertising');
   *   };
   * });
   * ```
   *
   * @name isAdvertising
   * @param {Object} options
   * @param {Function} options.isAdvertising Function gets called with the
   * result whether the device is advertising or not.
   */
  isAdvertising: function(options) {

    checkParam(options, 'isAdvertising');

    callNative('isAdvertising', null, options.isAdvertising);

  },

  /**
   * `startMonitoringForRegion()` lets you know whether you see any beacon in a
   * given region.
   *
   * ### Example:
   *
   * ```js
   * var region = new ibeacon.Region({
   *   uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
   * });
   *
   * ibeacon.startMonitoringForRegion({
   *   region: region,
   *   didDetermineState: function(result) {
   *     if (result.state === 'inside') console.log('I see you!')
   *     else console.log('Where are you?');
   *   }
   * });
   * ```
   *
   * @name startMonitoringForRegion
   * @param {Object} options
   * @param {Region|Array} options.region Region(s) where to start monitoring
   * @param {Function} options.didDetermineState Function gets called when state changes (optional)
   * @param {Function} options.didEnter Function gets called when at least one beacon was found (optional)
   * @param {Function} options.didDetermineState Function gets called when no beacon was found (optional)
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

  /**
   * `stopMonitoringForRegion()` stops monitoring and callbacks of `startMonitoringForRegion`
   * for the given region.
   *
   * ### Example:
   *
   * ```js
   * var region = new ibeacon.Region({
   *   uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
   * });
   *
   * ibeacon.stopMonitoringForRegion({
   *   region: region
   * });
   * ```
   *
   * @name stopMonitoringForRegion
   * @param {Object} options
   * @param {Region|Array} options.region Region(s) where to stop monitoring
   */
  stopMonitoringForRegion: function(options) {

    checkParam(options, 'region');

    if (!(options.region instanceof Array)) {
      options.region = [options.region];
    }

    for (var i = 0; i < options.region.length; i++) {
      callNative('stopMonitoringForRegion', options.region[i]);
    }

  },

  /**
   * `startRangingBeaconsInRegion()` starts ranging for beacons in the given
   * region and calls back every second
   *
   * ### Example:
   *
   * ```js
   * var region = new ibeacon.Region({
   *   uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
   * });
   *
   * ibeacon.startRangingBeaconsInRegion({
   *   region: region,
   *   didRangeBeacons: function(result) {
   *     console.log('I see ' + result.beacons.length + ' beacons');
   *   }
   * });
   * ```
   *
   * @name startRangingBeaconsInRegion
   * @param {Object} options
   * @param {Region|Array} options.region Region(s) where to start ranging
   * @param {Function} options.didRangeBeacons Function gets called every second
   * with all found beacons
   */
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

  /**
   * `stopRangingBeaconsInRegion()` stops ranging and callbacks of `startRangingBeaconsInRegion`
   *
   * ### Example:
   *
   * ```js
   * var region = new ibeacon.Region({
   *   uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
   * });
   *
   * ibeacon.stopRangingBeaconsInRegion({
   *   region: region
   * });
   * ```
   *
   * @name stopRangingBeaconsInRegion
   * @param {Object} options
   * @param {Region|Array} options.region Region(s) where to stop ranging
   */
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

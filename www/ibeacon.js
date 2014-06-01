'use strict';

var exec = require('cordova/exec');
var Region = require('./region');

var validateRegion = function(region) {

  if (!region instanceof Region) {
    throw new TypeError('Parameter region has to be a Region object.');
  }

  region.validate();

}

var callNative = function(actionName, region, beaconCallback, errorCallback, extraArgs) {

  validateRegion(region);

  var validActions = ['startMonitoringForRegion', 'stopMonitoringForRegion', 'startRangingBeaconsInRegion', 'stopRangingBeaconsInRegion', 'startAdvertising'];

  if (validActions.indexOf(actionName) < 0) {
    throw new Error('Invalid operation: ' + actionName + ' Valid ones are: ' + validActions.join(','));
  }

  var onSuccess = function(result) {
    if (beaconCallback) {
      beaconCallback(result);
    } else {
      console.error('There is no callback to call with ', result);
    }
  };

  var onFailure = function(error) {
    if (errorCallback) {
      errorCallback(error);
    } else {
      console.error('There was en error in the beacon registration process: ' + JSON.stringify(error));
    }
  };

  var commandArguments = [region];
  if (extraArgs instanceof Array) {
    commandArguments = commandArguments.concat(extraArgs);
  }

  exec(onSuccess, onFailure, 'IBeacon', actionName, commandArguments);

};

var iBeacon = {

  Region: Region,

  startRangingBeaconsInRegion: function(regions, didRangeBeaconsCallback) {

    if (!regions instanceof Array) {
      regions = [regions];
    }

    for (var i = 0; i < regions.length; i++) {
      validateRegion(regions[i]);
      callNative('startRangingBeaconsInRegion', regions[i], didRangeBeaconsCallback);
    }

  },

  stopRangingBeaconsInRegion: function(regions) {

    if (!regions instanceof Array) {
      regions = [regions];
    }

    for (var i = 0; i < regions.length; i++) {
      validateRegion(regions[i]);
      callNative('stopRangingBeaconsInRegion', regions[i]);
    }

  },

  startMonitoringForRegion: function(regions, didDetermineStateCallback) {

    if (!regions instanceof Array) {
      regions = [regions];
    }

    for (var i = 0; i < regions.length; i++) {
      validateRegion(regions[i]);
      callNative('startMonitoringForRegion', regions[i], didDetermineStateCallback);
    }

  },

  stopMonitoringForRegion: function(regions) {

    if (!regions instanceof Array) {
      regions = [regions];
    }

    for (var i = 0; i < regions.length; i++) {
      validateRegion(regions[i]);
      callNative('stopMonitoringForRegion', regions[i]);
    }

  },

  isAdvertising: function(onSuccess) {

    if (typeof(onSuccess) !== 'function') {
      throw new TypeError('The onSuccess parameter has to be a callback function.');
    }

    exec(onSuccess, null, 'IBeacon', 'isAdvertising', []);

  },

  startAdvertising: function(region, onPeripheralManagerDidStartAdvertising, measuredPower) {

    validateRegion(region);

    if (measuredPower) {
      return callNative('startAdvertising', region, onPeripheralManagerDidStartAdvertising, null, [measuredPower]);
    } else {
      return callNative('startAdvertising', region, onPeripheralManagerDidStartAdvertising);
    }

  },

  stopAdvertising: function(onSuccess) {
    exec(onSuccess, null, 'IBeacon', 'stopAdvertising', []);
  },

};

module.exports = iBeacon;
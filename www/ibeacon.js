'use strict';

var exec = require('cordova/exec');
var Region = require('./region');

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
    throw new Error('Missing option. None of the following properties are specified: ' + missingProperties.join(', '));
  }

};

var ibeacon = {

  Region: Region,

  startAdvertising: function(region, onDidStartAdvertising, measuredPower) {

    if (measuredPower) {
      return callNative('startAdvertising', region, onDidStartAdvertising, null, [measuredPower]);
    } else {
      return callNative('startAdvertising', region, onDidStartAdvertising);
    }

  },

  stopAdvertising: function(onSuccess) {
    callNative('stopAdvertising', null, onSuccess);
  },

  isAdvertising: function(onSuccess) {
    callNative('isAdvertising', null, onSuccess);
  },

  startMonitoringForRegion: function(options) {

    checkParam(options, 'region');
    checkParam(options, 'didDetermineState', 'didEnter', 'didExit');

    var successCallback = function(result) {

      if (options.hasOwnProperty('didDetermineState')) {
        options.didDetermineState(result);
      }

      if (options.hasOwnProperty('didEnter') && result.state === 'inside') {
        options.didEnter({
          region: result.region
        });
      }

      if (options.hasOwnProperty('didExit') && result.state === 'outside') {
        options.didExit({
          region: result.region
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

  startRangingBeaconsInRegion: function(regions, didRangeBeaconsCallback) {

    if (!(regions instanceof Array)) {
      regions = [regions];
    }

    for (var i = 0; i < regions.length; i++) {
      callNative('startRangingBeaconsInRegion', regions[i], didRangeBeaconsCallback);
    }

  },

  stopRangingBeaconsInRegion: function(regions) {

    if (!(regions instanceof Array)) {
      regions = [regions];
    }

    for (var i = 0; i < regions.length; i++) {
      callNative('stopRangingBeaconsInRegion', regions[i]);
    }

  },

};

module.exports = ibeacon;

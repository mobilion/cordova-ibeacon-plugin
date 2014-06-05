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

  startMonitoringForRegion: function(regions, didDetermineStateCallback) {

    if (!(regions instanceof Array)) {
      regions = [regions];
    }

    for (var i = 0; i < regions.length; i++) {
      callNative('startMonitoringForRegion', regions[i], didDetermineStateCallback);
    }

  },

  stopMonitoringForRegion: function(regions) {

    if (!(regions instanceof Array)) {
      regions = [regions];
    }

    for (var i = 0; i < regions.length; i++) {
      callNative('stopMonitoringForRegion', regions[i]);
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
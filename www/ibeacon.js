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

  exec(onSuccess, onFailure, 'IBeacon', actionName, commandArguments);

};

var iBeacon = {

  Region: Region,

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

  isAdvertising: function(onSuccess) {
    callNative('isAdvertising', null, onSuccess);
  },

  startAdvertising: function(region, onPeripheralManagerDidStartAdvertising, measuredPower) {

    if (measuredPower) {
      return callNative('startAdvertising', region, onPeripheralManagerDidStartAdvertising, null, [measuredPower]);
    } else {
      return callNative('startAdvertising', region, onPeripheralManagerDidStartAdvertising);
    }

  },

  stopAdvertising: function(onSuccess) {
    callNative('stopAdvertising', null, onSuccess);
  },

};

module.exports = iBeacon;
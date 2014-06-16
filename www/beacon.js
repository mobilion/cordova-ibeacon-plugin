'use strict';

var helper = require('./helper');

var Beacon = function(beacon) {

  this.uuid = beacon.uuid.toLowerCase();
  this.major = beacon.major;
  this.minor = beacon.minor;
  this.power = beacon.power || null;
  this.rssi = null;
  this.proximity = null;

  this.validate();

};

Beacon.prototype.validate = function() {

  helper.validateUuid(this.uuid);
  helper.validateMajor(this.major);
  helper.validateMinor(this.minor);

  if (this.power) {
    helper.validatePower(this.power);
  }

};

Beacon.prototype.equals = function(beacon) {

  return beacon instanceof Beacon &&
    this.uuid === beacon.uuid &&
    this.major === beacon.major &&
    this.minor === beacon.minor &&
    this.power === beacon.power;

};

module.exports = Beacon;

'use strict';

var helper = require('./helper');

var Beacon = function(beacon) {

  this.uuid = beacon.uuid.toLowerCase();
  this.major = beacon.major || null;
  this.minor = beacon.minor || null;

  this.validate();

};

Beacon.prototype.validate = function() {

  helper.validateUuid(this.uuid);

  if (this.major) {
    helper.validateMajor(this.major);
  }

  if (this.minor) {
    helper.validateMinor(this.minor);
  }

};

Beacon.prototype.equals = function(beacon) {

  return beacon instanceof Beacon &&
    this.uuid === beacon.uuid &&
    this.major === beacon.major &&
    this.minor === beacon.minor;

};

module.exports = Beacon;

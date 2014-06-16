'use strict';

var helper = require('./helper');

var Beacon = function(beacon) {

  this.uuid = beacon.uuid.toLowerCase();
  this.major = beacon.major;
  this.minor = beacon.minor;

  this.validate();

};

Beacon.prototype.validate = function() {

  helper.validateUuid(this.uuid);
  helper.validateMajor(this.major);
  helper.validateMinor(this.minor);

};

Beacon.prototype.equals = function(beacon) {

  return beacon instanceof Beacon &&
    this.uuid === beacon.uuid &&
    this.major === beacon.major &&
    this.minor === beacon.minor;

};

module.exports = Beacon;

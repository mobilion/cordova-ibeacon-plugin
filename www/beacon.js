'use strict';

var Region = require('./region');
var helper = require('./helper');

var Beacon = function(beacon) {

  this.power = beacon.power || null;
  this.rssi = beacon.rssi || null;
  this.proximity = beacon.proximity || null;

  Region.apply(this, arguments);

};

Beacon.prototype = Object.create(Region.prototype);

Beacon.prototype.validate = function() {

  helper.validateIdentifier(this.identifier);
  helper.validateUuid(this.uuid);
  helper.validateMajor(this.major);
  helper.validateMinor(this.minor);

  if (this.power) {
    helper.validatePower(this.power);
  }

  if (this.proximity) {
    helper.validateProximity(this.proximity);
  }

};

module.exports = Beacon;

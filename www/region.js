'use strict';

var helper = require('./helper');

var Region = function(region) {

  this.uuid = region.uuid.toLowerCase();
  this.identifier = region.identifier;
  this.major = region.major || null;
  this.minor = region.minor || null;

  this.validate();

};

Region.prototype.validate = function() {

  helper.validateUuid(this.uuid);
  helper.validateIdentifier(this.identifier);

  if (this.major) {
    helper.validateMajor(this.major);
  }

  if (this.minor) {
    helper.validateMinor(this.minor);
  }

};

Region.prototype.equals = function(region) {

  return region instanceof Region &&
    this.uuid === region.uuid &&
    this.identifier === region.identifier &&
    this.major === region.major &&
    this.minor === region.minor;

};

module.exports = Region;

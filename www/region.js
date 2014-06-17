'use strict';

var helper = require('./helper');
var defaults = require('./defaults');

var Region = function(region) {

  this.identifier = region.identifier || defaults.identifier;
  this.uuid = region.uuid || null;
  this.major = region.major || null;
  this.minor = region.minor || null;

  this.validate();
  this._normalize();

};

Region.prototype.validate = function() {

  helper.validateIdentifier(this.identifier);
  helper.validateUuid(this.uuid);

  if (this.major) {
    helper.validateMajor(this.major);
  }

  if (this.minor) {
    helper.validateMinor(this.minor);
  }

};

Region.prototype._normalize = function() {
  this.uuid = this.uuid.toLowerCase();
};

Region.prototype.equals = function(region) {

  return region instanceof Region &&
    this.uuid === region.uuid &&
    this.identifier === region.identifier &&
    this.major === region.major &&
    this.minor === region.minor;

};

module.exports = Region;

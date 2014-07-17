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

Region.prototype.hash = function() {

  var str = this.identifier + this.uuid + this.major + this.minor;

  var hash = 0;
  var i, chr, len;

  if (str.length === 0) return hash + '';

  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash + '';

};

Region.prototype._normalize = function() {
  this.uuid = this.uuid.toLowerCase();
};

Region.prototype.equals = function(region) {

  return region instanceof Region &&
    this.uuid === region.uuid &&
    this.major === region.major &&
    this.minor === region.minor;

};

module.exports = Region;

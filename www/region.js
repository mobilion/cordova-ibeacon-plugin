'use strict';

var Region = function(region) {
  this.uuid = region.uuid.toLowerCase();
  this.major = region.major || null;
  this.minor = region.minor || null;
  this.identifier = region.identifier;

  this.validate();
};

Region.prototype.validate = function() {
  // Parameter uuid
  if (isBlank(this.uuid)) {
    throw new TypeError('Parameter uuid has to be a String.');
  }
  var uuidInvalid = !this._isValidUuid(this.uuid);
  if (uuidInvalid) {
    throw new TypeError('Parameter uuid has to be in the format of ' + this._getUuidValidatorRegex());
  }

  // Parameter major - only validated if non null/undefined value is passed in
  var shouldValidateMajor = (this.major !== undefined && this.major !== null);
  var majorInt = parseInt(this.major);
  var majorIsNotValid = (majorInt !== this.major || majorInt === NaN);
  if (shouldValidateMajor && majorIsNotValid) {
    throw new TypeError('Parameter major has to be an integer.');
  }

  // Parameter minor - only validated if non null/undefined value is passed in
  var shouldValidateMinor = (this.minor !== undefined && this.minor !== null);
  var minorInt = parseInt(this.minor);
  var minorIsNotValid = (minorInt !== this.minor || minorInt === NaN);
  if (shouldValidateMinor && minorIsNotValid) {
    throw new TypeError('Parameter minor has to be an integer.');
  }

  // Parameter identifier
  if (isBlank(this.identifier)) {
    throw new TypeError('Parameter identifier has to be a String.');
  }

};

Region.prototype.equals = function (region) {
  return this.uuid === region.uuid && this.identifier === region.identifier && this.major === region.major && this.minor === region.minor;
};

Region.prototype._isValidUuid = function(uuid) {
  var uuidValidatorRegex = this._getUuidValidatorRegex();
  return uuid.match(uuidValidatorRegex) != null;
};

Region.prototype._getUuidValidatorRegex = function() {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
}

function isBlank(str) {
  return (!str || /^\s*$/.test(str));
}

module.exports = Region;

'use strict';

module.exports = {

  _isInteger: function(value) {

    var number = parseInt(value, 10);

    return number === value && number !== NaN;

  },

  _isBlank: function(string) {
    return (!string || /^\s*$/.test(string));
  },

  validateMajor: function(major) {

    if (!this._isInteger(major)) {
      throw new Error('Parameter "major" has to be an integer value.')
    }

  },

  validateMinor: function(minor) {

    if (!this._isInteger(minor)) {
      throw new Error('Parameter "minor" has to be an integer value.')
    }

  },

  validateUuid: function(uuid) {

    var regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (this._isBlank(uuid) || uuid.match(regex) === null) {
      throw new Error('Parameter "uuid" has to be a valid universally unique identifier.')
    }

  },

  validateIdentifier: function(identifier) {

    if (this._isBlank(identifier)) {
      throw new Error('Parameter "identifier" has to be a non-empty string.')
    }

  },

};

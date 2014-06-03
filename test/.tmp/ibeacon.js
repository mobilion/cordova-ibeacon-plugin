!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ibeacon=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ornwyB":[function(_dereq_,module,exports){
var cache = [];
var exec = function(onSuccess, onFailure, className, actionName, commandArguments) {
  var args = {};
  args.onSuccess = onSuccess;
  args.onFailure = onFailure;
  args.className = className;
  args.actionName = actionName;
  args.commandArguments = commandArguments;
  cache.push(args);
};

window.execCache = cache;

module.exports = exec;
},{}],"cordova/exec":[function(_dereq_,module,exports){
module.exports=_dereq_('ornwyB');
},{}],3:[function(_dereq_,module,exports){
'use strict';

var exec = _dereq_('cordova/exec');
var Region = _dereq_('./region');

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
},{"./region":4}],4:[function(_dereq_,module,exports){
'use strict';

var Region = function(region) {
  this.uuid = region.uuid;
  this.major = region.major || null;
  this.minor = region.minor || null;
  this.identifier = region.identifier;

  this.validate();
};

Region.prototype._isValidUuid = function(uuid) {
  var uuidValidatorRegex = this._getUuidValidatorRegex();
  return uuid.match(uuidValidatorRegex) != null;
};

Region.prototype._getUuidValidatorRegex = function() {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
}

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

function isBlank(str) {
  return (!str || /^\s*$/.test(str));
}

module.exports = Region;
},{}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvam9oYW5uZXMvRGVza3RvcC9wcm9qZWN0cy9jb3Jkb3ZhLWliZWFjb24tcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9oYW5uZXMvRGVza3RvcC9wcm9qZWN0cy9jb3Jkb3ZhLWliZWFjb24tcGx1Z2luL3Rlc3QvbW9jay9jb3Jkb3ZhLmV4ZWMuanMiLCIvVXNlcnMvam9oYW5uZXMvRGVza3RvcC9wcm9qZWN0cy9jb3Jkb3ZhLWliZWFjb24tcGx1Z2luL3d3dy9pYmVhY29uLmpzIiwiL1VzZXJzL2pvaGFubmVzL0Rlc2t0b3AvcHJvamVjdHMvY29yZG92YS1pYmVhY29uLXBsdWdpbi93d3cvcmVnaW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgY2FjaGUgPSBbXTtcbnZhciBleGVjID0gZnVuY3Rpb24ob25TdWNjZXNzLCBvbkZhaWx1cmUsIGNsYXNzTmFtZSwgYWN0aW9uTmFtZSwgY29tbWFuZEFyZ3VtZW50cykge1xuICB2YXIgYXJncyA9IHt9O1xuICBhcmdzLm9uU3VjY2VzcyA9IG9uU3VjY2VzcztcbiAgYXJncy5vbkZhaWx1cmUgPSBvbkZhaWx1cmU7XG4gIGFyZ3MuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICBhcmdzLmFjdGlvbk5hbWUgPSBhY3Rpb25OYW1lO1xuICBhcmdzLmNvbW1hbmRBcmd1bWVudHMgPSBjb21tYW5kQXJndW1lbnRzO1xuICBjYWNoZS5wdXNoKGFyZ3MpO1xufTtcblxud2luZG93LmV4ZWNDYWNoZSA9IGNhY2hlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4ZWM7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXhlYyA9IHJlcXVpcmUoJ2NvcmRvdmEvZXhlYycpO1xudmFyIFJlZ2lvbiA9IHJlcXVpcmUoJy4vcmVnaW9uJyk7XG5cbnZhciBjYWxsTmF0aXZlID0gZnVuY3Rpb24oYWN0aW9uTmFtZSwgcmVnaW9uLCBvblN1Y2Nlc3MsIG9uRmFpbHVyZSwgZXh0cmFBcmdzKSB7XG5cbiAgdmFyIGNvbW1hbmRBcmd1bWVudHMgPSBbXTtcblxuICBpZiAocmVnaW9uKSB7XG4gICAgcmVnaW9uLnZhbGlkYXRlKCk7XG4gICAgY29tbWFuZEFyZ3VtZW50cy5wdXNoKHJlZ2lvbik7XG4gIH1cblxuICBpZiAoZXh0cmFBcmdzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICBjb21tYW5kQXJndW1lbnRzID0gY29tbWFuZEFyZ3VtZW50cy5jb25jYXQoZXh0cmFBcmdzKTtcbiAgfVxuXG4gIGV4ZWMob25TdWNjZXNzLCBvbkZhaWx1cmUsICdJQmVhY29uJywgYWN0aW9uTmFtZSwgY29tbWFuZEFyZ3VtZW50cyk7XG5cbn07XG5cbnZhciBpQmVhY29uID0ge1xuXG4gIFJlZ2lvbjogUmVnaW9uLFxuXG4gIHN0YXJ0UmFuZ2luZ0JlYWNvbnNJblJlZ2lvbjogZnVuY3Rpb24ocmVnaW9ucywgZGlkUmFuZ2VCZWFjb25zQ2FsbGJhY2spIHtcblxuICAgIGlmICghKHJlZ2lvbnMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgIHJlZ2lvbnMgPSBbcmVnaW9uc107XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWdpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjYWxsTmF0aXZlKCdzdGFydFJhbmdpbmdCZWFjb25zSW5SZWdpb24nLCByZWdpb25zW2ldLCBkaWRSYW5nZUJlYWNvbnNDYWxsYmFjayk7XG4gICAgfVxuXG4gIH0sXG5cbiAgc3RvcFJhbmdpbmdCZWFjb25zSW5SZWdpb246IGZ1bmN0aW9uKHJlZ2lvbnMpIHtcblxuICAgIGlmICghKHJlZ2lvbnMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgIHJlZ2lvbnMgPSBbcmVnaW9uc107XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWdpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjYWxsTmF0aXZlKCdzdG9wUmFuZ2luZ0JlYWNvbnNJblJlZ2lvbicsIHJlZ2lvbnNbaV0pO1xuICAgIH1cblxuICB9LFxuXG4gIHN0YXJ0TW9uaXRvcmluZ0ZvclJlZ2lvbjogZnVuY3Rpb24ocmVnaW9ucywgZGlkRGV0ZXJtaW5lU3RhdGVDYWxsYmFjaykge1xuXG4gICAgaWYgKCEocmVnaW9ucyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgcmVnaW9ucyA9IFtyZWdpb25zXTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZ2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNhbGxOYXRpdmUoJ3N0YXJ0TW9uaXRvcmluZ0ZvclJlZ2lvbicsIHJlZ2lvbnNbaV0sIGRpZERldGVybWluZVN0YXRlQ2FsbGJhY2spO1xuICAgIH1cblxuICB9LFxuXG4gIHN0b3BNb25pdG9yaW5nRm9yUmVnaW9uOiBmdW5jdGlvbihyZWdpb25zKSB7XG5cbiAgICBpZiAoIShyZWdpb25zIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICByZWdpb25zID0gW3JlZ2lvbnNdO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVnaW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgY2FsbE5hdGl2ZSgnc3RvcE1vbml0b3JpbmdGb3JSZWdpb24nLCByZWdpb25zW2ldKTtcbiAgICB9XG5cbiAgfSxcblxuICBpc0FkdmVydGlzaW5nOiBmdW5jdGlvbihvblN1Y2Nlc3MpIHtcbiAgICBjYWxsTmF0aXZlKCdpc0FkdmVydGlzaW5nJywgbnVsbCwgb25TdWNjZXNzKTtcbiAgfSxcblxuICBzdGFydEFkdmVydGlzaW5nOiBmdW5jdGlvbihyZWdpb24sIG9uUGVyaXBoZXJhbE1hbmFnZXJEaWRTdGFydEFkdmVydGlzaW5nLCBtZWFzdXJlZFBvd2VyKSB7XG5cbiAgICBpZiAobWVhc3VyZWRQb3dlcikge1xuICAgICAgcmV0dXJuIGNhbGxOYXRpdmUoJ3N0YXJ0QWR2ZXJ0aXNpbmcnLCByZWdpb24sIG9uUGVyaXBoZXJhbE1hbmFnZXJEaWRTdGFydEFkdmVydGlzaW5nLCBudWxsLCBbbWVhc3VyZWRQb3dlcl0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY2FsbE5hdGl2ZSgnc3RhcnRBZHZlcnRpc2luZycsIHJlZ2lvbiwgb25QZXJpcGhlcmFsTWFuYWdlckRpZFN0YXJ0QWR2ZXJ0aXNpbmcpO1xuICAgIH1cblxuICB9LFxuXG4gIHN0b3BBZHZlcnRpc2luZzogZnVuY3Rpb24ob25TdWNjZXNzKSB7XG4gICAgY2FsbE5hdGl2ZSgnc3RvcEFkdmVydGlzaW5nJywgbnVsbCwgb25TdWNjZXNzKTtcbiAgfSxcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpQmVhY29uOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlZ2lvbiA9IGZ1bmN0aW9uKHJlZ2lvbikge1xuICB0aGlzLnV1aWQgPSByZWdpb24udXVpZDtcbiAgdGhpcy5tYWpvciA9IHJlZ2lvbi5tYWpvciB8fCBudWxsO1xuICB0aGlzLm1pbm9yID0gcmVnaW9uLm1pbm9yIHx8IG51bGw7XG4gIHRoaXMuaWRlbnRpZmllciA9IHJlZ2lvbi5pZGVudGlmaWVyO1xuXG4gIHRoaXMudmFsaWRhdGUoKTtcbn07XG5cblJlZ2lvbi5wcm90b3R5cGUuX2lzVmFsaWRVdWlkID0gZnVuY3Rpb24odXVpZCkge1xuICB2YXIgdXVpZFZhbGlkYXRvclJlZ2V4ID0gdGhpcy5fZ2V0VXVpZFZhbGlkYXRvclJlZ2V4KCk7XG4gIHJldHVybiB1dWlkLm1hdGNoKHV1aWRWYWxpZGF0b3JSZWdleCkgIT0gbnVsbDtcbn07XG5cblJlZ2lvbi5wcm90b3R5cGUuX2dldFV1aWRWYWxpZGF0b3JSZWdleCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gL15bMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfSQvaTtcbn1cblxuUmVnaW9uLnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBQYXJhbWV0ZXIgdXVpZFxuICBpZiAoaXNCbGFuayh0aGlzLnV1aWQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGFyYW1ldGVyIHV1aWQgaGFzIHRvIGJlIGEgU3RyaW5nLicpO1xuICB9XG4gIHZhciB1dWlkSW52YWxpZCA9ICF0aGlzLl9pc1ZhbGlkVXVpZCh0aGlzLnV1aWQpO1xuICBpZiAodXVpZEludmFsaWQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQYXJhbWV0ZXIgdXVpZCBoYXMgdG8gYmUgaW4gdGhlIGZvcm1hdCBvZiAnICsgdGhpcy5fZ2V0VXVpZFZhbGlkYXRvclJlZ2V4KCkpO1xuICB9XG5cbiAgLy8gUGFyYW1ldGVyIG1ham9yIC0gb25seSB2YWxpZGF0ZWQgaWYgbm9uIG51bGwvdW5kZWZpbmVkIHZhbHVlIGlzIHBhc3NlZCBpblxuICB2YXIgc2hvdWxkVmFsaWRhdGVNYWpvciA9ICh0aGlzLm1ham9yICE9PSB1bmRlZmluZWQgJiYgdGhpcy5tYWpvciAhPT0gbnVsbCk7XG4gIHZhciBtYWpvckludCA9IHBhcnNlSW50KHRoaXMubWFqb3IpO1xuICB2YXIgbWFqb3JJc05vdFZhbGlkID0gKG1ham9ySW50ICE9PSB0aGlzLm1ham9yIHx8IG1ham9ySW50ID09PSBOYU4pO1xuICBpZiAoc2hvdWxkVmFsaWRhdGVNYWpvciAmJiBtYWpvcklzTm90VmFsaWQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQYXJhbWV0ZXIgbWFqb3IgaGFzIHRvIGJlIGFuIGludGVnZXIuJyk7XG4gIH1cblxuICAvLyBQYXJhbWV0ZXIgbWlub3IgLSBvbmx5IHZhbGlkYXRlZCBpZiBub24gbnVsbC91bmRlZmluZWQgdmFsdWUgaXMgcGFzc2VkIGluXG4gIHZhciBzaG91bGRWYWxpZGF0ZU1pbm9yID0gKHRoaXMubWlub3IgIT09IHVuZGVmaW5lZCAmJiB0aGlzLm1pbm9yICE9PSBudWxsKTtcbiAgdmFyIG1pbm9ySW50ID0gcGFyc2VJbnQodGhpcy5taW5vcik7XG4gIHZhciBtaW5vcklzTm90VmFsaWQgPSAobWlub3JJbnQgIT09IHRoaXMubWlub3IgfHwgbWlub3JJbnQgPT09IE5hTik7XG4gIGlmIChzaG91bGRWYWxpZGF0ZU1pbm9yICYmIG1pbm9ySXNOb3RWYWxpZCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1BhcmFtZXRlciBtaW5vciBoYXMgdG8gYmUgYW4gaW50ZWdlci4nKTtcbiAgfVxuXG4gIC8vIFBhcmFtZXRlciBpZGVudGlmaWVyXG4gIGlmIChpc0JsYW5rKHRoaXMuaWRlbnRpZmllcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQYXJhbWV0ZXIgaWRlbnRpZmllciBoYXMgdG8gYmUgYSBTdHJpbmcuJyk7XG4gIH1cblxufTtcblxuZnVuY3Rpb24gaXNCbGFuayhzdHIpIHtcbiAgcmV0dXJuICghc3RyIHx8IC9eXFxzKiQvLnRlc3Qoc3RyKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVnaW9uOyJdfQ==
(3)
});

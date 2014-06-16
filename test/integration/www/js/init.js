'use strict';

var loadScript = function(src) {

  var el = document.createElement('script');

  el.setAttribute('src', src);
  el.async = false;

  document.body.appendChild(el);

};

var loadTests = function() {

  [
    'lib/jasmine-2.0.0/boot.js',
    'spec/01-advertising.js',
    'spec/02-monitoring.js',
    'spec/03-ranging.js',
    'spec/04-kill.js',
  ].forEach(loadScript);

  // timeout and window.onload needed to start tests
  setTimeout(function() {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    window.onload();

  }, 1000);

};

document.addEventListener('deviceready', loadTests, false);

'use strict';

var loadScript = function(src) {

  var el = document.createElement('script');

  el.setAttribute('src', src);
  el.async = false;

  document.body.appendChild(el);

};

var loadTests = function() {

  [
    'spec/01-advertising.js',
    'spec/02-monitoring.js',
    'spec/03-ranging.js',
    'spec/04-kill.js',
  ].forEach(loadScript);

  mocha.timeout(60000);
  mocha.checkLeaks();
  mocha.run();

};

document.addEventListener('deviceready', loadTests, false);

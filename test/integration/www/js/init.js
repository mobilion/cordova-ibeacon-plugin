'use strict';

var loadScript = function(src) {

  var request = new XMLHttpRequest();

  request.open('GET', src, false);
  request.send();

  var el = document.createElement('script');

  el.text = request.responseText;

  document.body.appendChild(el);

};

var loadTests = function() {

  [
    'spec/01-advertising.js',
    'spec/02-monitoring.js',
    'spec/03-ranging.js',
    'spec/04-kill.js',
  ].forEach(loadScript);

  mocha.checkLeaks();
  mocha.run();

};

document.addEventListener('deviceready', loadTests, false);

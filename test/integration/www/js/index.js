'use strict';

document.addEventListener('deviceready', loadTests, false);

function loadTests() {
  [
    'lib/jasmine-2.0.0/boot.js',
  ].forEach(loadScript);

  // timeout and window.onload needed to start tests
  setTimeout(function() {
    window.onload();
  }, 100);
};

function loadScript(src) {
  var el = document.createElement('script');
  el.setAttribute('src', src);
  el.async = false;
  document.body.appendChild(el);
}
'use strict';

var socket = io.connect('http://LOCAL_IP:3000');

function advertise(uuid, major, minor) {
  socket.emit('advertise', uuid, major, minor);
};

function clean() {
  socket.emit('clean');
};

function killServer() {
  socket.emit('kill');
};

document.addEventListener('deviceready', loadTests, false);

function loadTests() {
  [
    'lib/jasmine-2.0.0/boot.js',
    'spec/01-monitoring.js',
    'spec/02-ranging.js',
    'spec/03-kill.js',
  ].forEach(loadScript);

  // timeout and window.onload needed to start tests
  setTimeout(function() {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    window.onload();

  }, 1000);

};

function loadScript(src) {
  var el = document.createElement('script');
  el.setAttribute('src', src);
  el.async = false;
  document.body.appendChild(el);
}

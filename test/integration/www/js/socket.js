'use strict';

var socket = io.connect('http://LOCAL_IP:3000');

window.advertise = function(uuid, major, minor) {
  socket.emit('advertise', uuid, major, minor);
};

window.clean = function() {
  socket.emit('clean');
};

window.killServer = function() {
  socket.emit('kill');
};

window.scan = function(uuid, major, minor, callback) {

  socket.on('scan-result', callback);

  socket.emit('scan', uuid, major, minor);

};

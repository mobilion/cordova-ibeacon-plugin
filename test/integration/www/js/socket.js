'use strict';

var socket = io.connect('http://192.168.2.104:3000');

window.advertise = function(uuid, major, minor) {
  socket.emit('advertise', uuid, major, minor);
};

window.clean = function() {
  socket.emit('clean');
};

window.killServer = function() {
  socket.emit('kill');
};

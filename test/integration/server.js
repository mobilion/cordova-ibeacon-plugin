var io = require('socket.io')();
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

io.on('connection', function(socket) {

  var currentAdvertiseProcess;

  socket.on('advertise', function(uuid, major, minor) {

    killCurrentAdvertiseProcess();

    var command = 'ibeacon --broadcast --uuid ' + uuid;

    if (major) {
      command += ' --major ' + major;
    }

    if (minor) {
      command += ' --minor ' + minor;
    }

    currentAdvertiseProcess = exec(command);

  });

  socket.on('clean', function() {
    killCurrentAdvertiseProcess();
  });

  socket.on('kill', function() {

    killCurrentAdvertiseProcess();
    process.exit(0);

  });

  socket.on('scan', function(uuid, major, minor) {

    var process = spawn('ibeacon', ['--scan']);

    process.stdout.on('data', function(data) {

      var line = data.toString().toLowerCase();

      if (line.indexOf(uuid) > -1 && line.indexOf(major) > -1 && line.indexOf(minor) > -1) {

        socket.emit('scan-result', true);
        process.kill();

      }

    });

    setTimeout(function() {

      socket.emit('scan-result', false);
      process.kill();

    }, 10000);

  });

  function killCurrentAdvertiseProcess() {

    if (currentAdvertiseProcess) {
      currentAdvertiseProcess.kill();
    }

    currentAdvertiseProcess = null;

  }

});

io.listen(3000);

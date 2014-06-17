var io = require('socket.io')();
var exec = require('child_process').exec;

io.on('connection', function(socket) {

  var childProcesses = [];

  socket.on('advertise', function(uuid, major, minor) {

    var command = 'ibeacon --broadcast --uuid ' + uuid;

    if (major) {
      command += ' --major ' + major;
    }

    if (minor) {
      command += ' --minor ' + minor;
    }

    var childProcess = exec(command, function() {
      childProcesses.splice(childProcesses.indexOf(childProcess), 1);
    });

    childProcesses.push(childProcess);

  });

  socket.on('clean', function() {
    killChildProcesses();
  });

  socket.on('kill', function() {

    killChildProcesses();
    process.exit(0);

  });

  socket.on('scan', function(uuid, major, minor) {

    var command = 'ibeacon --scan';

    exec(command, {
      timeout: 7000,
    }, function(error, stdout, stderr) {

      var lines = stdout.split('\n');
      var beaconWasFound = false;

      for (var i = 0; i < lines.length; ++i) {

        var line = lines[i];

        if (line.indexOf(uuid) > -1 && line.indexOf(major) > -1 && line.indexOf(minor) > -1) {
          beaconWasFound = true;
        }

      }

      socket.emit('scan-result', beaconWasFound);

    });

  });

  function killChildProcesses() {

    childProcesses.forEach(function(childProcess) {
      childProcess.kill();
    });

  };

});

io.listen(3000);

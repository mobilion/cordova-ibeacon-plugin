var io = require('socket.io')();
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

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

    var process = spawn('ibeacon', ['--scan']);

    process.stdout.on('data', function(data) {

      var line = data.toString();

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

  function killChildProcesses() {

    childProcesses.forEach(function(childProcess) {
      childProcess.kill();
    });

  }

});

io.listen(3000);

var io = require('socket.io')();
var exec = require('child_process').exec;

io.on('connection', function(socket) {

  var childProcesses = [];

  socket.on('advertise', function(timeout, uuid, major, minor) {

    var command = 'ibeacon --broadcast --uuid ' + uuid;

    if (major) {
      command += ' --major ' + major;
    }

    if (minor) {
      command += ' --minor ' + minor;
    }

    var childProcess = exec(command, {
      timeout: timeout
    }, function () {
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

  function killChildProcesses() {

    childProcesses.forEach(function(childProcess) {
      childProcess.kill();
    });

  };

});

io.listen(3000);

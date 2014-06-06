Integration tests
=================

All tests run under OSX with the following dependencies.

## Dependencies

### Timeout (from `coreutils`)
```sh
$ brew install coreutils
$ gtimeout 10 command
```

### ADB
```sh
$ brew install adb
```

### iBeacon CLI
Can be downloaded here: https://github.com/RadiusNetworks/ibeacon-cli

## Run

```sh
$ ./run.sh
```
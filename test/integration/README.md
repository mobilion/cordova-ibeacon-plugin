Integration tests
=================

All tests run under OSX with the following dependencies. An Android and/or iOS device is needed. The tests run in a Cordova application. Bluetooth on your computer needs to be turned on.

## Dependencies

### Cordova
```sh
$ npm install -g cordova
```

### Timeout
```sh
$ brew install coreutils
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
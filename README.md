cordova-ibeacon-plugin [![Build Status](https://travis-ci.org/mobilion/cordova-ibeacon-plugin.svg?branch=master)](https://travis-ci.org/mobilion/cordova-ibeacon-plugin)
======================

Cross-platform (iOS/Android) iBeacon plugin for [Cordova](http://cordova.apache.org/) and [Phonegap](http://phonegap.com/)

## Features

* Platforms: iOS, Android (based on [android-ibeacon-service](https://github.com/RadiusNetworks/android-ibeacon-service) of [Radius Networks](http://developer.radiusnetworks.com/ibeacon/android/))
* Well tested on real devices (unit/integration tests)

## Install

```sh
$ cordova plugin add https://github.com/mobilion/cordova-ibeacon-plugin.git
```

## Usage

For __more examples__ and all usage information please refer to the [documentation](https://github.com/mobilion/cordova-ibeacon-plugin/tree/master/doc).

#### Example

```js
var region = new ibeacon.Region({
  uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
});

ibeacon.startRangingBeaconsInRegion({
  region: region,
  didDetermineState: function(result) {
    console.log('I see ' + result.beacons.length + ' beacons');
  }
});
```

## FAQ

Please refer to the corresponding [documentation page](https://github.com/mobilion/cordova-ibeacon-plugin/tree/master/doc/FAQ.md).

## Roadmap

* Advertising support for Android platform
* Demo application (+video tutorial)

## Author

[Johannes Schickling](https://github.com/schickling)

## License

[Apache License, Version 2.0](http://opensource.org/licenses/Apache-2.0)

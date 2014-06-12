cordova-ibeacon-plugin [![Build Status](https://travis-ci.org/schickling/cordova-ibeacon-plugin.svg?branch=master)](https://travis-ci.org/schickling/cordova-ibeacon-plugin)
======================

Cross-platform (iOS/Android) iBeacon plugin for [Cordova](http://cordova.apache.org/) and [Phonegap](http://phonegap.com/)

## Install

```sh
$ cordova plugin add https://github.com/schickling/cordova-ibeacon-plugin.git
```

## Usage

For more usage information please refer to the [documentation](https://github.com/schickling/cordova-ibeacon-plugin/tree/master/doc).

#### Monitoring

##### startMonitoringForRegion

```js
var region = new ibeacon.Region({
  identifier: 'my-app',
  uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
});

ibeacon.startMonitoringForRegion({
  region: region,
  didDetermineState: function(result) {
    if (result.state === 'inside') console.log('I see you!')
    else console.log('Where are you?');
  }
});
```

##### stopMonitoringForRegion

```js
var region = new ibeacon.Region({
  identifier: 'my-app',
  uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
});

ibeacon.stopMonitoringForRegion({
  region: region
});
```

#### Ranging

##### startRangingBeaconsInRegion

##### stopRangingBeaconsInRegion

## Coming soon

* Advertising support (currently not supported in Android)
* Demo application (+ Video tutorial)

## MIT License

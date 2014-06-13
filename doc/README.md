

<!-- Start /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/beacon.js -->

<!-- End /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/beacon.js -->




<!-- Start /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/helper.js -->

<!-- End /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/helper.js -->




<!-- Start /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/ibeacon.js -->

## startMonitoringForRegion

startMonitoringForRegion() lets you know whether you see any beacon in a
given region.

### Example:

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

### Params: 

* **Object** *options* 
* **Region** *options.region* Region where to start monitoring
* **Function** *options.didDetermineState* Function gets called when state changes (optional)
* **Function** *options.didEnter* Function gets called when at least one beacon was found (optional)
* **Function** *options.didDetermineState* Function gets called when no beacon was found (optional)

## stopMonitoringForRegion

stopMonitoringForRegion() stops monitoring and callbacks of `startMonitoringForRegion`
for the given region.

### Example:

```js
var region = new ibeacon.Region({
  identifier: 'my-app',
  uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
});

ibeacon.stopMonitoringForRegion({
  region: region
});
```

### Params: 

* **Object** *options* 
* **Region** *options.region* Region where to stop monitoring

## startRangingBeaconsInRegion

startRangingBeaconsInRegion() starts ranging for beacons in the given
region and calls back every second

### Example:

```js
var region = new ibeacon.Region({
  identifier: 'my-app',
  uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
});

ibeacon.startRangingBeaconsInRegion({
  region: region,
  didDetermineState: function(result) {
    console.log('I see ' + result.beacons.length + ' beacons');
  }
});
```

### Params: 

* **Object** *options* 
* **Region** *options.region* Region where to start ranging
* **Function** *options.didRangeBeacons* Function gets called every second

## stopRangingBeaconsInRegion

stopRangingBeaconsInRegion() stops ranging and callbacks of `startRangingBeaconsInRegion`

### Example:

```js
var region = new ibeacon.Region({
  identifier: 'my-app',
  uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
});

ibeacon.stopRangingBeaconsInRegion({
  region: region
});
```

### Params: 

* **Object** *options* 
* **Region** *options.region* Region where to stop ranging

<!-- End /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/ibeacon.js -->




<!-- Start /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/region.js -->

<!-- End /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/region.js -->


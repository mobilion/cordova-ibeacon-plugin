

<!-- Start /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/beacon.js -->

<!-- End /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/beacon.js -->




<!-- Start /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/defaults.js -->

<!-- End /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/defaults.js -->




<!-- Start /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/helper.js -->

<!-- End /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/helper.js -->




<!-- Start /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/ibeacon.js -->

## identifier

`identifier` is the global default identifier for your application. It
should be set somewhere in configuration process. Each `Region` or
`Beacon` can also have an individual identifier.

### Example:

```js
ibeacon.identifier = 'my-unique-identifier';

var region = new ibeacon.Region({
  uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
});

console.log(region.identifier); // 'my-unique-identifier'
```

## startAdvertising

`startAdvertising()` lets the specified beacon start sending.

### Example:

```js
var beacon = new ibeacon.Beacon({
  uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2',
  major: 10000,
  minor: 10000
});

ibeacon.startAdvertising({
  beacon: beacon
});
```

### Params: 

* **Object** *options* 
* **Beacon|Array** *options.beacon* Beacon(s) to advertise

## stopAdvertising

`stopAdvertising()` stops the signal transmission of the current
advertised beacon.

### Example:

```js
ibeacon.stopAdvertising();
```

## isAdvertising

`isAdvertising()` calls back with the result whether the device is
advertising or not.

### Example:

```js
ibeacon.isAdvertising({
  isAdvertising: function(result) {
    if (result.isAdvertising) console.log('I am advertising');
    else console.log('I am not advertising');
  };
});
```

### Params: 

* **Object** *options* 
* **Function** *options.isAdvertising* Function gets called with the

## startMonitoringForRegion

`startMonitoringForRegion()` lets you know whether you see any beacon in a
given region.

### Example:

```js
var region = new ibeacon.Region({
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
* **Region|Array** *options.region* Region(s) where to start monitoring
* **Function** *options.didDetermineState* Function gets called when state changes (optional)
* **Function** *options.didEnter* Function gets called when at least one beacon was found (optional)
* **Function** *options.didDetermineState* Function gets called when no beacon was found (optional)

## stopMonitoringForRegion

`stopMonitoringForRegion()` stops monitoring and callbacks of `startMonitoringForRegion`
for the given region.

### Example:

```js
var region = new ibeacon.Region({
  uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
});

ibeacon.stopMonitoringForRegion({
  region: region
});
```

### Params: 

* **Object** *options* 
* **Region|Array** *options.region* Region(s) where to stop monitoring

## startRangingBeaconsInRegion

`startRangingBeaconsInRegion()` starts ranging for beacons in the given
region and calls back every second

### Example:

```js
var region = new ibeacon.Region({
  uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
});

ibeacon.startRangingBeaconsInRegion({
  region: region,
  didRangeBeacons: function(result) {
    console.log('I see ' + result.beacons.length + ' beacons');
  }
});
```

### Params: 

* **Object** *options* 
* **Region|Array** *options.region* Region(s) where to start ranging
* **Function** *options.didRangeBeacons* Function gets called every second

## stopRangingBeaconsInRegion

`stopRangingBeaconsInRegion()` stops ranging and callbacks of `startRangingBeaconsInRegion`

### Example:

```js
var region = new ibeacon.Region({
  uuid: 'CCE0847C-66CA-45F0-888F-89DD51EE38D2'
});

ibeacon.stopRangingBeaconsInRegion({
  region: region
});
```

### Params: 

* **Object** *options* 
* **Region|Array** *options.region* Region(s) where to stop ranging

<!-- End /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/ibeacon.js -->




<!-- Start /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/region.js -->

<!-- End /Users/johannes/Desktop/projects/cordova-ibeacon-plugin/www/region.js -->


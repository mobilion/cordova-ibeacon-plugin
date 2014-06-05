#import <Cordova/CDVPlugin.h>
#import <CoreLocation/CoreLocation.h>
#import <CoreBluetooth/CoreBluetooth.h>

@interface IBeaconPlugin : CDVPlugin<CLLocationManagerDelegate, CBPeripheralManagerDelegate>

- (void)startAdvertising:(CDVInvokedUrlCommand*)command;
- (void)stopAdvertising:(CDVInvokedUrlCommand*)command;
- (void)isAdvertising:(CDVInvokedUrlCommand*)command;
- (void)startMonitoringForRegion:(CDVInvokedUrlCommand*)command;
- (void)stopMonitoringForRegion:(CDVInvokedUrlCommand*)command;
- (void)startRangingBeaconsInRegion:(CDVInvokedUrlCommand*)command;
- (void)stopRangingBeaconsInRegion:(CDVInvokedUrlCommand*)command;

@end
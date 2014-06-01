#import <Cordova/CDVPlugin.h>
#import <CoreLocation/CoreLocation.h>
#import <CoreBluetooth/CoreBluetooth.h>

@interface IBeacon : CDVPlugin<CLLocationManagerDelegate, CBPeripheralManagerDelegate>

- (void)isAdvertising:(CDVInvokedUrlCommand*)command;
- (void)startAdvertising:(CDVInvokedUrlCommand*)command;
- (void)stopAdvertising:(CDVInvokedUrlCommand*)command;

- (void)startMonitoringForRegion:(CDVInvokedUrlCommand*)command;
- (void)stopMonitoringForRegion:(CDVInvokedUrlCommand*)command;
- (void)startRangingBeaconsInRegion:(CDVInvokedUrlCommand*)command;
- (void)stopRangingBeaconsInRegion:(CDVInvokedUrlCommand*)command;

- (CLBeaconRegion*)parse:(NSDictionary*)regionArguments;

@end
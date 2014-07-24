FAQ
===

## Questions

### What's the difference between `Region` and `Beacon`

Both require the `identifier` and `uuid` attribute. A `Beacon` also requires
the `major` and `minor` attribute. Those are optional for a `Region`.

## Known Issues

### Monitoring inconsistency

The monitoring behavior of Android doesn't yet completly match the iOS behavior. This is an issue related to the used [android service](https://github.com/RadiusNetworks/android-ibeacon-service).
#! /bin/bash

SCRIPT_DIR=$( cd $(dirname $0) ; pwd -P )
PLUGIN_NAME="me.schickling.ibeacon"

# setup
rm -rf platforms plugins
mkdir platforms plugins
ln -s $SCRIPT_DIR/../.. $SCRIPT_DIR/plugins/$PLUGIN_NAME
cordova platform add android
cordova platform add ios

# run on devices
cordova run android
# cordova run ios
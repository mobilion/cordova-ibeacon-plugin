#! /bin/bash
set -e

SCRIPT_DIR=$( cd $(dirname $0) ; pwd -P )
PLUGIN_NAME="me.schickling.ibeacon"
LOCAL_IP=$( ifconfig en0 | grep 'inet ' | cut -d' ' -f2 )

# setup
cd $SCRIPT_DIR
rm -rf platforms plugins
mkdir platforms plugins
ln -s $SCRIPT_DIR/../.. $SCRIPT_DIR/plugins/$PLUGIN_NAME
cordova platform add android
cordova platform add ios

# inject socket server ip
sed -i '' "s/LOCAL_IP/$LOCAL_IP/g" platforms/android/assets/www/index.html
sed -i '' "s/LOCAL_IP/$LOCAL_IP/g" platforms/android/assets/www/js/index.js
sed -i '' "s/LOCAL_IP/$LOCAL_IP/g" platforms/ios/www/index.html
sed -i '' "s/LOCAL_IP/$LOCAL_IP/g" platforms/ios/www/js/index.js

# start socket server
node server.js &

# run on devices
cordova run android
#cordova run ios

# cleanup
cd -

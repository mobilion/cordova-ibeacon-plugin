#! /bin/bash
set -e

PLATFORM=$1
SCRIPT_DIR=$( cd $(dirname $0) ; pwd -P )
PLUGIN_DIR="$SCRIPT_DIR/../.."
PLUGIN_NAME="me.schickling.ibeacon"
LOCAL_IP=$( ifconfig en0 | grep 'inet ' | cut -d' ' -f2 )

# change base dir
cd $SCRIPT_DIR

# inject local ip for socket server
cp -f www/index.html www/index.html.org
cp -f www/js/index.js www/js/index.js.org
sed -i '' "s/LOCAL_IP/$LOCAL_IP/g" www/index.html
sed -i '' "s/LOCAL_IP/$LOCAL_IP/g" www/js/index.js

# clean up & link plugin
rm -rf platforms plugins
mkdir platforms plugins
ln -s $PLUGIN_DIR $SCRIPT_DIR/plugins/$PLUGIN_NAME

# add platforms
cordova platform add android
cordova platform add ios

# start socket server
node server.js &

# run on device
cordova run $PLATFORM

# clean up
rm www/{index.html,js/index.js}
mv www/index.html.org www/index.html
mv www/js/index.js.org www/js/index.js

#! /bin/bash
set -e

PLATFORM=$1
SCRIPT_DIR=$( cd $(dirname $0) ; pwd -P )
PLUGIN_DIR="$SCRIPT_DIR/../.."
PLUGIN_NAME="eu.mobilion.ibeacon"
LOCAL_IP=$( ifconfig en0 | grep 'inet ' | cut -d' ' -f2 )

# change base dir
cd $SCRIPT_DIR

# inject local ip for socket server
cp -f www/index.html www/index.html.org
cp -f www/js/socket.js www/js/socket.js.org
sed -i '' "s/LOCAL_IP/$LOCAL_IP/g" www/index.html
sed -i '' "s/LOCAL_IP/$LOCAL_IP/g" www/js/socket.js

# clean up & link plugin
rm -rf platforms plugins
mkdir platforms plugins
ln -s $PLUGIN_DIR $SCRIPT_DIR/plugins/$PLUGIN_NAME

# add platform
cordova platform add $PLATFORM

# start socket server
node server.js &

# run on device
cordova run $PLATFORM

# clean up
rm www/{index.html,js/socket.js}
mv www/index.html.org www/index.html
mv www/js/socket.js.org www/js/socket.js

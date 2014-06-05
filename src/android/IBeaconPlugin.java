package me.schickling.ibeacon;

import org.apache.cordova.*;

import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;

import android.os.RemoteException;
import android.util.Log;

import com.radiusnetworks.ibeacon.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Collection;

public class IBeaconPlugin extends CordovaPlugin implements IBeaconConsumer {

    private Context context;
    private IBeaconManager iBeaconManager;

    private CallbackContext rangingCallback;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        context = cordova.getActivity().getApplicationContext();
        iBeaconManager = IBeaconManager.getInstanceForApplication(context);
        iBeaconManager.bind(this);
    }

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        if (action.equals("startAdvertising")) {
            startAdvertising(args, callbackContext);
            return true;
        } else if (action.equals("stopAdvertising")) {
            stopAdvertising(args, callbackContext);
            return true;
        } else if (action.equals("isAdvertising")) {
            isAdvertising(args, callbackContext);
            return true;
        } else if (action.equals("startMonitoringForRegion")) {
            startMonitoringForRegion(args, callbackContext);
            return true;
        } else if (action.equals("stopMonitoringForRegion")) {
            stopMonitoringForRegion(args, callbackContext);
            return true;
        } else if (action.equals("startRangingBeaconsInRegion")) {
            startRangingBeaconsInRegion(args, callbackContext);
            return true;
        } else if (action.equals("stopRangingBeaconsInRegion")) {
            stopRangingBeaconsInRegion(args, callbackContext);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void onIBeaconServiceConnect() {

        iBeaconManager.setRangeNotifier(new RangeNotifier() {
            @Override
            public void didRangeBeaconsInRegion(Collection<IBeacon> iBeacons, Region region) {
                Log.i("IBeaconManager", "i see them " + iBeacons.size());
                try {
                    // for (IBeacon )
                    if (rangingCallback != null) {
                        JSONObject o = new JSONObject();
                        o.put("beacons", new JSONArray(iBeacons));
                        PluginResult r = new PluginResult(PluginResult.Status.OK, o);
                        r.setKeepCallback(true);
                        rangingCallback.sendPluginResult(r);
                    }
                } catch (JSONException e) {
                    Log.i("IBeaconManager", "damn json");
                }
            }
        });

        try {
            iBeaconManager.startRangingBeaconsInRegion(new Region("A0B13730-3A9A-11E3-AA6E-0800200C9A66", null, null, null));
        } catch (RemoteException e) {   }
    }

    @Override
    public Context getApplicationContext() {
        return context;
    }

    @Override
    public boolean bindService(Intent intent, ServiceConnection connection, int mode) {
        return context.bindService(intent, connection, mode);
    }

    @Override
    public void unbindService(ServiceConnection connection) {
        context.unbindService(connection);
    }

    private void startAdvertising(JSONArray args, final CallbackContext callbackContext) {
        PluginResult r = new PluginResult(PluginResult.Status.OK, "started");
        r.setKeepCallback(true);
        callbackContext.sendPluginResult(r);
    }

    private void stopAdvertising(JSONArray args, final CallbackContext callbackContext) {

    }

    private void isAdvertising(JSONArray args, final CallbackContext callbackContext) {

    }

    private void startMonitoringForRegion(JSONArray args, final CallbackContext callbackContext) {

    }

    private void stopMonitoringForRegion(JSONArray args, final CallbackContext callbackContext) {

    }

    private void startRangingBeaconsInRegion(JSONArray args, final CallbackContext callbackContext) {
        rangingCallback = callbackContext;
    }

    private void stopRangingBeaconsInRegion(JSONArray args, final CallbackContext callbackContext) {

    }

}

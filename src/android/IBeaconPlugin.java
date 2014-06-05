package me.schickling.ibeacon;

import org.apache.cordova.*;

import com.radiusnetworks.ibeacon.*;

import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;

import android.os.RemoteException;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Collection;
import java.util.HashMap;

public class IBeaconPlugin extends CordovaPlugin implements IBeaconConsumer {

    private Context context;
    private IBeaconManager iBeaconManager;
    private HashMap<Region,CallbackContext> rangingCallbacks = new HashMap<Region,CallbackContext>();
    private HashMap<Region,CallbackContext> monitoringCallbacks = new HashMap<Region,CallbackContext>();

    @Override
    public void onIBeaconServiceConnect() {

        initMonitorNotifier();
        initRangeNotifier();

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

    private void startAdvertising(JSONArray args, final CallbackContext callbackContext) {

    }

    private void stopAdvertising(JSONArray args, final CallbackContext callbackContext) {

    }

    private void isAdvertising(JSONArray args, final CallbackContext callbackContext) {

    }

    private void startMonitoringForRegion(JSONArray args, final CallbackContext callbackContext) {

        try {
            Region region = JSONHelper.mapRegion(args.getJSONObject(0));
            monitoringCallbacks.put(region, callbackContext);
            iBeaconManager.startMonitoringBeaconsInRegion(region);
        } catch (RemoteException e) {
        } catch (JSONException e) {
        }

    }

    private void stopMonitoringForRegion(JSONArray args, final CallbackContext callbackContext) {

        try {
            Region region = JSONHelper.mapRegion(args.getJSONObject(0));
            monitoringCallbacks.remove(region);
            iBeaconManager.stopMonitoringBeaconsInRegion(region);
        } catch (RemoteException e) {
        } catch (JSONException e) {
        }

    }

    private void startRangingBeaconsInRegion(JSONArray args, final CallbackContext callbackContext) {

        try {
            Region region = JSONHelper.mapRegion(args.getJSONObject(0));
            rangingCallbacks.put(region, callbackContext);
            iBeaconManager.startRangingBeaconsInRegion(region);
        } catch (RemoteException e) {
        } catch (JSONException e) {
        }

    }

    private void stopRangingBeaconsInRegion(JSONArray args, final CallbackContext callbackContext) {

        try {
            Region region = JSONHelper.mapRegion(args.getJSONObject(0));
            rangingCallbacks.remove(region);
            iBeaconManager.stopRangingBeaconsInRegion(region);
        } catch (RemoteException e) {
        } catch (JSONException e) {
        }

    }

    private void initMonitorNotifier() {

        iBeaconManager.setMonitorNotifier(new MonitorNotifier() {

            @Override
            public void didEnterRegion(Region region) {
                Log.i("IBeaconManager", "I just saw an iBeacon for the firt time!");
            }

            @Override
            public void didExitRegion(Region region) {
                Log.i("IBeaconManager", "I no longer see an iBeacon");
            }

            @Override
            public void didDetermineStateForRegion(int state, Region region) {}

        });

    }

    private void initRangeNotifier() {

        iBeaconManager.setRangeNotifier(new RangeNotifier() {

            @Override
            public void didRangeBeaconsInRegion(Collection<IBeacon> iBeacons, Region region) {

                CallbackContext rangingCallback = rangingCallbacks.get(region);

                if (rangingCallback != null) {
                    try {
                        JSONObject jsonResult = new JSONObject();
                        jsonResult.put("beacons", JSONHelper.mapIBeacons(iBeacons));
                        jsonResult.put("region", JSONHelper.mapRegion(region));

                        PluginResult result = new PluginResult(PluginResult.Status.OK, jsonResult);
                        result.setKeepCallback(true);
                        rangingCallback.sendPluginResult(result);
                    } catch (JSONException e) {
                        rangingCallback.error("JSONException was thrown");
                    }
                }

            }

        });

    }

}

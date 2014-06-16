package eu.mobilion.ibeacon;

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

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.LinkedList;
import java.util.ListIterator;
import java.util.HashMap;

public class IBeaconPlugin extends CordovaPlugin implements IBeaconConsumer {

    private Context context;
    private boolean isServiceConnected = false;
    private LinkedList<Command> commandQueue  = new LinkedList<Command>();
    private IBeaconManager iBeaconManager;
    private HashMap<Region,CallbackContext> rangingCallbacks = new HashMap<Region,CallbackContext>();
    private HashMap<Region,CallbackContext> monitoringCallbacks = new HashMap<Region,CallbackContext>();

    @Override
    public void onIBeaconServiceConnect() {

        isServiceConnected = true;

        initMonitorNotifier();
        initRangeNotifier();

        try {
            executeQueuedCommands();
        } catch (JSONException e) {}

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

        if (!isServiceConnected) {
            commandQueue.push(new Command(action, args, callbackContext));
        } else if (action.equals("startAdvertising")) {
            startAdvertising(args, callbackContext);
        } else if (action.equals("stopAdvertising")) {
            stopAdvertising(args, callbackContext);
        } else if (action.equals("isAdvertising")) {
            isAdvertising(args, callbackContext);
        } else if (action.equals("startMonitoringForRegion")) {
            startMonitoringForRegion(args, callbackContext);
        } else if (action.equals("stopMonitoringForRegion")) {
            stopMonitoringForRegion(args, callbackContext);
        } else if (action.equals("startRangingBeaconsInRegion")) {
            startRangingBeaconsInRegion(args, callbackContext);
        } else if (action.equals("stopRangingBeaconsInRegion")) {
            stopRangingBeaconsInRegion(args, callbackContext);
        }

        return isValidAction(action);

    }

    private boolean isValidAction(String action) {

        List<String> validActions = Arrays.asList(
                "startMonitoringForRegion",
                "stopMonitoringForRegion",
                "startRangingBeaconsInRegion",
                "stopRangingBeaconsInRegion"
                );

        return validActions.contains(action);

    }

    private void executeQueuedCommands() throws JSONException {

       ListIterator<Command> itr = commandQueue.listIterator();
       Command c;

       while (itr.hasNext()) {
           c = itr.next();
           execute(c.getAction(), c.getArgs(), c.getCallbackContext());
           itr.remove();
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
            public void didEnterRegion(Region region) {}

            @Override
            public void didExitRegion(Region region) {}

            @Override
            public void didDetermineStateForRegion(int state, Region region) {

                CallbackContext monitoringCallback = monitoringCallbacks.get(region);

                if (monitoringCallback != null) {
                    try {
                        JSONObject jsonResult = new JSONObject();
                        jsonResult.put("state", (state == MonitorNotifier.INSIDE) ? "inside" : "outside");
                        jsonResult.put("region", JSONHelper.mapRegion(region));

                        PluginResult result = new PluginResult(PluginResult.Status.OK, jsonResult);
                        result.setKeepCallback(true);
                        monitoringCallback.sendPluginResult(result);
                    } catch (JSONException e) {
                        monitoringCallback.error("JSONException was thrown");
                    }
                }

            }

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

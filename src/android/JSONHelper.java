package eu.mobilion.ibeacon;

import com.radiusnetworks.ibeacon.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Collection;

public class JSONHelper {

    public static JSONObject mapRegion(Region region) throws JSONException {

        JSONObject json = new JSONObject();

        json.put("uuid", region.getProximityUuid());
        json.put("major", region.getMajor());
        json.put("minor", region.getMinor());
        json.put("identifier", region.getUniqueId());

        return json;

    }

    public static Region mapRegion(JSONObject json) throws JSONException {

        String uniqueId = json.getString("identifier");
        String uuid = json.isNull("uuid") ? null : json.getString("uuid");
        Integer major = json.isNull("major") ? null : json.getInt("major");
        Integer minor = json.isNull("minor") ? null : json.getInt("minor");

        return new Region(uniqueId, uuid, major, minor);

    }

    public static JSONObject mapIBeacon(IBeacon iBeacon) throws JSONException {

        JSONObject json = new JSONObject();

        json.put("uuid", iBeacon.getProximityUuid());
        json.put("major", iBeacon.getMajor());
        json.put("minor", iBeacon.getMinor());
        json.put("rssi", iBeacon.getRssi());
        json.put("proximity", JSONHelper.mapProximity(iBeacon.getProximity()));

        return json;

    }

    public static JSONArray mapIBeacons(Collection<IBeacon> iBeacons) throws JSONException {

        JSONArray json = new JSONArray();

        for (IBeacon iBeacon : iBeacons) {
            json.put(JSONHelper.mapIBeacon(iBeacon));
        }

        return json;

    }

    public static String mapProximity(Integer proximity) {

        String s;

        switch (proximity) {
            case 1: s = "immediate"; break;
            case 2: s = "near"; break;
            case 3: s = "far"; break;
            default: s = "unknown"; break;
        }

        return s;

    }

}

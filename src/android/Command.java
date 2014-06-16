package eu.mobilion.ibeacon;

import org.apache.cordova.*;
import org.json.JSONArray;

public class Command {

    protected String action;
    protected JSONArray args;
    protected CallbackContext callbackContext;

    public Command(String action, JSONArray args, CallbackContext callbackContext) {
        this.action = action;
        this.args = args;
        this.callbackContext = callbackContext;
    }

    public String getAction() {
       return action;
    }

    public JSONArray getArgs() {
       return args;
    }

    public CallbackContext getCallbackContext() {
       return callbackContext;
    }

}

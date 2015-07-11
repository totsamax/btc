#!/usr/bin/env node

var pluginlist = ["com.ionic.keyboard","de.appplant.cordova.plugin.local-notification","org.apache.cordova.console","org.apache.cordova.device","org.apache.cordova.geolocation","org.apache.cordova.vibration"];

var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    console.log(stdout);
}

pluginlist.forEach(function(plug) {
    exec("cordova plugin add " + plug, puts);
});

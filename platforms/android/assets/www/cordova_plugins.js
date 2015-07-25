cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
<<<<<<< HEAD
=======
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
>>>>>>> b1abb3ced6a8e925c5006503956c86a182bca4ac
        "file": "plugins/com.ionic.keyboard/www/keyboard.js",
        "id": "com.ionic.keyboard.keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.vibration/www/vibration.js",
        "id": "org.apache.cordova.vibration.notification",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
<<<<<<< HEAD
=======
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
>>>>>>> b1abb3ced6a8e925c5006503956c86a182bca4ac
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
<<<<<<< HEAD
    "com.ionic.keyboard": "1.0.4",
    "org.apache.cordova.geolocation": "0.3.12",
    "org.apache.cordova.vibration": "0.3.13",
    "org.apache.cordova.console": "0.2.13"
=======
    "org.apache.cordova.device": "0.3.0",
    "org.apache.cordova.geolocation": "0.3.12",
    "com.ionic.keyboard": "1.0.4",
    "org.apache.cordova.vibration": "0.3.13",
    "org.apache.cordova.console": "0.2.13",
    "cordova-plugin-whitelist": "1.0.0"
>>>>>>> b1abb3ced6a8e925c5006503956c86a182bca4ac
}
// BOTTOM OF METADATA
});
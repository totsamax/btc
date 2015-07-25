#!/usr/bin/env node

/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/

<<<<<<< HEAD
var shell = require('shelljs'),
    child_process = require('child_process'),
    Q     = require('q');

get_highest_sdk = function(results){
=======
var child_process = require('child_process'),
    Q     = require('q');

var get_highest_sdk = function(results){
>>>>>>> b1abb3ced6a8e925c5006503956c86a182bca4ac
    var reg = /\d+/;
    var apiLevels = [];
    for(var i=0;i<results.length;i++){
        apiLevels[i] = parseInt(results[i].match(reg)[0]);
    }
<<<<<<< HEAD
    apiLevels.sort(function(a,b){return b-a});
    console.log(apiLevels[0]);
}

get_sdks = function() {
=======
    apiLevels.sort(function(a,b){return b-a;});
    console.log(apiLevels[0]);
};

var get_sdks = function() {
>>>>>>> b1abb3ced6a8e925c5006503956c86a182bca4ac
    var d = Q.defer();
    child_process.exec('android list targets', function(err, stdout, stderr) {
        if (err) d.reject(stderr);
        else d.resolve(stdout);
    });

    return d.promise.then(function(output) {
        var reg = /android-\d+/gi;
        var results = output.match(reg);
        if(results.length===0){
            return Q.reject(new Error('No android sdks installed.'));
        }else{
            get_highest_sdk(results);
        }

        return Q();
    }, function(stderr) {
        if (stderr.match(/command\snot\sfound/) || stderr.match(/'android' is not recognized/)) {
            return Q.reject(new Error('The command \"android\" failed. Make sure you have the latest Android SDK installed, and the \"android\" command (inside the tools/ folder) is added to your path.'));
        } else {
            return Q.reject(new Error('An error occurred while listing Android targets'));
        }
    });
<<<<<<< HEAD
}

module.exports.run = function() {
    return Q.all([get_sdks()]);
}
=======
};

module.exports.run = function() {
    return Q.all([get_sdks()]);
};
>>>>>>> b1abb3ced6a8e925c5006503956c86a182bca4ac


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
package org.apache.cordova;

<<<<<<< HEAD
import java.util.List;

=======
>>>>>>> b1abb3ced6a8e925c5006503956c86a182bca4ac
import org.apache.cordova.CordovaPlugin;

/**
 * This class represents a service entry object.
 */
<<<<<<< HEAD
public class PluginEntry {
=======
public final class PluginEntry {
>>>>>>> b1abb3ced6a8e925c5006503956c86a182bca4ac

    /**
     * The name of the service that this plugin implements
     */
<<<<<<< HEAD
    public String service;
=======
    public final String service;
>>>>>>> b1abb3ced6a8e925c5006503956c86a182bca4ac

    /**
     * The plugin class name that implements the service.
     */
<<<<<<< HEAD
    public String pluginClass;
=======
    public final String pluginClass;
>>>>>>> b1abb3ced6a8e925c5006503956c86a182bca4ac

    /**
     * The pre-instantiated plugin to use for this entry.
     */
<<<<<<< HEAD
    public CordovaPlugin plugin;
=======
    public final CordovaPlugin plugin;
>>>>>>> b1abb3ced6a8e925c5006503956c86a182bca4ac

    /**
     * Flag that indicates the plugin object should be created when PluginManager is initialized.
     */
<<<<<<< HEAD
    public boolean onload;

    private List<String> urlFilters;

=======
    public final boolean onload;
>>>>>>> b1abb3ced6a8e925c5006503956c86a182bca4ac

    /**
     * Constructs with a CordovaPlugin already instantiated.
     */
    public PluginEntry(String service, CordovaPlugin plugin) {
<<<<<<< HEAD
        this(service, plugin.getClass().getName(), true, plugin, null);
=======
        this(service, plugin.getClass().getName(), true, plugin);
>>>>>>> b1abb3ced6a8e925c5006503956c86a182bca4ac
    }

    /**
     * @param service               The name of the service
     * @param pluginClass           The plugin class name
     * @param onload                Create plugin object when HTML page is loaded
     */
    public PluginEntry(String service, String pluginClass, boolean onload) {
<<<<<<< HEAD
        this(service, pluginClass, onload, null, null);
    }
    
    @Deprecated // urlFilters are going away
    public PluginEntry(String service, String pluginClass, boolean onload, List<String> urlFilters) {
        this.service = service;
        this.pluginClass = pluginClass;
        this.onload = onload;
        this.urlFilters = urlFilters;
        plugin = null;
    }

    private PluginEntry(String service, String pluginClass, boolean onload, CordovaPlugin plugin, List<String> urlFilters) {
        this.service = service;
        this.pluginClass = pluginClass;
        this.onload = onload;
        this.urlFilters = urlFilters;
        this.plugin = plugin;
    }

    public List<String> getUrlFilters() {
        return urlFilters;
    }
=======
        this(service, pluginClass, onload, null);
    }

    private PluginEntry(String service, String pluginClass, boolean onload, CordovaPlugin plugin) {
        this.service = service;
        this.pluginClass = pluginClass;
        this.onload = onload;
        this.plugin = plugin;
    }
>>>>>>> b1abb3ced6a8e925c5006503956c86a182bca4ac
}

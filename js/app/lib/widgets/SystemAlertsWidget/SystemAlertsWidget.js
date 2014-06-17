/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _ = require('underscore');
var kt = require('knights-templar');
var BaseView = DT.widgets.ListWidget;
var SystemAlertCollection = DT.lib.SystemAlertCollection;
var columns = require('./columns');
var Palette = require('./SystemAlertsPalette');
var Tabled = DT.lib.Tabled;

/**
 * SystemAlertsWidget
 * 
 * Shows system metric alerts.
 *
*/
var SystemAlertsWidget = BaseView.extend({
    
    initialize: function(options) {
        
        BaseView.prototype.initialize.call(this, options);
        
        this.collection = new SystemAlertCollection();
        this.collection.fetch();

        this.subview('tabled', new Tabled({
            collection: this.collection,
            columns: columns
        }));

        this.subview('palette', new Palette({
            collection: this.collection
        }));
        
    }
    
});

exports = module.exports = SystemAlertsWidget;
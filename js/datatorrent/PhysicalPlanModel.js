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

/**
 * Physical Plan Model
 *
 * Represents the physical plan of an application
 */

var BaseModel = require('./BaseModel');
var PhysicalPlanModel = BaseModel.extend({

    debugName: 'physicalPlan',

    initialize: function(attrs, options) {
        this.appId = options.appId;
    },

    url: function() {
        return this.resourceURL('PhysicalPlan', {
            appId: this.appId
        });
    }


});
exports = module.exports = PhysicalPlanModel;
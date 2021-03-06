/*
* Copyright (c) 2013 DataTorrent, Inc. ALL Rights Reserved.
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
'use strict';

angular.module('app.components.resources.ContainerLogModel', [
  'app.components.resources.BaseModel'
])
.factory('ContainerLogModel', function(BaseModel) {

  var ContainerLogModel = BaseModel.extend({
    debugName: 'Container Log',
    urlKey: 'ContainerLog',
    idAttribute: 'name',
    doNotAppendIdAttribute: true,
    transformResponse: function(raw) {
      var name = this.name;
      var container = _.find(raw.logs, function(c) {
        return c.name === name;
      });
      if (container) {
        return container;
      }
      this.fetchError = new Error('Container log "' + name + '" not found.');
      return {};
    }

  });

  return ContainerLogModel;
});
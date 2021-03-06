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

angular.module('app.pages.ops.appInstance.physicalOperator', [
  'app.settings',
  'app.components.resources.PhysicalOperatorModel',
  'app.components.resources.ApplicationModel',
  'app.components.services.dashboardOptionsFactory',
  'app.pages.ops.appInstance.physicalOperator.widgets.PhysicalOperatorOverview',
  'app.pages.ops.appInstance.physicalOperator.widgets.PortsList',
  'app.pages.ops.appInstance.operators.widgets.metrics',
  'app.pages.ops.appInstance.operators.widgets.OpProperties'
])

// Route
  .config(function($routeProvider, settings) {
    $routeProvider
      .when(settings.pages.PhysicalOperator, {
        controller: 'PhysicalOperatorCtrl',
        templateUrl: 'pages/ops/appInstance/physicalOperator/physicalOperator.html',
        label: 'physicalOperator',
        collection: {
          label: 'physical operators',
          templateUrl: 'pages/ops/appInstance/physicalOperator/breadcrumbTemplate.html',
          orderBy: 'id',
          resource: 'PhysicalOperatorCollection',
          resourceParams: ['appId']
        }
      });
  })

// Controller
  .controller('PhysicalOperatorCtrl', function(
    $scope,
    $routeParams,
    breadcrumbs,
    ApplicationModel,
    PhysicalOperatorModel,
    dashboardOptionsFactory,
    PhysicalOperatorOverviewWidgetDef,
    PortsListWidgetDef,
    OpMetricsWidgetDef,
    OpPropertiesWidgetDef
  ) {

    // Set scope info for use by widgets
    $scope.operatorId = $routeParams.operatorId;
    $scope.appId = $routeParams.appId;

    // Instantiate resources
    $scope.appInstance = new ApplicationModel({
      id: $routeParams.appId
    });
    $scope.appInstance.fetch();

    $scope.physicalOperator = new PhysicalOperatorModel({
      id: $routeParams.operatorId,
      appId: $routeParams.appId
    });

    var fetchPromise = $scope.fetchPromise = $scope.physicalOperator.fetch();

    $scope.physicalOperator.subscribe($scope);
    $scope.$on('$destroy', function() {
      $scope.physicalOperator.unsubscribe();
    });

    // Create widgets arrays
    var widgetDefinitions = [
      new PhysicalOperatorOverviewWidgetDef({ name: 'Overview'}),
      new PortsListWidgetDef({
        name: 'Ports List',
        dataModelArgs: {
          operatorFetchPromise: fetchPromise
        }
      }),
      new OpMetricsWidgetDef({
        name: 'Metrics Chart',
        dataModelArgs: { operatorResource: $scope.physicalOperator },
        size: {
          width: '100%'
        }
      }),
      new OpPropertiesWidgetDef({
        name: 'Properties',
        dataModelArgs: {
          appId: $routeParams.appId,
          operatorFetchPromise: fetchPromise
        },
        size: {
          width: '40%'
        }
      })
    ];
    var defaultLayoutWidgets = [
      { name: 'Overview' },
      { name: 'Ports List' },
      { name: 'Properties' }
    ];

    var metricsLayoutWidgets = [
      { name: 'Overview' },
      { name: 'Metrics Chart' }
    ];

    // Set dashboard options
    $scope.dashboardOptions = dashboardOptionsFactory({
      storageId: 'dashboard.ops.appInstance.physicalOperator',
      widgetDefinitions: widgetDefinitions,
      defaultLayouts: [
        { title: 'metrics', active: false, defaultWidgets: metricsLayoutWidgets },
        { title: 'default', active: true, defaultWidgets: defaultLayoutWidgets }
      ]
    });

  });
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

'use strict';

angular.module('app.components.services.dtText', [])
  /**
   * DataTorrent text package
   *
   * May be used in the future for i18n support
   */
  .service('dtText', ['$filter', '$log', function dtText($filter) {
    
    var textHash = {
      // Labels
      'alert_label'                :  'alert',
      'alloc_mem_mb_label'         :  'allocated mem. (mb)',
      'alloc_mem_label'            :  'allocated mem.',
      'app_data'                   :  'app data',
      'as_of_label'                :  'as of',
      'buffer_server_reads_label'  :  'buffer server reads',
      'buffer_server_writes_label' :  'buffer server writes',
      'buffer_server_reads_ps'     :  'buffer server reads/s',
      'buffer_server_writes_ps'    :  'buffer server writes/s',
      'buffer_server_bps_label'    :  'buffer server size',
      'container_id_label'         :  'container id',
      'container_label'            :  'container',
      'cores_label'                :  'cores',
      'cpu_percentage_label'       :  'cpu %',
      'cpu_sum_label'              :  'total cpu',
      'current_wid_label'          :  'current wID',
      'ended_at_label'             :  'ended at',
      'ended_label'                :  'ended',
      'failed_label'               :  'failed',
      'failure_count_label'        :  'failures',
      'filename_label'             :  'file name',
      'filesize_label'             :  'file size',
      'finished_label'             :  'finished',
      'free_mem_mb_label'          :  'free memory (mb)',
      'host_label'                 :  'host',
      'id_label'                   :  'id',
      'jvm_name_label'             :  'jvm name',
      'killed_label'               :  'killed',
      'latency_ms_label'           :  'latency (ms)',
      'last_heartbeat_label'       :  'last heartbeat',
      'last_triggered'             :  'last triggered',
      'lifetime_label'             :  'lifetime',
      'locality_label'             :  'locality',
      'log_file_label'             :  'log file',
      'logs_label'                 :  'logs',
      'memory_label'               :  'memory',
      'mod_date_label'             :  'last modified',
      'name_label'                 :  'name',
      'num_operators_label'        :  'operators',
      'num_containers_label'       :  'containers',
      'num_partitions_label'       :  'partitions',
      'operator_id_label'          :  'operator id',
      'operator_label'             :  'operator',
      'owner_label'                :  'owner',
      'pending_label'              :  'pending',
      'planned_alloc_ctnrs_label'  :  'planned/alloc. ctnrs',
      'port_label'                 :  'port',
      'ports_label'                :  'ports',
      'process_id_label'           :  'process id',
      'property_name_label'        :  'property',
      'property_value_label'       :  'value',
      'recovery_wid_label'         :  'recovery wID',
      'remaining_licensed_mem'     :  'remaining licensed mem.',
      'running_label'              :  'running',
      'source_label'               :  'source',
      'sinks_label'                :  'sinks',
      'started_label'              :  'started',
      'state_label'                :  'state',
      'status_label'               :  'status',
      'submitted_label'            :  'submitted',
      'total_tuples_label'         :  'total tuples',
      'type_label'                 :  'type',
      'up_for_label'               :  'up for',
      'user_label'                 :  'user',
      // End Labels

      'add a widget'               :  'add a widget',
      'all_logs'                   :  'all logs',
      'clear all widgets'          :  'clear all widgets',
      'current alloc mem'          :  'current alloc mem',
      'current_wid_title'          :  'current window id',
      'Configuration'              :  'Configuration',
      'delete_item'                :  'delete',
      'delete_jar_prompt'          :  'Are you sure you want to delete this jar file? This cannot be undone.',
      'delete_jars_prompt'         :  'Are you sure you want to delete multiple jar files at once? This cannot be undone.',
      'dep_options_title'          :  'Options',
      'dep_choices_title'          :  'Choices',
      'Development'                :  'Development',
      'dt_log'                     :  'datatorrent log',
      'emitted_per_sec'            :  'emitted/s',
      'emitted_total'              :  'total emitted',
      'final_status_title'         :  'Final status of application',
      'gc_log'                     :  'GC log',
      'id'                         :  'id',
      'inspect'                    :  'inspect',
      'kill'                       :  'kill',
      'kill_ctnr_sent_title'       :  'Kill Container Signal Sent',
      'kill_ctnr_sent_text'        :  'The signal to kill this container has been sent. It may take a few moments for the container to terminate.',
      'kill_ctnr_fail_title'       :  'Kill Container Signal Failed',
      'kill_ctnr_fail_text'       :   function(reason) {
        var message = 'An error occurred sending the kill signal to this container. ';
        if (reason) {
          message += 'Server response: ' + reason;
        }
        return message;
      },
      'launch_app'                 :  'launch',
      'licensed_mem_bar_title'     :  function(agent) {
        if (!agent.percentUsedLicenseMB) {
          return 'Memory usage loading or unknown.';
        }
        return 'You are using ' + $filter('byteFilter', agent.usedLicensedMB, 'mb') + ' of ' + $filter('byteFilter', agent.totalLicensedMB, 'mb') + ' licensed memory.';
      },
      'locality_not_assigned'      :  'AUTOMATIC',
      'no action available'        :  'no action available',
      'node'                       :  'node',
      'Operations'                 :  'Operations',
      'ops_main_breadcrumb'        :  'applications',
      'overwrite_file_warning'     :  'A file with this name already exists and will be overwritten.',
      'peak alloc mem'             :  'peak alloc mem',
      'processed_per_sec'          :  'processed/s',
      'processed_total'            :  'total processed',
      'recovery_wid_title'         :  'recovery window id',
      'reset to default widgets'   :  'reset to default widgets',
      'retrieve ended apps'        :  'retrieve ended apps',
      'select an item'             :  'select an item',
      'shutdown'                   :  'shutdown',
      'specify_deps_success_title' :  'Dependencies jars specified',
      'specify_deps_success_text'  :  'The dependency jars you selected and ordered have been specified for the corresponding jar file.',
      'specify_deps_error_title'   :  'Error specifying dependencies',
      'specify_deps_error_text'    :  'An error occurred trying to specify the dependencies for the jar you have selected. ',
      'stdout_log'                 :  'stdout log',
      'stderr_log'                 :  'stderr log',
      'tuples_per_sec'             :  'tuples/s',
      'tuples_total'               :  'total tuples'
    };

    // Inter-dependent text items
    _.extend(textHash, {
      'specify_jars_instructions'  :  'Select one or more dependency jars from the following list labeled "' + textHash.dep_options_title + '", then order them as needed in the "' + textHash.dep_choices_title + '" list.'
    });

    this.get = function(key) {
      if (textHash.hasOwnProperty(key)) {
        return textHash[key];
      }
      // $log.warn('Text item with key="' + key + '" was not found in the text package!');
      return key;
    };

    this.sprintf = function(format) {

      var args = [].slice.call(arguments, 1);
      var i = 0;
      var str = this.get(format);
    
      return str.replace(/%s/g, function() {
        return args[i++];
      });
 
    };

  }]);

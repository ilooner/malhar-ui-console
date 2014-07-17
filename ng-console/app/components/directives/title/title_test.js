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

describe('Directive: title', function () {

  var element, scope, rootScope, compile;

  // load the directive's module
  beforeEach(module('app.components.directives.title'));

  beforeEach(inject(function ($compile, $rootScope) {
    // Cache these for reuse    
    rootScope = $rootScope;
    compile = $compile;

    // Set up the outer scope
    scope = $rootScope.$new();
    scope.message = 'hello';

    // Define and compile the element
    element = angular.element('<div title="Tooltip message: {{ message }}"></div>');
    element = compile(element)(scope);
    scope.$digest();
  }));

  afterEach(function() {
    // tear down here
  });

  it('should replace the title attribute with a tooltip attribute', function() {
    expect(element.attr('tooltip')).toEqual('Tooltip message: {{ message }}');
  });

  it('should get rid of the title attribute', function() {
    expect(element.attr('title')).toBeFalsy();
  });

});
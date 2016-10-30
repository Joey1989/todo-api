'use strict';

/**
 * @ngdoc directive
 * @name taskManagerApp.directive:taskManager
 * @description
 * # taskManager
 */
angular.module('taskManagerApp')
  .directive('taskManager', function () {
    return {
      templateUrl: 'views/manager.html',
      scope:{
      	imported:'=',
        projectId:'='
      },
      restrict: 'E',
      controller: 'taskCtrl'
    };
  });

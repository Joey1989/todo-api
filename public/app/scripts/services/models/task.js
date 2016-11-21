'use strict';

angular.module('taskManagerApp')
  .factory('UserTask', ['appConfig','ApiResource', function (appConfig, ApiResource) {
    return ApiResource.getResource(appConfig.serviceUrls.userTask);
  }]);
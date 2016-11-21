'use strict';

angular.module('taskManagerApp')
    .service('tasksService', ['$rootScope', '$q', 'UserTask', '_', 'AUTH_EVENTS',
        function($rootScope, $q, UserTask, _, AUTH_EVENTS) {
            var self = {
                'loadUserTasks': function() {
                    var deferred = $q.defer();
                    self.userTasksInited = true;
                    UserTask.query().$promise.then(function(response) {
                            if (response.length) {
                                self.userTasks = [];
                                angular.forEach(response, function(task) {
                                    self.userTasks.push(task);
                                });
                            }
                            console.log('Successfully load user tasks:' + JSON.stringify(response));
                            deferred.resolve(response);
                        })
                        .catch(function(err) {
                            console.log('Failed to load user tasks...' + JSON.stringify(err));
                            deferred.reject(err);
                        });
                    return deferred.promise;
                },
                'createUserTask': function(task) {
                    var deferred = $q.defer();
                    UserTask.save(task).$promise.then(function(response) {
                            if (response) {
                                self.userTasks.push(response);
                            }
                            console.log('Successfully posted user tasks');
                            deferred.resolve(response);
                        })
                        .catch(function(err) {
                            console.log('Failed to post user task');
                            deferred.reject(err);
                        });
                    return deferred.promise;
                },
                'updateUserTask': function(taskId, task) {
                    var deferred = $q.defer();
                    UserTask.update({ 'id': taskId }, task).$promise.then(function(response) {
                            self.userTasks[_.findIndex(self.userTasks, { id: Number(taskId) })] = response;
                            console.log('Successfully updated user tasks');
                            deferred.resolve(response);
                        })
                        .catch(function(err) {
                            console.log('Failed to update user task');
                            deferred.reject(err);
                        });
                    return deferred.promise;
                },
                'deleteUserTask': function(taskId) {
                    var deferred = $q.defer();
                    UserTask.remove({ 'id': taskId }).$promise.then(function(response) {
                            if (response) {
                                self.userTasks.splice(_.findIndex(self.userTasks, { id: Number(taskId) }), 1);
                            }
                            deferred.resolve(response);
                        })
                        .catch(function(err) {
                            deferred.reject(err);
                        });
                    return deferred.promise;
                },
                'init': function() {
                    self.userTasks = [];
                    self.selectedTask = {};
                    self.userTasksInited = false;
                },
                'watchers': function(){
                  $rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
                    console.log('login -> reset activityService');
                    self.init();
                  });
                }
            };
            if (!self.userTasksInited) {
                self.init();
                self.watchers();
                self.loadUserTasks();
            }
            return self;
        }
    ]);
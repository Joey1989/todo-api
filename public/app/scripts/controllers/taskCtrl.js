'use strict';

angular.module('taskManagerApp')
    .controller('taskCtrl', ['$scope', '$http', '$uibModal', 'tasksService',
        function($scope, $http, $uibModal, tasksService) {
            $scope.chartData = [];
            $scope.chartOptions = {};
            $scope.donePersent = '';
            $scope.tasksService = tasksService;
            console.log("list:" + JSON.stringify($scope.projectId));
            // $scope.tasksService.load().then(function(){
            // console.log(JSON.stringify($scope.tasksService.tasks));
            $scope.models = {
                'id': $scope.projectId,
                'selected': null,
                'lists': {
                    "toDo": $scope.imported.toDo,
                    "doing": $scope.imported.doing,
                    "done": $scope.imported.done
                }
            };
            // });

            $scope.addTask = function() {
                $scope.tasksService.addTask();
            };

            $scope.removeTask = function(projectId, list, task) {
                $scope.tasksService.removeTask(projectId, list, task);
            };

            // $scope.updateTask = function(projectId,list,task,newTask){console.log(projectId);
            // 	$scope.tasksService.updateTask(projectId,list,task,newTask);
            // };

            $scope.open = function(size) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        projectId: function() {
                            return $scope.projectId;
                        }
                    }
                });
            };

            $scope.moveToNext = function(projectId, type) {
                // console.log("selected:"+JSON.stringify($scope.models.selected));
                $scope.tasksService.moveToNext(projectId, $scope.models.selected, type);
            };
            $scope.moveToBefore = function(projectId, type) {
                // console.log("selected:"+JSON.stringify($scope.models.selected));
                $scope.tasksService.moveToBefore(projectId, $scope.models.selected, type);
            };

            // Model to JSON for demo purpose
            $scope.$watch('models', function(model) {
                $scope.modelAsJson = angular.toJson(model, true);
                if (angular.isDefined(model)) {
                    $scope.tasksService.selectedTask = model.selected;
                }
                $scope.chartData = [{
                    label: "to do",
                    value: $scope.imported.toDo.data.length,
                    color: "#f0ad4e"
                }, {
                    label: "doing",
                    value: $scope.imported.doing.data.length,
                    color: "#5bc0de"
                }, {
                    label: "done",
                    value: $scope.imported.done.data.length,
                    color: "#5cb85c"
                }];
                $scope.chartOptions = {
                    thickness: 100
                };
                $scope.donePersent = $scope.imported.done.data.length / ($scope.imported.toDo.data.length + $scope.imported.doing.data.length + $scope.imported.done.data.length);
                $scope.donePersent = $scope.donePersent > 1 ? 1 : $scope.donePersent;
            }, true);

            // $scope.$watch('models.lists.toDo.data.length', function(task) {
            //   angular.forEach($scope.tasksService.tasks.toDo.data, 
            //     function(task){
            //           task.status = 'toDo';
            //           task.progress = 0;
            //     });
            //   }, true);

            // $scope.$watch('models.lists.doing.data.length', function(task) {
            //   angular.forEach($scope.tasksService.tasks.doing.data, 
            //     function(task){console.log("task:"+JSON.stringify(task));
            //           task.status = 'doing';
            //     });
            //   }, true);

            // $scope.$watch('models.lists.done.data.length', function(task) {
            //   angular.forEach($scope.tasksService.tasks.done.data, 
            //     function(task){
            //           task.status = 'done';
            //           task.progress = 1;
            //     });
            //   }, true);
        }
    ]);
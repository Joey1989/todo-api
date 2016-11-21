'use strict';

angular.module('taskManagerApp')
    .controller('MyTaskCtrl', ['$scope', 'tasksService', '_', '$uibModal',
    	function($scope, tasksService, _, $uibModal){
	    	$scope.task = {
	    		'description':'',
	    		'completed':false
	    	};
	    	$scope.tasks = [];
	    	$scope.tasksService = tasksService;

	    	function loadTasks(){
	    		$scope.tasksService.loadUserTasks().then(function(response){console.log('Successfully load user tasks:'+JSON.stringify(response));

	    		})
	    		.catch(function(){

	    		});
	    	}

	    	$scope.doLoadTasks = function(){
	    		loadTasks();
	    	};
	    	$scope.doCreateTask = function(){console.log(JSON.stringify($scope.task));
	            $scope.tasksService.createUserTask($scope.task).then(function(response){
                    
	            }).catch(function(){

	            });
	    	};
	    	$scope.doUpdateTask = function(id){console.log(id+','+_.findIndex($scope.tasks, {id:Number(id)}));
                $scope.tasksService.updateUserTask(id,$scope.task).then(function(response){

                }).catch(function(err){

                });
	    	};
	    	$scope.doDeleteTask = function(id){
	    		$scope.tasksService.deleteUserTask(id).then(function(response){
  
	    		})
	    		.catch(function(){

	    		});
	    	};

	    	$scope.selectATask = function(task){
                $scope.tasksService.selectedTask = task;
	    	};

	    	$scope.addBlankTask = function(){
	    		var blankTask = {
	    			'description': 'new task',
	    			'completed': false
	    		};
	    		$scope.tasksService.createUserTask(blankTask).then(function(response){
                    
	            }).catch(function(){

	            });
	    	};

	    	$scope.open = function(size) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        // projectId: function() {
                        //     return $scope.projectId;
                        // }
                    }
                });
            };

	    	loadTasks();
    }]);

angular.module('taskManagerApp')
.controller('ModalInstanceCtrl',['$scope','$uibModalInstance','tasksService',
 function ($scope, $uibModalInstance, tasksService) {
 	$scope.tasksService = tasksService;
 	$scope.editedTask = angular.copy($scope.tasksService.selectedTask) || {};
    $scope.formData = {};
    function formTaskData(task){
        if(task.description.length>0){
        	$scope.formData['description'] = task.description;
        }
        if(typeof task.completed === 'boolean' || task.completed === 'true' || task.completed === 'false'){
        	$scope.formData['completed'] = task.completed;
        }
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.doUpdateTask = function(id){
    	formTaskData($scope.editedTask);
        $scope.tasksService.updateUserTask(id,$scope.formData).then(function(response){
            $scope.tasksService.selectedTask = {};
            $uibModalInstance.dismiss('cancel');
        }).catch(function(err){

        });
	};
}]);
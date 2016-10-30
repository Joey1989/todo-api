'use strict';

/**
 * @ngdoc function
 * @name taskManagerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the taskManagerApp
 */
angular.module('taskManagerApp')
  .controller('MainCtrl',['$scope','$http','$uibModal','tasksService',
  	function ($scope,$http,$uibModal,tasksService) {
 //  	$scope.chartData = [];
 //    $scope.chartOptions = {}; 
 //    $scope.donePersent = '';
    $scope.taskModels = [];
    var taskModel = {
      'id':'',
      'selected': null,
      'lists': {
        "toDo": {"meta_data":{"type":"toDo"}}, 
        "doing": {"meta_data":{"type":"doing"}}, 
        "done": {"meta_data":{"type":"done"}}
      }
    };
  	$scope.tasksService = tasksService;	
  	$scope.tasksService.load().then(function(){
  		console.log(JSON.stringify($scope.tasksService.tasks.length));
      angular.forEach(tasksService.tasks,function(task){   console.log("id:"+task['id']);     
        $scope.taskModels.push(angular.copy(taskModel));
        ($scope.taskModels)[$scope.taskModels.length-1].id = task.id;

        ($scope.taskModels)[$scope.taskModels.length-1].lists.toDo['data'] = task['toDo'].data;
        ($scope.taskModels)[$scope.taskModels.length-1].lists.toDo.meta_data.id = task['id'];
        ($scope.taskModels)[$scope.taskModels.length-1].lists.toDo.meta_data.name = task['name'];

        ($scope.taskModels)[$scope.taskModels.length-1].lists.doing['data'] = task['doing'].data;
        ($scope.taskModels)[$scope.taskModels.length-1].lists.doing.meta_data.id = task['id'];
        ($scope.taskModels)[$scope.taskModels.length-1].lists.doing.meta_data.name = task['name'];
        
        ($scope.taskModels)[$scope.taskModels.length-1].lists.done['data'] = task['done'].data;
        ($scope.taskModels)[$scope.taskModels.length-1].lists.done.meta_data.id = task['id'];
        ($scope.taskModels)[$scope.taskModels.length-1].lists.done.meta_data.name = task['name'];
      });
	});

 //    $scope.addTask = function(){
 //    	$scope.tasksService.addTask();
 //    };

 //    $scope.removeTask = function(list,task){
 //        $scope.tasksService.removeTask(list,task);
 //    };

 //    $scope.updateTask = function(list,task,newTask){
 //    	$scope.tasksService.updateTask(list,task,newTask);
 //    };

 //    $scope.open = function (size) {

	//     var modalInstance = $uibModal.open({
	//       animation: $scope.animationsEnabled,
	//       templateUrl: 'myModalContent.html',
	//       controller: 'ModalInstanceCtrl',
	//       size: size,
	//       // resolve: {
	//       //   items: function () {
	//       //     return $scope.items;
	//       //   }
	//       // }
	//     });
	//   };

 //    $scope.moveToNext = function(type){
 //      // console.log("selected:"+JSON.stringify($scope.models.selected));
 //      $scope.tasksService.moveToNext($scope.models.selected, type);
 //    };
 //    $scope.moveToBefore = function(type){
 //      // console.log("selected:"+JSON.stringify($scope.models.selected));
 //      $scope.tasksService.moveToBefore($scope.models.selected, type);
 //    };

 //    // Model to JSON for demo purpose
  //   $scope.$watch('models', function(model) {
  //       $scope.modelAsJson = angular.toJson(model, true);
  //       if(angular.isDefined(model)){
  //       	$scope.tasksService.selectedTask = model.selected;
  //       }
  //       $scope.chartData = [
		//     {label: "to do", value: $scope.tasksService.tasks.toDo.data.length, color: "#f0ad4e"}, 
		//     {label: "doing", value:  $scope.tasksService.tasks.doing.data.length, color: "#5bc0de"},
		//     {label: "done", value: $scope.tasksService.tasks.done.data.length, color: "#5cb85c"}
		// ];
		// $scope.chartOptions = {thickness: 100};
		// $scope.donePersent = $scope.tasksService.tasks.done.data.length/($scope.tasksService.tasks.toDo.data.length+$scope.tasksService.tasks.doing.data.length+$scope.tasksService.tasks.done.data.length);
		// $scope.donePersent = $scope.donePersent>1? 1:$scope.donePersent;
  //   // angular.forEach($scope.tasksService.tasks.doing.data, 
  //   //   function(task){console.log("task:"+JSON.stringify(task));
  //   //         task.status = 'doing';
  //   //   });
  //   }, true);

 //    $scope.$watch('models.lists.toDo.data.length', function(task) {
 //      angular.forEach($scope.tasksService.tasks.toDo.data, 
 //        function(task){
 //              task.status = 'toDo';
 //              task.progress = 0;
 //        });
 //      }, true);

 //    $scope.$watch('models.lists.doing.data.length', function(task) {
 //      angular.forEach($scope.tasksService.tasks.doing.data, 
 //        function(task){console.log("task:"+JSON.stringify(task));
 //              task.status = 'doing';
 //        });
 //      }, true);

 //    $scope.$watch('models.lists.done.data.length', function(task) {
 //      angular.forEach($scope.tasksService.tasks.done.data, 
 //        function(task){
 //              task.status = 'done';
 //              task.progress = 1;
 //        });
 //      }, true);

  }]);

angular.module('taskManagerApp')
.controller('ModalInstanceCtrl',['$scope','$uibModalInstance','tasksService', 'projectId',
 function ($scope, $uibModalInstance, tasksService, projectId) {
 	$scope.tasksService = tasksService;
 	$scope.editedTask = angular.copy($scope.tasksService.selectedTask) || {};
    $scope.projectId = projectId;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.updateTask = function(list,task,newTask){
    	$scope.tasksService.updateTask($scope.projectId,list,task,newTask);
    	$uibModalInstance.dismiss('cancel');
    };
}]);

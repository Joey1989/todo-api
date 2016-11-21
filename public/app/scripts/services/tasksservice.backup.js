'use strict';

/**
 * @ngdoc service
 * @name taskManagerApp.tasksService
 * @description
 * # tasksService
 * Service in the taskManagerApp.
 */
angular.module('taskManagerApp')
  .service('tasksService',['$http', '$q', '$rootScope',
   function ($http,$q,$rootScope) {
  	var self = {
  		'load':function(){console.log("load is called");
  			self.tasksData = [];
  			var deferred = $q.defer();
            $http.get('../tasks.json').then(function(res){
		        self.tasksData = (res.data);
		        // console.log('in service:'+JSON.stringify(self.tasksData));
		        self.assortTasks();
		        deferred.resolve(self.tasks);
		    })
		    .catch(function(err){
		    	console.log('fail to load tasks...');
		    	deferred.reject('error:'+err);
		    });
		    return deferred.promise;
  		},
  		'addFormedTask': function(){
  			self.tasks.push(angular.copy(self.taskModel));
  		},
  		'assortTasks': function(){
  			// console.log("self.tasksData:"+JSON.stringify(self.tasksData));
  			angular.forEach(self.tasksData, function(task){
  				self.addFormedTask();
  				(self.tasks)[self.tasks.length-1].id = task.id;
  				(self.tasks)[self.tasks.length-1].name = task.name;
                angular.forEach(task.tasks, function(ele){
		            switch(ele.status){
		            	case 'toDo':
		            	    (self.tasks)[self.tasks.length-1].toDo['data'].push(ele);
		            	    break;
		            	case 'doing':
		            	    (self.tasks)[self.tasks.length-1].doing['data'].push(ele);
		            	    break;
		            	case 'done':
		            	    (self.tasks)[self.tasks.length-1].done['data'].push(ele);
		            	    break;
		            }
		    	});
  			});
  			
	    	// console.log("self.tasks:"+JSON.stringify(self.tasks));
  		},
  		'addTask':function(){
  			self.tasks.toDo['data'].push({'label': "new task",'content':'add some content..'});
  		},
  		'getProjectById': function(projectId){
  			for(var y=0;y<self.tasks.length;y+=1){
  				if(self.tasks[y].id == projectId){
  					return self.tasks[y];
  				}
  			}
  		},
  		'removeTask':function(projectId,list,task){console.log("called");
  		    console.log(self.tasks.length);
  			for(var y=0;y<self.tasks.length;y+=1){
  				if(self.tasks[y].id == projectId){console.log(JSON.stringify(self.tasks[y]));
                    for(var i=0;i<(self.tasks[y])[list].data.length;i+=1){
                    	var taskItem = (self.tasks[y])[list].data;
                    	console.log(JSON.stringify(task));
			        	if(taskItem[i].id===task.id){
			        		// console.log(JSON.stringify($scope.tasks[list].data));
			        		taskItem.splice(i,1);
			        	}
			        }
  				}
  			}
  		},
  		'updateTask':function(projectId,list,task,newTask){
  			console.log(JSON.stringify(newTask));
  			var selectedProject = self.getProjectById(projectId);
  			// console.log("selectedProject:"+"projectId:"+projectId+","+JSON.stringify(selectedProject));
  			for(var i=0;i<selectedProject[list].data.length;i+=1){
	        	if(selectedProject[list].data[i].id===task.id){
	        		selectedProject[list].data[i].label = newTask.label;
	        		selectedProject[list].data[i].content = newTask.content;
	        		selectedProject[list].data[i].progress = newTask.progress;
	        	}
	        }
  		},
  		'moveToNext':function(projectId, task, type){
  			if(task.id){
  				var selectedProject = self.getProjectById(projectId);
                if(task.status==='toDo' && type==='toDo'){
	            	self.removeTask(projectId,'toDo',task);
	            	task.status = 'doing';
	            	selectedProject.doing['data'].push(task);
	            }
	            else if(task.status==='doing' && type==='doing'){
	            	self.removeTask(projectId,'doing',task);
	            	task.status = 'done';
	            	selectedProject.done['data'].push(task);
	            }
	            else{
	            	return;
	            }
  			}
  		},
  		'moveToBefore':function(projectId, task, type){
  			if(task.id){
  				var selectedProject = self.getProjectById(projectId);
  				if(task.status==='doing' && type==='doing'){
	            	self.removeTask(projectId,'doing',task);
	            	task.status = 'toDo';
	            	selectedProject.toDo['data'].push(task);
	            }
	            else if(task.status==='done' && type==='done'){
	            	self.removeTask(projectId,'done',task);
	            	task.status = 'doing';
	            	selectedProject.doing['data'].push(task);
	            }
	            else{
	            	return;
	            }
  			}
  		},
  	    'watcher': function(){
  	    },
  		'init':function(){
  			self.tasksData = [];
  			self.selectedTask = {};
  			self.tasks = [];
  			self.taskModel = {
  				"id":"",
		    	"toDo": {"data":[],"meta_data":{"type":"toDo"}},
		        "doing": {"data":[],"meta_data":{"type":"doing"}},
		        "done": {"data":[],"meta_data":{"type":"done"}}
		    };
  		}
  	};
  	self.init();
  	self.watcher();
  	return self;
  }]);

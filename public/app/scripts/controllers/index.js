'use strict';

angular.module('taskManagerApp')
    .controller('IndexCtrl', ['$scope','$rootScope','authService','$state',
    	function($scope,$rootScope,authService,$state){
    		console.log('from index.js');
    		$rootScope.authService = authService;
    		$scope.doLogout = function(){console.log('logout clicked');
				authService.logout().then(function(){
					$state.go('home');
				}).catch(function(){
                    $state.go('home');
				});
			};
    		
    }]);
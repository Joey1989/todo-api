'use strict';

angular.module('taskManagerApp')
    .controller('HomeCtrl', ['$scope','$rootScope','authService',
    	function($scope,$rootScope,authService){
    		$rootScope.authService = authService;
    		$scope.title = 'this is title';
    		
    }]);
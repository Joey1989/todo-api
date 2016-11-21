'use strict';

angular.module('taskManagerApp')
    .controller('testCtrl', ['$scope', '$http',
    	function($scope, $http){
    		console.log('testctrl loaded');
	        $scope.testSignin = function(){console.log('clicked');
	        	$http.post('http://localhost:3001/users',{'email':'liu2@yahoo.com','password':'lzy1234'}).success(function(res){
	                console.log('res:'+JSON.stringify(res));
	        	}).error(function(err){
	                console.log('err:'+JSON.stringify(err));
	        	});
	        };
    }]);
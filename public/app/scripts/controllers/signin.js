'use strict';

angular.module('taskManagerApp')
    .controller('SigninCtrl', ['$scope', 'authService', '$state',
    	function($scope, authService, $state){
    		console.log('signin controller loaded');
    		$scope.signin = {
    			'email':'',
    			'password':''
    		};
            $scope.signup = {
                'email':'',
                'password':''
            };
            $scope.warningInfo = '';

            function clearFormFields(){
                $scope.signin = {
                    'email':'',
                    'password':''
                };
                $scope.signup = {
                    'email':'',
                    'password':''
                };
            }

    		$scope.doSignin = function(credentials){
                authService.login(credentials).then(function(){
                    $state.go('myTasks');
                })
                .catch(function(){
                    clearFormFields();
                    $scope.warningInfo = 'Incorresct credentials, please try again.';
                });
    		};

            $scope.doSignUp = function(credentials){
                authService.register(credentials).then(function(){
                    $scope.doSignin(credentials);
                })
                .catch(function(err){
                    clearFormFields();
                    $scope.warningInfo = 'Failed to sign up, due to:'+err.errors[0].message+'. Please try again.';
                });
            };
    }]);
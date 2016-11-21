'use strict';

angular.module('taskManagerApp')
.factory('httpInterceptor',['$q','$injector','appConfig', 'localStorageService',
	function($q,$injector,appConfig,localStorageService){
        var self = {
            'request': function(config) { 
	            if(config.url.indexOf(appConfig.apiBaseURL) > -1){
		            config.headers = config.headers || {};
		            config.headers['Cache-Control'] = 'no-cache';
		            config.params = config.params || {};
		            config.data = config.data || {};
		            var token = localStorageService.get('token');
		            if(token){
	                	config.headers.Auth = token;
		            }
	            }
	            return config || $q.when(config);
	        },
	        'response': function( response ) {
	            return( response );
	        },
	        'responseError': function( response ) {
	            if(response.status === 401 && response.config.url.indexOf(appConfig.apiBaseURL) > -1){
		            if($injector.get('$state').current.name!=='signin' && typeof response.data !== 'undefined' && (response.statusText==='Unauthorized' || response.data.error === 'token_expired' || response.data.error === 'token_not_provided')){
						$injector.get('authService').logout();
						$injector.get('$state').go('home',{});
		            }
	            }  
	            return( $q.reject( response ) );
	        } 
	    };
        return self;
	}]);
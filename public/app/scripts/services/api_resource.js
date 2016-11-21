'use strict';

angular.module('taskManagerApp')
  .factory('ApiResource', ['$resource','$httpParamSerializerJQLike', 'appConfig', 
    function ($resource, $httpParamSerializerJQLike, appConfig) {
		return {
			getResource : function(url, isMultipart)
			{ 
				var headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'};
				// var headers = {'Content-Type': 'application/json; charset=utf-8'};
				var transformRequest = function(data){
					if(data === undefined){
						return data;
					}
					return $httpParamSerializerJQLike(data);
				};
				if(isMultipart)
				{
					headers = {'Content-Type': undefined};
					transformRequest = function(data){
					    var fd = new FormData();
			            angular.forEach(data, function(value, key) {
			            	console.log(key, value);
			            	if (key === 'attachments') {
			            		for (var item in value) {
			            			fd.append('attachments[]', value[item]);
			            		}
			            	} else if (value && value[0] && (key === 'to[]' || key === 'cc[]' || key === 'bcc[]')){
			            		//console.log(value[0]);
			            		for (var item1 in value) {
			            			fd.append(key, value[item1]);
			            		}
			            	} else {
								fd.append(key, value);
			            	}
			            });
			            return fd;	  						
					};	  					
				}
				return $resource(appConfig.apiBaseURL+url,{id: '@id', page: '@page'},{
					query: {
						isArray: true,
						params: {page: '@page'}
	            	},
					save: {
						method: 'POST',
						headers : headers,
						transformRequest: transformRequest
					},
					update: {
						method: isMultipart ? 'POST' : 'PUT',
						headers : headers,
						transformRequest: transformRequest,
						params: {id: '@id','_method':'PUT'}
					}
				});
			}
		};
	}
]);
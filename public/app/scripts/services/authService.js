'use strict';

angular.module('taskManagerApp')
.factory('authService',['$http', 'localStorageService', '$rootScope', 'appConfig', '$q', 'AUTH_EVENTS',
  function($http, localStorageService, $rootScope, appConfig, $q, AUTH_EVENTS){
    var self = {
      'isLoggedIn': function(){
        if(localStorageService.get('isLogged')){
          return true;
        } else {
          return false;
        }
      },
      'getUser': function(){
        if(localStorageService.get('isLogged')){
          return localStorageService.get('user');
        } else {
          return null;
        }
      },
      'register': function(credentials){console.log(JSON.stringify(credentials));
        var deferred = $q.defer();
        var formattedUser = {
          // 'firstname' : credentials.firstName,
          // 'lastname' : credentials.lastName,
          'email' : credentials.email,
          'password' : credentials.password
          // 'password_confirmation' : credentials.password_confirmation
        };
        $http.post(appConfig.apiBaseURL+appConfig.serviceUrls.register, formattedUser).success(function(data, status, header){
          localStorageService.set('token', header('Auth'));
          localStorageService.set('user', data);
          localStorageService.set('isLogged', true);
          self.user = data.data;
          deferred.resolve(data); 
        })
        .error(function(err){
          deferred.reject(err);
        });
        return deferred.promise;
      },
      'login': function(credentials){
        var deferred = $q.defer(); 
        $http.post(appConfig.apiBaseURL+appConfig.serviceUrls.authenticate, credentials).success(function(data, status, header){
          localStorageService.set('token', header('Auth'));
          localStorageService.set('user', data);
          localStorageService.set('isLogged', true);
          self.user = data.data;
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess,localStorageService.get('user')); 
          console.log("Successfully loged in -> broadcast...");
          deferred.resolve(data);
        })
        .error(function(err){
          localStorageService.remove('token');
          localStorageService.remove('user');
          localStorageService.set('isLogged', false); 
          self.user = null;
          deferred.reject(err);
        });
        return deferred.promise;
      }, 
      'logout': function(){
        var deferred = $q.defer(); 
        $http.delete(appConfig.apiBaseURL+appConfig.serviceUrls.authenticate).success(function(data){
          $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess,localStorageService.get('user'));
          localStorageService.remove('token');
          localStorageService.remove('user');
          localStorageService.set('isLogged', false); 
          self.user = null;
          deferred.resolve(data);
          console.log("Successfully logged out -> broadcast...");
        })
        .error(function(err){
          deferred.reject(err);
          console.log('failed...');
        });
        return deferred.promise;  
      },
      'update': function(user){
        localStorageService.set('user', user);
        self.user = user;
        console.log("User data updated");
      },
      'watchers': function(){
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
          self.user = localStorageService.get('user');
          console.log('login -> reset User obj');
        });
      },
      'init': function(){
        self.user = localStorageService.get('user');
        self.token = localStorageService.get('token');
      }
    };
    self.init();
    self.watchers();
    return self;
}]);
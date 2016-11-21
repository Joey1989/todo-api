'use strict';

/**
 * @ngdoc overview
 * @name taskManagerApp
 * @description
 * # taskManagerApp
 *
 * Main module of the application.
 */
angular
  .module('taskManagerApp', [
    'ngResource',
    'dndLists',
    'ui.bootstrap',
    'n3-pie-chart' ,
    'ui.tab.scroll',
    'ui.router',
    'LocalStorageModule',
    'underscore'
  ])
  .service('appConfig', ['$location', function($location) {
    var staging  = '';
    var port     = 'localhost:3001/';
    var protocol = 'http';

    if($location.protocol()==='https'){
        protocol = 'https';
        staging = 'joey-todo-api.herokuapp.com/';
        port = '';
    }
    return {
        'apiBaseURL': protocol+'://'+staging+port,
        'serviceUrls': {
              'register' : 'users',
              'authenticate' : 'users/login',
              'accessToken' : 'access_token',
              'reqestEmail' : 'password/email',
              'resetPassword': 'password/reset',
              'userTask': 'todos/:id'
        }
    }
  }])
  .config(function(scrollableTabsetConfigProvider){
    scrollableTabsetConfigProvider.setShowTooltips (true);
    scrollableTabsetConfigProvider.setTooltipLeftPlacement('bottom');
    scrollableTabsetConfigProvider.setTooltipRightPlacement('left');
  })
  .config(['$stateProvider', '$sceProvider', '$httpProvider','localStorageServiceProvider',
    function($stateProvider, $sceProvider, $httpProvider, localStorageServiceProvider) {

    localStorageServiceProvider
      .setPrefix('taskManagerApp')
      .setStorageType('localStorage');

    $httpProvider.interceptors.push('httpInterceptor');
  }])
  .constant('AUTH_EVENTS', {
      'loginSuccess': 'auth-login-success',
      'loginFailed': 'auth-login-failed',
      'logoutSuccess': 'auth-logout-success',
      'authTimeout': 'auth-timeout',
      'authenticated' : 'auth-authenticated',
      'notAuthenticated': 'auth-not-authenticated',
      'notAuthorized': 'auth-not-authorized'
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('root',{
      url: '/',
      views: {
        'main': {
          template: '<div></div>',
          controller: ['authService','$state',
            function(authService,$state){
              $state.go('home');
          }]
        }
      }
    }).state('home',{
      url: '/home',
      views:{
        'main':{
          templateUrl: 'views/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('signin', {
        url:'/signin',
        views:{
            'main': {
                templateUrl: 'views/auth/signin.html',
                controller: 'SigninCtrl'
            }
        }
    })
    .state('signup', {
        url:'/signup',
        views:{
            'main': {
                templateUrl: 'views/auth/signup.html',
                controller: 'SigninCtrl'
            }
        }
    })
    .state('myTasks', {
      url: '/myTasks',
      views:{
        'main':{
          templateUrl: 'views/tasks/myTasks.html',
          controller: 'MyTaskCtrl'
        }
      }
    })
    .state('test',{
      url: '/test',
      views:{
        'main':{
          templateUrl: 'views/test.html',
          controller: 'testCtrl'
        }
      }
    });
  });

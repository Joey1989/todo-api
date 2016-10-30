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
    'ui.tab.scroll'
  ])
  .config(function(scrollableTabsetConfigProvider){
  scrollableTabsetConfigProvider.setShowTooltips (true);
  scrollableTabsetConfigProvider.setTooltipLeftPlacement('bottom');
  scrollableTabsetConfigProvider.setTooltipRightPlacement('left');
});

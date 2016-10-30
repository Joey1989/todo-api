'use strict';

describe('Controller: ManagerctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('taskManagerApp'));

  var ManagerctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManagerctrlCtrl = $controller('ManagerctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManagerctrlCtrl.awesomeThings.length).toBe(3);
  });
});

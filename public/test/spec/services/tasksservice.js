'use strict';

describe('Service: tasksService', function () {

  // load the service's module
  beforeEach(module('taskManagerApp'));

  // instantiate service
  var tasksService;
  beforeEach(inject(function (_tasksService_) {
    tasksService = _tasksService_;
  }));

  it('should do something', function () {
    expect(!!tasksService).toBe(true);
  });

});

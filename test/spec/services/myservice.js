'use strict';

describe('Service: myservice', function () {

  // load the service's module
  beforeEach(module('magicMissionAppApp'));

  // instantiate service
  var myservice;
  beforeEach(inject(function (_myservice_) {
    myservice = _myservice_;
  }));

  it('should do something', function () {
    expect(!!myservice).toBe(true);
  });

});

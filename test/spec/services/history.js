'use strict';

describe('Service: history', function () {

  // load the service's module
  beforeEach(module('tweetsOnMapApp'));

  // instantiate service
  var history;
  beforeEach(inject(function (_history_) {
    history = _history_;
  }));

  it('should do something', function () {
    expect(!!history).toBe(true);
  });

});

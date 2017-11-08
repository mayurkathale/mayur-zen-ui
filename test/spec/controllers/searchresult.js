'use strict';

describe('Controller: SearchresultCtrl', function () {

  // load the controller's module
  beforeEach(module('tweetsOnMapApp'));

  var SearchresultCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchresultCtrl = $controller('SearchresultCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SearchresultCtrl.awesomeThings.length).toBe(3);
  });
});

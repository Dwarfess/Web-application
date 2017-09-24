describe("Test", function () {

    //arrange
    var mockScope, controller, backend;

    beforeEach(angular.mock.module("app"));
	
	beforeEach(angular.mock.inject(function ($controller, $rootScope) {    
        //create new scope
        mockScope = $rootScope.$new();

        controller = $controller("ctrl", {
            $scope: mockScope
        });
    }));
	
    it("check $scope.bg", function () {
        //if the controller is working correctly, then after its creation it will contain the value bg = false
        expect(mockScope.bg).toEqual(false);
    })
    it("change $scope.bg", function () {
        //after running the showForms function, the value should change to "true"
        mockScope.showForms(true);
        expect(mockScope.bg).toEqual(true);
    });
});

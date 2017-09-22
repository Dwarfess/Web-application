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
	
	
	beforeEach(angular.mock.inject(function ($controller, $rootScope, $http) {
        mockScope = $rootScope.$new();
        $controller("ctrl", {
            $scope: mockScope,
            $http: $http
        });
    }));
	
	it("data processing", function () {
		mockScope.refresh();
        expect(mockScope.json).toBeDefined();
        expect(mockScope.json.length).toEqual(3);
    });
	
	it("check value some properties", function (){
		mockScope.refresh();
        expect(mockScope.json[0][0].id).toEqual(28897);
        expect(mockScope.json[1][1].name).toEqual("LG 24LH480U");
        expect(mockScope.json[2][2].price).toEqual("870$");
    });

});

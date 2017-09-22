var app = angular.module("app", []);

app.controller("ctrl", function ($scope, $http){
    
    $scope.group = function(n){    
    //localStorage.clear();
        if(localStorage.getItem('json') == null){
            //get JSON file by dint of $http
            $http.get('tasks.json').success(function(result){
                console.log('success', result);
                $scope.json = result;
                $scope.numOfGroup = n;
                $scope.items = $scope.json[$scope.numOfGroup-1];
                $scope.saveJson();
            })
            .error(function(result){
                console.log('error');
            });
            
        }else{
            $scope.json = JSON.parse(localStorage.getItem('json'));
            $scope.numOfGroup = n;
            $scope.items = $scope.json[$scope.numOfGroup-1];    
        }

        
        //present view
        $scope.currentView = "table";
        
    }
    
    $scope.group(1);//starting view
    
    //PUT request to save to backend
    $scope.saveJson = function () {
        localStorage.setItem("json", JSON.stringify($scope.json));
    }
    
    
    //present view
    $scope.currentView = "table";
    
                        //FOR LOGIN AND REGISTRATION
    $scope.bg = false;//fixed background 
    $scope.log = false;//form for login
    $scope.reg = false;//form for registration
    
    $scope.showForms = function(x,y,z){  //fuction for bg, log and reg
        $scope.bg = x;
        $scope.log = y;
        $scope.reg = z;
    }
    
    //create array with users
    if(localStorage.getItem('users') == null){
        $scope.users = [{"name":"Admin", "email":"admin@ua.fm", "pass":"1"}];
        localStorage.setItem("users", JSON.stringify($scope.users));
        console.log($scope.users);
    }else{
        $scope.users = JSON.parse(localStorage.getItem('users'));
        console.log($scope.users);
    }
    
    //add new users
    $scope.addNewUser = function (newUser) {
        $scope.existingName = false;//error - this name exists
        
        //check such name
        let notFound = true; 
        for(let i = 0; i<$scope.users.length; i++){
            if($scope.newUser.name.toUpperCase() == $scope.users[i].name.toUpperCase()){
                notFound = false;
                $scope.existingName = true;
            }
        }
        
        //if name like this didn't find, adds new user
        if(notFound){
            $scope.users.push(newUser); 
            $scope.bg = false;
            $scope.reg = false;
            localStorage.setItem("users", JSON.stringify($scope.users));
            console.log($scope.users);
        }
    }
    
    $scope.online = {"logged":true};//info about logged user
    
    $scope.logIn = function(){//for login into the site
        $scope.wrongPass = false;//hide error in the login
        
        let notFound = true; 
        for(let i = 0; i<$scope.users.length; i++){
            if($scope.user.name.toUpperCase() == $scope.users[i].name.toUpperCase()){
                if($scope.user.pass == $scope.users[i].pass){
                    $scope.online.logged = false;//check logged in or not
                    $scope.online.name = $scope.users[i].name;//add user name
                    notFound = false;//for error in the login
                    $scope.bg = false;
                    $scope.log = false;
                }else $scope.wrongPass = true;//show error in the password  
            }
        }
        
        if(notFound && !$scope.wrongPass) {//show error in the login
            $scope.wrongName = true;
        }
    }
    
    $scope.logOut = function(){//for log out from the site
        $scope.online.logged = true;
        $scope.currentView = "table";
    }
    
    
                        //FOR ERRORS WHEN FILLING THE FORMS
    $scope.getError = function (error, type) {
        if (angular.isDefined(error)) {
            if (error.required) {
                return "Fill the field";
            } else if (error.email) {
                return "Wrong email";
            } else if (error.pattern && type){
                return "Wrong password";
            }
        }
    } 
    
                        //OPTION FOR REGISTERED USERS
    //select pressed item 
    $scope.show = function(item){
        if(!$scope.online.logged){
            $scope.info = item;
            $scope.currentView = "info"
        }else{
            $scope.bg = true; 
            $scope.log = true;
        }
    }
    
    //return to present view
    $scope.back = function(){
        $scope.currentView = "table";
    }

    //getting all the data from the model
    $scope.refresh = function () {
        //get JSON file by dint of $http
            $http.get('tasks.json').success(function(result){
                console.log('success', result);
                $scope.json = result;
                $scope.items = $scope.json[$scope.numOfGroup-1];
                $scope.saveJson();
            })
            .error(function(result){
                console.log('error');
            });
        return $scope.json;
    }
    
    //create new element
    $scope.create = function (item) {
        $scope.items.push(item);
        $scope.items[$scope.items.length-1].id = Math.trunc(Math.random()*100000);
        $scope.items[$scope.items.length-1].group = $scope.items[0].group;
        $scope.currentView = "table";
        $scope.saveJson();
    }

    //update element
    $scope.update = function (item) {
        for (var i = 0; i < $scope.items.length; i++) {
            if ($scope.items[i].id == item.id) {
                $scope.items[i] = item;
                break;
            }
        }
        $scope.saveJson();
        $scope.info = item;
        $scope.currentView = "info"
    }

    //delete element from model
    $scope.delete = function (item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
        $scope.currentView = "table";
        $scope.saveJson();
    }

    //edit or create new element
    $scope.editOrCreate = function (item, view) {
        $scope.currentItem = item ? angular.copy(item) : {};
        $scope.currentView = "edit";
        $scope.view = view;
        $scope.saveJson();
    }

    //save changes
    $scope.saveEdit = function (item) {
        if (angular.isDefined(item.id)) {
            $scope.update(item);
        } else {
            $scope.create(item);
        }
    }

    //cancel changes and return to present table
    $scope.cancelEdit = function (item) {
        $scope.currentItem = {};
        $scope.currentView = $scope.view;
    }
});





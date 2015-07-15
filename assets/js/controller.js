var app = angular.module("app", ["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
    .when("/:idioma/home", {
        templateUrl: "/views/home.html?d="+Date.now(),
        controller: "homeController"
    })
    .otherwise({
        redirectTo: "/es/home"
    });
});
app.controller("appController", function($scope){
    console.log("angular");    
});

app.controller("homeController", function($scope, $routeParams, $http){
    var idioma = $routeParams.idioma || "es";
    $http.get("/home_language", {
        params: {
            language: idioma
        }
    }).success(function(data){
        console.log(data);    
    });
});
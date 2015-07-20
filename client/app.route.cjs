app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('main', {
            url: "/",
            controller: "main",
            templateUrl: "/client/pages/main/main.html"
        })
        .state('profile', {
            url: "/:id",
            controller: "profile",
            templateUrl: "/client/pages/profile/profile.html"
        })
        .state('register', {
            url: "/user/register",
            controller: "register",
            templateUrl: "/client/pages/register/register.html"
        });

});

app.config(["$locationProvider", function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);
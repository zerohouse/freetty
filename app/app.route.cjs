app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('main', {
            url: "/",
            controller: "main",
            templateUrl: "/app/pages/main/main.html"
        })
        .state('profile', {
            url: "/:url",
            controller: "profile",
            templateUrl: "/app/pages/profile/profile.html"
        })
        .state('register', {
            url: "/user/register?email",
            controller: "register",
            templateUrl: "/app/pages/register/register.html"
        })
        .state('login', {
            url: "/user/login?email",
            controller: "login",
            templateUrl: "/app/pages/login/login.html"
        })
        .state('article', {
            url: "/article/:_id?mod",
            controller: "article",
            templateUrl: "/app/pages/article/article.html"
        });

});

app.config(["$locationProvider", function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);
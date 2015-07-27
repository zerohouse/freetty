app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('services', {
            url: "/",
            controller: "services",
            templateUrl: "/app/pages/services/services.html"
        })
        .state('profile', {
            url: "/:url?state",
            controller: "profile",
            templateUrl: "/app/pages/profile/profile.html"
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
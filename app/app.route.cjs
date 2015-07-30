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
        })
        .state('artist-register', {
            url: "/register/artist",
            controller: "artist.register",
            templateUrl: "/app/pages/artist-register/artist-register.html"
        })
        .state('artist-register.step1', {
            url: "/step1",
            controller: "artist.register",
            templateUrl: "/app/pages/artist-register/step1/step1.html"
        })
        .state('artist-register.step2', {
            url: "/step2",
            controller: "artist.register",
            templateUrl: "/app/pages/artist-register/step2/step2.html"
        })
        .state('artist-register.step3', {
            url: "/step3",
            controller: "artist.register",
            templateUrl: "/app/pages/artist-register/step3/step3.html"
        });


});

app.config(["$locationProvider", function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);
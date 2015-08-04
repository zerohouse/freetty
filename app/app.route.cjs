app.config(["$locationProvider", function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('main', {
            url: "/",
            controller: "main",
            templateUrl: "/app/pages/main/main.html"
        })
        .state('profile', {
            url: "/:url?state",
            controller: "profile",
            templateUrl: "/app/pages/profile/profile.html"
        })
        .state('article', {
            url: "/article/:_id?scroll",
            controller: "article",
            templateUrl: "/app/pages/article/article.html"
        })
        .state('edit', {
            url: "/article/:_id/edit",
            controller: "edit",
            templateUrl: "/app/pages/article/edit/edit.html"
        })
        .state('artist-register-step1', {
            url: "/register/step1",
            controller: "artist.register",
            templateUrl: "/app/pages/artist-register/step1/step1.html"
        })
        .state('artist-register-step2', {
            url: "/register/step2",
            controller: "artist.register",
            templateUrl: "/app/pages/artist-register/step2/step2.html"
        })
        .state('artist-register-step3', {
            url: "/register/step3",
            controller: "artist.register",
            templateUrl: "/app/pages/artist-register/step3/step3.html"
        })
        .state('artist-register-step4', {
            url: "/register/step4",
            controller: "artist.register",
            templateUrl: "/app/pages/artist-register/step4/step4.html"
        });


});

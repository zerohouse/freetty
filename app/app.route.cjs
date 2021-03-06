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
        .state('search', {
            url: "/service/search" +
            "",
            controller: "search",
            templateUrl: "/app/pages/search/search.html",
            nav: "affixed"
        })
        .state('message', {
            url: "/service/message?state",
            controller: "message",
            templateUrl: "/app/pages/message/message.html",
            nav: "affixed"
        })
        .state('profile', {
            url: "/:url?state",
            controller: "profile",
            templateUrl: "/app/pages/profile/profile.html",
            nav: "affixed"
        })
        .state('article', {
            controller: "article",
            templateUrl: "/app/pages/article/article.html",
            url: "/article/:_id?scroll",
            nav: "affixed"
        })
        .state('edit', {
            nav: "affixed",
            url: "/article/:_id/edit",
            controller: "edit",
            templateUrl: "/app/pages/article/edit/edit.html"
        })
        .state('artist-register-step1', {
            nav: "affixed",
            url: "/register/step1",
            controller: "artist.register",
            templateUrl: "/app/pages/artist-register/step1/step1.html"
        })
        .state('artist-register-step2', {
            nav: "affixed",
            url: "/register/step2",
            controller: "artist.register",
            templateUrl: "/app/pages/artist-register/step2/step2.html"
        })
        .state('artist-register-step3', {
            nav: "affixed",
            url: "/register/step3",
            controller: "artist.register",
            templateUrl: "/app/pages/artist-register/step3/step3.html"
        })
        .state('artist-register-step4', {
            nav: "affixed",
            url: "/register/step4",
            controller: "artist.register",
            templateUrl: "/app/pages/artist-register/step4/step4.html"
        });


});

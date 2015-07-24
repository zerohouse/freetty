app.directive('articleHead', function (users) {
    return {
        restrict: 'A',
        scope: {
            articleHead: '='
        },
        templateUrl: "/app/directives/article-head/article-head.html",
        controller: function ($scope) {
            $scope.users = users;
        },
        link: function (s) {
            s.article = s.articleHead;
        }

    }
});
app.directive('articleHead', function (users) {
    return {
        restrict: 'E',
        scope: {
            article: '='
        },
        templateUrl: "/app/directives/article-head/article-head.html",
        controller: function ($scope) {
            $scope.users = users;
        }
    }
});
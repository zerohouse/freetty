app.directive('userPhoto', function (users) {

    return {
        restrict: 'E',
        templateUrl: '/client/directives/user-photo/user-photo.html',
        scope: {
            user: '='
        },
        controller: function ($scope) {
            console.log($scope.user);
            users($scope.user, function (user) {
                $scope.user = user;
                console.log($scope.user);
            });
        }

    }
});
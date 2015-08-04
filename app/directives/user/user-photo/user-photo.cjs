app.directive('userPhoto', function (users) {

    return {
        restrict: 'A',
        templateUrl: '/app/directives/user/user-photo/user-photo.html',
        scope: {
            userPhoto: '='
        },
        controller: function ($scope) {
            $scope.$watch('userPhoto', function () {
                if ($scope.userPhoto == undefined)
                    return;
                users($scope.userPhoto, function (user) {
                    $scope.user = user;
                });
            });

            var defaultImg = '/dist/profile.jpg';

            $scope.$watch('user', function () {
                if ($scope.user == undefined)
                    return defaultImg;
                $scope.photo = $scope.user.photo == undefined ? defaultImg : '/uploads/' + $scope.user.photo;
            });

        }

    }
});
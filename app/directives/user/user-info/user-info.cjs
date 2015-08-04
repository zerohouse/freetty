app.directive('userInfo', function (users) {

    return {
        restrict: 'A',
        templateUrl: '/app/directives/user/user-info/user-info.html',
        scope: {
            userInfo: '='
        },
        controller: function ($scope) {
            $scope.$watch('userInfo', function () {
                if ($scope.userInfo == undefined)
                    return;
                users($scope.userInfo, function (user) {
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
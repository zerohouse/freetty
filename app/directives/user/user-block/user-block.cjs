app.directive('userBlock', function (users) {

    return {
        restrict: 'A',
        templateUrl: '/app/directives/user/user-block/user-block.html',
        scope: {
            userBlock: '='
        },
        controller: function ($scope) {
            $scope.$watch('userBlock', function () {
                if ($scope.userBlock == undefined)
                    return;
                users($scope.userBlock, function (user) {
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
app.directive('userInfo', function (users) {

    return {
        restrict: 'A',
        templateUrl: '/app/directives/user-info/user-info.html',
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

            var defaultImg = 'http://cfile29.uf.tistory.com/image/23315D3F53808A931FB5E9';

            $scope.$watch('user', function () {
                if ($scope.user == undefined)
                    return defaultImg;
                $scope.photo = $scope.user.photo == undefined ? defaultImg : '/uploads/' + $scope.user.photo;
            });

        }

    }
});
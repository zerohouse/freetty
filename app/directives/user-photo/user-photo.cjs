app.directive('userPhoto', function (users) {

    return {
        restrict: 'A',
        templateUrl: '/app/directives/user-photo/user-photo.html',
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

            var defaultImg = 'http://cfile29.uf.tistory.com/image/23315D3F53808A931FB5E9';

            $scope.$watch('user', function () {
                if ($scope.user == undefined)
                    return defaultImg;
                $scope.photo = $scope.user.photo == undefined ? defaultImg : '/uploads/' + $scope.user.photo;
            });

        }

    }
});
app.directive('userPhoto', function (users) {

    return {
        restrict: 'E',
        templateUrl: '/client/directives/user-photo/user-photo.html',
        scope: {
            user: '='
        },
        controller: function ($scope) {
            users($scope.user, function (user) {
                $scope.user = user;
            });

            $scope.$watch('user', function () {
                $scope.photo = $scope.user.photo == undefined ? 'http://cfile29.uf.tistory.com/image/23315D3F53808A931FB5E9' : '/uploads/' + $scope.user.photo;
            });

        }

    }
});
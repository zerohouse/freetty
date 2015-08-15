app.directive('userBlock', function (users) {

    return {
        restrict: 'A',
        templateUrl: '/app/directives/user/user-block/user-block.html',
        scope: {
            user: '=',
            userBlock: '='
        },
        controller: function ($scope, popup) {

            $scope.userPopup = function (user) {
                popup('profile');
                popup.setUser(user);
            };

            $scope.$watch('userBlock', function () {
                if ($scope.userBlock == undefined)
                    return;
                users($scope.userBlock, function (user) {
                    $scope.user = user;
                });
            });

            $scope.$watch('user', function () {
                if ($scope.user == undefined)
                    return;
                $scope.photo = $scope.user.photo == undefined ? app.constants.defaultImg : '/uploads/' + $scope.user.photo;
            });

        }

    }
});
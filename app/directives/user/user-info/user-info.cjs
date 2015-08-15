app.directive('userInfo', function (users) {

    return {
        restrict: 'A',
        templateUrl: '/app/directives/user/user-info/user-info.html',
        scope: {
            user: '=',
            userInfo: '=',
            prefix: '@'
        },
        controller: function ($scope, popup) {

            $scope.userPopup = function (user) {
                popup('profile');
                popup.setUser(user);
            };

            $scope.$watch('userInfo', function () {
                if ($scope.userInfo == undefined)
                    return;
                users($scope.userInfo, function (user) {
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
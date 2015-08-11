app.controller('index', function ($scope, user, popup, $state, req) {
    $scope.rootUser = user;
    $scope.popup = popup;

    $scope.profile = function () {
        popup('profile', user);
        popup.user = user;
    };

    $scope.query = {location: {}};

    $scope.$watch(function () {
        return $state.current;
    }, function (current) {
        $scope.state = current;
    }, true);

    $scope.logout = function () {
        req.get('/api/user/logout').success(function () {
            location.reload();
        });
    };
});
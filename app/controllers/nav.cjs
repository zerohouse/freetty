app.controller('nav', function (user, $scope, $state, req) {
    $scope.auth = function () {
        if (user.logged) {
            if (user.url) {
                $state.go('profile', {url: user.url})
                return;
            }
            $state.go('profile', {url: user._id})
            return;
        }
        $state.go('login');

    }

    $scope.logout = function () {
        req.get('/api/user/logout').success(function () {
            angular.copy({}, user);
        });
    };

});
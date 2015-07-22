app.controller('root', function ($scope, user, $state) {
    $scope.user = user;

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

});
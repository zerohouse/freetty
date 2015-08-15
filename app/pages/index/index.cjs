app.controller('index', function ($scope, user, $state, req) {
    $scope.rootUser = user;


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

    $scope.toArtist = function () {
        if (user.type == undefined || user.type == '')
            user.type = 'artist-register-step1';
        $state.go(user.type);
    };

});
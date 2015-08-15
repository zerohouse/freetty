app.controller('artist.register', function ($scope, popup, $state, user, req, alert, condition) {

    $scope.user = user;

    $scope.popup = popup;

    $scope.save = function (state) {
        if (state)
            if (!condition.all())
                return;
        user.type = state;
        req.put('/api/user', $scope.user).success(function (res) {
            if (res.err) {
                alert(res.err);
                return;
            }
            if (state != undefined)
                $state.go(state);
        });
    };

    $scope.done = function () {
        user.type = 'provider';
        req.put('/api/user', $scope.user).success(function (res) {
            if (res.err) {
                alert(res.err);
                return;
            }
            alert('아티스트로 등록하신 것을 축하합니다.');
            $state.go('profile', {url: user._id});
        });

    };

    $scope.$watch('url', function (url) {
        $scope.urlOk = false;
        if (url == undefined)
            return;
        if (url == "")
            return;

        req.get('/api/user', {url: url}).success(function (res) {
            if (res.result == null) {
                $scope.urlOk = true;
                $scope.user.url = url;
                return;
            }
            $scope.urlOk = false;
        });
    });

});
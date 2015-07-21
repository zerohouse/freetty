app.controller('login', function ($scope, $stateParams, $regex, req, alert) {

    $scope.user = {email: $stateParams.email, password: ""};

    $scope.login = function () {
        if (!$regex('regex'))
            return;
        if (!$regex('email'))
            return;
        if (!$scope.exist)
            return;
        req.post('/api/user/login', $scope.user).success(function (res) {
            if (res.err) {
                alert(res.err);
                return;
            }
            alert("로그인되었습니다..");
        });
    };

    $scope.$watch(function () {
        return $scope.user.email;
    }, function () {
        existCheck();
    });

    function existCheck() {
        if (!$regex('email'))
            return;
        var query = {};
        query.email = $scope.user.email;
        req.get('/api/user', query).success(function (res) {
            if (res) {
                $scope.exist = true;
                return;
            }
            $scope.exist = false;
        });
    };
});
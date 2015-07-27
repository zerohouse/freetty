app.controller('popup', function ($scope, $stateParams, $regex, req, alert, user, popup) {
    popup.registerScope($scope);

    document.body.addEventListener('click', function () {
        popup.hide();
    });

    $scope.popup = popup;

    $scope.regex = $regex;

    $scope.user = {email: "", password: ""};

    $scope.login = function () {
        if (!$regex.email)
            return;
        if (!$regex.password)
            return;
        if (!$scope.exist)
            return;
        req.post('/api/user/login', $scope.user).success(function (res) {
            if (res.err) {
                alert(res.err);
                return;
            }
            alert("로그인되었습니다..");
            angular.copy(res, user);
            user.logged = true;
            popup.hide();
        });
    };

    $scope.$watch(function () {
        return $scope.user.email;
    }, function () {
        existCheck();
    });

    $scope.register = function () {
        if (!$regex.$all())
            return;
        if ($scope.exist)
            return;
        req.post('/api/user', $scope.user).success(function (res) {
            if (res) {
                alert("가입해주셔서 감사합니다.");
                popup.state = 'login';
                $scope.exist = true;
                return;
            }
            alert("가입중 오류가 발생했습니다.");
        });
    };


    $scope.$watch(function () {
        return $scope.user.email;
    }, function () {
        existCheck();
    });


    function existCheck() {
        if (!$regex.email) {
            $scope.exist = true;
            return;
        }
        var query = {};
        query.email = $scope.user.email;
        req.get('/api/user', query).success(function (res) {
            if (res.result != null) {
                $scope.exist = true;
                return;
            }
            $scope.exist = false;
        });
    }
});
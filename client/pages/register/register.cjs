app.controller('register', function ($scope, req, $regex, alert, $state, $stateParams) {

    $scope.user = {name: "", email: $stateParams.email, password: ""};

    $scope.register = function () {
        if (!$regex('regex'))
            return;
        if (!$regex('email'))
            return;
        if ($scope.exist)
            return;
        req.post('/api/user', $scope.user).success(function (res) {
            if (res) {
                alert("가입해주셔서 감사합니다.");
                $state.go('login', {email: $scope.user.email});
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
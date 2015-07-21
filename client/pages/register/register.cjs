app.controller('register', function ($scope, req) {


    $scope.user = {name: "", email: "", password: ""};

    $scope.register = function () {
        req.post('/api/user', user).success(function (res) {
            console.log(res);
        });
    };

});
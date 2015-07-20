app.controller('register', function ($scope, users) {


    $scope.user = {name: "", email: "", password: ""};

    $scope.register = function () {
        users.register($scope.user);
    };

});
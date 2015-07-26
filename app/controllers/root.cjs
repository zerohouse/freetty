app.controller('root', function ($scope, user) {
    $scope.user = user;

    $scope.log = function (m) {
        console.log(m);
    };
});
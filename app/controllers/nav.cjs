app.controller('nav', function (user, $scope, $state, req) {
    $scope.logout = function () {
        req.get('/api/user/logout').success(function () {
            angular.copy({}, user);
        });
    };

});
app.directive('service', function (users) {
    return {
        restrict: 'A',
        scope: {
            service: '='
        },
        templateUrl: "/client/directives/service/service.html",
        controller: function ($scope) {
            $scope.users = users;
        }

    }
});
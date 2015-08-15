app.factory('util', function () {
    return function ($scope) {
        $scope.isEmpty = function (obj) {
            return angular.equals({}, obj);
        };
    };
});
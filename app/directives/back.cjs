app.directive('back', function ($window, $rootScope) {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(function () {
                return $rootScope.$previousState.name;
            }, function (name) {
                scope.back = name;
            });
            element.on('click', function () {
                $window.history.back();
            });
        }
    }
});
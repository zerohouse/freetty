app.directive('loaded', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                scope.loading = false;
                scope.$apply();
            });
        }
    };
});
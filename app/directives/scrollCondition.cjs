app.directive("scrollCondition", function ($window) {
    return function (scope, element, attrs) {
        var top = element[0].offsetTop;
        angular.element($window).bind("scroll", function () {
            try {
                scope.scrollCondition = eval(attrs.scrollCondition);
            }
            catch (e) {
                return;
            }
            scope.$apply();
        });
    };
});
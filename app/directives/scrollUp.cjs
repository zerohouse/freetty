app.directive("scrollUp", function ($window) {
    return function (scope, element, attrs) {
        var ex;
        angular.element($window).bind("scroll", function () {
            if (ex > window.scrollY)
                scope.$eval(attrs.scrollUp);
            ex = window.scrollY;
            scope.$apply();
        });
    };
});
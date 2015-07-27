app.directive("scrollDown", function ($window) {
    var ex;
    return function (scope, element, attrs) {
        angular.element($window).bind("scroll", function () {
            if (ex < window.scrollY)
                scope.$eval(attrs.scrollDown);
            ex = window.scrollY;
            scope.$apply();
        });
    };
});
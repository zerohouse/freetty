app.directive("scrollCondition", function ($window) {
    return function (scope, element, attrs) {
        var top = element[0].offsetTop;
        angular.element($window).bind("scroll", function () {
            scope.scrollCondition = eval(attrs.scrollCondition);
            scope.$apply();
        });
    };
});
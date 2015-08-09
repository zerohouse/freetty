app.directive('help', function ($window, $timeout) {
    return {
        restrict: 'E',
        templateUrl: '/app/pages/index/help/help.html',
        scope: {
            scrollHide: '='
        }, link: function (scope, element, attrs) {
            angular.element($window).bind("scroll", function () {
                if (scope.scrolling)
                    return;
                if (this.pageYOffset >= element[0].offsetHeight) {
                    scope.scrollHide = false;
                } else {
                }
                scope.$apply();
            });
        }
    }
});
app.directive('day', function () {
    return {
        restrict: 'A',
        templateUrl: '/app/directives/day/day.html',
        scope: {
            day: '@',
            user: '=',
            mod: '=',
            save: '='
        }
    }
});
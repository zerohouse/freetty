app.directive('day', function () {
    return {
        restrict: 'A',
        templateUrl: '/app/pages/profile/day/day.html',
        scope: {
            day: '@',
            user: '=',
            mod: '=',
            save: '='
        }
    }
});
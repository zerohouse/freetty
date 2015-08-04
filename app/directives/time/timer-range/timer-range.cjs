app.directive('timerRange', function () {
    return {
        restrict: 'E',
        scope: {
            timeStart: '=',
            timeEnd: '=',
            floor: '=',
            ceiling: '=',
            step: '=',
            placeholder: '@',
            modRight: '=',
            modDefault: '@'
        },
        templateUrl: '/app/directives/time/timer-range/timer-range.html',
        controller: function ($scope) {
            document.querySelector('body').addEventListener('click', function () {
                $scope.time = false;
                $scope.$apply();
            });
        }
    }
});
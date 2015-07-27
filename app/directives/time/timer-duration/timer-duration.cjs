app.directive('timerDuration', function () {
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            floor: '=',
            ceiling: '=',
            step: '=',
            placeholder: '@',
            format: '=',
            modRight: '=',
            save: '='
        },
        templateUrl: '/app/directives/time/timer-duration/timer-duration.html',
        controller: function ($scope) {
            document.querySelector('body').addEventListener('click', function () {
                $scope.time = false;
                $scope.$apply();
            });
        }
    }
});
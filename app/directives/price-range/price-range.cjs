app.directive('priceRange', function () {
    return {
        restrict: 'E',
        scope: {
            min: '=',
            max: '=',
            floor: '=',
            ceiling: '=',
            step: '=',
            placeholder: '@',
            modRight: '=',
            modDefault: '@'
        },
        templateUrl: '/app/directives/price-range/price-range.html',
        controller: function ($scope) {
            document.querySelector('body').addEventListener('click', function () {
                $scope.slider = false;
                $scope.$apply();
            });
        }
    }
});


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
    }
});


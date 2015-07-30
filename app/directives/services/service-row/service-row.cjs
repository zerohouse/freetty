app.directive('serviceRow', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/directives/services/service-row/service-row.html',
        scope: {
            service: '=',
            modRight: '=',
            save: '='
        }
    }

});
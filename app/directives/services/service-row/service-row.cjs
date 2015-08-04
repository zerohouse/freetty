app.directive('serviceRow', function () {
    return {
        restrict: 'A',
        templateUrl: '/app/directives/services/service-row/service-row.html',
        scope: {
            service: '=',
            serviceArray: '=',
            modRight: '=',
            save: '=',
            select: '='
        }
    }

});
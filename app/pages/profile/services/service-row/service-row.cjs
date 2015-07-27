app.directive('serviceRow', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/pages/profile/services/service-row/service-row.html',
        scope: {
            service: '=',
            modRight: '=',
            save: '='
        }
    }

});
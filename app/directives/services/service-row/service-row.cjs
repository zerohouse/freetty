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
        }, controller: function ($scope) {
            $scope.$watch('service', function (service) {
                service.done = false;
                if (!service.name)
                    return;
                if (!service.duration)
                    return;
                if (isNaN(service.duration))
                    return;
                if (!service.price)
                    return;
                if (isNaN(service.price))
                    return;
                service.done = true;
            }, true);
        }

    }

});
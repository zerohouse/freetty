app.directive('service', function () {
    return {
        restrict: 'A',
        scope: {
            service: '='
        },
        templateUrl: "/client/directives/service/service.html",
        controller: function ($scope) {

        }

    }
});
app.directive('location', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/directives/location/location.html',
        scope: {
            location: '=',
            modSave: '=',
            modRight: '='
        },
        controller: function ($scope, req, $timeout) {

            $scope.$watch(function () {
                return $scope.location;
            }, function () {
                if ($scope.location == undefined)
                    return;

                if ($scope.map == undefined)
                    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
                        center: $scope.location.geometry.location,
                        zoom: 14
                    });

                if ($scope.marker != undefined)
                    $scope.marker.setMap(null);

                $scope.marker = new google.maps.Marker({
                    position: $scope.location.geometry.location,
                    map: $scope.map
                });
                setCenter();
                google.maps.event.addListener($scope.marker, 'click', function () {
                    setCenter();
                });
                function setCenter() {
                    $scope.map.setZoom(14);
                    $scope.map.setCenter($scope.marker.getPosition());
                }

                if (!$scope.mod)
                    return;
                $scope.modSave();
                $scope.mod = false;
            });


        }
    }
});

app.directive('location', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/directives/location/location.html',
        scope: {
            user: '=',
            modSave: '=',
            modRight: '='
        },
        controller: function ($scope, req, $timeout) {

            $scope.$watch(function () {
                return $scope.user.lat;
            }, function () {
                if ($scope.user == undefined)
                    return;
                if ($scope.user.lat == undefined)
                    return;
                if ($scope.user.lng == undefined)
                    return;


                if ($scope.map == undefined)
                    $timeout(function () {
                        $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
                            streetViewControl: false,
                            center: {lat: $scope.user.lat, lng: $scope.user.lng},
                            zoom: 14
                        });
                    });

                if ($scope.marker != undefined)
                    $scope.marker.setMap(null);

                $timeout(function () {
                    $scope.marker = new google.maps.Marker({
                        position: {lat: $scope.user.lat, lng: $scope.user.lng},
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
                });

                if (!$scope.mod)
                    return;
                $scope.modSave();
                $scope.mod = false;
            });


        }
    }
});

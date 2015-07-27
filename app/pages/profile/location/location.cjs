app.directive('location', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/pages/profile/location/location.html',
        scope: {
            user: '=',
            modSave: '=',
            modRight: '='
        },
        controller: function ($scope, req, $timeout) {

            $scope.$watch(function () {
                return $scope.user.location;
            }, function () {
                if ($scope.user.location == undefined)
                    return;

                if ($scope.map == undefined)
                    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
                        center: $scope.user.location.geometry.location,
                        zoom: 14
                    });

                if ($scope.marker != undefined)
                    $scope.marker.setMap(null);

                $scope.marker = new google.maps.Marker({
                    position: $scope.user.location.geometry.location,
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

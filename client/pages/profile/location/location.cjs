app.directive('location', function () {
    return {
        restrict: 'E',
        templateUrl: '/client/pages/profile/location/location.html',
        scope: {
            user: '=',
            modSave: '=',
            modRight: '='
        },
        controller: function ($scope, req, $timeout) {


            $scope.keyword = "";

            $scope.selected = 0;

            function moveSelect(point) {
                $scope.selected += point;
                if ($scope.selected < 0) {
                    $scope.selected = $scope.results.length - 1;
                    return;
                }
                if ($scope.selected > $scope.results.length - 1)
                    $scope.selected = 0;
            }

            $scope.selectThis = function (each) {
                $scope.selected = $scope.results.indexOf(each);
            };

            document.body.addEventListener('click', function () {
                $scope.search = false;
                $scope.$apply();
            });

            $scope.keyPress = function (e) {
                switch (e.keyCode) {
                    case 38:
                        moveSelect(-1);
                        return;
                    case 40:
                        moveSelect(1);
                        return;
                    case 13:
                        $scope.selectLocation();
                        return;
                }
                $scope.search = true;

                var ajax = $timeout(function () {
                    $timeout.cancel(ajax);

                    if ($scope.keyword == "") {
                        $scope.results = [];
                        return;
                    }
                    req.get('http://maps.googleapis.com/maps/api/geocode/json?language=ko&sensor=false&address=' + $scope.keyword).success(function (res) {
                        $scope.results = res.results;
                    });
                }, 300);
            };

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

                $scope.modSave();
                $scope.mod = false;
            });

            $scope.selectLocation = function () {
                var selected = $scope.results[$scope.selected];
                if (selected == undefined)
                    return;
                $scope.user.location = selected;
                $scope.search = false;
            };


        }
    }
});

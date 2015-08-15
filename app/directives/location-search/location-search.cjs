app.directive('locationSearch', function () {
        return {
            restrict: 'E',
            templateUrl: '/app/directives/location-search/location-search.html',
            scope: {location: '=', top: '@', left: '@', placeholder: '@', inputClass: '@', save: '='},
            link: function (s, e, a) {
                s.input = e.children('input')[0];
                e.on('click', function () {
                    s.setMod()
                });
            },
            controller: function ($scope, req, $timeout) {

                $scope.setMod = function () {
                    $scope.mod = true;
                    $timeout(function () {
                        $scope.input.focus();
                    }, 200);
                };

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

                    $timeout.cancel(this.ajax);
                    this.ajax = $timeout(function () {
                        var key = $($scope.input).val();
                        if (key == "") {
                            $scope.results = [];
                            return;
                        }
                        req.get('http://maps.googleapis.com/maps/api/geocode/json?language=ko&sensor=false&address=' + key).success(function (res) {
                            $scope.results = res.results;
                        });
                    }, 300);
                };

                $scope.selectLocation = function () {
                    if ($scope.results == undefined)
                        return;
                    var selected = $scope.results[$scope.selected];
                    if (selected == undefined)
                        return;

                    $scope.location.formatted_address = selected.formatted_address;
                    $scope.location.lat = selected.geometry.location.lat;
                    $scope.location.lng = selected.geometry.location.lng;
                    $scope.search = false;
                    $scope.mod = false;
                    if ($scope.save)
                        $scope.save();
                };

            }
        }
    }
)
;

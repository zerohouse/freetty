app.controller('search', function ($scope, req, $timeout, user, $compile, param) {

    var location, map;

    $scope.getItemsWhenChangeBounds = true;

    var markers = $scope.markers = [];
    var infowindow = null;
    var loading = false;

    $scope.$watch('query', function (query) {
        $scope.get(true);
    }, true);

    var ajax;

    $scope.get = function (reset) {
        if (loading)
            return;
        $timeout.cancel(ajax);
        ajax = $timeout(function () {
            if (reset) {
                $scope.page = 0;
                $scope.noMore = false;
            }
            $scope.query.skip = $scope.page * $scope.query.limit;
            if (reset)
                $scope.articles = [];

            req.post('/api/article/list', $scope.query).success(function (res) {
                resetMarkers();
                $scope.queryModifyed = false;
                if (!res.forEach)
                    return;
                res.forEach(function (each) {
                    $scope.articles.push(each);
                    addMarker(each);
                });
                if (res.length < $scope.query.limit)
                    $scope.noMore = true;
                $scope.page++;

                function resetMarkers() {
                    markers.forEach(function (marker) {
                        marker.setMap(null);
                    });
                }

                function addMarker(article) {
                    var marker = new google.maps.Marker({
                        position: {lat: article.lat, lng: article.lng},
                        map: $scope.map
                    });
                    markers.push(marker);

                    if (infowindow)
                        infowindow.close();

                    infowindow = new google.maps.InfoWindow({
                        content: "<div id='infowindow'><div user-block='article.provider'></div></div>"
                    });

                    google.maps.event.addListener(marker, 'click', function () {
                        loading = true;
                        $scope.article = article;
                        infowindow.open(map, marker);
                        $timeout(function () {
                            $compile(angular.element($('#infowindow')))($scope);
                            $timeout(function () {
                                loading = false;
                            }, 1000);
                        });
                    });
                    google.maps.event.addListener(marker, 'mouseover', function () {
                    });
                    google.maps.event.addListener(marker, 'mouseout', function () {
                    });
                }
            });
        }, 400);
    };


    $scope.articles = [];
    $scope.page = 0;
    $scope.query = param.getParam();
    if ($scope.query == undefined)
        $scope.query = {};
    $scope.query.limit = 20;
    $scope.query.price = {min: 0, max: 600000};

    $timeout(function () {
        initialize();
    });

    function initialize() {
        loading = true;
        if ($scope.query && $scope.query.location && $scope.query.location.lat)
            location = $scope.location = $scope.query.location;
        else
            location = $scope.location = user.lat == undefined ? {
                lat: 37.49794199999999,
                lng: 127.027621
            } : {lat: user.lat, lng: user.lng, formmated_address: user.formmated_address};
        var mapOptions = {
            panControl: false,
            streetViewControl: false,
            zoomControl: false,
            center: location,
            zoom: 15,
            minZoom: 15,
            maxZoom: 15
        };
        map = $scope.map = new google.maps.Map(document.getElementById('search-map'),
            mapOptions);

        google.maps.event.addListener(map, 'bounds_changed', function () {
            if (!$scope.getItemsWhenChangeBounds)
                return;
            $scope.getArticlesFromHere();
        });

        $scope.$watch('location', function (location) {
            map.setCenter(location);
        }, true);


        $scope.getArticlesFromHere = function () {
            $timeout.cancel(this.change);
            this.change = $timeout(function () {
                var bound = map.getBounds();
                $scope.query.location = {
                    lat: {gte: bound.Ia.G, lte: bound.Ia.j},
                    lng: {gte: bound.Ca.j, lte: bound.Ca.G},
                };
            }, 400);
        };

        var mapControl = document.querySelector('#map-controls');
        var div = document.createElement('div');
        div.index = 1;
        div.appendChild(mapControl);
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(div);

        $timeout(function () {
            loading = false;
        }, 1000);
    }


    $scope.here = function () {
        navigator.geolocation.getCurrentPosition(function (loc) {
            var location = {};
            location.lat = loc.coords.latitude;
            location.lng = loc.coords.longitude;
            $scope.location = location;
            map.setCenter($scope.location);
        });
    };

});
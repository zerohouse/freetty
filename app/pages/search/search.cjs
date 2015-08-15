app.controller('search', function ($scope, req, $timeout, user, $compile, query, $document) {

    $scope.getItemsWhenChangeBounds = true;
    var markers = $scope.markers = [];
    var infowindow = null;
    var loading = false;
    $scope.more = function () {
        $scope.sort.type = undefined;
        $timeout(function () {
            if ($scope.noMore)
                return;
            $scope.get();
        });
    };
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

            var query = {};
            angular.copy($scope.query, query);

            query.skip = $scope.page * query.limit;
            if (reset)
                $scope.articles = [];

            req.post('/api/article/list', query).success(function (res) {
                if (reset)
                    resetMarkers();
                if (!res.forEach)
                    return;
                res.forEach(function (each) {
                    $scope.articles.push(each);
                    addMarker(each);
                });
                if (res.length < query.limit)
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
                }
            });
        }, 400);
    };


    $scope.articles = [];
    $scope.page = 0;
    $scope.query = query;

    $timeout(function () {
        initialize();
    });

    function initialize() {
        var loading = true;
        var location = $scope.location = user.lat == undefined ? {
            lat: 37.49794199999999,
            lng: 127.027621
        } : {lat: user.lat, lng: user.lng, formmated_address: user.formmated_address};
        var mapOptions = {
            panControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            center: location,
            zoom: 15,
            minZoom: 10,
            maxZoom: 18
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
                query.location = {
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

            $scope.$watch('query', function (query) {
                $scope.get(true);
            }, true);

            $scope.get(true);

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


    //[TODO] 리팩토링 > 코드 개망.
    //스크롤 중에는 이벤트 안검.
    $scope.detailSearch = function () {
        $scope.detail = true;
        $scope.scrolling = true;
        $document.scrollTop($('.left-container .panel-body:first-child').height() + $('#search-map').height());
        $timeout(function () {
            $document.scrollTopAnimated(0).then(function () {
                $timeout(function () {
                    google.maps.event.trigger(map, 'resize');
                    $scope.scrolling = false;
                }, 100);
            });
        });
    };

    $scope.detailHide = function () {
        $scope.detail = false;
    };

    // 스크롤 이벤트
    // 스크롤이 1026이상이면 디테일 서치창 숨김
    // 스크롤이 문서 헤이트와 같아지면 더 불러옴.
    angular.element(window).bind('scroll', function () {
        var win = $(window);
        var doc = $(document);
        var height = win.scrollTop() + win.height();
        if (height === doc.height())
            $scope.more();

        if (win.scrollTop() > 432 && $scope.detail) {
            $scope.detailHide();
            $document.scrollTop(0);
            $scope.$apply();
        }
    });

    //화면클댸
    angular.element($('.left-container')).bind('scroll', function () {
        var win = $('.left-container');
        var height = win[0].scrollHeight - win.height();
        if (win.scrollTop() + 100 > height)
            $scope.more();
    });


    //소팅
    var sort = $scope.sort = {};

    $scope.sortBy = function (val) {
        if (val == sort.type) {
            sort.asc = !sort.asc;
            return;
        }
        sort.type = val;
    };

    $scope.isSort = function (val) {
        return val == sort.type;
    };

    sort.order = function () {
        if (sort.asc)
            return sort.type;
        return "-" + sort.type;
    }


});

app.controller('address', function ($scope, req, $timeout) {
    var mapOptions = {
        center: {lat: 37.476559, lng: 126.981633},
        zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

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

    $scope.keypress = function (e) {
        switch (e.keyCode) {
            case 38:
                moveSelect(-1);
                return;
            case 40:
                moveSelect(1);
                return;
            case 13:
                $scope.showMap();
                return;
        }

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


    var marker;

    $scope.showMap = function () {
        var selected = $scope.results[$scope.selected];
        if (marker != undefined)
            marker.setMap(null);
        marker = new google.maps.Marker({
            position: selected.geometry.location,
            map: map
        });
        map.setZoom(14);
        map.setCenter(marker.getPosition());
        google.maps.event.addListener(marker, 'click', function () {
            map.setZoom(14);
            map.setCenter(marker.getPosition());
        });
    };


});
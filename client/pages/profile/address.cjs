app.controller('address', function ($scope, req) {

    var mapOptions = {
        center: {lat: 37.476559, lng: 126.981633},
        zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var markers = [];

    $scope.keyword = "";

    $scope.$watch('keyword', function () {
        if ($scope.keyword == "") {
            $scope.results = [];
            return;
        }

        req.get('http://maps.googleapis.com/maps/api/geocode/json?language=ko&sensor=false&address=' + $scope.keyword).success(function (res) {
            deleteMarkers();
            $scope.results = res.results;
            res.results.forEach(function (each) {
                addMarker(each);
            });
            setAllMap(map);
            showMarkers();
        });
    });

    function addMarker(result) {
        var marker = new google.maps.Marker({
            position: result.geometry.location,
            map: map,
            title: result.formatted_address
        });
        google.maps.event.addListener(marker, 'click', function () {
            map.setZoom(14);
            map.setCenter(marker.getPosition());
        });
        markers.push(marker);
    }

    function setAllMap(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }


    function clearMarkers() {
        setAllMap(null);
    }

    function showMarkers() {
        setAllMap(map);
    }

    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

});
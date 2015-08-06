app.directive('articleHead', function (users, user) {
    return {
        restrict: 'E',
        scope: {
            article: '='
        },
        templateUrl: "/app/directives/article-head/article-head.html",
        controller: function ($scope) {
            $scope.users = users;

            $scope.$watch('article', function () {
                if ($scope.article == undefined)
                    return;
                if (!user.lat || !$scope.article.lat) {
                    $scope.distance = "위치 정보가 없습니다.";
                    return;
                }
                var l1 = $scope.article;
                var l2 = user;
                $scope.distance = parseInt(getDistance(l1.lat, l1.lng, l2.lat, l2.lng) * 10) / 10 + "km";
            });

            function getDistance(lat1, lon1, lat2, lon2) {
                var R = 6371; // Radius of the earth in km
                var dLat = deg2rad(lat2 - lat1);  // deg2rad below
                var dLon = deg2rad(lon2 - lon1);
                var a =
                        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2)
                    ;
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                return R * c; // Distance in km
            }

            function deg2rad(deg) {
                return deg * (Math.PI / 180)
            }
        }
    }
});
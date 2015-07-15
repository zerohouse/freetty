app.directive('photos', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            photos: "="
        },
        templateUrl: '/client/directives/photos/photos.html',
        controller: function ($scope) {

            $scope.select = 0;

            $scope.left = function () {
                if ($scope.select == 0) {
                    $scope.select = $scope.photos.length - 1;
                    return;
                }
                $scope.select--;
            };

            $scope.right = function () {
                if ($scope.select == $scope.photos.length - 1) {
                    $scope.select = 0;
                    return;
                }
                $scope.select++;
            };

            $scope.$watch(function () {
                return $scope.select;
            }, function () {
                $scope.loading = true;
            });

            $scope.selectPhoto = function (photo) {
                $scope.select = $scope.photos.indexOf(photo);
            }

        }
    };
});


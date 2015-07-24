app.directive('photos', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            photos: "="
        },
        templateUrl: '/app/directives/photos/photos.html',
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
                if ($scope.photos == undefined)
                    return;
                $scope.loading = true;
                $scope.photoUrl = $scope.photos[$scope.select] == undefined ? undefined : '/uploads/' + $scope.photos[$scope.select];
            });

            $scope.selectPhoto = function (photo) {
                $scope.select = $scope.photos.indexOf(photo);
            }

        }
    };
});


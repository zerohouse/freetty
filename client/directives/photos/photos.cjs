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
                    $scope.select = $scope.photos.length;
                }
                $scope.select--;
            };

            $scope.right = function () {
                if ($scope.select == $scope.photos.length) {
                    $scope.select = 0;
                }
                $scope.select++;
            };

            $scope.$watch(function () {
                return $scope.select;
            }, function () {
                $scope.loading = true;
            });


        },
        link: function (scope, element, attrs) {
            element.children('img').bind('load', function () {
                scope.loading = false;
                console.log(1);
            });
        }
    };
});


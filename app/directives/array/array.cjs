app.directive('array', function () {

    return {
        restrict: 'A',
        scope: {
            array: '=',
            save: '=',
            modRight: '=',
            delConfirm: '=',
            elClass: '@'
        },
        templateUrl: '/app/directives/array/array.html',
        controller: function ($scope, alert) {
            $scope.remove = function (el) {
                if ($scope.delConfirm) {
                    if (!confirm('삭제하시겠습니까?'))
                        return;
                }
                $scope.array.remove(el);
                $scope.save();
            };

            $scope.addNew = function () {
                if ($scope.newEl == undefined)
                    return;
                if ($scope.newEl == '')
                    return;
                if ($scope.array.contains($scope.newEl)) {
                    alert('이미 있는 태그입니다.');
                    $scope.newEl = '';
                    return;
                }
                $scope.array.push($scope.newEl);
                $scope.newEl = '';
                $scope.save();
            };
        }

    }
});
app.directive('autoComplete', function (alert) {

    return {
        restrict: 'E',
        templateUrl: '/app/directives/auto-complete/auto-complete.html',
        scope: {
            data: '=',
            placeholder: '@',
            limit: '@',
            selectedClass: '@'
        },
        controller: function ($scope) {

            $scope.selected = [];
            $scope.select = 0;

            $scope.keydown = function (e) {
                $scope.show = true;
                switch (e.keyCode) {
                    case 38:
                        $scope.select--;
                        if ($scope.select < 0)
                            $scope.select = $scope.results.length - 1;
                        break;
                    case 40:
                        $scope.select++;
                        if ($scope.select > $scope.results.length - 1)
                            $scope.select = 0;
                        break;
                    case 13:
                        $scope.selectSelected();
                        break;

                }
            };

            $scope.selectSelected = function () {
                var select = $scope.results[$scope.select];
                if (select == undefined) {
                    alert('결과가 없습니다.');
                    return;
                }
                if ($scope.selected.contains(select)) {
                    alert('이미 추가되었습니다.');
                    return;
                }
                $scope.selected.push(select);
                $scope.keyword = '';
                $scope.show = false;
            }


        }

    }

});
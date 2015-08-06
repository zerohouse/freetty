app.directive('autoComplete', function (alert) {

    return {
        restrict: 'E',
        templateUrl: '/app/directives/auto-complete/auto-complete.html',
        scope: {
            ngModel: '=',
            data: '=',
            keyword: '=',
            placeholder: '@',
            limit: '@',
            selectedClass: '@'
        },
        controller: function ($scope) {

            document.body.addEventListener('click', function () {
                $scope.HIDE();
                $scope.$apply();
            });

            if ($scope.ngModel == undefined)
                $scope.ngModel = [];

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

            $scope.SELECT = function (i) {
                $scope.select = i;
            };

            $scope.selectSelected = function () {
                var select = $scope.results[$scope.select];
                if (select == undefined) {
                    select = $scope.keyword;
                }
                if (select == undefined || select == '') {
                    alert('결과가 없습니다.');
                    return;
                }
                if ($scope.ngModel.contains(select)) {
                    alert('이미 추가되었습니다.');
                    return;
                }
                $scope.ngModel.push(select);
                $scope.keyword = '';
                $scope.show = false;
            };

            $scope.SHOW = function (e) {
                $scope.show = true;
                e.stopPropagation();
            };
            $scope.HIDE = function () {
                $scope.show = false;
            };


        }

    }

});
app.directive('autoCompleteAjax', function (alert) {

    return {
        restrict: 'E',
        templateUrl: '/app/directives/auto-complete-ajax/auto-complete-ajax.html',
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

            $scope.select = -1;

            $scope.keydown = function (e) {
                $scope.show = true;
                switch (e.keyCode) {
                    case 38:
                        $scope.select--;
                        if ($scope.select < -1)
                            $scope.select = $scope.results.length - 1;
                        break;
                    case 40:
                        $scope.select++;
                        if ($scope.select > $scope.results.length - 1)
                            $scope.select = -1;
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
                if (select == undefined)
                    select = $scope.keyword;
                else
                    select = $scope.results[$scope.select].keyword;

                if ($scope.keyword == undefined || $scope.keyword == '') {
                    alert('검색어가 없습니다.');
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
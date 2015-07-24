app.directive('modNumber', function () {
    return {
        restrict: 'A',
        templateUrl: '/app/directives/mod/mod-number/mod-number.html',
        scope: {
            mod: '=',
            modFormat: '=',
            modNumber: '=',
            modSave: '=',
            modRight: '=',
            modDefault: '@',
            placeholder: '@'
        }, controller: function (alert, $scope) {
            $scope.saveClick = function () {
                if (parseFloat($scope.modNumber) == NaN) {
                    alert('숫자로 입력해주세요.');
                    return;
                }
                $scope.modSave();
                $scope.mod = !$scope.mod;
            }
        }
    }
});
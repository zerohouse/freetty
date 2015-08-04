app.directive('modInput', function () {
    return {
        restrict: 'A',
        templateUrl: '/app/directives/mod/mod-input/mod-input.html',
        scope: {
            mod: '=',
            modInput: '=',
            modRight: '=',
            modSave: '=',
            modFormat: '=',
            modDefault: '@',
            placeholder: '@'
        },
        controller: function ($scope) {

            document.body.addEventListener('click', function () {
                $scope.mod = false;
            });

            $scope.enter = function (e) {
                if (e.keyCode == 13) {
                    $scope.mod = !$scope.mod;
                    if ($scope.modSave == undefined)
                        return;
                    $scope.modSave();
                }
            };

            $scope.modify = function () {
                if (!$scope.modRight)
                    return;
                $scope.mod = true;
            };

            $scope.done = function () {
                $scope.mod = false;
                if ($scope.modSave == undefined)
                    return;
                $scope.modSave();
            };

        }
    }
});
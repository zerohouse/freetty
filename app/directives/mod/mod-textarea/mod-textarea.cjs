app.directive('modTextarea', function () {
    return {
        restrict: 'A',
        templateUrl: '/app/directives/mod/mod-textarea/mod-textarea.html',
        scope: {
            mod: '=',
            modTextarea: '=',
            modSave: '=',
            modRight: '=',
            modDefault: '@',
            placeholder: '@'
        },
        controller: function ($scope) {
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
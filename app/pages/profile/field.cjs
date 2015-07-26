app.directive('field', function () {
    return {
        scope: {
            field: '@',
            modRight: '=',
            array: '=',
            save: '='
        },
        template: "<span class='label label-default' ng-class=\"{'label-primary':array.contains(field)}\" ng-show='array.contains(field) || modRight' ng-click='toggle()'>{{field}}</span>",
        controller: function ($scope) {
            $scope.toggle = function () {
                if ($scope.array.contains($scope.field))
                    $scope.array.remove($scope.field);
                else
                    $scope.array.push($scope.field);
                $scope.save();
            }
        }
    }
});
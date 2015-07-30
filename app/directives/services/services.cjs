app.directive('services', function () {
    return {
        restrict: 'E',
        scope: {
            modRight: '=',
            save: '=',
            user: '='
        },
        templateUrl: '/app/directives/services/services.html',
        controller: function ($scope) {
            if ($scope.user.serviceTypes == undefined)
                $scope.user.serviceTypes = {};

            $scope.newType = function (val) {
                if (val == undefined || val == "") {
                    alert("서비스 유형을 입력해주세요.");
                    return;
                }
                if ($scope.user.serviceTypes[val] != undefined) {
                    alert("이미 있는 유형입니다");
                    return;
                }
                $scope.user.serviceTypes[val] = [];
            };

        }


    }
});
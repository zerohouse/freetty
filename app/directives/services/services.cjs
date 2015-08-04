app.directive('services', function () {
    return {
        restrict: 'A',
        scope: {
            modRight: '=',
            save: '=',
            services: '=',
            select: '=',
            modService: '='
        },
        templateUrl: '/app/directives/services/services.html',
        controller: function ($scope) {
            if ($scope.services == undefined)
                $scope.services = {};

            $scope.newType = function (val) {
                if (val == undefined || val == "") {
                    alert("서비스 유형을 입력해주세요.");
                    return;
                }
                if ($scope.services[val] != undefined) {
                    alert("이미 있는 유형입니다");
                    return;
                }
                $scope.services[val] = [];
                $scope.newTypeName = "";
            };

            $scope.remove = function (val) {
                if (!confirm('서비스 유형에 포함된 모든 서비스가 삭제됩니다. \n삭제하시겠습니까?'))
                    return;
                delete $scope.services[val];
                $scope.save();
            };

        }


    }
});
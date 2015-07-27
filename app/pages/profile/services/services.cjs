app.controller('profile.services', function ($scope, alert) {


    $scope.save = $scope.$parent.save;


    $scope.user = $scope.$parent.user;

    $scope.isRootUserAndMod = $scope.$parent.isRootUserAndMod;


    if ($scope.user.types == undefined)
        $scope.user.types = {};

    $scope.newType = function (val) {
        if (val == undefined || val == "") {
            alert("서비스 유형을 입력해주세요.");
            return;
        }
        if ($scope.user.types[val] != undefined) {
            alert("이미 있는 유형입니다");
            return;
        }
        $scope.user.types[val] = [];
    };

});
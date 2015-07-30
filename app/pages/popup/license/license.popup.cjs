app.controller('license.popup', function ($scope, user, alert, req) {

    $scope.validateLicense = function () {
        req.get('/api/license', $scope.validate).success(function (res) {
            if (!res.valid) {
                alert(res.err);
                return;
            }
            if (user.licenses == undefined)
                user.licenses = [];
            user.licenses.push(res);
            alert(res + '가 추가되었습니다.');
        });
    };


});
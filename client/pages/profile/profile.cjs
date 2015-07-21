app.controller('profile', function ($scope, users, $stateParams, Upload, req) {

    $scope.$watch('user', function () {
        if ($scope.user == undefined)
            return;
        $scope.photo = $scope.user.photo == undefined ? 'http://cfile29.uf.tistory.com/image/23315D3F53808A931FB5E9' : '/uploads/' + $scope.user.photo;
    }, true);

    $scope.$watch('files', function () {
        if ($scope.files == undefined)
            return;
        var query = {};
        query.id = $scope.user.id;

        Upload.upload({
            url: '/api/user/upload',
            file: $scope.files,
            data: query
        }).progress(function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (data, status, headers, config) {
            $scope.user.photo = data;
        });
    });

    users($stateParams.id, function (user) {
        $scope.user = user;
    });

    $scope.save = function () {
        var parameter = {};
        parameter.query = {};
        parameter.query.id = $scope.user.id;
        parameter.update = $scope.user;
        req.put('/api/user', parameter).success(function (res) {
            console.log(res);
        });
    }

});
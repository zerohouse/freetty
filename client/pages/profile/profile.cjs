app.controller('profile', function ($scope, users, user, $stateParams, Upload, req, alert, $state) {

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

    init();
    function init() {
        if ($stateParams.url.length > 16) {
            users($stateParams.url, function (user) {
                $scope.user = user;
            });
            return;
        }
        users.getByUrl($stateParams.url, function (user) {
            $scope.user = user;
        });
    }

    $scope.save = function () {
        req.put('/api/user', $scope.user).success(function (res) {
            if (res.err) {
                alert(res.err);
                $state.go('login');
            }
        });
    }

    $scope.isRootUser = function () {
        return $scope.user._id == user._id;
    }

});
app.controller('article', function ($scope, Upload, req, $stateParams, user) {

    req.get('/api/article', {_id: $stateParams._id}).success(function (res) {
        $scope.article = res;
        $scope.article.body = {type: 'text'};
        console.log(res);
    });

    $scope.$watch('files', function (files) {
        if (files == undefined)
            return;
        Upload.upload({
            url: '/api/article/upload',
            file: files
        }).progress(function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (photos, status, headers, config) {
            photos.forEach(function (photo) {
                $scope.article.photos.push(photo);
            });
            $scope.save();
        });
    });

    $scope.save = function () {
        req.put('/api/article', $scope.article).success(function (res) {
            if (res.err) {
                alert(res.err);
            }
        });
    };

    $scope.isRootUser = function () {
        if ($scope.article == undefined)
            return false;
        return $scope.article.provider == user._id;
    };

    $scope.done = function () {
        if (!confirm('작성을 완료하고 게시합니다.'))
            return;
        $scope.article.done = true;
        $scope.save();
    };

});

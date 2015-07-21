app.controller('newService', function ($scope, Upload, req) {

    $scope.service = {head: "", body: "", provider: "asdf"}

    $scope.save = function () {
        if ($scope.service.body == "")
            return;
        if ($scope.service.head == "")
            return;
        if (!$scope.files)
            return;
        if ($scope.files.length == 0)
            return;
        var promise = new Promise(function (ok, err) {
            Upload.upload({
                url: '/api/service/upload',
                file: $scope.files
            }).progress(function (evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            }).success(function (data, status, headers, config) {
                ok(data);
            });
        });
        promise.then(function (data) {
            $scope.service.photos = data;
            req.post('/api/service', $scope.service).success(function (res) {
                if (res.err) {
                    alert(res.err);
                }
            });
        });

    };
});

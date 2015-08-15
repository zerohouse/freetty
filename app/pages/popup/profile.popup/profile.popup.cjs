app.controller('profile.popup', function (popup, $scope, $state, user, Upload, alert, req) {


    $scope.save = function (nop) {
        if (nop)
            return;
        req.put('/api/user', $scope.user).success(function (res) {
            if (res.err) {
                alert(res.err);
                popup('login');
            }
        });
    };

    $scope.sendMessage = function () {
        req.post('/api/message', {message: $scope.messageBody, to: $scope.user._id}).success(function (res) {
            if (res.err) {
                alert(res.err);
                return;
            }
            $scope.messageBody = '';
            $scope.message = false;
            $state.go('message', {state: $scope.user._id});
            popup.hide();
        });
    };


    $scope.$watch('files', function (files) {
        if (files == undefined)
            return;
        if (files.length == 0)
            return;
        var query = {};
        query.id = $scope.user.id;

        Upload.upload({
            url: '/api/user/upload',
            file: files,
            data: query
        }).progress(function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (data, status, headers, config) {
            $scope.user.photo = data;
            $scope.save();
        });
    });

    $scope.$watch('user', function (user) {
        if (user._id == undefined) {
            popup('login');
            return;
        }
        $scope.photo = user.photo == undefined ? app.constants.defaultImg : '/uploads/' + user.photo;
    }, true);

    $scope.profilePage = function (user) {
        $state.go('profile', {url: user._id});
        popup.hide();
    };

    $scope.isRootUser = function (u) {
        return user._id == u._id;
    };
});
app.controller('profile', function ($scope, users, user, $stateParams, Upload, req, alert, $state, popup, $timeout) {

    $scope.mod = false;

    $scope.popup = popup;

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



    $scope.urlSave = function () {
        req.put('/api/user', $scope.user).success(function (res) {
            if (res.ok == 0) {
                alert('이미 존재하는 url입니다.');
            }
        });
    };

    $scope.deleteLicense = function (l) {
        if (!confirm('국가 공인 자격증 정보를 삭제하시겠습니까?'))
            return;
        req.post('/api/license', l).success(function (res) {
            if (res.err) {
                alert(res.err);
                return;
            }
            $scope.user.licenses.remove(l);
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

    $scope.$watch(function () {
        return $scope.user.photo;
    }, function () {
        $scope.photo = $scope.user.photo == undefined ? app.constants.defaultImg : '/uploads/' + $scope.user.photo;
    });

    $scope.isRootUser = function () {
        if ($scope.user._id == undefined)
            return false;
        return $scope.user._id == user._id;
    };

    $scope.isRootUserAndMod = function () {
        return $scope.isRootUser() && $scope.mod;
    };
    init();

    function init() {
        $scope.user = {};
        users($stateParams.url, function (user) {
            if (user == null) {
                $state.go('main');
                return;
            }
            $scope.user = user;
            if (user.url != undefined) {
                $state.go('profile', {url: user.url}, {notify: false, reload: false});
            }
        });
    }

    $scope.$watch(function () {
        return $state.current.name;
    }, function () {
        $scope.state = $state.current.name;
    });


    var states = {
        'portfolio': {
            templateUrl: "/app/pages/profile/portfolio/portfolio.html"
        },
        'recommend': {
            templateUrl: "/app/pages/profile/recommend/recommend.html"
        },
        'services': {
            templateUrl: "/app/pages/profile/services/services.html"
        }
    };

    $timeout(function () {
        $scope.state = $stateParams.state == undefined ? states.portfolio : states[$stateParams.state];
    });

    $scope.setState = function (state) {
        $scope.state = states[state];
        $state.go($state.current, {url: $stateParams.url, state: state}, {notify: false});
    };

    $scope.isState = function (state) {
        return $scope.state == states[state];
    };

});
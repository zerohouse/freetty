app.controller('edit', function (req, $scope, $stateParams, Upload, user, alert, $state, popup) {
    req.get('/api/article', {_id: $stateParams._id}).success(function (res) {
        $scope.article = res;

        if (res.provider != user._id) {
            alert('권한이 없습니다.');
            $state.go('article', {_id: $stateParams._id});
            return;
        }

        if ($scope.article.discount == undefined)
            $scope.article.discount = {
                value: 0, type: 'p'
            };

        if ($scope.article.selectedServices == undefined)
            $scope.article.selectedServices = [];


        var regex = /#([\wㄱ-ㅎ|ㅏ-ㅣ|가-힣]+)/g;

        $scope.$watch(function () {
            return $scope.article.body;
        }, function (body) {
            var match;
            var result = [];
            while (true) {
                match = regex.exec(body);
                if (match == null)
                    break;
                var item = match[1];
                if (!result.contains(item)) {
                    result.push(item);
                }
            }
            $scope.article.tags = result;
        });

        $scope.$watch(function () {
            return $scope.article.discount;
        }, computeDiscount, true);

        $scope.$watch(function () {
            return $scope.article.selectedServices;
        }, function () {
            var total = {price: 0, duration: 0};
            var result = [];
            $scope.article.selectedServices.forEach(function (service) {
                result.push(service);
                total.price += parseInt(service.price);
                total.duration += parseInt(service.duration);
            });
            $scope.article.total = total;
            $scope.article.price = total.price;
            $scope.article.selectedServices = result;
            computeDiscount();
        }, true);
    });


    $scope.done = function () {
        $scope.article.done = true;
        $scope.save(function (done) {
            if (done)
                $state.go('article', {_id: $stateParams._id});
        });
    };

    $scope.save = function (fn) {
        $scope.article.lat = user.lat;
        $scope.article.lng = user.lng;
        if ($scope.article.done) {
            $scope.article.done = doneCheck();
        }
        req.put('/api/article', $scope.article).success(function (res) {
            if (res.err) {
                alert(res.err);
                return;
            }
            if (fn)
                fn($scope.article.done);
        });
    };

    function doneCheck() {
        if ($scope.article.photos.length == 0) {
            alert('사진이 한장이상 있어야 합니다.');
            return false;
        }
        if ($scope.article.body == undefined || $scope.article.body.length < 10) {
            alert('본문을 10자이상 작성해주세요.');
            return false;
        }
        if ($scope.article.head == undefined || $scope.article.head.length < 4) {
            alert('제목을 4자이상 작성해주세요.');
            return false;
        }
        if ($scope.article.selectedServices == undefined || $scope.article.selectedServices.length == 0) {
            alert('서비스를 하나 이상 선택해주세요.');
            return false;
        }
        return true;
    }


    $scope.$watch('files', function (files) {
        if (files == undefined)
            return;
        Upload.upload({
            url: '/api/article/upload',
            file: files
        }).progress(function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (photos, status, headers, config) {
            if (photos.forEach == undefined)
                return;
            photos.forEach(function (photo) {
                $scope.article.photos.push(photo);
            });
        });
    });

    function computeDiscount() {
        if ($scope.article == undefined)
            return;
        if ($scope.article.total == undefined)
            return;
        var value = parseInt($scope.article.discount.value);
        if (isNaN(value))
            return;
        if ($scope.article.discount.type == 'p') {
            $scope.article.total.discountPrice = parseInt($scope.article.total.price * (100 - value) / 100);
            return;
        }

        $scope.article.price = total.discountPrice;
        $scope.article.total.discountPrice = $scope.article.total.price - value;

    }

    $scope.userSave = function () {
        req.put('/api/user', user).success(function (res) {
            if (res.err) {
                alert(res.err);
                popup('login');
            }
        });
    };

    $scope.serviceToggle = function () {
        if ($scope.modService)
            $scope.userSave();
        $scope.modService = !$scope.modService;
    };


});
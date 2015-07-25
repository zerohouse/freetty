app.controller('article', function ($scope, Upload, req, $stateParams, user, alert) {

    $scope.mod = $stateParams.mod;


    req.get('/api/article', {_id: $stateParams._id}).success(function (res) {
        $scope.article = res;
        $scope.selectedPhoto = $scope.article.photos[0];
        if ($scope.article.body == undefined)
            $scope.article.body = {type: 'text'};
    });


    $scope.remove = function (arr, el, con) {
        if (con) {
            if (!confirm('삭제하시겠습니까?'))
                return;
        }
        arr.splice(arr.indexOf(el), 1);
        $scope.save();
    };

    $scope.selectPhoto = function (photo) {
        $scope.selectedPhoto = photo;
    };

    $scope.addTag = function () {
        if ($scope.tag == undefined)
            return;
        if ($scope.tag == '')
            return;
        if ($scope.article.tags == undefined)
            $scope.article.tags = [];
        if ($scope.article.tags.contains($scope.tag)) {
            alert('이미 있는 태그입니다.');
            $scope.tag = '';
            return;
        }
        $scope.article.tags.push($scope.tag);
        $scope.tag = '';
        $scope.save();
    };

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
            $scope.selectedPhoto = $scope.article.photos[0];
            $scope.save();
        });
    });

    $scope.save = function () {
        $scope.article.location = user.location;
        if ($scope.article.done) {
            $scope.article.done = doneCheck();
        }
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

    $scope.isRootUserAndMod = function () {
        if (!$scope.mod)
            return false;
        return $scope.isRootUser();
    };

    $scope.done = function () {
        if (!confirm('작성을 완료하고 게시합니다.'))
            return;
        $scope.article.done = doneCheck();
        $scope.save();
    };

    function doneCheck() {
        if ($scope.article.photos.length == 0) {
            alert('사진이 한장이상 있어야 합니다.');
            return false;
        }
        if ($scope.article.body.content.length < 100) {
            alert('본문이' + $scope.article.body.content.length + '자 입니다. 본문을 100자이상 작성해주세요.');
            return false;
        }
        if ($scope.article.head.length < 5) {
            alert('제목이' + $scope.article.head.length + '자 입니다. 제목을 5자이상 작성해주세요.');
            return false;
        }
        if ($scope.article.price == undefined || $scope.article.price == 0 || $scope.article.price == "") {
            alert('서비스 가격을 설정해주세요.');
            return false;
        }
        return true;
    }

    $scope.likeToggle = function () {
        if ($scope.article.likes.contains(user._id)) {
            $scope.article.likes.splice($scope.article.likes.indexOf(user._id), 1);
            return;
        }
        $scope.article.likes.push(user._id);

        $scope.save();

    }


});

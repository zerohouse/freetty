app.controller('article', function ($scope, Upload, req, $stateParams, user, $location, $anchorScroll) {

    $location.hash($stateParams.scroll);
    $anchorScroll();


    $scope.stateParams = $stateParams;

    req.get('/api/article', {_id: $stateParams._id}).success(function (res) {
        $scope.article = res;
    });

    $scope.isRootUser = function () {
        if ($scope.article == undefined)
            return false;
        return $scope.article.provider == user._id;
    };

});

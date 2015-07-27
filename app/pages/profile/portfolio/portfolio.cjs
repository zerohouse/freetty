app.controller('profile.portfolio', function ($scope, $stateParams, users, req, $state) {

    $scope.state = $stateParams;

    $scope.get = function () {
        $scope.query.skip = $scope.page * $scope.query.limit;
        $scope.query.provider = $scope.user._id;
        req.post('/api/article/list', $scope.query).success(function (res) {
            res.forEach(function (each) {
                $scope.articles.push(each);
            });
            if (res.length < $scope.query.limit)
                $scope.noMore = true;
            $scope.page++;
        });
    };

    $scope.articles = [];
    $scope.page = 0;
    $scope.query = {limit: 6};


    users($stateParams.url, function (res) {
        if (res == null)
            return;
        $scope.user = res;
        $scope.get();
    });

    $scope.newService = function () {
        req.get('/api/article/new').success(function (res) {
            if (res.err) {
                alert(res.err);
                return;
            }
            $state.go('article', {_id: res, mod: true});
        });
    };
});
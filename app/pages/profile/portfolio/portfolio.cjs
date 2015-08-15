app.controller('profile.portfolio', function ($scope, $stateParams, users, req, $state, query) {

    $scope.state = $stateParams;

    $scope.query = query;

    $scope.get = function () {
        query.skip = $scope.page * query.limit;
        query.provider = $scope.user._id;
        req.post('/api/article/list', query).success(function (res) {
            res.forEach(function (each) {
                $scope.articles.push(each);
            });
            if (res.length < query.limit)
                $scope.noMore = true;
            $scope.page++;
        });
    };

    $scope.articles = [];
    $scope.page = 0;

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
            $state.go('edit', {_id: res});
        });
    };

});
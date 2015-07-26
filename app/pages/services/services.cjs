app.controller('services', function ($scope, req, $state, alert) {
    $scope.articles = [];

    $scope.query = {limit: 6};

    $scope.page = 0;

    $scope.$watch('query', function () {
        $scope.page = 0;
        $scope.noMore = false;
    }.true);

    $scope.get = function () {

        $scope.query.skip = $scope.page * $scope.query.limit;
        req.get('/api/article/list', $scope.query).success(function (res) {
            res.forEach(function (each) {
                $scope.articles.push(each);
            });
            if (res.length < $scope.query.limit)
                $scope.noMore = true;
            $scope.page++;
        });
    };

    $scope.get();

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
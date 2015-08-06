app.controller('main', function ($scope, req, $state, alert) {

    document.body.addEventListener('click', function () {
        $scope.date = false;
        $scope.time = false;
    });


    $scope.$watch('query', function () {
        $scope.page = 0;
        $scope.noMore = false;
    }.true);

    $scope.get = function () {
        $scope.query.skip = $scope.page * $scope.query.limit;
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
    $scope.get();


    $scope.showHelp = function () {
        var scope = angular.element(document.querySelector('help')).scope();
        scope.learnMore = true;
    };

});
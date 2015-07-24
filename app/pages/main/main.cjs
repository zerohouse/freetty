app.controller('main', function ($scope, req, $state) {


    $scope.articles = [];


    $scope.get = function () {
        req.get('/api/article/list').success(function (res) {
            res.forEach(function (each) {
                $scope.articles.push(each);
            });
        });
    };


    $scope.newService = function () {
        req.get('/api/article/new').success(function (res) {
            $state.go('article', {_id: res});
        });
    };

});
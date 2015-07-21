app.controller('main', function ($scope, req) {


    $scope.services = [];


    $scope.get = function () {
        req.get('/api/service').success(function (res) {
            res.forEach(function (each) {
                $scope.services.push(each);
            });
        });
    };


});
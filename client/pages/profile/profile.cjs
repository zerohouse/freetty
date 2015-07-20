app.controller('profile', function ($scope, users, $stateParams) {


    $scope.$watch('file', function () {
        console.log($scope.file);
    })

    users($stateParams.id, function (user) {
        $scope.user = user;
        console.log(user);
    });


});
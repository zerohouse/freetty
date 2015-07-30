app.controller('artist.register', function ($scope, popup, $state) {

    $scope.popup = popup;

    $scope.specialty = ['헤어', '네일', '스킨케어', '왁싱', '속눈썹 증'];

    $scope.save = function (state) {

        if (state != undefined)
            $state.go(state);
    };

});
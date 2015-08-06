app.controller('profile.popup', function (popup, $scope, $state, user) {


    $scope.$watch(function () {
        return popup.user;
    }, function (user) {
        $scope.user = user;
        $scope.photo = user.photo == undefined ? app.constants.defaultImg : '/uploads/' + user.photo;
    });

    $scope.profilePage = function (user) {
        $state.go('profile', {url: user._id});
        popup.hide();
    };

    $scope.toArtist = function (user) {
        if (user.type == undefined || user.type == '')
            user.type = 'artist-register-step1';
        $state.go(user.type);
        popup.hide();
    };

    $scope.isRootUser = function (u) {
        return user._id == u._id;
    };
});
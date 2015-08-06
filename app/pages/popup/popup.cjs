app.factory('popup', function () {
    var popup = {};

    var pop = function (val, e) {
        popup.show = true;
        popup.state = val;
        if (e && e.stopPropagation)
            e.stopPropagation();
    };

    pop.isShow = function () {
        return popup.show;
    };

    pop.getState = function () {
        return popup.state;
    };

    pop.hide = function () {
        popup.show = false;
    };


    return pop;
});

app.controller('popup', function ($scope, popup) {

    $scope.url = {};
    $scope.url.login = $scope.url.register = '/app/pages/popup/login/login.html';
    $scope.url.license = '/app/pages/popup/license/license.html';
    $scope.url.profile = '/app/pages/popup/profile.popup/profile.html';

    $scope.classes = {};
    $scope.classes.login = $scope.classes.register = $scope.classes.license = 'window-s';
    $scope.classes.profile = 'window-m';


    $scope.popup = popup;

});
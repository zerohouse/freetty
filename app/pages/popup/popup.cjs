app.factory('popup', function () {
    var popup = {};

    var scope;

    var pop = function (val, e) {
        popup.show = true;
        popup.state = val;
        if (e != undefined)
            e.stopPropagation();
    };

    pop.isShow = function () {
        return popup.show;
    };

    pop.getState = function () {
        return popup.state;
    };


    pop.scope = function (s) {
        scope = s;
    };


    pop.hide = function () {
        popup.show = false;
        scope.$apply();
    };

    return pop;
});

app.controller('popup', function ($scope, popup) {

    popup.scope($scope);

    document.body.addEventListener('click', function () {
        popup.hide();
    });

    $scope.url = {};
    $scope.url.login = $scope.url.register = '/app/pages/popup/login/login.html'
    $scope.url.license = '/app/pages/popup/license/license.html';

    $scope.classes = {};
    $scope.classes.login = $scope.classes.register = $scope.classes.license = 'window-s'


    $scope.popup = popup;

});
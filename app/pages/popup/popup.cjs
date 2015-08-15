(function () {

    var scope;
    var pop;

    app.factory('popup', function () {
        var popup = {};

        pop = function (val) {
            popup.show = true;
            popup.state = val;
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

    app.directive('profilePopup', function () {
        return {
            restrict: 'A',
            link: function (s, e, a) {
                e.bind('click', function () {
                    pop('profile');
                    scope.user = s.$eval(a.profilePopup);
                });
            }
        }
    });

    app.directive('popup', function () {
        return {
            restrict: 'A',
            link: function (s, e, a) {
                e.bind('click', function () {
                    pop(a.popup);
                });
            }
        }
    });


    app.controller('popup', function ($scope, popup) {
        scope = $scope;

        $scope.url = {};
        $scope.url.login = $scope.url.register = '/app/pages/popup/login/login.html';
        $scope.url.license = '/app/pages/popup/license/license.html';
        $scope.url.profile = '/app/pages/popup/profile.popup/profile.html';

        $scope.classes = {};
        $scope.classes.login = $scope.classes.register = $scope.classes.license = 'window-s';
        $scope.classes.profile = 'window-m';
        $scope.popup = popup;

    });


})();
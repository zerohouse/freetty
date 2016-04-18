app.directive('back', function ($window) {
    return {
        link: function (scope, element, attrs) {
            element.on('click', function () {
                $window.history.back();
            });
        }
    }
});
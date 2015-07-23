app.directive('textarea', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attributes) {
            autosize(element);
        }
    }
});
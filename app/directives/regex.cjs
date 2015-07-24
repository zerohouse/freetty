app.factory('$regex', function () {
    var regex = {};

    regex.$all = function () {
        for (var k in regex) {
            if (k == undefined)
                continue;
            if (!regex[k])
                return false;
        }
        return true;
    };

    return regex;
});


app.directive('regex', function ($compile, $regex) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            var message = angular.element("<div class='message' ng-show='!matched'>" + attrs.message + '</div>');
            $compile(message)(scope);

            element[0].parentNode.insertBefore(message[0], element[0].nextSibling);
            var regex = new RegExp(attrs.regex);
            var parent = scope.$parent;
            var regexTest = function () {
                return regex.test(parent.$eval(attrs.ngModel));
            };
            parent.$watch(attrs.ngModel, function () {
                if (parent.$eval(attrs.ngModel) == undefined || parent.$eval(attrs.ngModel) == "" || regexTest()) {
                    element.removeClass('waring');
                    scope.matched = true;
                    $regex[attrs.name] = true;
                    return;
                }
                element.addClass('waring');
                scope.matched = false;
                $regex[attrs.name] = false;
            });
        }
    }
});
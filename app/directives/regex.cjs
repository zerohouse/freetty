app.directive('regex', function ($compile) {
    return {
        restrict: 'A',
        scope: {ngModel: '='},
        link: function (scope, element, attrs) {
            var message = angular.element("<div class='message' ng-show='!matched && ngModel!=undefined && ngModel.length != 0'>" + attrs.message + '</div>');
            $compile(message)(scope);

            element[0].parentNode.insertBefore(message[0], element[0].nextSibling);
            var regex = new RegExp(attrs.regex);
            var parent = scope.$parent;
            var regexTest = function () {
                return regex.test(parent.$eval(attrs.ngModel));
            };
            parent.$watch(attrs.ngModel, function () {
                if (parent.$eval(attrs.ngModel) == undefined || parent.$eval(attrs.ngModel) == "") {
                    setRegex(false);
                    return;
                }
                if (regexTest()) {
                    setRegex(true);
                    return;
                }
                setRegex(false);

                function setRegex(val) {
                    scope.matched = val;
                    if (val)
                        element.removeClass('waring');
                    else
                        element.addClass('waring');

                    if (!attrs.name)
                        return;
                    if (parent.regex == undefined)
                        parent.regex = {};
                    parent.regex[attrs.name] = val;
                }

            });
        }
    }
});
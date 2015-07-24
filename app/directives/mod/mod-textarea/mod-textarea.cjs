app.directive('modTextarea', function () {
    return {
        restrict: 'A',
        templateUrl: '/app/directives/mod/mod-textarea/mod-textarea.html',
        scope: {
            mod: '=',
            modTextarea: '=',
            modSave: '=',
            modRight: '=',
            modDefault: '@',
            placeholder: '@'
        }
    }
});
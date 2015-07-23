app.directive('modTextarea', function () {
    return {
        restrict: 'A',
        templateUrl: '/client/directives/mod/mod-textarea/mod-textarea.html',
        scope: {
            modTextarea: '=',
            modSave: '=',
            modRight: '=',
            modDefault: '@',
            placeholder: '@'
        }
    }
});
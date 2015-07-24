app.directive('modContent', function () {
    return {
        restrict: 'A',
        templateUrl: '/client/directives/mod/mod-content/mod-content.html',
        scope: {
            modContent: '=',
            modSave: '=',
            modRight: '=',
            modDefault: '@',
            placeholder: '@'
        },
        controller: function ($scope, $sce) {
            $scope.modify = function () {
                $scope.mod = true;
            };
            $scope.done = function () {
                $scope.mod = false;
            };
            $scope.trust = function (con) {
                return $sce.trustAsHtml(con);
            };

            $scope.menu = [
                ['font-size'],
                ['bold', 'italic', 'underline', 'strikethrough'],
                ['font-color', 'hilite-color'],
                ['ordered-list', 'unordered-list', 'outdent', 'indent'],
                ['left-justify', 'center-justify', 'right-justify'],
                ['code', 'quote', 'paragraph'],
                ['remove-format'],
            ];
        }
    }
});
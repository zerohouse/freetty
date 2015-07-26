app.directive('reply', function () {
    return {
        restrict: 'A',
        templateUrl: '/app/directives/reply/reply.html',
        scope: {
            reply: '=',
            delete: '='
        }, controller: function ($scope, user, req) {
            $scope.isMyReply = function () {
                return $scope.reply.writer == user._id;
            };

            $scope.save = function () {
                req.put('/api/reply', $scope.reply).success(function (res) {
                    if (res.err) {
                        alert(res.err);
                    }
                });
            };
        }
    }
});
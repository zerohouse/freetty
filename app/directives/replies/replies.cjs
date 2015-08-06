app.directive('replies', function () {
    return {
        restrict: 'E',
        scope: {replyId: '=', user: '=', replies: '='},
        templateUrl: '/app/directives/replies/replies.html',
        controller: function ($scope, req, alert) {
            $scope.replies = [];


            $scope.getReplies = function () {
                req.get('/api/reply', {articleId: $scope.replyId}).success(function (res) {
                    $scope.$parent.replies = $scope.replies = res.concat($scope.replies);
                });
            };

            $scope.$watch('replyId', function () {
                $scope.getReplies();
            });

            $scope.writeReply = function () {
                var reply = {};
                reply.articleId = $scope.replyId;
                reply.reply = $scope.newReply;
                req.post('/api/reply', reply).success(function (res) {
                    if (res.err) {
                        alert(res.err);
                        return;
                    }
                    $scope.replies.unshift(res);
                    $scope.$parent.article.reply++;
                    $scope.newReply = '';
                });
            };

            $scope.delete = function (reply) {
                if (!confirm('삭제하시겠습니까?'))
                    return;
                req.post('/api/reply/delete', reply).success(function (res) {
                    if (res.err) {
                        alert(res.err);
                        return;
                    }
                    $scope.replies.remove(reply);
                    $scope.$parent.article.reply--;
                });
            };
        }
    }
});
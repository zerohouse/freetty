app.controller('reply', function ($scope, req, $stateParams, alert) {

    $scope.replies = [];
    $scope.getReplies = function () {
        req.get('/api/reply', {articleId: $stateParams._id}).success(function (res) {
            $scope.replies = res.concat($scope.replies);
        });
    };

    $scope.getReplies();

    $scope.writeReply = function () {
        var reply = {};
        reply.articleId = $stateParams._id;
        reply.reply = $scope.newReply;
        req.post('/api/reply', reply).success(function (res) {
            if (res.err) {
                alert(res.err);
                return;
            }
            $scope.replies.unshift(res);
            $scope.newReply = '';
        });
    };

    $scope.delete = function (reply) {
        if (!confirm('삭제하시겠습니까?'))
            return;
        req.post('/api/reply/delete', {_id: reply._id}).success(function (res) {
            if (res.err) {
                alert(res.err);
                return;
            }
            $scope.replies.splice($scope.replies.indexOf(reply), 1);
        });
    };

});
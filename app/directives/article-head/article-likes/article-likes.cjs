app.directive('articleLikes', function () {
    return {
        restrict: 'E',
        scope: {
            article: '='
        }, controller: function (req, user, $scope) {
            $scope.likeToggle = function (article) {
                if (article.likes.contains(user._id)) {
                    req.post('/api/article/dislike', {_id: article._id}).success(function (res) {
                        if (res.err) {
                            alert(res.err);
                            return;
                        }
                        article.likes.remove(user._id);
                    });
                    return;
                }
                req.post('/api/article/like', {_id: article._id}).success(function (res) {
                    if (res.err) {
                        alert(res.err);
                        return;
                    }
                    article.likes.push(user._id);
                });
            };
        }, templateUrl: "/app/directives/article-head/article-likes/article-likes.html"
    }
});
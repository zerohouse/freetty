app.controller('message', function ($scope, req, user, users, $timeout, util, $stateParams) {
    util($scope);

    $scope.messages = {};
    $scope.userList = {};
    $scope.state = $stateParams.state == undefined ? '' : $stateParams.state;


    $scope.setState = function (state) {
        $scope.state = state;
        $timeout(scroll);
    };
    $scope.isState = function (state) {
        return $scope.state == state;
    };

    var scroll = function () {
        var ch = $('.chat-wrapper');
        ch.scrollTop(ch[0].scrollHeight);
    };

    $timeout(scroll, 200);

    $scope.sendMessage = function () {
        if ($scope.messageBody == undefined || $scope.messageBody == '')
            return;
        req.post('/api/message', {message: $scope.messageBody, to: $scope.state}).success(function (res) {
            if (res.err) {
                alert(res.err);
                return;
            }
            $scope.messageBody = '';
            messagePush(res);
            $timeout(scroll, 200);
        });
    };

    req.get('/api/message').success(function (res) {
        if (res.err) {
            alert(res.err);
            return;
        }
        if (res.forEach == undefined)
            return;
        res.forEach(messagePush);
    });

    function messagePush(m) {
        if (m.from == m.to)
            return;
        if (m.from == user._id) {
            if ($scope.messages[m.to] == undefined)
                $scope.messages[m.to] = [];
            $scope.messages[m.to].push(m);
            users(m.to, function (u) {
                if ($scope.userList[m.to] == undefined)
                    $scope.userList[m.to] = u;
            });
        }
        if (m.to == user._id) {
            if ($scope.messages[m.from] == undefined)
                $scope.messages[m.from] = [];
            $scope.messages[m.from].push(m);
            users(m.from, function (u) {
                if ($scope.userList[m.from] == undefined)
                    $scope.userList[m.from] = u;
            });
        }
    }
});
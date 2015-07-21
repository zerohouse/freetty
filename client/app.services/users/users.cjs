app.factory('users', function (req) {
    var users = {};
    return function (id, callback) {
        if (users[id] != undefined) {
            callback(users[id]);
            return;
        }

        req.get('/api/user', {id: id}).success(function (res) {
                if (res == "") {
                    var result = {};
                    result.profile = {};
                    result.profile.head = "없는 아이디입니다.";
                    result.profile.body = " ";
                    users[id] = result;
                    callback(result);
                    return;
                }
                callback(res);
            }
        )

    };

});
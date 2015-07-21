app.factory('users', function (req) {
    var users = {};

    var fn = function (_id, callback) {
        if (users[_id] != undefined) {
            callback(users[_id]);
            return;
        }

        req.get('/api/user', {_id: _id}).success(function (res) {
                if (res == "") {
                    var result = {};
                    result.profile = {};
                    result.profile.head = "없는 아이디입니다.";
                    result.profile.body = " ";
                    users[_id] = result;
                    callback(result);
                    return;
                }
                callback(res);
            }
        )
    };

    fn.getByUrl = function (url, callback) {
        req.get('/api/user', {url: url}).success(function (res) {
                if (res == "") {
                    var result = {};
                    result.profile = {};
                    result.profile.head = "없는 아이디입니다.";
                    result.profile.body = " ";
                    users[result._id] = result;
                    callback(result);
                    return;
                }
                callback(res);
            }
        )
    };

    fn.getUsers = function () {
        return users;
    };

    return fn;

});
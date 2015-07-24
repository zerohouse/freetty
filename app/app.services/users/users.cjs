app.factory('users', function (req) {
    var users = {};

    var fn = function (_id, callback) {
        if (users[_id] != undefined) {
            callback(users[_id]);
            return;
        }

        req.get('/api/user', {_id: _id}).success(function (res) {
                response(res, callback);
            }
        )
    };

    fn.getByUrl = function (url, callback) {
        req.get('/api/user', {url: url}).success(function (res) {
                response(res, callback);
            }
        )
    };


    function response(res, callback) {
        if (res.err || res.result == null) {
            var result = {};
            result.profile = {};
            result.profile.head = "없는 아이디입니다.";
            result.profile.body = " ";
            users[result._id] = result;
            callback(result);
            return;
        }
        callback(res.result);
    }

    fn.getUsers = function () {
        return users;
    };

    return fn;

});
app.factory('users', function (req) {
    var users = {};
    var fn = function (id, callback) {
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

    fn.register = function (user) {
        req.post('/api/user', user).success(function (res) {
            console.log(res);
        });
    };

    return fn;

});
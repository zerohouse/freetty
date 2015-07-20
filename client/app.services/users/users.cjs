app.factory('users', function (req) {
    var users = {};
    var fn = function (id, callback) {
        if (users[id] != undefined) {
            callback(users[id]);
            return;
        }

        req.get('/api/user', {id: id}).success(function (res) {
            callback(res);
        });

    };

    fn.register = function (user) {
        req.post('/api/user', user).success(function (res) {
            console.log(res);
        });
    };

    return fn;

});
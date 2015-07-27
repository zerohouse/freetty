app.factory('users', function (req) {
    var users = {};
    var callbacks = {};

    var fn = function (_id, callback) {
        if (_id == undefined)
            return;

        if (users[_id] != undefined) {
            if (users[_id] == 'loading') {
                callbacks[_id].push(callback);
                return;
            }
            callback(users[_id]);
            return;
        }

        users[_id] = 'loading';

        if (callbacks[_id] == undefined)
            callbacks[_id] = [];

        callbacks[_id].push(callback);

        if (_id.length > 16) {
            req.get('/api/user', {_id: _id}).success(function (res) {
                    response(res, _id);
                }
            );
            return;
        }

        req.get('/api/user', {url: _id}).success(function (res) {
                response(res, _id);
            }
        );
    };

    function response(res, _id) {
        if (res.err || res.result == null) {
            users[_id] = null;
            callback(null);
            return;
        }
        var user = res.result;
        if (user.profile == undefined)
            user.profile = {};
        if (user.introduce == undefined)
            user.introduce = {};
        if (user.fields == undefined)
            user.fields = [];
        if (user.introduce == undefined)
            user.introduce = {};
        if (user.introduce.awards == undefined)
            user.introduce.awards = [];
        if (user.introduce.licences == undefined)
            user.introduce.licences = [];
        if (user.introduce.ontheweb == undefined)
            user.introduce.ontheweb = [];
        user.photo == undefined ? 'http://cfile29.uf.tistory.com/image/23315D3F53808A931FB5E9' : '/uploads/' + user.photo;


        users[_id] = user;
        users[user._id] = user;
        if (user.url)
            users[user.url] = user;
        callback(res.result);

        function callback(val) {
            while (callbacks[_id].length > 0) {
                callbacks[_id].pop()(val);
            }
        }
    }

    fn.getUsers = function () {
        return users;
    };

    return fn;

});
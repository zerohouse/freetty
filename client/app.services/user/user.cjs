app.factory('user', function (req, users) {
    var user = {};
    user.logged = false;
    req.get('/api/user/session').success(function (res) {
        if (res.err)
            return;
        angular.copy(res, user);
        users.getUsers()[user._id] = user;
        user.logged = true;
    });
    return user;
});


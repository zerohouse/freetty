app.factory('users', function () {


    var users = {};

    return function (key, callback) {
        if (users[key] != undefined) {
            callback(users[key]);
            return;
        }

        callback({
            profile: 'https://a2.muscache.com/ac/users/889231/profile_pic/1404921378/original.jpg?interpolation=lanczos-none&crop=w:w;*,*&crop=h:h;*,*&resize=68:*&output-format=jpg&output-quality=70'
        });
    };

});
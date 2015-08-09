app.factory('param', function () {
    var param = {};

    param.getParam = function () {
        var tmp = param.param;
        param.param = undefined;
        return tmp;
    };

    param.setParam = function (p) {
        param.param = p;
    };
    return param;
});
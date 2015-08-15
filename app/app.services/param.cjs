//쿼리로 바꿔서 글로벌 쿼리 실행해야될듯.ㅔ

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
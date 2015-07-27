app.factory('popup', function () {

    var popup = {};

    var pop = function (val, e) {
        popup.show = true;
        popup.state = val;
        if (e != undefined)
            e.stopPropagation();
    };

    pop.isShow = function () {
        return popup.show;
    };

    pop.getState = function () {
        return popup.state;
    };

    pop.hide = function () {
        popup.show = false;
    };

    pop.registerScope = function (scope) {
        popup.scope = scope;
    };

    return pop;
});
app.factory('alert', function () {
    return function (message) {
        console.log(message);
        alert(message);
    }
});
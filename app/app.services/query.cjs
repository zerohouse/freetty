app.factory('query', function (user) {
    var query = {}
    query.limit = 10;
    query.price = {min: 0, max: 600000};
    return query;


});
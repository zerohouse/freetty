var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    path = require('path'),
    session = require('express-session'),
    cookie = require('cookie'),
    cookieParser = require('cookie-parser'),
    winston = require('winston'),
    sessionStore = new session.MemoryStore(),
    multer = require('multer'),
    bodyParser = require('body-parser');

var mongoDB = require('mongodb'),
    ObjectID = mongoDB.ObjectID,
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/freetty');


var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: 'debug'
        }),
        new (winston.transports.File)({
            filename: './log/log.log'
        })
    ]
});
app.use(function (req, res, next) {
    res.charset = "utf-8";
    next();
});
app.use('/node_modules', express.static('node_modules'));
app.use('/dist', express.static('dist'));
app.use('/client', express.static('client'));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    if (req.method == "GET")
        req.passed = req.query;
    else
        req.passed = req.body;
    next();
});
//app.use('/socket.io', express.static('node_modules/socket.io/node_modules/socket.io-client'));

var User = mongoose.model('user', mongoose.Schema({
    email: {type: String, index: true, unique: true},
    password: String,
    name: String
}));

User.schema.path('email').validate(function (value) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value);
}, 'Invalid email');
app.get('/api/user', function (req, res) {
    db.user.findOne(req.passed, function (err, result) {
        res.send(result);
    });
});

app.post('/api/user', function (req, res) {
    var user = new User(req.passed);
    user.save(function (err, result) {
        res.send(err);
    });
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

http.listen(80, function () {
    logger.info('listening on *:80');
});


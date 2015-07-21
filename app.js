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
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    if (req.method == "GET")
        req.passed = req.query;
    else
        req.passed = req.body;
    next();
});
//app.use('/socket.io', express.static('node_modules/socket.io/node_modules/socket.io-client'));


app.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return Date.now();
    },
    onFileUploadStart: function (file) {
    },
    onFileUploadComplete: function (file) {
    }
}));
var User = mongoose.model('user', mongoose.Schema({
    id: {type: String, index: true, unique: true},
    email: {type: String, index: true, unique: true},
    password: String,
    name: String,
    photo: String,
    profile: {type: Object}
}));

User.schema.path('email').validate(function (value) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value);
}, 'Invalid email');


var Service = mongoose.model('service', mongoose.Schema({
    head: String,
    body: String,
    provider: String,
    date: Date,
    price: String,
    photos: {type: Array}
}));




app.get('/api/user', function (req, res) {
    req.passed.password = undefined;
    User.findOne(req.passed, function (er, result) {
        res.send(result);
    });
});

app.get('/api/user/list', function (req, res) {
    User.findOne(req.passed, function (er, result) {
        res.send(result)
    });
});

app.put('/api/user', function (req, res) {
    User.update(req.passed.query, req.passed.update, function (err, result) {
        res.send(err);
    });
});

app.post('/api/user/upload', function (req, res) {
    var filename = req.files.file.name;
    var update = {photo: filename};
    User.update(JSON.parse(req.passed.data), update, function (err, result) {
        res.send(filename);
    });
});

app.get('/api/service', function (req, res) {
    Service.find(req.passed.query).sort({'date': -1}).limit(req.passed.limit).skip(req.passed.skip).exec(function (err, results) {
        res.send(results);
    });
});


app.post('/api/service', function (req, res) {
    var service = new Service(req.passed);
    service.date = new Date();
    service.save(function (err, result) {
        res.send(err);
    });
});

app.post('/api/service/upload', function (req, res) {
    var files = [];
    if (req.files.file.forEach == undefined)
        files.push(req.files.file.name);
    else
        req.files.file.forEach(function (file) {
            files.push(file.name);
        });
    res.send(files);
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


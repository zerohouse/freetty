var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    //io = require('socket.io')(http),
    path = require('path');


var mongoDB = require('mongodb'),
    ObjectID = mongoDB.ObjectID,
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/freetty');


var winston = require('winston');
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
var bodyParser = require('body-parser'),
    multer = require('multer');

app.use(function (req, res, next) {
    res.charset = "utf-8";
    next();
});
app.use('/node_modules', express.static('node_modules'));
app.use('/dist', express.static('dist'));
app.use('/app', express.static('app'));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());
app.use(function (req, res, next) {
    if (req.method == "GET")
        req.passed = req.query;
    else
        req.passed = req.body;
    next();
});
//app.use('/socket.io', express.static('node_modules/socket.io/node_modules/socket.io-app'));

app.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        function ran(length) {
            var result = "";
            var r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            for (var i = 0; i < length; i++) {
                result += r.charAt(parseInt(Math.random() * r.length));
            }
            return result;
        }

        return Date.now() + ran(5);
    },
    onFileUploadStart: function (file) {
    },
    onFileUploadComplete: function (file) {
    }
}));
var session = require('express-session'),
    //cookie = require('cookie'),
    sessionStore = new session.MemoryStore(),
    cookieParser = require('cookie-parser'),
    COOKIE_SECRET = 'secret',
    COOKIE_NAME = 'sid';

app.use(cookieParser(COOKIE_SECRET));
app.use(session({
    name: COOKIE_NAME,
    store: sessionStore,
    secret: COOKIE_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: null
    }
}));

Array.prototype.remove = function (val) {
    this.splice(this.indexOf(val), 1);
};

var Article = mongoose.model('article', mongoose.Schema({
    done: Boolean,
    head: String,
    body: Object,
    provider: String,
    date: Date,
    price: String,
    tags: Array,
    photos: Array,
    likes: Array,
    reply: Number,
    location: Object
}));
var Reply = mongoose.model('reply', mongoose.Schema({
    articleId: {type: String, index: true},
    reply: String,
    writer: String,
    date: Date
}));
var User = mongoose.model('user', mongoose.Schema({
    url: {type: String, unique: true, sparse: true},
    email: {type: String, index: true, unique: true},
    password: String,
    name: String,
    photo: String,
    introduce: Object,
    profile: Object,
    location: Object,
    serviceTypes: Object,
    fields: Array,
    licenses: Array,
    type: String
}));

User.schema.path('email').validate(function (value) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value);
}, 'Invalid email');


app.get('/api/user/session', function (req, res) {
    if (req.session.user == undefined) {
        res.send(false);
        return;
    }
    res.send(req.session.user);
});
app.get('/api/user', function (req, res) {
    var query = {};
    if (req.passed.email)
        query.email = req.passed.email;
    if (req.passed._id)
        query._id = req.passed._id;
    if (req.passed.url)
        query.url = req.passed.url;
    User.findOne(query, function (err, result) {
        var resu = {};
        resu.err = err;
        if (result != null)
            result.password = undefined;
        resu.result = result;
        res.send(resu);
    });
});

app.get('/api/user/list', function (req, res) {
    User.findOne(req.passed, function (er, result) {
        res.send(result)
    });
});


app.post('/api/user/upload', function (req, res) {
    if (req.files.file == undefined) {
        res.send('err');
        return;
    }
    var filename = req.files.file.name;
    var update = {photo: filename};
    User.update(JSON.parse(req.passed.data), update, function (err, result) {
        res.send(filename);
    });
});

app.get('/api/user/logout', function (req, res) {
    req.session.destroy();
    res.send(true);
});
app.put('/api/reply', function (req, res) {
    if (req.session.user == undefined) {
        res.send('로그인이 필요한 서비스입니다.');
        return;
    }
    try {
        var _id = new ObjectID(req.passed._id);
    }
    catch (e) {
        res.send(e);
        return;
    }
    req.passed.date = new Date();
    Reply.update({_id: _id, writer: req.session.user._id}, req.passed, function (err, result) {
        res.send(result);
    });

});

app.get('/api/article', function (req, res) {
    try {
        var _id = new ObjectID(req.passed._id);
    }
    catch (e) {
        res.send(e);
        return;
    }
    Article.findOne({_id: _id}, function (err, result) {
        res.send(result);
    });
});

app.post('/api/article', function (req, res) {
    if (req.session.user == undefined) {
        res.send('로그인이 필요한 서비스입니다.');
        return;
    }
    var article = new Article(req.passed);
    article.date = new Date();
    article.provider = req.session.user._id;
    article.save(function (err, result) {
        res.send(err);
    });
});

app.put('/api/article', function (req, res) {
    if (req.session.user == undefined) {
        res.send('로그인이 필요한 서비스입니다.');
        return;
    }
    try {
        var _id = new ObjectID(req.passed._id);
    }
    catch (e) {
        res.send(e);
        return;
    }
    req.passed.date = new Date();
    Article.update({_id: _id, provider: req.session.user._id}, req.passed, function (err, result) {
        res.send(result);
    });
});

app.post('/api/article/upload', function (req, res) {
    if (req.session.user == undefined) {
        res.send('로그인이 필요한 서비스입니다.');
        return;
    }
    var files = [];
    if (req.files.file == undefined) {
        res.send('no files');
        return;
    }
    if (req.files.file.forEach == undefined)
        files.push(req.files.file.name);
    else
        req.files.file.forEach(function (file) {
            files.push(file.name);
        });
    res.send(files);
});

app.get('/api/article/new', function (req, res) {
    var result = {};
    if (req.session.user == undefined) {
        result.err = '로그인이 필요한 서비스입니다.';
        res.send(result);
        return;
    }
    Article.findOne({provider: req.session.user._id, done: false}, function (err, result) {
        if (result == null) {
            var article = new Article({provider: req.session.user._id, done: false, reply: 0, likes: []});
            article.save(function (err, result) {
                res.send(article._id);
            });
            return;
        }
        res.send(result._id);
    });

});

app.get('/api/reply', function (req, res) {
    Reply.find({articleId: req.passed.articleId}).sort({'date': -1}).limit(req.passed.limit).skip(req.passed.skip).exec(function (err, results) {
        res.send(results);
    });
});

app.post('/api/reply', function (req, res) {
    if (req.session.user == undefined) {
        var response = {};
        response.err = '로그인이 필요한 서비스입니다.';
        res.send(response);
        return;
    }
    var reply = new Reply(req.passed);
    reply.date = new Date();
    reply.writer = req.session.user._id;
    reply.save(function (err, result) {
        res.send(reply);
        Article.update({_id: new ObjectID(req.passed.articleId)}, {$inc: {reply: 1}}).exec();
    });
});

app.post('/api/reply/delete', function (req, res) {
    if (req.session.user == undefined) {
        var response = {};
        response.err = '로그인이 필요한 서비스입니다.';
        res.send(response);
        return;
    }
    try {
        var _id = new ObjectID(req.passed._id);
    }
    catch (e) {
        res.send(e);
        return;
    }
    Reply.remove({_id: _id, writer: req.session.user._id}, function (err, result) {
        res.send(result);
        Article.update({_id: new ObjectID(req.passed.articleId)}, {$inc: {reply: -1}}).exec();
    });

});

app.post('/api/article/list', function (req, res) {
        var query = {done: true};
        if (req.passed.query) {
            if (req.passed.query.time) {
                query.startTime = {$lte: req.passed.query.time};
                query.endTime = {$gte: req.passed.query.time};
            }
            if (req.passed.location) {
                query.location = {
                    geometry: {
                        lat: {$lte: 1, $gte: 1},
                        lng: {$lte: 1, $gte: 1}
                    }
                };
            }
            if (req.passed.query.provider)
                query.provider = req.passed.query.provider;
        }

        var limit = req.passed.limit;
        if (limit == undefined)
            limit = 6;
        if (limit > 10)
            limit = 6;

        Article.find(query).sort({'date': -1}).limit(limit).skip(req.passed.skip).exec(function (err, results) {
            res.send(results);
        });
    }
)
;


app.post('/api/user/login', function (req, res) {
    var query = {};
    query.email = req.passed.email;
    User.findOne(query, function (er, result) {
        var login = {};
        if (result == null) {
            login.err = "가입하지 않은 이메일입니다.";
            res.send(login);
            return;
        }
        if (result.password != req.passed.password) {
            login.err = "패스워드가 다릅니다.";
            res.send(login);
            return;
        }
        result.password = undefined;
        res.send(result);
        req.session.user = result;
        req.session.save(function (res) {
        });
    });
});

app.post('/api/user', function (req, res) {
    req.passed.introduce = {type: 'text'};
    req.passed.date = new Date();
    var user = new User(req.passed);
    user.save(function (err, result) {
        var resu = {};
        resu.result = result;
        resu.err = err;
        res.send(resu);
    });
});
(function () {
    var iconv = require('iconv-lite');
    var urlencode = require('urlencode');
    iconv.extendNodeEncodings();
    var request = require('request');
    app.get('/api/license', function (req, res) {
        if (req.session.user == undefined) {
            res.send({err: '로그인이 필요한 서비스입니다.'});
            return;
        }

        var params = {};
        params.hgulNm = urlencode(req.passed.name, 'euckr');
        params.lcsNo = req.passed.license;
        params.lcsMngNo = req.passed.inner;
        params.resdNo1 = req.passed.birth;
        params.qualExpDt = req.passed.date;
        var options = {
            url: 'http://www.q-net.or.kr/qlf006.do?id=qlf00601s01&gSite=Q&gId=&' + parse(params),
            encoding: null,
            headers: {
                'Host': 'www.q-net.or.kr',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.107 Safari/537.36',
            }
        };
        request(options, function (error, response, body) {
            var buf = new Buffer(body, 'euckr');
            var html = iconv.decode(buf, 'euckr');
            var result = {};
            if (html.match("정상적으로 발급된 자격증입니다")) {
                result.valid = true;
                var regex = /<td>(.*)<\/td>/g;
                regex.exec(html);
                result.name = regex.exec(html)[1];
                result.name = result.name.substring(0, result.name.length - 15);
                result.date = regex.exec(html)[1];
                result.license = req.passed.license;
                if (req.session.user.licenses == undefined)
                    req.session.user.licenses = [];
                if (contains(req.session.user.licenses, result)) {
                    res.send({err: '이미 추가한 자격증입니다.'});
                    return;
                }
                req.session.user.licenses.push(result);
                req.session.save();
                User.update({_id: req.session.user._id}, {licenses: req.session.user.licenses}, function (err, re) {
                    res.send(result);
                    return;
                });
                function contains(arr, obj) {
                    for (var i = 0; i < arr.length; i++)
                        if (arr[i].license == obj.license)
                            return true;
                    return false;
                }
            }
            res.send({err: '자격증 정보가 유효하지 않습니다.'});
        });

        function parse(obj) {
            var str = [];
            for (var p in obj)
                str.push(p + "=" + obj[p]);
            return str.join("&");
        }
    });

    app.post('/api/license', function (req, res) {
        if (req.session.user == undefined) {
            res.send({err: '로그인이 필요한 서비스입니다.'});
            return;
        }
        req.session.user.licenses.remove(req.passed);
        req.session.user.save();
        User.update({_id: req.session.user._id}, {licenses: req.session.user.licenses}, function (err, re) {
            res.send(re);
            return;
        });
    });


})();
app.put('/api/user', function (req, res) {
    var result = {};
    if (req.session.user == undefined) {
        result.err = '권한이 없습니다.';
        res.send(result);
        return;
    }
    if (req.session.user._id = !req.passed._id) {
        result.err = '권한이 없습니다.';
        res.send(result);
        return;
    }

    try {
        var _id = new ObjectID(req.passed._id);
    }
    catch (e) {
        res.send(e);
        return;
    }

    if (req.passed.url == "")
        delete req.passed.url;

    req.passed.licences = undefined;

    User.update({_id: _id}, req.passed, function (err, result) {
        req.session.user = req.passed;
        req.session.save();
        res.send(result);
    });
});
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/pages/index/index.html'));
});

http.listen(80, function () {
    logger.info('listening on *:80');
});


var bodyParser = require('body-parser'),
    multer = require('multer');

app.use(function (req, res, next) {
    res.charset = "utf-8";
    next();
});

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
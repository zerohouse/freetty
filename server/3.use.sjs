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
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/pages/index/index.html'));
});

http.listen(3000, function () {
    logger.info('listening on *:3000');
});


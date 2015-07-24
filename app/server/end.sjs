app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

http.listen(80, function () {
    logger.info('listening on *:80');
});


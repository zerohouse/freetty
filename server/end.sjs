app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

http.listen(80, function () {
    logger.info('listening on *:80');
});


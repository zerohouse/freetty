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


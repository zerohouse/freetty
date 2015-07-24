var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    //io = require('socket.io')(http),
    path = require('path');


var mongoDB = require('mongodb'),
    ObjectID = mongoDB.ObjectID,
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/freetty');


Array.prototype.contains = function (item) {
    return this.indexOf(item) != -1;
};


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/freetty');

var User = mongoose.model('user', mongoose.Schema({
    url: {type: String, unique: true, sparse: true},
    email: {type: String, index: true, unique: true},
    password: String,
    name: String,
    photo: String,
    introduce: Object,
    profile: Object,
    serviceTypes: Object,
    fields: Array,
    licenses: Array,
    type: String,
    date: Date,
    lat: Number,
    lng: Number,
    formatted_address: String,
    newMessage: Boolean
}));

var Article = mongoose.model('article', mongoose.Schema({
    done: Boolean,
    head: String,
    body: String,
    provider: String,
    date: Date,
    total: Object,
    discount: Object,
    selectedServices: Array,
    tags: Array,
    photos: Array,
    likes: Array,
    reply: Number,
    hits: Number,
    lat: Number,
    lng: Number,
    price: Number
}));


var p1 = {
    "lat": 37.73809800000001,
    "lng": 127.0336819
};

var p2 = {
    "lat": 37.3942527,
    "lng": 126.9568209
};


var images = [
    '1.jpg', '2.jpg', '3.jpg',
    '4.jpg', '5.jpg', '6.jpg'
];

process.argv.forEach(function (val, index, array) {
    if (val.match('user')) {
        var i = parseInt(val.split("=")[1]);
        makeUsers(i);
        console.log("makeUsers" + i);
    }
    if (val.match('article')) {
        var i = parseInt(val.split("=")[1]);
        makeArticles(i);
        console.log("makeArticles" + i);
    }
});


function makeArticles(length) {
    var tags = ["블링블링", "남자컷", "샤방샤방", "샤방샤방", "30분", "변신", "헤어", "여성", "프리티", "열펌", "남성컷", "다운펌"];

    var article = {
        "done": true,
        "reply": 0,
        "likes": [],
        "selectedServices": [{"price": "15000", "duration": 2, "name": "남성컷", "done": true}, {
            "price": "0",
            "duration": 1,
            "name": "wash",
            "done": true
        }, {"price": "60000", "duration": 7, "name": "Down", "done": true}],
        "hits": 6,
        "date": new Date(),
        "lng": 127.0967915,
        "lat": 37.3908894,
        "body": "남성헤어컷입니다. 남자는 컷이죠 #블링블링 #남자컷",
        "price": 75000,
        "total": {"price": 75000, "discount": 10, "discountPrice": 67500},
        "discount": {"type": "p", "value": "10"}
    };

    User.find({}, function (err, result) {
        if (result == null)
            return;
        for (var i = 0; i < length; i++) {
            article.head = ranName(6 + i % 3);
            article.provider = ranEl(result)._id;
            article.photos = [];
            article.photos.push(ranEl(images));
            var e = ranEl(images);
            if (!article.photos.contains(e))
                article.photos.push(e);
            if (!article.photos.contains(e))
                article.photos.push(e);
            if (!article.photos.contains(e))
                article.photos.push(e);
            article.tags = [];
            article.tags.push(ranEl(tags));
            var e = ranEl(tags);
            if (!article.tags.contains(e))
                article.tags.push(e);
            if (!article.tags.contains(e))
                article.tags.push(e);
            article.lat = ranBetween(p1.lat, p2.lat);
            article.lng = ranBetween(p1.lng, p2.lng);
            article.price = parseInt(ranBetween(10, 500)) * 1000;

            var newArticle = new Article(article);
            newArticle.save();
        }
    });
}


function makeUsers(length) {
    var j = 0;
    var user = {
        "password": "asdfasdf",
        "date": new Date(),
        "licenses": [],
        "fields": [],
        "newMessage": false,
        "lng": 127.0967915,
        "lat": 37.3908894,
        "formatted_address": "대한민국 경기도 성남시 분당구 판교동",
        "introduce": {
            "contact": {"phone": "010-6766-2010", "email": "parksungho86@gmail.com"},
            "specialty": ["헤어", "네일아트"],
            "product": ["펜틴"],
            "lang": ["中國語"],
            "working": {
                "MON": {"attend": true, "end": 59, "start": 37},
                "TUE": {"attend": true, "end": 76, "start": 51}
            }
        },
        "type": "provider",
        "serviceTypes": {
            "Cut": [{"done": true, "name": "남성컷", "duration": 2, "price": "15000"}, {
                "done": true,
                "price": "18000",
                "name": "여성컷",
                "duration": 3
            }],
            "Perm": [{"done": true, "name": "Down", "duration": 7, "price": "60000"}, {
                "done": true,
                "name": "Basic",
                "duration": 5,
                "price": "80000"
            }],
            "Wash": [{"done": true, "name": "wash", "duration": 1, "price": "0"}]
        },
        "photo": "1439449741170e7Ucy.jpg"
    };


    var result = [];

    var email = "asdf@asdf.com";
    var url = "test";

    for (var i = 0; i < length; i++) {
        user.name = ranName(6 + i % 3);
        user.email = email + i;
        user.url = url + i;
        user.introduce.aboutme = ranName(100, (i * 5) % 100);
        user.photo = ranEl(images);
        var userNew = new User(user);
        userNew.save();
    }
}


function ranEl(arr) {
    return arr[ranInt(arr.length)];
}


function ranName(length) {
    var noSpace = "가나다라마바사아자차카타파하고노도로모보소오조초코토포호그림자습격";
    var char = "가나다라마바사아자차카타파하고노도로모보소오조초코토포호블리자드                        ";
    var result = "";
    for (var i = 0; i < length; i++) {
        if (i == 0 || i == length - 1) {
            result += noSpace.charAt(ranInt(noSpace.length));
            continue;
        }
        result += char.charAt(ranInt(char.length));
    }
    return result;
}

function ranInt(val) {
    return parseInt(Math.random() * val);
}


function ranBetween(a, b) {
    var big, small, diff;
    if (a > b) {
        big = a;
        small = b;
    } else {
        big = b;
        small = a;
    }
    return small + Math.random() * (big - small);
}
Date.prototype.toAmPm = function () {
    var hours = this.getHours();
    var minutes = this.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ampm;
};

Date.prototype.toDuration = function () {
    if (isNaN(this.getHours()))
        return false;
    return this.getHours() + '시간 ' + this.getMinutes() + "분";
};

Date.prototype.toString = function () {
    var month = '' + (this.getMonth() + 1),
        day = '' + this.getDate(),
        year = this.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var date = [year, month, day].join('.');
    return date + " " + this.toAmPm();
};

Array.prototype.contains = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val)
            return true;
    }
    return false;
};

Array.prototype.remove = function (val) {
    this.splice(this.indexOf(val), 1);
};

String.prototype.newLine = function () {
    return this.replace(/\n/g, '<br>');
};

String.prototype.toDate = function () {
    return new Date(this.toString());
};

String.prototype.moneyFormat = function () {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

String.prototype.parseHtml = function () {
    return markdown.toHTML(this.toString());
};


Number.prototype.moneyFormat = function () {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

Number.prototype.toTime = function () {
    var time = this.toString() / 4;
    var min = this.toString() % 4 * 15;
    return new Date(0, 0, 0, time, min).toAmPm();
};

String.prototype.toTime = function () {
    var time = this.toString() / 4;
    var min = this.toString() % 4 * 15;
    return new Date(0, 0, 0, time, min).toAmPm();
};


Number.prototype.toDuration = function () {
    var time = this.toString() / 4;
    var min = this.toString() % 4 * 15;
    return new Date(0, 0, 0, time, min).toDuration();
};


String.prototype.toDuration = function () {
    var time = this.toString() / 4;
    var min = this.toString() % 4 * 15;
    return new Date(0, 0, 0, time, min).toDuration();
};

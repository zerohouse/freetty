Date.prototype.toString = function () {
    var month = '' + (this.getMonth() + 1),
        day = '' + this.getDate(),
        year = this.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var date = [year, month, day].join('.');
    var time = formatAMPM(this);
    return date + " " + time;

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ampm;
        return strTime;
    }
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
/**
 * DoYs.prototype.js
 * Author: David.Li
 * Create Date: 2020-04-10
 * Modify Date: 2021-09-01
 * Copyright 2020-2021, doys-next.com
 */

// -- global function ---------------------------------------------------------
window.gId = function (elementId) {
    return window.document.getElementById(elementId);
}
window.sleep = function (milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// -- String ------------------------------------------------------------------
String.prototype.equals = function (str) {
    ///<summary>判断字符串是否相等，忽略大小写。如果想要区分大小写，使用compare()。</summary>
    try {
        if (str == null) return false;
        if (typeof (str) != "string") {
            str = str.toString();
        }

        let a = this.toLowerCase().trim();
        let b = str.toLowerCase().trim();
        let result = a.localeCompare(b);
        return (result == 0);
    }
    catch (e) {
        console.log(e);
    }
};
String.prototype.right = function (len) {
    var start = (this.length > len ? this.length - len : 0);
    return this.substr(start, len);
};
String.prototype.toCamelCase = function () {
    if (this.equals("")) {
        return "";
    }
    return this.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase());
};

String.prototype.toInt = function () {
    ///<summary>将字符串转换为int, 如果是null或者空，则转换为0</summary>
    if (this == null) {
        return 0;
    }
    var value = this.trim();
    if (value == "") {
        return 0;
    }
    value = parseInt(value, 10);
    if (isNaN(value)) value = 0;
    return value;
};
String.prototype.toNumber = function () {
    ///<summary>将字符串转换为int, 如果是null或者空，则转换为0</summary>
    if (this == null) {
        return 0;
    }
    var value = this.trim();
    if (value == "") {
        return 0;
    }
    value = parseFloat(value);
    if (isNaN(value)) value = 0;
    return value;
};
String.prototype.toDate = function (format = "") {
    ///<summary>将字符串转换为Date, 假定字符串符合日期格式(yyyy-MM-dd hh:mm:ss.ms)</summary>
    if (this == null || this == "") {
        return (new Date());
    }

    if (format) {
        return this.toDateByFromat(format);
    }
    else {
        if (this.length < 6) {
            return null;
        }
        else if (this.length == 6) {
            return this.toDateByFromat("yyMMdd");
        }
        else if (this.length == 8) {
            return this.toDateByFromat("yyyyMMdd");
        }
        else {
            if (this.length < 10) {
                return null;
            }
        }
    }

    var YEAR = parseInt(this.substring(0, 4), 10);
    var MONTH = parseInt(this.substring(5, 7), 10) - 1;
    var DAY = parseInt(this.substring(8, 10), 10);

    var HOUR = (this.length >= 13 ? parseInt(this.substring(11, 13), 10) : 0);
    var MINUTE = (this.length >= 16 ? parseInt(this.substring(14, 16), 10) : 0);
    var SECOND = (this.length >= 19 ? parseInt(this.substring(17, 19), 10) : 0);
    var MILLISECOND = (this.length >= 21 ? parseInt(this.substring(20), 10) : 0);

    var dtNew = new Date(YEAR, MONTH, DAY, HOUR, MINUTE, SECOND, MILLISECOND);
    return dtNew;
};
String.prototype.toDateByFromat = function (format = "yyyy-MM-dd") {
    let start;
    let dateResult, year, month, day;
    try {
        start = format.indexOf("yyyy");
        if (start >= 0) {
            year = parseInt(this.substring(start, start + 4));
        }
        else {
            start = format.indexOf("yy");
            if (start >= 0) {
                year = 2000 + parseInt(this.substring(start, start + 2));
            }
        }

        start = format.indexOf("MM");
        if (start >= 0) {
            month = parseInt(this.substring(start, start + 2));
        }

        start = format.indexOf("dd");
        if (start >= 0) {
            day = parseInt(this.substring(start, start + 2));
        }

        start = format.indexOf("ww");
        if (start >= 0) {
            let ww = parseInt(this.substring(start, start + 2));
            let dateFirstDayOfYear = new Date(year, 0, 1);
            let firstDays = dateFirstDayOfYear.getDay();

            if (firstDays <= 4) {   // -- 第一周包含周四 --
                ww = ww - 1;
            }
            dateResult = dateFirstDayOfYear.add(ww * 7 - firstDays + 1, "day");
        }
        else {
            dateResult = new Date(year, month - 1, day);
        }
        return dateResult;
    }
    catch (e) {
        throw e;
    }
}

// -- Date --------------------------------------------------------------------
Date.prototype.toDate = function () {
    return this.toStr().toDate();
}
Date.prototype.toDateString = function (format = "yyyy-MM-dd") {
    return this.toString(format);
};
Date.prototype.toTimeString = function (format = "HH:mm:ss") {
    return this.toString(format);
};
Date.prototype.toStr = function (format = "yyyy-MM-dd") {
    return this.toString(format);
};
Date.prototype.toString = function (format = "yyyy-MM-dd HH:mm:ss") {
    ///<summary>日期时间对象格式化，默认返回 yyyy-MM-dd，除年份外，不支持短格式 </summary>
    ///<param name="format">参数格式：yyyy-MM-dd HH:mm:ss.ms </param>
    let MMMMs = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let strReturn = format ? format : "yyyy-MM-dd";

    let YEAR = this.getFullYear().toString();
    let MONTH = ("0" + (this.getMonth() + 1)).right(2);
    let MMMM = MMMMs[this.getMonth()];
    let DAY = ("0" + this.getDate()).right(2);

    let HOURS = ("0" + this.getHours()).right(2);
    let MINUTES = ("0" + this.getMinutes()).right(2);
    let SECONDS = ("0" + this.getSeconds()).right(2);
    let MILLISECONDS = ("00" + this.getMilliseconds()).right(3);

    strReturn = strReturn.replace("yyyy", YEAR);
    strReturn = strReturn.replace("yy", YEAR.right(2));
    strReturn = strReturn.replace("MMMM", MMMM);
    strReturn = strReturn.replace("MM", MONTH);
    strReturn = strReturn.replace("dd", DAY);

    strReturn = strReturn.replace("HH", HOURS);
    strReturn = strReturn.replace("mm", MINUTES);
    strReturn = strReturn.replace("ss", SECONDS);
    strReturn = strReturn.replace("ms", MILLISECONDS);
    return strReturn;
};
Date.prototype.add = function (n1, datepart) {
    let dateMe = new Date(this);
    let numAdd = 0;
    if (datepart == null) {
        numAdd = n1;
    }
    else if (datepart.equals("s")) {
        numAdd = n1 * 1000;
    }
    else if (datepart.equals("mi")) {
        numAdd = n1 * 60 * 1000;
    }
    else if (datepart.equals("h")) {
        numAdd = n1 * 60 * 60 * 1000;
    }
    else if (datepart.equals("d") || datepart.equals("day")) {
        numAdd = n1 * 24 * 60 * 60 * 1000;
    }
    else if (datepart.equals("week")) {
        numAdd = n1 * 7 * 24 * 60 * 60 * 1000;
    }
    else if (datepart.equals("month")) {
        return new Date(dateMe.setMonth(dateMe.getMonth() + n1));
    }
    else if (datepart.equals("year")) {
        return new Date(dateMe.setFullYear(dateMe.getFullYear() + n1));
    }
    else {
        alert("暂不支持的格式[" + datepart + "]。");
        return dateMe;
    }

    var date1 = new Date(dateMe.getTime() + numAdd);
    return date1;
};
Date.prototype.diffSecond = function (dateEarly) {
    ///<summary>返回2个日期（时间）对象的时间间隔，单位：秒 </summary>
    ///<param name="date1">日期对象</param>
    ///<param name="date2">日期对象</param>
    return (this.getTime() - dateEarly.getTime()) / 1000;
};
Date.prototype.diffDay = function (dateEarly) {
    ///<summary>返回2个日期（时间）对象的时间间隔，单位：天 </summary>
    ///<param name="date1">日期对象</param>
    ///<param name="date2">日期对象</param>
    return (this.getTime() - dateEarly.getTime()) / 1000 / 3600 / 24;
};

// -- Number ------------------------------------------------------------------
Number.prototype.toInt = function () {
    return parseInt(this);
}

// -- JSON --------------------------------------------------------------------
JSON.getHashCode = function (jsonObject) {
    try {
        let hash = 0;
        let jsonString, chr;

        jsonString = JSON.stringify(jsonObject);
        for (let i = 0, len = jsonString.length; i < len; i++) {
            chr = jsonString.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;  // -- Convert to 32bit integer --
        }
        return hash;
    }
    catch (e) {
        debugger;
        return null;
    }
}
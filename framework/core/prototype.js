/**
 * DoYs.prototype.js
 * Author: David.Li
 * Create Date: 2020-04-10
 * Modify Date: 2020-12-14
 * Copyright 2020, doys-next.com
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
    if (str == null) return false;
    str = str.toString();
    return (this.toUpperCase().trim() === str.toUpperCase());

    // -- xpas 旧代码 --
    if (g.b.chrome) {   //-- charome.localeCompare 对中文不支持，同时有严重性能问题 --
        return (this.toUpperCase().trim() === str.toUpperCase());
    }
    else {
        return (this.toUpperCase().trim().localeCompare(str.toUpperCase()) == 0);
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
String.prototype.toDate = function () {
    ///<summary>将字符串转换为Date, 假定字符串符合日期格式(yyyy-MM-dd hh:mm:ss.ms)</summary>
    if (this == null || this == "" || this.length < 10) {
        return null;
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
    var strReturn = format ? format : "yyyy-MM-dd";

    var YEAR = this.getFullYear().toString();
    var MONTH = ("0" + (this.getMonth() + 1)).right(2);
    var DAY = ("0" + this.getDate()).right(2);

    var HOURS = ("0" + this.getHours()).right(2);
    var MINUTES = ("0" + this.getMinutes()).right(2);
    var SECONDS = ("0" + this.getSeconds()).right(2);
    var MILLISECONDS = ("00" + this.getMilliseconds()).right(3);

    strReturn = strReturn.replace("yyyy", YEAR);
    strReturn = strReturn.replace("yy", YEAR.right(2));
    strReturn = strReturn.replace("MM", MONTH);
    strReturn = strReturn.replace("dd", DAY);

    strReturn = strReturn.replace("HH", HOURS);
    strReturn = strReturn.replace("mm", MINUTES);
    strReturn = strReturn.replace("ss", SECONDS);
    strReturn = strReturn.replace("ms", MILLISECONDS);
    return strReturn;
};
Date.prototype.add = function (n1, datepart) {
    var numAdd = 0;
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
        return new Date(this.setMonth(this.getMonth() + n1));
    }
    else if (datepart.equals("year")) {
        return new Date(this.setFullYear(this.getFullYear() + n1));
    }
    else {
        alert("暂不支持的格式[" + datepart + "]。");
        return this;
    }

    var date1 = new Date(this.getTime() + numAdd);
    return date1;
};
Date.prototype.diffSecond = function (dateEarly) {
    ///<summary>返回2个日期（时间）对象的时间间隔，单位：秒 </summary>
    ///<param name="date1">日期对象</param>
    ///<param name="date2">日期对象</param>
    return (this.getTime() - dateEarly.getTime()) / 1000;
};

// -- Number ------------------------------------------------------------------
Number.prototype.toInt = function () {
    return this;
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
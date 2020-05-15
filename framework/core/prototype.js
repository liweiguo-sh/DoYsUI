/**
 * DoYs.prototype.js
 * Author: David.Li
 * Create Date: 2020-04-10
 * Modify Date: 2020-04-10
 * Copyright 2020, doys-next.com
 */

// -- global function ---------------------------------------------------------
window.gId = function (elementId) {
    return window.document.getElementById(elementId);
}

// -- String ------------------------------------------------------------------
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/, '');
};
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
String.prototype.startsWith = function (prefix) {
    if (this.substring(0, prefix.length).equals(prefix)) {
        return true;
    }
    return false;
};
String.prototype.endWith = function (str) {
    let result = false;
    if (this.length >= str.length) {
        let ends = this.substring(this.length - str.length);
        result = ends.equals(str);
    }
    return result;
};
String.prototype.right = function (len) {
    var start = (this.length > len ? this.length - len : 0);
    return this.substr(start, len);
};

// -- Date --------------------------------------------------------------------
Date.prototype.toString = function (format) {
    ///<summary>日期时间对象格式化，默认返回 yyyy-MM-dd，除年份外，不支持短格式 </summary>
    ///<param name="format">参数格式：yyyy-MM-dd hh:mm:ss.ms </param>
    var strReturn = format ? format : "yyyy-MM-dd";

    var YEAR = this.getFullYear().toString();
    var MONTH = ("0" + (this.getMonth() + 1)).right(2);
    var DAY = ("0" + this.getDate()).right(2);

    var HOURS = ("0" + this.getHours()).right(2);
    var MINUTES = ("0" + this.getMinutes()).right(2);
    var SECONDS = ("0" + this.getSeconds()).right(2);
    var MILLISECONDS = ("00" + this.getMilliseconds()).right(3);

    strReturn = strReturn.replace("mm", MINUTES);
    strReturn = strReturn.replace("MM", MONTH);
    strReturn = strReturn.toLowerCase();

    strReturn = strReturn.replace("mi", MINUTES);
    strReturn = strReturn.replace("yyyy", YEAR);
    strReturn = strReturn.replace("yy", YEAR.right(2));
    strReturn = strReturn.replace("dd", DAY);
    strReturn = strReturn.replace("hh24", HOURS);
    strReturn = strReturn.replace("hh", HOURS);
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
    else if (datepart.equals("d")) {
        numAdd = n1 * 24 * 60 * 60 * 1000;
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
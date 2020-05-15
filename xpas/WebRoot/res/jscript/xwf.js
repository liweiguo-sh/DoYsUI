/*
* xwf.const JavaScript Library v1.0
* Author: Volant Lee
* Create Date: 2012-06-27
* Modify Date: 2019-10-23
* Copyright 2017-2019, xpas-next.com
* Description: java script 语言基础类库 
* String、Date、JSON、Collection、Event ...
*/

// -- 类定义 ------------------------------------------------------------------
window.xwf = function () {
    var B = { ie: null, firefox: null, chrome: null, opera: null, safari: null };
    var ua = navigator.userAgent.toLowerCase(), s = "";
    if (document.documentMode) {
        B.ie = document.documentMode;
    }
    else {
        (s = ua.match(/msie ([\d.]+)/)) ? B.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? B.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? B.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? B.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? B.safari = s[1] : 0;
    }
    this.b = B;
    this.b.h5 = (!B.ie || B.ie > 9);
}
window.xwf.prototype = {
    b: { h5: true, ie: null, firefox: null, chrome: null, opera: null, safari: null },
    example: function (parameter1, parameter2) {
        ///<summary>样例函数描述 ...</summary>
        ///<param name="parameter1">参数 1 说明 ...</param>
        ///<param name="parameter2">参数 2 说明 ...</param>
        return parameter1 + parameter2;
    },
    // ----------------------------------------------------
    summary: function () {
        var strSummary = "xwf 基础类库，纯java script 基础函数。";
        return strSummary;
    }
};

// -- String ------------------------------------------------------------------
String.prototype.equals = function (str) {
    ///<summary>判断字符串是否相等，忽略大小写。如果想要区分大小写，使用compare()。</summary>
    if (str == null) return false;
    if (str != null) str = str.toString();
    if (g.b.chrome) {   //-- charome.localeCompare 对中文不支持，同时有严重性能问题 --
        return (this.toUpperCase().trim() === str.toUpperCase());
    }
    else {
        return (this.toUpperCase().trim().localeCompare(str.toUpperCase()) == 0);
    }
};
String.prototype.compare = function (str) {
    ///<summary>判断字符串是否相等，继承自localeCompare()。</summary>
    if (g.b.chrome) {   //-- charome.localeCompare 对中文不支持，同时有严重性能问题 --
        return this.localeCompare(str); //-- 此处需要进一步改写 --
    }
    else {
        return this.localeCompare(str);
    }
};
String.prototype.format = function (format) {
    ///<summary>按照参数format进行格式化，样例：??-???-???。</summary>
    if (this == null || this.equals("") || format == null) return "";
    try {
        if (format.equals("")) return "";
    } catch (e) {

    }
    var nIndex = 0;
    var arrFormat = new Array();
    // ----------------------------------------------------
    for (var i = 0; i < format.length; i++) {
        arrFormat.push(format.substr(i, 1));
    }
    for (var i = 0; i < arrFormat.length; i++) {

        if (arrFormat[i] == "?") {
            if (nIndex < this.length) {
                arrFormat[i] = this.substr(nIndex++, 1);
            }
            else {
                arrFormat[i] = "";
            }
        }
    }

    return arrFormat.join("") + this.substring(nIndex);
};
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/, '');
};
String.prototype.right = function (len) {
    var start = (this.length > len ? this.length - len : 0);
    return this.substr(start, len);
};
String.prototype.startsWith = function (prefix) {
    if (this.substring(0, prefix.length).equals(prefix)) {
        return true;
    }
    return false;
};
String.prototype.inOf = function (searchString, strSymbol) {
    ///<summary>判断当前字符串是否存在要查找的子字符串, 忽略大小写</summary>
    ///<param name="strFind">要查找的子字符串</param>
    ///<param name="strSymbol">指定的分割字符</param>
    if (this == "" || searchString == null || searchString == "") {
        return -1;
    }
    if (strSymbol == null) {
        return this.toLowerCase().indexOf(searchString);
    }
    else {
        return (strSymbol + this.toLowerCase() + strSymbol).indexOf(strSymbol + searchString + strSymbol);
    }
};
String.prototype.replaceAll = function (oldStr, newStr) {
    // -- g:global全部替换，i:ignore忽略大小写，m:多行检索 --
    return this.replace(new RegExp(oldStr, "gmi"), newStr);
};

String.prototype.toInt = function (nullTo) {
    ///<summary>将字符串转换为int, 如果是null或者空，则转换为nullTo</summary>
    if (nullTo == null) nullTo = 0;
    if (this == null) {
        return nullTo;
    }
    var value = this.trim();
    if (value == "") {
        return nullTo;
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
String.prototype.toDateString = function () {
    ///<summary>将字符串转换为Date, 智能猜测日期格式</summary>
    if (this == null || this == "" || this.length < 6) {
        return "";
    }

    var str = this;
    try {
        str = str.replaceAll("/", "-");
        str = str.replaceAll("\\\\", "-");
        str = str.replaceAll("\\.", "-");
        str = str.replaceAll(",", "-");
        str = str.replaceAll("。", "-");
        str = str.replaceAll("，", "-");
        str = str.replaceAll("-", "");
        if (str.length == 6) {
            str = "20" + str;
        }

        str = str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + str.substring(6, 8);
        return str;
    }
    catch (e) {
        alert(e.toString());
    }
    return "";
};

window.xwf.prototype.isMobile = function (string, pattern) {
    var defaultPattern = "^1\\d{10}$";
    return this.RegExpTest(string, pattern || defaultPattern);
};
window.xwf.prototype.isEmail = function (string, pattern) {
    var defaultPattern = "^(\\w-*\\.*)+@(\\w-?)+(\\.\\w{2,})+$";
    return this.RegExpTest(string, pattern || defaultPattern);
};
window.xwf.prototype.isRegId = function (string, pattern) {
    ///<summary>注册账号样例：字母、数字下划线组合，字母开头，6-20位</summary>
    var defaultPattern = "^[a-zA-z]\\w{5,20}$";
    return this.RegExpTest(string, pattern || defaultPattern);
};
window.xwf.prototype.isIdNo = function (string, pattern) {
    ///<summary>验证身份证是否合法(仅支持18位身份证)</summary>
    var defaultPattern = "^\\d{17}(\\d|X|x)$";
    if (!this.RegExpTest(string, pattern || defaultPattern)) return false;

    // -- 验证校验位 --------------------------------------
    var code = string.split('');
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    var sum = 0, ai = 0, wi = 0, last = 0;
    for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
    }
    last = parity[sum % 11];
    if (parity[sum % 11] != code[17]) {
        return false;
    }
    // ----------------------------------------------------
    return true;
};

// -- Number ------------------------------------------------------------------
Number.prototype.equals = function (num) {
    if (num == null || num === "") {
        // -- 在 num == "" 的情况下, 会出现 0 == "" 结果为true --
        return false;
    }
    return this == num;
};
Number.prototype.toInt = function () {
    return parseInt(this, 10);
};
Number.prototype.toNumber = function () {
    return this;
};
window.xwf.prototype.isInt = function (strNum, regInt) {
    if (strNum == null) return false;

    if (regInt == null || regInt.equals("")) {
        regInt = "^[0-9]*$";    // -- 大于等于0的整数 --
    }
    return (new RegExp(regInt)).test(strNum);
};
window.xwf.prototype.isNumberic = function (strNum, regInt) {
    if (strNum == null) return false;

    if (regInt == null || regInt.equals("")) {
        regInt = "^[0-9]+\.{0,1}[0-9]{0,2}$";    // -- 整数或者小数 --
    }
    return (new RegExp(regInt)).test(strNum);
};
window.xwf.prototype.numberFormat = function (number, format) {
    ///<summary>格式化数字，仅支持千分位符和小数位数，示例：,3/,0/,/3/0。逗号为千分位符，数字为小数位数</summary>
    var result = "", scale;

    scale = format.replaceAll(",", "").toInt();
    number = number.toFixed(scale);

    if (format.indexOf(",") >= 0) {
        var arrNumber = (number + "").split(".");
        var arrTemp = arrNumber[0].split("");
        var len = arrTemp.length;
        for (var i = 1; i < len; i++) {
            result = (i % 3 == 0 ? "," : "") + arrTemp[len - i] + result;
        }
        result = arrTemp[0] + result;

        if (arrNumber.length > 1) {
            result += "." + arrNumber[1];
        }
    }
    else {
        result = number;
    }

    return result;
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
window.xwf.prototype.timeInterval = function (date1, date2) {
    ///<summary>返回2个日期（时间）对象的时间间隔，单位：秒 </summary>
    ///<param name="date1">日期对象</param>
    ///<param name="date2">日期对象</param>
    return (date2.getTime() - date1.getTime()) / 1000;
};

// -- JSON --------------------------------------------------------------------
window.xwf.prototype.extendJSON = function (json1, json2) {
    ///<summary>将json2附加并覆盖到json1，返回合集</summary>
    if (json2) {
        for (var key in json2) {
            json1[key] = json2[key];
        }
    }
    return json1;
};
window.xwf.prototype.collectionToString = function (collection, separator) {
    var strReturn = "";
    if (separator == null || separator == "") {
        separator = g.c.CHAR1;
    }
    for (var key in collection) {
        strReturn += separator + key + "=" + collection[key];
    }
    if (strReturn.length > 0) {
        strReturn = strReturn.substring(separator.length);
    }
    return strReturn;
}
window.xwf.prototype.stringToCollection = function (strCollection, separator) {
    var collectionReturn = {};
    if (separator == null || separator == "") {
        separator = g.c.CHAR1;
    }
    var arrCollection = strCollection.split(separator);
    for (var i = 0; i < arrCollection.length; i++) {
        var nIndex = arrCollection[i].indexOf("=");
        var key = arrCollection[i].substring(0, nIndex).trim();
        var value = arrCollection[i].substring(nIndex + 1).trim();
        collectionReturn[key] = value;
    }
    return collectionReturn;
}

// -- SQL ---------------------------------------------------------------------
window.xwf.prototype.sqlToArray = function (sqlString) {
    ///<summary>将标准SQL语句拆分成JSON数组，返回JSON数组</summary>
    var nIdx = 0;
    var arrReturn = new Array();
    var arrSql = sqlString.split(" AND ");
    for (var i = 0; i < arrSql.length; i++) {
        var sql = arrSql[i].trim();
        var fieldName = "", symbol = "", fieldValue = "";
        var jsonSql = {};

        nIdx = sql.indexOf(" ");
        if (nIdx <= 0) return null;
        fieldName = sql.substring(0, nIdx);
        sql = sql.substring(nIdx).trim();

        nIdx = sql.indexOf(" ");
        if (nIdx <= 0) return null;
        symbol = sql.substring(0, nIdx);
        fieldValue = sql.substring(nIdx).trim();

        if (fieldValue.lenght >= 2 && fieldValue.substring(0, 1).equals("'") && fieldValue.substring(fieldValue.length - 1, 1).equals("'")) {
            fieldValue = fieldValue.substring(1, fieldValue.length - 1);
        }

        jsonSql.fieldName = fieldName;
        jsonSql.symbol = symbol;
        jsonSql.fieldValue = fieldValue;
        arrReturn.push(jsonSql);
    }
    return arrReturn;
};

// -- Event -------------------------------------------------------------------
window.xwf.prototype.compatibleEventName = function (eventName) {
    var evtName = eventName.toLowerCase();
    if (g.b.ie && g.b.ie < 9) {
        if (!evtName.startsWith("on")) {
            evtName = "on" + evtName;
        }
    }
    else {
        if (evtName.startsWith("on")) {
            evtName = evtName.substring(2);
        }
    }
    return evtName;
};
window.xwf.prototype.getEventTarget = function (evt) {
    evt = evt || window.event;
    if (!evt) return null;
    return (evt.target ? evt.target : evt.srcElement);
};

window.xwf.prototype.addEventListener = function (eventName, eventMethod, srcElement) {
    var evtName = this.compatibleEventName(eventName);

    srcElement = srcElement ? srcElement : this.getEventTarget(event);
    if (g.b.ie && g.b.ie < 9) {
        srcElement.attachEvent(evtName, eventMethod);
        srcElement.setCapture();
    }
    else {
        srcElement.addEventListener(evtName, eventMethod, true);
    }
};
window.xwf.prototype.removeEventListener = function (eventName, eventMethod, srcElement) {
    var evtName = this.compatibleEventName(eventName);

    srcElement = srcElement ? srcElement : this.getEventTarget(event);
    if (g.b.ie && g.b.ie < 9) {
        srcElement.detachEvent(evtName, eventMethod);
        srcElement.releaseCapture();
    }
    else {
        srcElement.removeEventListener(evtName, eventMethod, true);
    }
};
window.xwf.prototype.bindEnterEvent = function (srcElement, callback) {
    // -- 目前支支持文本框绑定回车事件 --
    srcElement.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 13) {
            callback();
        }
    };
};

//-- CSS ----------------------------------------------------------------------
window.xwf.prototype.getCurrentStyle = function getCurrentStyle(oElement, sProperty) {
    if (oElement.currentStyle) {
        return oElement.currentStyle[sProperty];
    }
    else if (window.getComputedStyle) {
        sProperty = sProperty.replace(/([A-Z])/g, "-$1").toLowerCase();
        return window.getComputedStyle(oElement, null).getPropertyValue(sProperty);
    }
    else {
        return null;
    }
};

// -- Web Control -------------------------------------------------------------
window.xwf.prototype.webControlSetValue = function (control, value) {
    var ctlType = control.type;
    var tagName = control.tagName;
    // ----------------------------------------------------
    if (tagName.equals("SELECT")) {
        control.selectedIndex = -1;
        for (var i = 0; i < control.children.length; i++) {
            if (control.children[i].value.equals(value)) {
                control[i].selected = true;
                break;
            }
        }
    }
    else {
        alert("unknown web control type: " + ctlType);
    }
};

// -- Data Verify -------------------------------------------------------------
window.xwf.prototype.RegExpTest = function (string, pattern) {
    ///<summary>正则表达式测试</summary>
    if (string == null || pattern == null) return false;
    try {
        if ((new RegExp(pattern)).test(string)) {
            return true;
        }
    }
    catch (e) {
        debug(e.toString());
    }
    return false;
};

window.xwf.prototype.verifyInt = function (num, jsonRule) {
    return (new RegExp("^-?\\d+$")).test(num);
};
window.xwf.prototype.verifyNum = function (num, jsonRule) {
    return (new RegExp("^(-?\\d+)(\\.\\d+)?$")).test(num);
};
window.xwf.prototype.verifyDatetime = function (datetime, jsonRule) {
    return true;
};
window.xwf.prototype.verifyString = function (text, maxLength, jsonRule) {
    if (text.replace(/[^\x00-\xff]/g, 'xx').length > maxLength) {
        return false;
    }
    return true;
};


//true  是2位小数，并且不超过maxNum
window.xwf.prototype.isFloat2 = function (num, maxNum) {
    if (!/^(?!0+(\.0*)?$)\d+(\.\d{1,2})?$/.test(num)) return false;
    if (maxNum && parseInt(num) > maxNum) return false;
    return true;
};

//toFixed兼容方法
Number.prototype.toFixedN = function (n) {
	  if (n > 20 || n < 0) {
	        throw new RangeError('toFixed() digits argument must be between 0 and 20');
	    }
	    var number = this;
	    if (isNaN(number) || number >= Math.pow(10, 21)) {
	        return new Number(number);
	    }
	    if (typeof (n) == 'undefined' || n == 0) {
	        return new Number((Math.round(number)));
	    }

	    var result = number.toString();
	    var arr = result.split('.');

	    // 整数的情况
	    if (arr.length < 2) {
	        result += '.';
	        for (var i = 0; i < n; i += 1) {
	            result += '0';
	        }
	        return new Number(result);
	    }

	    var integer = arr[0];
	    var decimal = arr[1];
	    if (decimal.length == n) {
	        return parseFloat(result);
	    }
	    if (decimal.length < n) {
	        for (var i = 0; i < n - decimal.length; i += 1) {
	            result += '0';
	        }
	        return new Number(result);
	    }
	    result = integer + '.' + decimal.substr(0, n);
	    var last = decimal.substr(n, 1);

	    // 四舍五入，转换为整数再处理，避免浮点数精度的损失
	    if (parseInt(last, 10) >= 5) {
	    	var x = Math.pow(10, n);
	        result = (Math.round((parseFloat(result) * x)) + 1) / x;
	        result = result.toFixed(n);
	    }

	    return new Number(result);
};

//转换成n位小数
window.xwf.prototype.toFixedN = function (num, n) {
	   if (n > 20 || n < 0) {
	        throw new RangeError('toFixed() digits argument must be between 0 and 20');
	    }
	    var number = num;
	    if (isNaN(number) || number >= Math.pow(10, 21)) {
	        return new Number(number);
	    }
	    if (typeof (n) == 'undefined' || n == 0) {
	        return new Number((Math.round(number)));
	    }

	    var result = number.toString();
	    var arr = result.split('.');

	    // 整数的情况
	    if (arr.length < 2) {
	        result += '.';
	        for (var i = 0; i < n; i += 1) {
	            result += '0';
	        }
	        return new Number(result);
	    }

	    var integer = arr[0];
	    var decimal = arr[1];
	    if (decimal.length == n) {
	        return parseFloat(result);
	    }
	    if (decimal.length < n) {
	        for (var i = 0; i < n - decimal.length; i += 1) {
	            result += '0';
	        }
	        return new Number(result);
	    }
	    result = integer + '.' + decimal.substr(0, n);
	    var last = decimal.substr(n, 1);

	    // 四舍五入，转换为整数再处理，避免浮点数精度的损失
	    if (parseInt(last, 10) >= 5) {
	    	var x = Math.pow(10, n);
	        result = (Math.round((parseFloat(result) * x)) + 1) / x;
	        result = result.toFixed(n);
	    }

	    return new Number(result);
};


//截取字符，中英文都可以，hasDot=true 返回值的最后还可以添加3个点 
window.xwf.prototype.subStr = function (str, len, hasDot) {
	 var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = str.replace(chineseRegex, "**").length;
    for (var i = 0; i < strLength; i++) {
        singleChar = str.charAt(i).toString();
        if (singleChar.match(chineseRegex) != null) {
            newLength += 2;
        }
        else {
            newLength++;
        }
        if (newLength > len) {
            break;
        }
        newStr += singleChar;
    }

    if (hasDot && strLength > len) {
        newStr += "...";
    }
    return newStr;
};
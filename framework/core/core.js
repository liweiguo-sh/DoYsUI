/**
 * DoYs.core.js
 * Author: David.Li
 * Create Date: 2020-04-10
 * Modify Date: 2021-10-19
 * Copyright 2020-2021, doys-next.com
 */

(function () {
    if (!window.g) window.g = {};
    if (!g.x) g.x = {};

    window.urlPara = _getUrlPara();
})()

function _getUrlPara(url) {
    //<summary>取页面url参数, 返回JSON格式</summary>
    if (url) {
        var nIdx = url.indexOf("?");
        if (nIdx >= 0) {
            url = url.substring(nIdx + 1);
        }
    }
    else {
        url = window.location.search.substring(1);
    }
    // ----------------------------------------------------
    var arrUrlPara = url.split('&');
    var jsonUrlPara = {};
    for (var i = 0; i < arrUrlPara.length; i++) {
        var arrPara = arrUrlPara[i].split("=");
        if (arrPara.length == 2) {
            jsonUrlPara[decodeURIComponent(arrPara[0].trim())] = decodeURIComponent(arrPara[1].trim());
        }
    }
    return jsonUrlPara;
}
function getUrlItem(key, defaultValue = "") {
    return urlPara[key] || defaultValue;
}
function getPageHash(key = "") {
    let url = window.location.href;
    let idx = url.indexOf("?");
    if (idx > 0) {
        url = url.substring(0, idx);
    }
    let hash = JSON.getHashCode(url);

    return hash + "_" + key;
}

function getLocalItem(key, defaultValue = "") {
    return window.localStorage.getItem(key) || defaultValue;
}
function setLocalItem(key, value) {
    window.localStorage.setItem(key, value);
}
function getPageCookie(key, defaultValue = "") {
    return window.localStorage.getItem(getPageHash(key)) || defaultValue;
}
function setPageCookie(key, value) {
    window.localStorage.setItem(getPageHash(key), value);
}

// -- 定位 ---------------------------------------------------------------------
function getOffsetTop(objDOM) {
    var nTop = objDOM.offsetTop;
    var offsetParent = objDOM.offsetParent;
    while (offsetParent) {
        nTop += (offsetParent.offsetTop + offsetParent.clientTop);
        if (offsetParent.style.position.equals("relative")) break;
        offsetParent = offsetParent.offsetParent;
    }
    return nTop;
}
function getOffsetLeft(objDOM) {
    var nLeft = objDOM.offsetLeft;
    var offsetParent = objDOM.offsetParent;
    while (offsetParent) {
        nLeft += (offsetParent.offsetLeft + offsetParent.clientLeft);
        if (offsetParent.style.position.equals("relative")) break;
        offsetParent = offsetParent.offsetParent;
    }
    return nLeft;
}
function getTopOffsetTop(objDOM) {
    var nTop = objDOM.offsetTop;
    var offsetParent = objDOM.offsetParent;
    while (true) {
        if (offsetParent == null) break;
        if (offsetParent.tagName == "BODY") {
            var parentWindow = getParentWindow(offsetParent.ownerDocument);
            if (parentWindow.frameElement == null) break; // -- 顶级窗口(非DIV+IFRAME模拟)--
            nTop -= offsetParent.ownerDocument.documentElement.scrollTop; // -- 窗口滚动条当前滚动高度 --
            offsetParent = parentWindow.frameElement; // -- 窗口的IFRAME容器 --
            nTop += (offsetParent.offsetTop + offsetParent.clientTop) + g.x.getStyleValue(offsetParent, "paddingTop");
        } else if (offsetParent.tagName == "HTML") {
            //alert("???");
        } else {
            nTop += (offsetParent.offsetTop + offsetParent.clientTop);
        }
        offsetParent = offsetParent.offsetParent;
    }
    return nTop;
}
function getTopOffsetLeft(objDOM) {
    var nLeft = objDOM.offsetLeft;
    var offsetParent = objDOM.offsetParent;
    while (true) {
        if (offsetParent == null) break;
        if (offsetParent.tagName == "BODY") {
            var parentWindow = getParentWindow(offsetParent.ownerDocument);
            if (parentWindow.frameElement == undefined) break; // -- 顶级窗口(非DIV+IFRAME模拟)--
            nLeft -= offsetParent.ownerDocument.documentElement.scrollLeft; // -- 窗口滚动条当前滚动高度 --
            offsetParent = parentWindow.frameElement; // -- 窗口的IFRAME容器 --
            nLeft += (offsetParent.offsetLeft + offsetParent.clientLeft) + g.x.getStyleValue(offsetParent, "paddingLeft");
        }
        else if (offsetParent.tagName == "HTML") {
            //alert("???");
        }
        else {
            nLeft += (offsetParent.offsetLeft + offsetParent.clientLeft);
        }
        offsetParent = offsetParent.offsetParent;
    }
    return nLeft;
}
function getParentWindow(objDoc) {
    return objDoc.defaultView || objDoc.parentWindow || window;
}

// -- g.x.xxx -----------------------------------------------------------------
g.x.eval = function (jsString) {
    try {
        return eval(jsString);
    }
    catch (e) {
        alert("表达式错误，请检查：\n" + jsString + "\n" + e.toString());
    }
};
g.x.extendJSON = function (json1, json2) {
    ///<summary>将json2附加并覆盖到json1，返回合集</summary>
    if (json2) {
        if (!json1) json1 = {};
        for (var key in json2) {
            json1[key] = json2[key];
        }
    }
    return json1;
};
g.x.getAbsolutePath = function (jsSelf = "core.js", relativePath = "framework") {
    let absolutePath;
    let scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
        var jsSrc = scripts[i].src;
        var idx = jsSrc.indexOf("/" + jsSelf);
        if (idx > 0) {
            absolutePath = jsSrc.substring(0, idx + 1);
            break;
        }
    }
    if (!absolutePath) {
        alert("When running g.x.getAbsolutePath, unexpected error encountered, please check.");
        return;
    }
    if (relativePath) {
        absolutePath = absolutePath.substring(0, absolutePath.lastIndexOf("/" + relativePath + "/") + relativePath.length + 2);
    }
    return absolutePath;
}

g.x.getEventTarget = function (evt) {
    evt = evt || window.event;
    if (!evt) return null;
    return (evt.target ? evt.target : evt.srcElement);
};
g.x.getCurrentStyle = function getCurrentStyle(oElement, sProperty) {
    sProperty = sProperty.replace(/([A-Z])/g, "-$1").toLowerCase();
    return window.getComputedStyle(oElement, null).getPropertyValue(sProperty);
};
g.x.getStyleValue = function getCurrentStyle(oElement, sProperty) {
    let style = g.x.getCurrentStyle(oElement, sProperty);
    return parseInt(style.replace("px"));
};

g.x.isString = function (obj) {
    let result = Object.prototype.toString.call(obj);
    return result == "[object String]";
}
g.x.isImageUrl = function (url) {
    let suffixString = ".png;.ico;.jpg;.jpeg;.bmp;.gif";
    let suffixes = suffixString.split(";");
    let len = suffixes.length;

    if (!g.x.isString(url)) {
        return false;
    }
    try {
        for (let i = 0; i < len; i++) {
            if (url.toLowerCase().endsWith(suffixes[i])) {
                return true;
            }
        }
    }
    catch (e) {
        alert(e.toString());
    }
    return false;
}

g.x.getPath = function (relativePath = "", endWith = "/") {
    let url = document.documentURI;
    let idx = url.lastIndexOf("/");
    let path = url.substring(0, idx);

    // ----------------------------------------------------
    if (relativePath.startsWith("/")) {
        relativePath = relativePath.substring(1);
    }
    if (relativePath.endsWith("/")) {
        relativePath = relativePath.substring(0, relativePath.length - 1);
    }
    if (!relativePath.equals("")) {
        path += "/" + relativePath;
    }
    if (endWith.equals("/")) {
        path += "/";
    }
    return path;
}
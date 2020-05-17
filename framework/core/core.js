/**
 * DoYs.core.js
 * Author: David.Li
 * Create Date: 2020-04-10
 * Modify Date: 2020-04-19
 * Copyright 2020, doys-next.com
 */

var urlPara = _getUrlPara();
function _getUrlPara(url) {
    //<summary>取页面url参数, 返回JSON格式</summary>
    if (url) {
        var nIdx = url.indexOf("?");
        if (nIdx >= 0) {
            url = url.substring(nIdx + 1);
        }
    } else {
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

function getLocalItem(key, defaultValue = "") {
    return window.localStorage.getItem(key) || defaultValue;
}
function setLocalItem(key, value) {
    window.localStorage.setItem(key, value);
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
            nTop += (offsetParent.offsetTop + offsetParent.clientTop) + parseInt(g.x.getCurrentStyle(offsetParent, "paddingTop").replace("px"));
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
            nLeft += (offsetParent.offsetLeft + offsetParent.clientLeft) + +parseInt(g.x.getCurrentStyle(offsetParent, "paddingLeft").replace("px"));
        } else if (offsetParent.tagName == "HTML") {
            //alert("???");
        } else {
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
g.x.extendJSON = function (json1, json2) {
    ///<summary>将json2附加并覆盖到json1，返回合集</summary>
    if (json2) {
        for (var key in json2) {
            json1[key] = json2[key];
        }
    }
    return json1;
};

g.x.getEventTarget = function (evt) {
    evt = evt || window.event;
    if (!evt) return null;
    return (evt.target ? evt.target : evt.srcElement);
};
g.x.getCurrentStyle = function getCurrentStyle(oElement, sProperty) {
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
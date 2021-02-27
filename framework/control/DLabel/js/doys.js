/**
 * DoYs JavaScript Library v1.0
 * Author: David.Li
 * Create Date: 2021-02-24
 * Modify Date: 2021-02-24
 * Copyright 2021, doys-next.com
 * DLabel doys.js
 */

(function () {
    var resRootPath, jsDoys = "doys.js";
    var jsVer = top.jsVer || (new Date()).getTime();
    // ----------------------------------------------------
    if (document.documentURI.indexOf("//127.0.0.1/") > 0) {
        jsVer = (new Date()).getTime();
    }

    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
        var jsSrc = scripts[i].src;
        var idx = jsSrc.indexOf("/" + jsDoys);
        if (idx > 0) {
            resRootPath = jsSrc.substring(0, idx + 1);
            break;
        }
    }
    if (!resRootPath) {
        alert("When running doys.js, unexpected error encountered, please check.");
        return;
    }
    resRootPath = resRootPath.substring(0, resRootPath.lastIndexOf("/framework/"));

    var arrCss = new Array(), arrJs = new Array();
    // ----------------------------------------------------
    arrCss.push("/framework/control/window/xwf.window.css");
    arrCss.push("/framework/control/DLabel/css/designer.css");
    arrCss.push("/plugin/element/index.css");

    arrJs.push("/plugin/vue.js");
    arrJs.push("/plugin/element/index.js");

    arrJs.push("/framework/core/prototype.js");
    arrJs.push("/framework/core/core.js");
    arrJs.push("/framework/control/window/xwf.window.js");

    arrJs.push("/framework/control/DLabel/js/font.js");
    arrJs.push("/framework/control/DLabel/js/util.js");
    arrJs.push("/framework/control/DLabel/js/element.js");
    arrJs.push("/framework/control/DLabel/js/label.js");

    // ----------------------------------------------------
    for (var i = 0; i < arrCss.length; i++) {
        document.write("<link href='" + resRootPath + arrCss[i] + "?v=" + jsVer + "' rel='stylesheet' />");
    }
    for (var i = 0; i < arrJs.length; i++) {
        document.write("<script src='" + resRootPath + arrJs[i] + "?v=" + jsVer + "'></script>");
    }
})()
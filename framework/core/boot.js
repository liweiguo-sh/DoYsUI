/**
 * DoYs JavaScript Library v1.0
 * Author: David.Li
 * Create Date: 2021-01-27
 * Modify Date: 2021-01-27
 * Copyright 2020, doys-next.com
 * bootstrap program
 */

(function () {
    var jsBootPath, jsBoot = "boot.js";
    var jsVer = top.jsVer || (new Date()).getTime();

    if (document.documentURI.indexOf("//127.0.0.1/") > 0) {
        jsVer = (new Date()).getTime();
    }

    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
        var jsSrc = scripts[i].src;
        var idx = jsSrc.indexOf("/" + jsBoot);
        if (idx > 0) {
            jsBootPath = jsSrc.substring(0, idx + 1);
            break;
        }
    }
    if (!jsBootPath) {
        alert("When running boot.js, unexpected error encountered, please check.");
        return;
    }
    document.write("<script src='" + jsBootPath + "doys.js?v=" + jsVer + "'></script>");
})()
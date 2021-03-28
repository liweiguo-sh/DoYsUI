/**
 * DoYs JavaScript Library v1.0
 * Author: David.Li
 * Create Date: 2021-02-24
 * Modify Date: 2021-03-28
 * Copyright 2021, doys-next.com
 * DLabel doys.js
 */

(function () {
    window.jsVer = top.jsVer || "2021-03-27";
    if (document.documentURI.indexOf("//127.0.0.1/") > 0) {
        window.jsVer = (new Date()).getTime();
    }

    window.g = {
        prefix: "",
        cfg: {
            ajaxType: "axios"
        },
        c: {
            CHAR1: "\1",
            CHAR2: "\2",
            CHAR3: "\3",
            CHAR4: "\4",
            CHAR5: "\5",
            CHAR6: "\6",
            CHAR7: "\7"
        }
    }

    importFrameworkRes("doys");
})()

// ----------------------------------------------------------------------------
function importFrameworkRes(fileRes) {
    ///<summary>按需导入框架资源文件，js或css等</summary>
    ///<param name="fileRes">框架资源文件名称，不包含路径</param>
    let resRootPath = getResRootPath();
    let arrRes = new Array();

    // -- 1. 通用公共资源 ------------------------------------
    if (fileRes == "doys") {
        arrRes.push(resRootPath + "/plugin/element/index.css");

        arrRes.push(resRootPath + "/plugin/axios.min.js");
        arrRes.push(resRootPath + "/plugin/vue.js");
        arrRes.push(resRootPath + "/plugin/element/index.js");

        arrRes.push(resRootPath + "/framework/core/prototype.js");
        arrRes.push(resRootPath + "/framework/core/core.js");
        arrRes.push(resRootPath + "/framework/core/ajax.js");
        arrRes.push(resRootPath + "/framework/core/datatable.js");
    }
    // -- 2. 按需资源 ------------------------------------------
    else if (fileRes.equals("designer")) {
        arrRes.push(resRootPath + "/framework/core/edge.js");
        arrRes.push(resRootPath + "/framework/control/window/xwf.window.css");
        arrRes.push(resRootPath + "/framework/control/window/xwf.window.js");
        arrRes.push(resRootPath + "/framework/control/DLabel/js/topwin.js");

        arrRes.push(resRootPath + "/framework/css/ali-icon-font.css");

        arrRes.push(resRootPath + "/framework/control/DLabel/css/designer.css");
        arrRes.push(resRootPath + "/framework/control/DLabel/css/toolbar.css");
        arrRes.push(resRootPath + "/framework/control/DLabel/css/label.css");

        arrRes.push(resRootPath + "/framework/control/DLabel/js/font.js");
        arrRes.push(resRootPath + "/framework/control/DLabel/js/util.js");
        arrRes.push(resRootPath + "/framework/control/DLabel/js/element.js");
        arrRes.push(resRootPath + "/framework/control/DLabel/js/label.js");
        arrRes.push(resRootPath + "/framework/control/DLabel/js/example.js");
    }
    else if (fileRes.equals("preview")) {
        arrRes.push(resRootPath + "/framework/control/DLabel/css/label.css");

        arrRes.push(resRootPath + "/framework/control/DLabel/js/element.js");
        arrRes.push(resRootPath + "/framework/control/DLabel/js/label.js");
    }
    else if (fileRes.equals("DLabel-element")) {
        arrRes.push(resRootPath + "/framework/control/DLabel/js/element.js");
    }
    else if (fileRes.equals("DLabel-example")) {
        arrRes.push(resRootPath + "/framework/control/DLabel/js/example.js");
    }
    else {
        alert("importFrameworkRes found unknown resource: " + fileRes);
    }

    // -- output javascript -------------------------------
    for (let res of arrRes) {
        if (res.endsWith(".css")) {
            document.write("<link href='" + res + "?v=" + jsVer + "' rel='stylesheet' />");
        }
        else {
            document.write("<script src='" + res + "?v=" + jsVer + "'></script>");
        }
    }
}
function getResRootPath(rootPathName = "framework") {
    var resRootPath, jsSelf = "doys.js";
    // ----------------------------------------------------
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
        var jsSrc = scripts[i].src;
        var idx = jsSrc.indexOf("/" + jsSelf);
        if (idx > 0) {
            resRootPath = jsSrc.substring(0, idx + 1);
            break;
        }
    }
    if (!resRootPath) {
        alert("When running doys.js, unexpected error encountered, please check.");
        return;
    }
    resRootPath = resRootPath.substring(0, resRootPath.lastIndexOf("/" + rootPathName + "/"));
    return resRootPath;
}
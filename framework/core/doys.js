﻿/**
 * DoYs JavaScript Library v1.0
 * Author: David.Li
 * Create Date: 2020-04-08
 * Modify Date: 2020-04-22
 * Copyright 2020, doys-next.com
 */
(function () {
    window.g = {
        debug: true,                            // -- 开发调试模式 --
        prefix: "http://{domain}:9988",         // -- 后台服务入口，实例：http://192.168.169.1:9988，{domain}表示和前端相同 --
        path: {
            base: "DoYsUI",                     // -- 前台应用根目录 --
            framework: "/framework",            // -- 框架根目录 --
            plugin: "/plugin",                  // -- 插件根路径 --
            project: "/project"                 // -- 项目根目录 --
        },
        cfg: {
            jsVer: "200422",                    // -- js版本号，解决js文件缓存问题 --
            ajaxType: "axios",                  // -- ["axios", "fetch", "others"] --
            remark: "全局配置项集合"
        }
    };
    window.g.c = {
        CHAR1: "\1",
        CHAR2: "\2",
        CHAR3: "\3",
        CHAR4: "\4",
        CHAR5: "\5",
        CHAR6: "\6",
        CHAR7: "\7",

        zIndexWin: 1000,
        zIndexElement: 90000,

        titleMessage: "系统消息...",
        titleConfirm: "系统消息...",
        remark: "全局常量"
    };
    window.g.x = {};

    // -- init --------------------------------------------
    initGolbal();
    initGlobalJs();
    initPage();
})()
function initGolbal() {
    let src = document.currentScript.src;
    let idx = src.indexOf("//");

    idx = src.indexOf("/", idx + 2);
    src = src.substring(0, idx + 1);
    g.path.base = src + g.path.base;
    g.path.framework = g.path.base + g.path.framework;
    g.path.plugin = g.path.base + g.path.plugin;
    g.path.project = g.path.base + g.path.project;

    g.prefix = g.prefix.replace("{domain}", document.domain);
}
function initGlobalJs() {
    var arrJS = new Array();

    // -- plugin --
    if (g.cfg.ajaxType == "axios") {
        arrJS.push(g.path.plugin + "/axios.min.js");
    }
    arrJS.push(g.path.plugin + "/vue.js");
    arrJS.push(g.path.plugin + "/element/index.css");
    arrJS.push(g.path.plugin + "/element/index.js");


    // -- core --
    arrJS.push(g.path.framework + "/core/" + "prototype.js");
    arrJS.push(g.path.framework + "/core/" + "core.js");
    arrJS.push(g.path.framework + "/core/" + "datatable.js");
    arrJS.push(g.path.framework + "/core/" + "ajax.js");

    // -- core --
    arrJS.push(g.path.framework + "/system/" + "login.js");
    arrJS.push(g.path.framework + "/system/" + "user.js");

    for (let js of arrJS) {
        if (js.indexOf(".js") > 0) {
            document.write("<script src='" + js + "?v=" + g.cfg.jsVer + "'></script>");
        }
        else if (js.indexOf(".css") > 0) {
            document.write("<link href='" + js + "?v=" + g.cfg.jsVer + "' rel='stylesheet' />");
        }
        else {
            alert("debug here");
        }
    }
}
function initPage() {
    window.topWin = top.topWin;
    window.addEventListener('load', function () {
        // -- Vue.prototype.$ELEMENT = { size: 'small', zIndex: 2000 } --
        Vue.prototype.$ELEMENT.zIndex = g.c.zIndexElement;
    })
}

// ----------------------------------------------------------------------------
function importFrameworkRes(fileRes) {
    ///<summary>按需导入框架资源文件，js或css等</summary>
    ///<param name="fileRes">框架资源文件名称，不包含路径</param>
    if (fileRes.endWith(".js")) {
        if (fileRes.equals("login.js")) {
            fileRes = g.path.framework + "/system/login.js"
        }
        else {
            alert(fileRes);
        }
        document.write("<script src='" + fileRes + "?v=" + g.cfg.jsVer + "'></script>");
    }
    else {
        alert(fileJs);
    }
}
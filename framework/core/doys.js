/**
 * DoYs JavaScript Library v1.0
 * Author: David.Li
 * Create Date: 2020-04-08
 * Modify Date: 2020-05-23
 * Copyright 2020, doys-next.com
 */
(function () {
    window.g = {
        debug: true,                            // -- 开发调试模式 --
        prefix: "http://{domain}:9988/DoYsSV",  // -- 后台服务入口，实例：http://192.168.169.1:9988，{domain}表示和前端相同 --
        path: {
            base: "DoYsUI",                     // -- 前台应用根目录 --
            framework: "/framework",            // -- 框架根目录 --
            plugin: "/plugin",                  // -- 插件根路径 --
            project: "/project"                 // -- 项目根目录 --
        },
        cfg: {
            jsVer: "2020-06-19",                // -- js版本号，解决js文件缓存问题 --
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
    initGlobalCss();
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
function initGlobalCss() {
    var arrCss = new Array();

    // -- plugin --
    arrCss.push(g.path.plugin + "/element/index.css");

    // -- core --
    arrCss.push(g.path.framework + "/css/global.css");

    for (let css of arrCss) {
        document.write("<link href='" + css + "?v=" + g.cfg.jsVer + "' rel='stylesheet' />");
    }
}
function initGlobalJs() {
    var arrJS = new Array();

    // -- plugin --
    if (g.cfg.ajaxType == "axios") {
        arrJS.push(g.path.plugin + "/axios.min.js");
    }
    arrJS.push(g.path.plugin + "/vue.js");
    arrJS.push(g.path.plugin + "/element/index.js");

    // -- core --
    arrJS.push(g.path.framework + "/core/" + "prototype.js");
    arrJS.push(g.path.framework + "/core/" + "core.js");
    arrJS.push(g.path.framework + "/core/" + "datatable.js");
    arrJS.push(g.path.framework + "/core/" + "ajax.js");

    // -- control --
    arrJS.push(g.path.framework + "/control/sub-view/sub-view-bar.js");
    arrJS.push(g.path.framework + "/control/sub-view/sub-view.js");

    // -- output javascript --
    for (let js of arrJS) {
        document.write("<script src='" + js + "?v=" + g.cfg.jsVer + "'></script>");
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

    var arrJS = new Array();
    if (fileRes.equals("echarts")) {
        arrJS.push(g.path.plugin + "/echarts/echarts.min.js");
    }
    else if (fileRes.equals("view-form-bar")) {
        arrJS.push(g.path.framework + "/control/view-form-bar/view-form-bar.js");
    }
    else if (fileRes.equals("main-menu")) {
        arrJS.push(g.path.framework + "/control/menu/top-menu/menu.js");
    }
    else {
        alert("importFrameworkRes found unknown resource: " + fileRes);
    }

    // -- output javascript --
    for (let js of arrJS) {
        document.write("<script src='" + js + "?v=" + g.cfg.jsVer + "'></script>");
    }
}
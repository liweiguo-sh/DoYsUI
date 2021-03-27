/**
 * DoYs JavaScript Library v1.0
 * Author: David.Li
 * Create Date: 2020-04-08
 * Modify Date: 2021-02-27
 * Copyright 2020-2021, doys-next.com
 */

(function () {
    window.g = {
        debug: false,                           // -- 调试模式 --
        prefix: "http://{domain}:5555/DoYsSV",  // -- 后台服务入口，示例：http://192.168.169.200:5555，{domain}表示和前端相同 --
        path: {
            base: "DoYsUI",                     // -- 前台应用根目录 --
            framework: "/framework",            // -- 框架根目录 --
            plugin: "/plugin",                  // -- 插件根路径 --
            project: "/project",                // -- 项目根目录 --
            resRun: "/resRun",                  // -- 资源目录(后台运行时) --
            resTemp: "/resTemp"                 // -- 资源目录(后台运行时，临时) --
        },
        cfg: {
            jsVer: top.jsVer,                   // -- js版本号，解决js文件缓存问题 --
            ajaxType: "axios",                  // -- ["axios", "fetch", "others"] --
            remark: "全局配置项集合"
        }
    };
    if (window.runtime) {
        // -- 替换运行环境的配置参数(如果有) --
        for (let k in window.runtime) {
            window.g[k] = window.runtime[k];
        }
    }

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
    g.debug = document.documentURI.indexOf("//127.0.0.1") > 0;
    if (g.debug) {
        g.cfg.jsVer = (new Date()).getTime();
    }

    let src = document.currentScript.src;
    let idx = src.indexOf("//");

    idx = src.indexOf("/", idx + 2);
    src = src.substring(0, idx + 1);
    g.path.base = src + g.path.base;
    g.path.framework = g.path.base + g.path.framework;
    g.path.plugin = g.path.base + g.path.plugin;
    g.path.project = g.path.base + g.path.project;

    g.prefix = g.prefix.replace("{domain}", document.domain);
    g.path.resRun = g.prefix + g.path.resRun;
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

    var arrRes = new Array();
    // -- 1. 顶级框架类 --
    if (fileRes.equals("topwin")) {
        arrRes.push(g.path.framework + "/core/topwin.js");
    }
    else if (fileRes.equals("edge")) {
        arrRes.push(g.path.framework + "/core/edge.js");
    }
    else if (fileRes.equals("main")) {
        arrRes.push(g.path.framework + "/system/main.js");
    }
    // -- 2. doys顶级组件 --
    else if (fileRes.equals("window")) {
        arrRes.push(g.path.framework + "/control/window/xwf.window.js");
        arrRes.push(g.path.framework + "/control/window/xwf.window.css");
    }
    else if (fileRes.equals("taskbar")) {
        arrRes.push(g.path.framework + "/control/taskbar/taskbar.js");
        arrRes.push(g.path.framework + "/control/taskbar/taskbar.css");
    }
    else if (fileRes.equals("view-form-bar")) {
        arrRes.push(g.path.framework + "/control/view-form-bar/view-form-bar.js");
        arrRes.push(g.path.plugin + "/util/pinyin.js");
    }
    else if (fileRes.equals("main-menu")) {
        arrRes.push(g.path.framework + "/control/menu/top-menu/menu.js");
        arrRes.push(g.path.framework + "/control/menu/top-menu/menu.css");
    }
    else if (fileRes.equals("main-view-bar")) {
        arrRes.push(g.path.framework + "/control/main-view/main-view-bar.js");
    }
    else if (fileRes.equals("main-view")) {
        arrRes.push(g.path.framework + "/control/main-view/main-view.js");
    }
    // -- 3. doys组件 --
    else if (fileRes.equals("d-label")) {
        arrRes.push(g.path.framework + "/control/DLabel/css/designer.css");
        arrRes.push(g.path.framework + "/control/DLabel/css/label.css");

        arrRes.push(g.path.framework + "/control/DLabel/js/font.js");
        arrRes.push(g.path.framework + "/control/DLabel/js/util.js");
        arrRes.push(g.path.framework + "/control/DLabel/js/element.js");
        arrRes.push(g.path.framework + "/control/DLabel/js/label.js");
    }
    // -- 4. plugin组件 --
    else if (fileRes.equals("echarts")) {
        arrRes.push(g.path.plugin + "/echarts/echarts.min.js");
        arrRes.push(g.path.plugin + "/echarts/echarts.ext.js");
    }
    else {
        alert("importFrameworkRes found unknown resource: " + fileRes);
    }

    // -- 9. output javascript --
    for (let res of arrRes) {
        if (res.endsWith(".css")) {
            document.write("<link href='" + res + "?v=" + g.cfg.jsVer + "' rel='stylesheet' />");
        }
        else {
            document.write("<script src='" + res + "?v=" + g.cfg.jsVer + "'></script>");
        }
    }
}
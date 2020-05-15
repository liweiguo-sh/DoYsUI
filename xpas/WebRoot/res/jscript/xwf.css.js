// -- 动态加载样式表 ----------------------------------------------------------
javascriptBefore();
cssGlobal();
javascriptAfter();

function javascriptBefore() {
    // -- jQuery、Bootstrap -------------------------------
    // document.write("<script src='" + g.pluginPath + "jquery/jquery-3.1.1.min.js' type='text/javascript'></script>");
    // document.write("<script src='" + g.pluginPath + "bootstrap/js/bootstrap.min.js' type='text/javascript'></script>");

    // -- xpas 基础类库 -----------------------------------
    document.write("<script src='" + g.appPath + "res/jscript/xwf.datatable.js' type='text/javascript'></script>");

    // -- xpas 标准控件 -----------------------------------
    document.write("<script src='" + g.controlPath + "tab/xwf.tab.js' type='text/javascript'></script>");
    document.write("<script src='" + g.controlPath + "tree/xwf.tree.js' type='text/javascript'></script>");
    document.write("<script src='" + g.controlPath + "dropdown/xwf.dropdown.js?v=20190813' type='text/javascript'></script>");
    document.write("<script src='" + g.controlPath + "dropgrid/xwf.dropgrid.js' type='text/javascript'></script>");
    document.write("<script src='" + g.controlPath + "scrollbar/xwf.scrollbar.js?v=20190813' type='text/javascript'></script>");
    document.write("<script src='" + g.controlPath + "toolbar/xwf.toolbar.js' type='text/javascript'></script>");

    // -- 第三方通用控件 ----------------------------------
    document.write("<script src='" + g.pluginPath + "My97DatePicker/WdatePicker.js' type='text/javascript'></script>");
    if (g.b.ie && g.b.ie < 8) {
        document.write("<script src='" + g.pluginPath + "json/json2.min.js' type='text/javascript'></script>");
    }
}
function cssGlobal() {
    var css_style = top.cssStyle + "/";

    // -- 全局通用样式表 ----------------------------------
    document.write("<link href='" + g.cssPath + "xwf.global.css' rel='stylesheet' type='text/css' />");
    document.write("<link href='" + g.cssPath + css_style + "xwf.common.css' rel='stylesheet' type='text/css' />");
    document.write("<link href='" + g.controlPath + "tab/" + css_style + "xwf.tab.css' rel='stylesheet' type='text/css' />");
    document.write("<link href='" + g.controlPath + "tree/" + css_style + "xwf.tree.css' rel='stylesheet' type='text/css' />");
    document.write("<link href='" + g.controlPath + "dropdown/" + css_style + "xwf.dropdown.css' rel='stylesheet' type='text/css' />");
    document.write("<link href='" + g.controlPath + "dropgrid/" + css_style + "xwf.dropgrid.css' rel='stylesheet' type='text/css' />");
    document.write("<link href='" + g.controlPath + "scrollbar/" + css_style + "xwf.scrollbar.css' rel='stylesheet' type='text/css' />");
    document.write("<link href='" + g.controlPath + "toolbar/" + css_style + "xwf.toolbar.css' rel='stylesheet' type='text/css' />");
    document.write("<link href='" + g.pluginPath + "font-awesome-4.7.0/css/font-awesome.min.css' rel='stylesheet' type='text/css' />");

    // -- 控件样式表 --------------------------------------
    if (window.css_xwf_menu) document.write("<link href='" + g.controlPath + "menu/" + css_style + "xwf.menu.css' rel='stylesheet' type='text/css' />");
    if (window.css_xwf_menu2) document.write("<link href='" + g.controlPath + "menu2/" + css_style + "xwf.menu2.css' rel='stylesheet' type='text/css' />");
    if (window.css_xwf_context) document.write("<link href='" + g.controlPath + "context/" + css_style + "xwf.context.css' rel='stylesheet' type='text/css' />");
    if (window.css_xwf_taskbar) document.write("<link href='" + g.controlPath + "taskbar/" + css_style + "xwf.taskbar.css' rel='stylesheet' type='text/css' />");
    if (window.css_xwf_statusbar) document.write("<link href='" + g.controlPath + "statusbar/" + css_style + "xwf.statusbar.css' rel='stylesheet' type='text/css' />");

    if (window.css_xwf_uvform) {
        if (g.b.ie && g.b.ie < 9) {
            document.write("<link href='" + g.controlPath + "uvform/" + css_style + "xwf.uvform_ie8.css' rel='stylesheet' type='text/css' />");
        }
        else {
            document.write("<link href='" + g.controlPath + "uvform/" + css_style + "xwf.uvform.css' rel='stylesheet' type='text/css' />");
        }
    }
    if (window.css_xwf_window) document.write("<link href='" + g.controlPath + "window/" + css_style + "xwf.window.css' rel='stylesheet' type='text/css' />");
    if (window.css_xwf_folding) document.write("<link href='" + g.controlPath + "folding/" + css_style + "xwf.folding.css' rel='stylesheet' type='text/css' />");
    if (window.css_xwf_gridview) document.write("<link href='" + g.controlPath + "grid/" + css_style + "xwf.grid.css' rel='stylesheet' type='text/css' />");
    if (window.css_xwf_upload) document.write("<link href='" + g.controlPath + "upload/" + css_style + "xwf.upload.css' rel='stylesheet' type='text/css' />");

    // -- 特定页面样式表 ----------------------------------
    if (window.location.pathname.indexOf("/main") > 0) {
        document.write("<link href='" + g.cssPath + css_style + "xwf.main.css' rel='stylesheet' type='text/css' />");
    }
    else if (window.location.pathname.indexOf("/reportview.html") > 0) {
        document.write("<link href='" + g.cssPath + css_style + "xwf.report.css' rel='stylesheet' type='text/css' />");
    }
    document.write("<link href='" + g.appPath + "res_plugin/zui-1.8.1-dist/css/zuibtn.css' rel='stylesheet' type='text/css' />");
}
function javascriptAfter() {

}

// -- 通用样式格式化函数 ------------------------------------------------------
function cssFormat(domContainer) {
    if (domContainer.tagName.equals("TABLE")) {
        _cssFormatTABLE(domContainer);
    }
    else {
        alert("不支持的容器类型。");
    }
}
function _cssFormatTABLE(tbContainer) {
    var blDisplay = tbContainer.style.display;
    tbContainer.style.display = "";     // -- 控件不可见时，得不到正确的控件大小 --
    //-----------------------------------------------------
    var tBody = tbContainer.children[0];
    for (var i = 0; i < tBody.children.length; i++) {
        var tr = tBody.children[i];
        //-------------------------------------------------
        if (tr.className == "trH" || tr.id == "trH" || tr.style.display == "none") {
            for (var j = 0; j < tr.children.length; j++) {
                var td = tr.children[j];
                td.style.border = "0px";
                td.style.height = "0px";
                td.style.lineHeight = "0px";
            }
            continue;
        }
        //-------------------------------------------------
        for (var j = 0; j < tr.children.length; j++) {
            var td = tr.children[j];

            if (td.children.length == 0) {
                td.style.padding = "2px 3px 7px 3px";
            }
            else if (td.children.length == 1 || td.className.indexOf("combo") >= 0) {
                td.style.padding = "2px 3px 7px 3px";

                var el = td.children[0];
                if (el.type == "text" || el.type == "password") {
                    el.style.width = (Math.max(0, td.clientWidth - 6 - 16)) + "px";
                    el.setAttribute("autocomplete", "off");
                }
                else if (el.type == "textarea") {
                    el.style.width = (Math.max(0, td.clientWidth - 6 - 16)) + "px";
                }
                else if (el.type == "select-one") {
                    el.style.width = (Math.max(0, td.clientWidth - 18)) + "px";
                }
                else if (el.type == "checkbox") {

                }
                else if (el.type == "button") {
                    if (el.value.indexOf(".") < 0) {
                        el.style.width = (Math.max(0, td.clientWidth - 16)) + "px";
                    }
                }
                else if (el.type == "file") {
                    el.style.width = (Math.max(0, td.clientWidth - 13)) + "px";
                }
                else if (el.type == "hidden") {
                    //-- do nothing --
                }
                else if (el.type == null || el.type == "") {
                    if (el.tagName.equals("A") || el.tagName.equals("B") || el.tagName.equals("DIV") || el.tagName.equals("SPAN") || el.tagName.equals("IMG")) {
                        //-- do nothing --
                    }
                    else {
                        alert("未处理的控件类型：" + el.tagName);
                    }
                }
                else {
                    alert("未处理的控件类型：" + el.type);
                }
            }
            // ------------------------
            if (td.children.length == 2 || td.className.indexOf("combo") >= 0) {
                var e1 = td.children[0];
                var e2 = td.children[1];
                if (e2.tagName == "DIV") {
                    e2.style.top = e1.offsetTop + "px";
                    e2.style.width = e1.clientHeight + "px";
                    e2.style.height = e1.offsetHeight + "px";
                    e2.style.lineHeight = e2.clientHeight + "px";
                    e2.style.right = (Math.max(0, td.clientWidth - e1.offsetLeft - e1.offsetWidth)) + "px";
                }
                else if (e2.tagName == "LABEL") {
                    td.style.padding = "2px 0px 7px 0px";
                }
            }
        }
    }
    //-- 还原控件原始 style.display 属性 ------------------
    tbContainer.style.display = blDisplay;
}
var topWin = {                          // -- 全局对象，此处不能用 let 定义，否则无法通过 top.topWin 访问 --    
    os: urlPara.os,                     // -- 客户端操作系统 --
    systemName: "",                     // -- 子系统名称(例如：xpas，即项目目录) --
    serverName: "",                     // -- 服务端部署实例名称 --
    loginUrl: urlPara["loginUrl"] || (g.appPath + "project/xpas/html/login.html"),   // -- 登录来源url --

    tenantId: 0,
    userPk: "",
    userName: "",
    nickname: "",
    groupKeys: "",
    isDeveloper: false,

    win: window,
    doc: document,
    cWin: null,                 // -- 窗口集合类实例 --    
    cMenu: null,                // -- 主菜单类实例 --
    cStatusBar: null,           // -- 状态栏类实例 --

    dtbMenu: null,                          // -- 菜单记录集 --

    technicalSupport: "",   // -- 技术支持 --
    logo: "",               // -- 左上角LOGO --
    remark: ""
};

topWin.sessionTimeout = function () {
    app.$alert("会话已超时，请重新登录系统。", "系统消息...", {
        confirmButtonText: "确定",
        type: 'warning',
        customClass: "alertClass"
    }).then(() => {
        window.location.href = getUrlItem("urlLogin");
    })
};
topWin.alert = function (message, type = "info", callback) {
    app.$alert(message, "系统消息...", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        type: type,
        customClass: "alertClass"
    }).then(() => {
        if (callback) callback();
    })
};
topWin.message = function (message, type = "info") {
    app.$message({
        showClose: true,
        message: message,
        dangerouslyUseHTMLString: true,
        type: type              // -- success、warning、error --
    });
};
topWin.confirm = function (message, type = "warning", callbackOk, callbackCancel) {
    app.$confirm(message, "系统提示...", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: type || "warning"
    }).then(() => {
        if (callbackOk) callbackOk();
    }).catch(() => {
        if (callbackCancel) callbackCancel();
    });
};

// -- 读取子系统菜单、调用菜单 -----------------------------------------------------
topWin.getMenus = function (systemKey, clientType) {
    if (g.a.send("processType=com.xznext.Framework&actionType=getMenu", { systemKey: systemKey, clientType: clientType }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbMenu = cReturn.dtbMenu;

            if (dtbMenu.rowCount == 0) {
                alert("尚未为您分配当前系统访问权限，请与系统管理员联系。");
                return false;
            }
            // -- 预处理菜单 --
            var idx = 0;
            var isDevMode = (g.local || topWin.isDeveloper);
            var menuText = "";
            for (var i = 0; i < dtbMenu.rowCount; i++) {
                menuText = dtbMenu.rows[i]["menu_text"].value;
                idx = menuText.indexOf("{");
                if (idx < 0) continue;

                if (isDevMode) {
                    menuText = menuText.substring(0, idx).trim() + " <font color='yellow'>" + menuText.substring(idx) + "</font>";
                    if (!dtbMenu.rows[i]["menu_display"].value.equals("")) {
                        dtbMenu.rows[i]["menu_tooltip"].value = dtbMenu.rows[i]["menu_display"].value;
                    }
                }
                else {
                    menuText = menuText.substring(0, idx).trim();
                }
                dtbMenu.rows[i]["menu_text"].value = menuText;
            }

            // -- 获取子系统下传的数据 --
            for (var key in cReturn) {
                if (key.equals("ok") || key.equals("dtbMenu")) continue;
                topWin[key] = cReturn[key];
            }

            topWin.dtbMenu = dtbMenu;
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};
topWin.openMenu = function (para) {
    // -- para格式样例：{ menuKey: "X81004001001" } --
    topWin.cMenu.openMenu(para);
};

// -- 打开窗口、全屏窗口、顶级视图 --------------------------------------------------
topWin.openWindow = function (prop, para) {
    prop.topWin = this;
    return topWin.cWin.openWindow(prop, para);
};
topWin.openFullWindow = function (prop, para) {
    prop.noTitle = true;
    prop.windowState = "maximized";
    return this.openWindow(prop, para);
};

topWin.openView = function (prop, para) {
    var _prop = {
        modal: true,
        width: topWin.cWin.maxWidth * 0.7,
        height: topWin.cWin.maxHeight * 0.7,
        url: g.appPath + "project/xpas/html/frame/uview.html"
    };
    prop = g.x.extendJSON(_prop, prop);
    return this.openWindow(prop, para);
};
topWin.openTopView = function (prop, para) {
    prop.url = g.appPath + "project/xpas/html/frame/uview.html";
    return this.openFullWindow(prop, para);
};
topWin.openSelectView = function (prop, para) {
    var _prop = {
        modal: true,
        width: topWin.cWin.maxWidth * 0.7,
        height: topWin.cWin.maxHeight * 0.7,
        url: g.appPath + "project/xpas/html/frame/uview.html"
    };
    prop = g.x.extendJSON(_prop, prop);
    var _para = {
        viewKey: "",
        viewForm: "",
        onceFilter: "",
        viewMode: "singleSelect",   // -- singleSelect：默认单选；multiSelect：不限制 --
        selectCallback: null,       // -- 回调函数 --
        callbackPara: null           // -- 主调方参数, 原样传给回调函数 --
    };
    para = g.x.extendJSON(_para, para);
    return this.openWindow(prop, para);
};

topWin.openSelectTree = function (prop, para) {
    var _prop = {
        width: topWin.cWin.maxWidth * 0.25,
        height: topWin.cWin.maxHeight * 0.7,
        title: "数据选择树窗口",
        modal: true,
        url: g.appPath + "project/xpas/html/tree/select_tree.html"
    };
    prop = g.x.extendJSON(_prop, prop);
    var _para = {
        selectMode: "singleSelect"    // -- singleSelect：默认单选；multiSelect：不限制 --
    };
    para = g.x.extendJSON(_para, para);
    return this.openWindow(prop, para);
};
topWin.openReport = function (prop, para) {
    prop.url = g.appPath + "project/xpas/html/report/reportview.html";
    return this.openFullWindow(prop, para);
};
topWin.openFlowData = function (prop, para) {
    prop.url = g.appPath + "project/xpas/html/flow/flow_data.html";
    prop.modal = true;

    return this.openWindow(prop, para);
}

// -- 文件选择、上传、下载 --------------------------------------------------------
topWin.selectFile = function (prop, para) {
    prop.url = g.appPath + "project/xpas/html/util/select_file.html";
    prop.modal = true;

    para = g.x.extendJSON({ fileName: "", extType: "" }, para);
    return this.openWindow(prop, para);
}
topWin.uploadFile = function (prop, para) {
    prop.url = g.appPath + "project/xpas/html/util/upload_file.html";
    prop.modal = true;

    para = g.x.extendJSON({ fileName: "", uploadType: "" }, para);
    return this.openWindow(prop, para);
}
topWin.downloadFile = function (urlFile) {
    window.open(g.xpasRunPath + urlFile + "?rnd=" + Math.random());
};

// -- 辅助函数 ------------------------------------------------------------------
topWin.matchGroup = function (strGroupKeys) {
    if (strGroupKeys == null || strGroupKeys.equals("")) return false;
    var arrKeys = this.groupKeys.split(",");

    strGroupKeys = "," + strGroupKeys.toLowerCase().replaceAll(";", ",") + ",";
    for (var i = 0; i < arrKeys.length; i++) {
        if (strGroupKeys.indexOf("," + arrKeys[i].toLowerCase() + ",") >= 0) {
            return true;
        }
    }
    return false;
};
topWin.matchUser = function (strUserPks) {
    if (strUserPks == null || strUserPks.equals("")) return false;
    var arrKeys = strUserPks.replaceAll(";", ",").split(",");
    for (var i = 0; i < arrKeys.length; i++) {
        if (this.userPk.equals(arrKeys[i])) {
            return true;
        }
    }
    return false;
};

// -- 状态栏 -------------------------------------------------------------------
topWin.showStatus = function (strStatus, blFlash) {
    top.showStatus(strStatus, blFlash);
    // top.showStatus("<marquee scrollamount='2' onMouseOver='this.stop()' onMouseOut='this.start()' >" + strStatus + "</marquee>");    
}
topWin.showMsgTray = function (numMessage, menuKey) {
    var td = gId("tdMessageCount");
    if (numMessage > 0) {
        td.innerHTML = numMessage;
        td.onclick = function () {
            topWin.openMenu({ menuKey: menuKey });
        }
    }
    else {
        td.innerHTML = "";
        td.onclick = "当前没有通知。";
    }
}

// -- 服务器下载文件（urlFile 文件绝对路径）-----------------------------------------
topWin.downloadFileByUrl = function (urlFile) {
    window.location = g.httpServer + g.appPath + "downloadFile.do?rnd=" + Math.random() + "&urlFile=" + encodeURI(urlFile);
};
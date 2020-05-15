var btnExtra = {
    btnKey: "",             // -- 按钮Key --
    dtbViewData: null,      // -- 数据记录集 --
    drViewData: null,       // -- 当前行记录 --
    recordRow: 0,           // -- 当前行在记录集中的下标(下标从0开始) --
    gridRow: 0,             // -- 当前行在网格中的行号(下标从0开始) --
    gridCol: 0              // -- 当前列在网格中的下标 --
};

var checkoutStatus = false;
var checkoutComputer = "";
// ----------------------------------------------------------------------------
function viewExtraButtonClick(jsonProp) {
    btnExtra = g.x.extendJSON(btnExtra, jsonProp);
    if (btnExtra.btnKey.equals("xTFS")) {
        openXtfsMenu();
    }
    else {
    }
};

// -- 视图加载之前、视图加载之后 ----------------------------------------------
function beforeViewLoad(prop) {
    if (g.a.send("processType=com.xtfs.XtfsSql&actionType=getCheckoutStatus", {}, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            checkoutStatus = (cReturn.checkoutStatus == 1);
            checkoutComputer = cReturn.checkoutComputer;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};

// -- xTFS.sql ----------------------------------------------------------------
function openXtfsMenu() {
    var arrMenus = new Array();
    if (checkoutStatus) {
        arrMenus.push({ key: "cancelCheckout", text: "撤消签出" });
    }
    else {
        arrMenus.push({ key: "getLastVersion", text: "获取最新版本" });
        arrMenus.push({ key: "checkout", text: "签出" });
    }
    topWin.context.show({ arrMenus: arrMenus, menuClick: xtfsMenuClick, objDom: btnExtra.button, top: 0, left: 0 });
};
function xtfsMenuClick(para) {
    var menuKey = para.key;
    // ----------------------------------------------------
    if (menuKey.equals("getLastVersion")) {
        if (g.a.send("processType=com.xtfs.XtfsSql&actionType=getLastVersion", {}, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;

                if (cReturn.nAddnew || cReturn.nUpdate) {
                    gridView.refresh();
                    showMsg("获取新版本操作成功。\n本次操作新增 " + cReturn.nAddnew + " 条主数据，更新 " + cReturn.nUpdate + " 条主数据。");
                }
                else {
                    showMsg("当前站点数据已是最新版本，未检测到服务器有更新数据。");
                }
            }
        }
    }
    else if (menuKey.equals("checkout")) {
        if (g.a.send("processType=com.xtfs.XtfsSql&actionType=checkout", {}, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                gridView.refresh();
                checkoutStatus = true;

                if (cReturn.nAddnew || cReturn.nUpdate) {
                    gridView.refresh();
                    showMsg("签出数据管理权限成功。\n自动获取新版本新增 " + cReturn.nAddnew + " 条主数据，更新 " + cReturn.nUpdate + " 条主数据。");
                }
                else {

                }
            }
        }
    }
    else if (menuKey.equals("cancelCheckout")) {
        if (g.a.send("processType=com.xtfs.XtfsSql&actionType=cancelCheckout", {}, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                gridView.refresh();
                checkoutStatus = false;
            }
        }
    }
};
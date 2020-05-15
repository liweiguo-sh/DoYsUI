/*
* xTFS JavaScript Library v1.0
* Author: Volant Lee
* Create Date: 2017-07-20
* Modify Date: 2017-07-25
* Copyright 2017, http://www.xpas-next.com/
* Description: xTFS通用方法调用类
*/

var xTFS = {};
// -- 主调函数 ----------------------------------------------------------------
xTFS.openMenu = function (jsonPara) {
    var para = {
        mdataType: "",
        mdataKeys: "",
        mdataField: "",
        objDom: null
    }
    para = g.x.extendJSON(para, jsonPara);

    var blGetLastVersion1 = true, blGetLastVersion2 = true;
    var blcheckout = true, blCheckoutCancel = true;
    var blCheckin1 = true, blCheckin2 = true;
    // -- 1. 判断菜单项条件 -------------------------------
    var blNewMData = false, blMyCheckout = false;
    if (window.vf) {
        if (g.a.send("processType=com.xtfs.XtfsCore&actionType=getMDataStatus", { mdataType: para.mdataType, mdataKey: para.mdataKeys }, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                if (cReturn.newMData) {
                    blNewMData = true;
                }
                else if (cReturn.myCheckout) {
                    blMyCheckout = true;
                }
            }
        }
    }
    else {
        var node = gridView.tree.selectedNode;
        if (node.value.equals("newMData")) blNewMData = true;
        if (node.value.equals("myCheckout")) blMyCheckout = true;
    }

    if (blNewMData) {
        blGetLastVersion1 = false;
        blGetLastVersion2 = false;
        blcheckout = false;
        blCheckoutCancel = false;
    }
    else if (blMyCheckout) {
        blGetLastVersion1 = false;
        blcheckout = false;
    }
    else {
        blCheckin1 = false;
        blCheckin2 = false;
        blCheckoutCancel = false;
    }
    // -- 2. 显示菜单 -------------------------------------
    var arrMenus = new Array();
    if (blGetLastVersion1) arrMenus.push({ key: "getLastVersion1", text: "获取最新版本", action: "getLastVersion", mdataType: para.mdataType, mdataKeys: para.mdataKeys, mdataField: para.mdataField });
    if (blGetLastVersion2) arrMenus.push({ key: "getLastVersion2", text: "强制获取最新版本", action: "getLastVersion", overwrite: true, mdataType: para.mdataType, mdataKeys: para.mdataKeys, mdataField: para.mdataField });
    if (blcheckout) arrMenus.push({ key: "checkout", text: "签出", action: "checkout", mdataType: para.mdataType, mdataKeys: para.mdataKeys, mdataField: para.mdataField });
    if (blCheckoutCancel) arrMenus.push({ key: "checkoutCancel", text: "撤销签出", action: "checkoutCancel", mdataType: para.mdataType, mdataKeys: para.mdataKeys, mdataField: para.mdataField });
    if (blCheckin1) arrMenus.push({ key: "checkin1", text: "签入", action: "checkin", mdataType: para.mdataType, mdataKeys: para.mdataKeys, mdataField: para.mdataField });
    if (blCheckin2) arrMenus.push({ key: "checkin2", text: "签入(保持签出)", action: "checkin", keepCheckout: true, mdataType: para.mdataType, mdataKeys: para.mdataKeys, mdataField: para.mdataField });
    topWin.context.show({ arrMenus: arrMenus, menuClick: xTFS.invoke, objDom: para.objDom, top: 0, left: 0 });
};
xTFS.invoke = function (jsonPara) {
    var blReturn = false;
    var para = {
        action: "",
        mdataType: "",
        mdataKeys: "",
        overwrite: false,
        keepCheckout: false
    };
    para = g.x.extendJSON(para, jsonPara);
    // ----------------------------------------------------
    if (!window.vf) {
        var arrKeys = new Array();

        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            if (btnExtra.dtbViewData.rows[i].checked) {
                arrKeys.push(btnExtra.dtbViewData.rows[i][para.mdataField].value);
            }
        }

        if (arrKeys.length == 0) {
            if (para.action.equals("getLastVersion") && !para.overwrite) {
                para.mdataKeys = "*";
            }
            else {
                alert("请选择要操作的数据。");
                return false;
            }
        }
        else {
            para.mdataKeys = "'" + arrKeys.join("','") + "'";
        }
    }
    // ----------------------------------------------------
    if (jsonPara.action.equals("checkin")) {
        blReturn = xTFS.checkin(para.mdataType, para.mdataKeys, para.keepCheckout);
    }
    else if (jsonPara.action.equals("checkout")) {
        blReturn = xTFS.checkout(para.mdataType, para.mdataKeys);
    }
    else if (jsonPara.action.equals("checkoutCancel")) {
        blReturn = xTFS.checkoutCancel(para.mdataType, para.mdataKeys);
    }
    else if (jsonPara.action.equals("getLastVersion")) {
        blReturn = xTFS.getLastVersion(para.mdataType, para.mdataKeys, para.overwrite);
    }
    else {
        showWarn("未知的xTFS请求参数 " + para.action + "，请检查。");
    }
    return blReturn;
};

// -- 签入/签出/获取最新版本 --------------------------------------------------
xTFS.checkin = function (mdataType, mdataKeys, keepCheckout) {
    if (g.a.send("processType=com.xtfs.XtfsCore&actionType=checkin", { mdataType: mdataType, mdataKeys: mdataKeys, keepCheckout: keepCheckout ? 1 : 0 }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            if (window.vf) {
                vf.refreshRecord();
                win.flashTitle(keepCheckout ? "主数据签入成功，保持签出状态。" : "主数据已成功签入。");
            }
            if (window.gridView) {
                gridView.refresh();
                showMsg(keepCheckout ? "主数据签入成功，保持签出状态。" : "主数据已成功签入。");
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
    return true;
};

xTFS.checkout = function (mdataType, mdataKeys) {
    if (mdataKeys.split(",").length > 10) {
        showWarn("单次签出数据不能超过10条。");
        return false;
    }
    if (g.a.send("processType=com.xtfs.XtfsCore&actionType=checkout", { mdataType: mdataType, mdataKeys: mdataKeys }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            if (window.vf) {
                vf.refreshRecord();
                win.flashTitle("主数据签出成功，并已自动加载。");
            }
            if (window.gridView) {
                gridView.refresh();
                showMsg("主数据签出成功。");
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
    return true;
};
xTFS.checkoutCancel = function (mdataType, mdataKeys) {
    if (g.a.send("processType=com.xtfs.XtfsCore&actionType=checkoutCancel", { mdataType: mdataType, mdataKeys: mdataKeys }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            if (window.vf) {
                vf.refreshRecord();
                win.flashTitle("主数据撤销签出成功。");
            }
            if (window.gridView) {
                gridView.refresh();
                showMsg("主数据撤销签出成功");
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
    return true;
};

xTFS.getLastVersion = function (mdataType, mdataKeys, overwrite) {
    if (g.a.send("processType=com.xtfs.XtfsCore&actionType=getLastVersion", { mdataType: mdataType, mdataKeys: mdataKeys, overwrite: overwrite ? 1 : 0 }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            if (window.vf) {
                vf.refreshRecord();
                win.flashTitle(overwrite ? "强制获取最新版本成功，并已自动加载。" : "成功获取最新版本，并已自动加载。");
            }
            if (window.gridView) {
                gridView.refresh();
                showMsg(overwrite ? "强制获取最新版本完成。" : "成功获取最新版本。");
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
    return true;
};
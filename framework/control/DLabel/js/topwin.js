/**
 * DoYs JavaScript Library v1.0
 * Author: David.Li
 * Create Date: 2021-03-20
 * Modify Date: 2021-03-20
 * Copyright 2021, doys-next.com
 * DLabel.topwin.js 
 * 用于非doys集成环境下, 对core.topwin.js的替代及补充(补充部分仅供DLabel组件使用)
 */

(function () {
    if (window.topWin) {
        return;
    }
    else {
        if (top.topWin) {
            window.topWin = top.topWin;
            return;
        }
        window.topWin = {};
    }

    // ----------------------------------------------------
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
})() 
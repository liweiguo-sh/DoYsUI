/**
 * DoYs JavaScript Library v1.0
 * Author: David.Li
 * Create Date: 2021-03-27
 * Modify Date: 2021-04-13
 * Copyright 2021, doys-next.com
 * edge shell util
 */

(function () {
    window.edge = {
        shellEventCallback: [],         // -- 注册监听edgeShell事件的回调函数集 --
        EdgeJsSwapArea: {               // -- edgeShell 回调数据暂存区 --
            DLabel: {}                  // -- DLabel专用 --
        }
    };
})()

edge.addEventListener = function (eventName, callback, jsp = {}) {
    edge.shellEventCallback.push({
        eventName: eventName,
        callback: callback,
        jsp: jsp
    });
}

// -- invoke edge shell by http channel ---------------------------------------
edge.invokeHttpShell = async function (controller, jsp, option = { autoShowErr: true }) {
    let domain = "127.0.0.1", port = 4195;
    let url, dataPost;
    // ----------------------------------------------------
    try {
        url = "http://" + domain + ":" + port + controller;
        dataPost = g.x.extendJSON({
            protocol: "3.0"
        }, jsp);

        let res = await ajax.send(url, dataPost, { autoShowErr: false });
        if (res.ok) {
            return res;
        }
        else {
            topWin.alert("系统信息 ...", "error");
            return null;
        }
    }
    catch (e) {
        if (option.autoShowErr) {
            if (e.message.equals("Network Error")) {
                topWin.message(topWin.ERR.edgeHttpShellUnstart, "error");
            }
            else {
                topWin.alert(e, "error");
            }
        }
        else {
            throw e;
        }
    }
}

edge.getPrinterList = async function () {
    let controller = "/WebPrint/GetPrinterList";
    let res = await edge.invokeHttpShell(controller, {});
    if (res && res.ok) {
        topWin.printers = res.data.printers;
    }
    return res.data.printers;
}
edge.getFontList = async function () {    
    let controller = "/WebPrint/GetFontList";
    let res = await edge.invokeHttpShell(controller, {});
    if (res && res.ok) {
        topWin.fonts = res.data.fonts;
    }
    return res.data.fonts;
}
edge.getBarcodeBase64 = async function (jsp) {
    let controller = "/BarcodeGenerator/GetBarcodeBase64";
    let res = await edge.invokeHttpShell(controller, jsp, { autoShowErr: false });
    let ret = {
        base64: ""
    };

    if (res && res.ok) {
        ret.base64 = res.data.base64;
    }
    return ret;
}

edge.printLabel = async function (jsp) {
    let controller = "/WebPrint/Print";
    let dataPost;
    // ----------------------------------------------------
    controller += jsp.labelType || "DLabel";
    dataPost = g.x.extendJSON({
        labelType: "DLabel"
    }, jsp);

    let res = await edge.invokeHttpShell(controller, dataPost);
    return res;
}


// -- 集成外壳模式 --------------------------------------------------------------
edge.invokeEdge = function (jsp) {
    try {
        if (!chrome || !chrome.webview) {
            let message = "当前操作需要客户端支持，请在客户端中使用。";
            if (top.topWin) {
                topWin.message(message, "warning");
            }
            else {
                alert(message);
            }
            return;
        }
        chrome.webview.postMessage(jsp);
    }
    catch (e) {
        alert(e.toString());
    }
}
edge.commonShellInvokeJs = function (jsp) {
    try {
        let action = jsp.action;
        if (action == "setBarcodeBase64") {
            // -- DLabel专用 --
            edge.setBarcodeBase64(jsp);
            edge.EdgeJsSwapArea.DLabel[para.base64Key] = jsp.base64;
        }
        else {
            for (let i = 0; i < edge.shellEventCallback.length; i++) {
                let sec = edge.shellEventCallback[i];
                if (sec.eventName == jsp.action) {
                    sec.callback(jsp, sec.jsp);
                }
            }
        }
    }
    catch (e) {
        alert(e.toString());
    }
}
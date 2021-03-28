/**
 * DoYs JavaScript Library v1.0
 * Author: David.Li
 * Create Date: 2021-03-27
 * Modify Date: 2021-03-27
 * Copyright 2021, doys-next.com
 * edge shell util
 */

(function () {
    window.edge = {
        shellEventCallback: [],         // -- 注册监听edgeShell事件的回调函数集 --
        EdgeJsSwapArea: {               // -- edgeShell 回调数据暂存区 --
            DLabel: {}                  // -- DLabel专用 --
        }
    }
})()

edge.addEventListener = function (eventName, callback, jsp = {}) {
    edge.shellEventCallback.push({
        eventName: eventName,
        callback: callback,
        jsp: jsp
    });
}

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

// -- edge shell invoke js ----------------------------------------------------
edge.commonShellInvokeJs = function (jsp) {
    try {
        let action = jsp.action;
        if (action == "setBarcodeBase64") {
            // -- DLabel专用 --
            edge.setBarcodeBase64(jsp);
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

edge.setBarcodeBase64 = function (para) {
    edge.EdgeJsSwapArea.DLabel[para.base64Key] = para.base64;
}
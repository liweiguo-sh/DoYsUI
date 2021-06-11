/**
 * DoYs JavaScript Library v1.0
 * Author: David.Li
 * Create Date: 2021-06-09
 * Modify Date: 2021-06-09
 * Copyright 2021, doys-next.com
 * cross domain access localhost
 */

(function () {
    window.crossLocal = {
        domain: "127.0.0.1",
        port: "4195",

        localReady: false,              // -- local.html是否已正确加载 --
        timeout: 15 * 1000,
        timingId: 0,                    // -- 请求时序号 --
        SWAP_AREA: {},

        shellEventCallback: [],         // -- 注册监听crossLocal事件的回调函数集 --
        crossLocalJsSwapArea: {         // -- crossLocal回调数据暂存区 --
            DLabel: {}                  // -- DLabel专用 --
        }
    }
    crossLocal.base = "http://" + crossLocal.domain + ":" + crossLocal.port;
    crossLocal.urlLocal = crossLocal.base + "/local.html";

    window.addEventListener("load", function () {
        if (document.domain == "localhost") {
            // -- 仅供本机开发测试用 --
            crossLocal.urlLocal = "http://localhost/DoYsUI/test/postMessage/local.html";
        }

        let ifr = document.createElement("IFRAME");
        document.body.appendChild(ifr);
        ifr.src = crossLocal.urlLocal + "?rnd=" + Math.random();
        ifr.style.width = "600px";
        ifr.style.height = "200px";
        ifr.style.display = "none";

        ifr.addEventListener("load", () => {
            window.winLocal = ifr.contentWindow;
        }, false);

        window.addEventListener("message", (event) => {
            if (event.data.localReady) {
                crossLocal.localReady = true;
            }
            else {
                crossLocal.SWAP_AREA[event.data.timing] = event.data;
            }
        }, false);
    }, false);
})()

crossLocal.addEventListener = function (eventName, callback, jsp = {}) {
    crossLocal.shellEventCallback.push({
        eventName: eventName,
        callback: callback,
        jsp: jsp
    });
}

// -- public api for DLabel ---------------------------------------------------
crossLocal.getPrinterList = async function () {
    let controller = "/WebPrint/GetPrinterList";
    let res = await crossLocal.send(controller, {}, { autoShowErr: false });

    if (!res.ok) {
        let errMessage = res.error;
        if (res.error == "Network Error") {
            errMessage = "检测到打印工作站客户端尚未启动，请检查。";
        }
        crossLocal.displayError(errMessage);
    }
    return res;
}
crossLocal.getFontList = async function () {
    let controller = "/WebPrint/GetFontList";
    let res = await crossLocal.send(controller, {});

    return res.data.fonts;
}
crossLocal.getBarcodeBase64 = async function (jsp) {
    let controller = "/BarcodeGenerator/GetBarcodeBase64";
    let res = await crossLocal.send(controller, jsp, { autoShowErr: false });

    let ret = {
        base64: ""
    };

    if (res && res.ok) {
        ret.base64 = res.data.base64;
    }
    return ret;
}

crossLocal.printLabel = async function (jsp) {
    let controller = "/WebPrint/Print" + (jsp.labelType || "DLabel");
    let dataPost = crossLocal.extendJSON({
        labelType: "DLabel"
    }, jsp);

    let res = await crossLocal.send(controller, dataPost, { autoShowErr: false });
    return res;
}

// -- cross domain access -----------------------------------------------------
crossLocal.send = async function (controller, dataPOST, option = { autoShowErr: true }) {
    let timing = crossLocal.timingId++;
    let obj = {
        method: "post",
        url: crossLocal.base + controller,
        data: crossLocal.extendJSON({
            protocol: "3.0"
        }, dataPOST),
        timing: timing
    }
    // -- 1. postMessage --
    if (!crossLocal.localReady) {
        for (let i = 0; i < 30; i++) {
            if (crossLocal.localReady) break;
            await crossLocal.sleep(100);        // -- 延时等待local.html加载完成 --
        }
        if (!crossLocal.localReady) {
            return {
                error: "Network Error"
            }
        }
    }
    winLocal.postMessage(obj, "*");

    // -- 2. process received message --
    let res = {
        ok: "",
        error: "unknown error"
    };
    let start = (new Date()).getTime();
    while (true) {
        let ret = crossLocal.SWAP_AREA[timing];
        if (ret) {
            res = crossLocal.extendJSON({}, ret);

            crossLocal.SWAP_AREA[timing] = null;
            delete crossLocal.SWAP_AREA[timing];
            break;
        }
        if ((new Date()).getTime() - start > crossLocal.timeout) {
            res.error = "请求超时，未检测到客户端服务程序，请检查。";
            break;
        }
        await crossLocal.sleep(10);
    }

    // -- 3. return --
    if (option.autoShowErr && !res.ok) {
        if (window.topWin) {
            topWin.alert(res.error, "error");
        }
        else {
            alert(res.error);
        }
    }
    return res;
}

crossLocal.sleep = function (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
crossLocal.extendJSON = function (json1, json2) {
    if (json2) {
        if (!json1) json1 = {};
        for (let key in json2) {
            json1[key] = json2[key];
        }
    }
    return json1;
};

crossLocal.displayError = function (errString) {
    if (window.topWin) {
        topWin.message(errString, "error");
    }
    else {
        alert(errString)
    }
}
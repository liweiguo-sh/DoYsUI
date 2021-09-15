/**
 * aprint project config
 * Author: David.Li
 * Create Date: 2020-11-18
 * Modify Date: 2021-06-11
 * Copyright 2020-2021, doys-next.com
 */

(function () {
    ajax.send("/framework/TopWin/getTopWin", {}).then(res => {
        topWin.tenantId = res.tenantId;
        topWin.userPk = res.userPk;
        topWin.userName = res.userName;

        topWin.cfg = g.x.extendJSON(topWin.cfg, {
            needEdgeHttpShell1: true,

            // -- 标签变量图片基准URL --
            labelVariableImageBaseUrl: g.path.resRun + "/" + topWin.tenantId + "/aprint/label_variable_image/",
            productPnParaImageBaseUrl: g.path.resRun + "/" + topWin.tenantId + "/aprint/product_pn_para_image/"
        });
        topWin.ERR = g.x.extendJSON(topWin.ERR, {
            printWorkerUnstart: "检测到打印工作站尚未启动，请检查。"
        });

        // -- 获取打印机列表 --
        crossLocal.getPrinterList();
    });
    verfiyPrintWorkerLicense();
})()

async function verfiyPrintWorkerLicense() {
    while (true) {
        try {
            let res = await crossLocal.send("/Common/Get_DEVICE_DIGEST", {}, { autoShowErr: false });
            if (res.ok) {
                let device_digest = res.data.device_digest;

                let res2 = await ajax.send("/aprint/cfg/print_worker/getMD5Origin", { device_digest: device_digest });
                if (res2.ok) {
                    topWin.cfg.md5Origin = res2.md5Origin;
                    return;
                }
            }
            else {
                console.log(res.error);
            }
        }
        catch (e) {
            console.log(e);
        }
        await sleep(1000);
    }
}
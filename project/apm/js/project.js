/**
 * aprint project config
 * Author: David.Li
 * Create Date: 2021-09-16
 * Modify Date: 2021-09-16
 * Copyright 2021-2021, doys-next.com
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
    });
})()
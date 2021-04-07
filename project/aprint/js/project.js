/**
 * aprint project config
 * Author: David.Li
 * Create Date: 2020-11-18
 * Modify Date: 2021-03-31
 * Copyright 2020-2021, doys-next.com
 */
(function () {
    ajax.send("/framework/TopWin/getTopWin", {}).then(res => {
        topWin.tenantId = res.tenantId;
        topWin.cfg = g.x.extendJSON(topWin.cfg, {
            needEdgeHttpShell1: true,

            // -- 标签变量图片基准URL --
            labelVariableImageBaseUrl: g.path.resRun + "/" + topWin.tenantId + "/aprint/label_variable_image/",
            productPnParaImageBaseUrl: g.path.resRun + "/" + topWin.tenantId + "/aprint/product_pn_para_image/"
        });
        topWin.ERR = g.x.extendJSON(topWin.ERR, {
            edgeHttpShellUnstart: "检测到打印工作站尚未启动，请检查。"
        });

        // -- 获取打印机列表 --
        edge.getPrinterList();
    });
})()
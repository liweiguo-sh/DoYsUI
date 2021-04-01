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
        topWin.cfg = {};

        // -- 标签变量图片基准URL --
        topWin.cfg.labelVariableImageBaseUrl = g.path.resRun + "/" + topWin.tenantId + "/aprint/label_variable_image/";
        topWin.cfg.productPnParaImageBaseUrl = g.path.resRun + "/" + topWin.tenantId + "/aprint/product_pn_para_image/";
    });
})()
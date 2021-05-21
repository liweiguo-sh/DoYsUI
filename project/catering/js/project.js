/**
 * aprint project config
 * Author: David.Li
 * Create Date: 2021-04-22
 * Modify Date: 2021-04-22
 * Copyright 2021, doys-next.com
 */
(function () {    
    ajax.send("/framework/TopWin/getTopWin", {}).then(res => {
        topWin.tenantId = res.tenantId;
        topWin.userPk = res.userPk;
        topWin.userName = res.userName;

        topWin.cfg = {};

        // -- 标签变量图片基准URL --
        // -- topWin.cfg.labelVariableImageBaseUrl = g.path.resRun + "/" + topWin.tenantId + "/aprint/label_variable_image/";
    });    
})()
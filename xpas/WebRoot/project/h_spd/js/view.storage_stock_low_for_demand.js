var btnExtra = {
    gridview: null,         // -- 当前视图对象 --
    viewKey: "",            // -- 当前视图ViewKey --    
    btnKey: "",             // -- 按钮Key --
    dtbViewData: null,      // -- 数据记录集 --
    drViewData: null,       // -- 当前行记录 --
    recordRow: 0,           // -- 当前行在记录集中的下标(下标从0开始) --
    gridRow: 0,             // -- 当前行在网格中的行号(下标从0开始) --
    gridCol: 0              // -- 当前列在网格中的下标 -- 
};
// ----------------------------------------------------------------------------
function viewExtraButtonClick(jsonProp) {
    btnExtra = g.x.extendJSON(btnExtra, jsonProp);
    if (btnExtra.btnKey.equals("createDemand")) {
        var arrSelectedRows = new Array();
        // ----------------------------------------------------
        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            if (btnExtra.dtbViewData.rows[i].checked) {
                arrSelectedRows.push(btnExtra.dtbViewData.rows[i]["material_id"].value + "," + btnExtra.dtbViewData.rows[i]["qty_demand"].value);
            }
        }
        if (arrSelectedRows.length == 0) {
            showMsg("请先勾选要操作的记录。");
            return false;
        }

        var keys = arrSelectedRows.join(";");
        if (g.a.send("processType=h_spd.purchase.Common&actionType=createDemandByStockLowQuery", { keys: keys }, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                var demandId = cReturn.demandId;
                var flowKey = cReturn.flowKey;
                var prop = {
                    url: g.appPath + "project/h_spd/html/dept/thd_demand.html?demand_type=0",
                    windowState: "maximized",
                    noTitle: true,
                    text: "需求计划",
                    title: "根据库存缺货自动生成，建议立即处理。关闭后可以在需求计划业务中找到当前单据",
                    modal: true
                };
                var para = {
                    viewKey: "thd_demand",
                    primaryKey: "demand_id," + demandId,
                    flowKey: flowKey,
                    allowModify: true,
                    allowDelete: true
                };
                topWin.openWindow(prop, para);
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    else {
    }
};
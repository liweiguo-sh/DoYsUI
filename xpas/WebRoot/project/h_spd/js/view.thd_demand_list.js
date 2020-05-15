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
    if (btnExtra.btnKey.equals("createDemandSum")) {
        var arrSelectedRows = new Array();
        // ----------------------------------------------------
        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            if (btnExtra.dtbViewData.rows[i].checked) {
                arrSelectedRows.push(btnExtra.dtbViewData.rows[i]["demand_id"].value);
            }
        }
        if (arrSelectedRows.length == 0) {
            showMsg("请先勾选要操作的记录。");
            return false;
        }

        var demandIds = arrSelectedRows.join(",");
        if (g.a.send("processType=h_spd.purchase.Common&actionType=createDemandSumFromDemand", { demandIds: demandIds }, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                var demandSumId = cReturn.demandSumId;

                gridView.refresh();

                var prop = {
                    url: g.appPath + "project/h_spd/html/purchase/thd_demand_sum.html",
                    parent: win,
                    modal: true
                };
                var para = {
                    viewKey: "thd_demand_sum",
                    primaryKey: "demand_sum_id," + demandSumId,
                    flowKey: "std_create_c",
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
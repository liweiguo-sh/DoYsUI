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

var winProcess = null;
// ----------------------------------------------------------------------------
function viewExtraButtonClick(jsonProp) {
    btnExtra = g.x.extendJSON(btnExtra, jsonProp);
    if (btnExtra.btnKey.equals("process")) {
        var dataRow = btnExtra.drViewData;
        var packTempletId = dataRow["pack_templet_id"].value;
        var packTempletName = dataRow["pack_templet_name"].value;
        var materialId = dataRow["material_id"].value;

        var prop = {
            url: g.appPath + "project/h_spd/html/op/fixed_num_pkg_process.html",
            parent: win,
            modal: true,
            title: "定数包加工 - " + packTempletName
        };
        var para = {
            menuKey: win.p.menu.menuKey,
            packTempletId: packTempletId,
            callback: function () {
                // btnExtra.gridview.refresh();
            }
        };
        if (winProcess && !winProcess.closed) {
            winProcess.close();
        }
        winProcess = topWin.openWindow(prop, para);
    }
    else {
    }
};
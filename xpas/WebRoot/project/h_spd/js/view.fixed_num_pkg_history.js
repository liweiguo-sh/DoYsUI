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
    if (btnExtra.btnKey.equals("packProcessDtl")) {
        var dataRow = btnExtra.drViewData;
        var packProcessId = dataRow["pack_process_id"].value;
        var packTempletName = dataRow["pack_templet_name"].value;

        var prop = {
            text: "加工单明细列表",
            title: packTempletName
        };
        var para = {
            viewKey: "pack_process_dtl",
            viewFilter: "pack_process_id = " + packProcessId
        };
        topWin.openTopView(prop, para);
    }
    else {
    }
};
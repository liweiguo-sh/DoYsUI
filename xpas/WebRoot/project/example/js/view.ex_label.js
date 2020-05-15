var btnExtra = {
    btnKey: "",             // -- 按钮Key --
    dtbViewData: null,      // -- 数据记录集 --
    drViewData: null,       // -- 当前行记录 --
    iIndex: 0,              // -- 当前行在记录集中的下标(下标从0开始) --
    iRow: 0                 // -- 当前行在网格中的行号(下标从0开始) --
};
// ----------------------------------------------------------------------------
function viewExtraButtonClick(jsonProp) {
    btnExtra = g.x.extendJSON(btnExtra, jsonProp);
    if (btnExtra.btnKey.equals("labelPrint")) {
        var labelId = btnExtra.drViewData["label_id"].value;
        var labelName = btnExtra.drViewData["label_name"].value;
        var prop = {
            modal: true,
            title: "标签打印",
            url: g.appPath + "project/example/html/training5_label/label_print.html"
        };
        var para = {
            labelId: labelId,
            labelName: labelName
        };
        topWin.openWindow(prop, para);
    }
    else {
    }
};
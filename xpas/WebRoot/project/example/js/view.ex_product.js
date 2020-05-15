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
    if (btnExtra.btnKey.equals("importProduct")) {
        var prop = {
            parent: win
        };
        var para = {
            target: "com.xznext.util.UploadFileBaseCos",
            callback: uploadCallback
        };
        topWin.uploadFile(prop, para);
        return false;
    }
    else {

    }
};

function uploadCallback(para) {
    var fileServer = para.filePath + para.fileName;
    alert(fileServer);
}
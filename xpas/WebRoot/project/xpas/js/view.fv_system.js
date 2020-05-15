var btnExtra = {
    btnKey: "",             //-- 按钮Key --
    dtbViewData: null,      //-- 数据记录集 --
    drViewData: null,       //-- 当前行记录 --
    iIndex: 0,              //-- 当前行在记录集中的下标(下标从0开始) --
    iRow: 0                 //-- 当前行在网格中的行号(下标从0开始) --
};
function viewExtraButtonClick(jsonProp) {
    btnExtra = g.x.extendJSON(btnExtra, jsonProp);
    if (btnExtra.btnKey.equals("clear_invalid_data")) {
        if (g.a.send("processType=com.xznext.xpas.Common&actionType=clearInvalidData", {}, true)) {
            if (g.a.OK) {
                showMsg("无效数据清理完成。");
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
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
    if (btnExtra.btnKey.equals("changeOffice")) {
        var userKeys = "";
        var arrSelectedRows = new Array();
        // ----------------------------------------------------
        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            if (btnExtra.dtbViewData.rows[i].checked) {
                arrSelectedRows.push(btnExtra.dtbViewData.rows[i]["user_key"].value);
            }
        }
        if (arrSelectedRows.length == 0) {
            showMsg("请先勾选要操作的记录。");
            return false;
        }
        userKeys = "'" + arrSelectedRows.join("','") + "'";
        // ----------------------------------------------------
        var para = {
            treeKey: "st_office_tree",
            callback: changeUserOffice,
            callbackPara: {
                userKeys: userKeys
            }
        };
        topWin.openSelectTree({ title: "请选择用户转入机构" }, para);
    }
    else {
        // ----------------------------
    }
};
function changeUserOffice(para) {
    if (!showConfirm("您确定要对选中的用户进行机构变更操作吗？")) return;
    // ----------------------------------------------------
    var officeId = para.node.value;
    var userKeys = para.callbackPara.userKeys;
    if (g.a.send("processType=com.xznext.xpas.User&actionType=changeUserOffice", { viewKey: viewKey, officeId: officeId, userKeys: userKeys }, true)) {
        if (g.a.OK) {
            // -- showMsg("用户机构变更操作成功。");
            gridView.refresh();
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
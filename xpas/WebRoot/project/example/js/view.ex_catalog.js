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
    if (btnExtra.btnKey.equals("extraButtonKey")) {
        var arrSelectedRows = new Array();
        // ----------------------------------------------------
        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            if (btnExtra.dtbViewData.rows[i].checked) {
                arrSelectedRows.push(btnExtra.dtbViewData.rows[i]["field_name"].value);
            }
        }
        if (arrSelectedRows.length == 0) {
            showMsg("请先勾选要操作的记录。");
            return false;
        }
        else if (arrSelectedRows.length > 1) {
            showMsg("当前操作只允许选择一条记录。");
            return false;
        }

        var keys = arrSelectedRows.join(",");
        if (g.a.send("processType=subSystem.package.ClassX&actionType=ActionX", { keys: keys }, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                showMsg("OK");
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
    else {
    }
};

// -- 视图加载之前、视图加载之后 ----------------------------------------------
function beforeViewLoad(prop) {

};
function afterViewLoad(prop) {

};

// -- 导航节点Click事件 -------------------------------------------------------
function afterTreeNodeClick(treeKey, node) {
    // debug(treeKey + ", " + node.value);
};
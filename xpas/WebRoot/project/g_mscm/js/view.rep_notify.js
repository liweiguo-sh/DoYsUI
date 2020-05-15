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

    var arrSelectedRows = new Array();
    if (btnExtra.btnKey.equals("confirmPo")) {
        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            if (btnExtra.dtbViewData.rows[i].checked) {
                if (btnExtra.dtbViewData.rows[i]["astatus"].value == 0) {
                    arrSelectedRows.push(btnExtra.dtbViewData.rows[i]["rep_notify_id"].value);
                }
                else {
                    showErr("订单 (" + btnExtra.dtbViewData.rows[i]["rn_key"].value + ") 已确认，不允许重复操作。");
                    return;
                }
            }
        }
        if (arrSelectedRows.length == 0) {
            showMsg("请先勾选要操作的记录。");
            return false;
        }
        var repNotifyIds = arrSelectedRows.join(",");
        if (g.a.send("processType=g_mscm.advice.RepNotify&actionType=confirmPo", { viewKey: 'rep_notify', repNotifyIds: repNotifyIds }, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                showMsg("选中订单确认成功！");
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
    else if (btnExtra.btnKey.equals("closePo")) {
        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            if (btnExtra.dtbViewData.rows[i].checked) {
                if (btnExtra.dtbViewData.rows[i]["astatus"].value == 0 || btnExtra.dtbViewData.rows[i]["astatus"].value == 1) {
                    arrSelectedRows.push(btnExtra.dtbViewData.rows[i]["rep_notify_id"].value);
                }
                else {
                    showErr("订单 (" + btnExtra.dtbViewData.rows[i]["rn_key"].value + ") 已关闭，不允许重复操作。");
                    return;
                }
            }
        }
        if (arrSelectedRows.length == 0) {
            showMsg("请先勾选要操作的记录。");
            return false;
        }
        var repNotifyIds = arrSelectedRows.join(",");
        if (g.a.send("processType=g_mscm.advice.RepNotify&actionType=closePo", { viewKey: 'rep_notify', repNotifyIds: repNotifyIds }, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                showMsg("选中订单关闭成功！");
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
        showErr("未实现的扩展按钮 (" + btnExtra.btnKey + ") 功能，请检查。");
    }
};

// -- 视图加载之前、视图加载之后 ----------------------------------------------
function beforeViewLoad(prop) {

};
function afterViewLoad(prop) {

};

// -- 行记录删除前、删除后 ----------------------------------------------------
function beforeDelete(prop) {
    // -- prop 格式同btnExtra --
    // -- debug(prop.drViewData["column_name"].value); --
    // -- return false 取消删除 --
    return true;
};
function afterDelete(prop) {
    // -- prop 参考beforeDelete --
    // -- 数据后台删除已完成，网格中记录尚未移除，afterDelete之后移除 --
};

// -- 导航节点Click事件 -------------------------------------------------------
function beforeTreeNodeClick(treeKey, node) {
    // -- debug(treeKey + ", " + node.value); --
};
function afterTreeNodeClick(treeKey, node) {
    // -- debug(treeKey + ", " + node.value); --
};
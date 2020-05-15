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
    if (btnExtra.btnKey.equals("mergeBill")) {
        var deptIdFirst = 0, distIdFirst = 0;
        var arrSelectedRows = new Array();
        // ----------------------------------------------------
        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            if (btnExtra.dtbViewData.rows[i].checked) {
                if (distIdFirst == 0) {
                    distIdFirst = btnExtra.dtbViewData.rows[i]["dist_id"].value;
                    deptIdFirst = btnExtra.dtbViewData.rows[i]["dept_id"].value;
                }
                else {
                    arrSelectedRows.push(btnExtra.dtbViewData.rows[i]["dist_id"].value);
                    if (deptIdFirst != btnExtra.dtbViewData.rows[i]["dept_id"].value) {
                        showMsg("只能合并相同科室的配送单，请检查。");
                        return;
                    }
                }
            }
        }
        if (arrSelectedRows.length < 1) {
            showMsg("至少需要选择 2 条记录，请检查。");
            return false;
        }

        var distIds = arrSelectedRows.join(",");
        if (g.a.send("processType=h_spd.op.VIEW_thdDist&actionType=mergeBill", { viewKey: "thd_dist", distIds: distIds, distIdMergeTo: distIdFirst }, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                var amountNew = cReturn.amountNew;

                for (var i = btnExtra.dtbViewData.rowCount - 1; i >= 0; i--) {
                    if (btnExtra.dtbViewData.rows[i].checked) {
                        gridView.selectRow(i);
                        if (btnExtra.dtbViewData.rows[i]["dist_id"].value != distIdFirst) {
                            gridView.remove();
                        }
                        else {
                            gridView.setValue(i, "amount", amountNew);
                        }
                    }
                }
                showMsg("配送单合并操作完成。");
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    else if (btnExtra.btnKey.equals("mergeByDept")) {
        var deptIdFirst = 0, distIdFirst = 0;
        var arrSelectedRows = new Array();
        // ----------------------------------------------------
        if (btnExtra.dtbViewData.rowCount == 0) {
            showMsg("没有需要合并的数据");
            return;
        }

        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            if (btnExtra.dtbViewData.rows[i].checked) {
                showMsg("您对当前操作有误解，当前操作是按部门自动合并所有配送单，无需勾选任何记录。");
                return false;
            }
        }
        if (!showConfirm("您确定要按照部门合并所有配送单吗？")) return;

        var nodeFilter = gridView.tree.selectedNode.drFlowNode.fn_filter.value;
        if (g.a.send("processType=h_spd.op.VIEW_thdDist&actionType=mergeByDept", { viewKey: "thd_dist", nodeFilter: nodeFilter }, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;

                gridView.refresh();
                showMsg("配送单按照部门合并操作完成。");
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

// ----------------------------------------------------------------------------
function afterTreeNodeClick(treeKey, node) {
    gridView.toolbar.setBarVisible("mergeBill", false);
    gridView.toolbar.setBarVisible("mergeByDept", false);

    if (node.text.equals("制单") || node.text.equals("待审核") || node.text.equals("待打印") || node.text.equals("XXX待配送")) {
        gridView.toolbar.setBarVisible("mergeBill", true);
        gridView.toolbar.setBarVisible("mergeByDept", true);
    }
};
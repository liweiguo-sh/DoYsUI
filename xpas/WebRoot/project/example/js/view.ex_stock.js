var btnExtra = {
    btnKey: "",             // -- 按钮Key --
    dtbViewData: null,      // -- 数据记录集 --
    drViewData: null,       // -- 当前行记录 --
    iIndex: 0,              // -- 当前行在记录集中的下标(下标从0开始) --
    iRow: 0                 // -- 当前行在网格中的行号(下标从0开始) --
};
function viewExtraButtonClick(jsonProp) {
    btnExtra = g.x.extendJSON(btnExtra, jsonProp);
    if (btnExtra.btnKey.equals("lockStock") || btnExtra.btnKey.equals("unlockStock")) {
        var arrSelectedRows = new Array();
        // ----------------------------------------------------
        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            if (btnExtra.dtbViewData.rows[i].checked) {
                arrSelectedRows.push(btnExtra.dtbViewData.rows[i]["stock_id"].value);
            }
        }
        if (arrSelectedRows.length == 0) {
            showMsg("请先勾选要操作的记录。");
            return false;
        }

        var stockIds = arrSelectedRows.join(",");
        var lockStatus = (btnExtra.btnKey.equals("lockStock") ? 1 : 0);
        if (g.a.send("processType=example.training2_uview.StockProcess&actionType=setStockStatus", { stockIds: stockIds, lockStatus: lockStatus }, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                if (btnExtra.btnKey.equals("lockStock")) {
                    showMsg("锁库操作成功。");
                }
                else {
                    showMsg("解锁操作成功。");
                }
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
    else if (btnExtra.btnKey.equals("setExpiredDate")) {
        var arrSelectedRows = new Array();
        // ----------------------------------------------------
        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            if (btnExtra.dtbViewData.rows[i].checked) {
                arrSelectedRows.push(btnExtra.dtbViewData.rows[i]["stock_id"].value);
            }
        }
        if (arrSelectedRows.length == 0) {
            showMsg("请先勾选要操作的记录。");
            return false;
        }
        var stockIds = arrSelectedRows.join(",");
        // ----------------------------------------------------
        var prop = {
            url: "project/example/html/training2_uview/set_expired_date.html",
            title: "保质期日期选择界面",
            parent: win,
            modal: true
        }
        var para = {
            stockIds: stockIds,
            callback: function () {
                gridView.refresh();
            }
        };
        topWin.openWindow(prop, para);
    }
    else {
        showMsg("当前扩展功能尚未实现。");
        return false;
    }
};

// -- 导航节点事件 ------------------------------------------------------------
function afterTreeNodeClick(treeKey, node) {
    if (treeKey.equals("example_stock.lock_status") && node.level == 2) {
        if (node.value == 0) {
            setButtonVisible("lockStock", true);
            setButtonVisible("unlockStock", false);
        }
        else {
            setButtonVisible("lockStock", false);
            setButtonVisible("unlockStock", true);
        }
    }
    else {
        setButtonVisible("lockStock", false);
        setButtonVisible("unlockStock", false);
    }
}
var btnExtra = {
    viewKey: "",            // -- 当前视图ViewKey --
    gridview: null,         // -- 当前视图对象 --
    btnKey: "",             // -- 按钮Key --
    dtbViewData: null,      // -- 数据记录集 --
    drViewData: null,       // -- 当前行记录 --
    recordRow: 0,           // -- 当前行在记录集中的下标(下标从0开始) --
    gridRow: 0,             // -- 当前行在网格中的行号(下标从0开始) --
    gridCol: 0,             // -- 当前列在网格中的下标 --
    iIndex: 0,              // -- 旧兼容代码, 同 recordRow --    
    iRow: 0                 // -- 旧兼容代码, 同 gridRow --
};
// ----------------------------------------------------------------------------
function viewExtraButtonClick(jsonProp) {
    
	btnExtra = g.x.extendJSON(btnExtra, jsonProp);

    if (btnExtra.btnKey.equals("cancelBillBtn")) {
        
		var execut = true; //是否继续执行
        var arrSelectedRows = new Array();
        // ----------------------------------------------------
        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            
			if (btnExtra.dtbViewData.rows[i].checked) {

				if (!btnExtra.dtbViewData.rows[i]["astatus"].value.equals("-1")) {

                    execut = false;
                    break;
                }

                arrSelectedRows.push(btnExtra.dtbViewData.rows[i]["bill_sp_id"].value);
            }
        }

		if (!execut) {

            showMsg("包含未被确认的记账单，无法进行取消操作");
            return;
        }

		

        if (arrSelectedRows.length == 0) {
            showMsg("请先勾选要操作的记录。");
            return false;
        }
       

        var keys = arrSelectedRows.join(",");

        if (g.a.send("processType=g_mscm.bill.Voucher&actionType=cancelBill", { keys: keys, viewKey: 'v_bill_sp_mscm' }, true)) {
			if (g.a.OK) {
				var cReturn = g.a.cReturn;
				showMsg("记账单取消确认成功！");
				gridView.refresh();
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
    }else if (btnExtra.btnKey.equals("confirmBillBtn")) {

		var execut = true; //是否继续执行
        var arrSelectedRows = new Array();
        // ----------------------------------------------------
        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            
			if (btnExtra.dtbViewData.rows[i].checked) {

				if (btnExtra.dtbViewData.rows[i]["astatus"].value.equals("-1")) {

                    execut = false;
                    break;
                }

                arrSelectedRows.push(btnExtra.dtbViewData.rows[i]["bill_sp_id"].value);
            }
        }

		if (!execut) {

            showMsg("记账单无法被多次确认，请检查");
            return;
        }

        if (arrSelectedRows.length == 0) {
            showMsg("请先勾选要操作的记录。");
            return false;
        }
       

        var keys = arrSelectedRows.join(",");

        if (g.a.send("processType=g_mscm.bill.Voucher&actionType=confirmBill", { keys: keys, viewKey: 'v_bill_sp_mscm' }, true)) {
			if (g.a.OK) {
				var cReturn = g.a.cReturn;
				showMsg("记账单已确认成功！");
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
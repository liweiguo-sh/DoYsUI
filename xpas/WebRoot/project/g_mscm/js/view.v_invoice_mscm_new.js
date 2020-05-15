/**
 * 
 * @authors Dujing (1198994896@qq.com)
 * @date    2018-07-30 17:48:02
 * @version $Id$
 */
var btnExtra = {
    viewKey: "",          // -- 当前视图ViewKey --
    gridView: null,         // -- 当前视图对象 --
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
function viewExtraButtonClick (jsonProp) {
	var primaryArray = []; // 记录选中记录得主键
	btnExtra = g.x.extendJSON(btnExtra, jsonProp);
    if (btnExtra.btnKey.equals("invoiceButton")) {
    	var nowDate = new Date().toString('yyyy-MM-dd');
    	var rows = btnExtra.dtbViewData.rows; // 当前数据数组
    	primaryArray = isChecked(rows);
    	if (primaryArray) {
    		var obj = {
	    		viewKey: 'v_invoice_mscm',
	    		primaryArray: primaryArray,
	    		nowDate: nowDate
	    	};
	    	if (g.a.send("processType=g_mscm.invoice.Invoice&actionType=addInvoiceRecord", obj, true)) {
	    		if (g.a.OK) {
	    			var cReturn = g.a.cReturn;
	    			var invoiceId = cReturn.invoiceId;
	    			if (invoiceId) {
	    				var prop = {
							text: "开票信息管理",
							url: g.appPath + 'project/g_mscm/html/invoice/v_invoice.html',
							modal: true
						};
						var para = {
							flowKey: '',
							viewKey: "v_invoice_mscm",
							primaryKey: "invoice_id,"+invoiceId,
							isAddnew: false,
							allowModify: true,
							callback: closePage
						};
						topWin.openWindow(prop, para);
	    			}
	    		} else {
	    			return false;
	    		}
	    	} else {
	    		return false;
	    	}
    	}
    }
}

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

function isChecked (arr) {
	var primaryArray = [];
	var checkedNum = 0; // 记录被选中得条数
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].checked) {
			checkedNum++;
			primaryArray.push(arr[i]['bill_sp_dtl_id'].value);
		}
	}
	if (checkedNum == 0) {
		showMsg("请选择所要开票的明细！");
		return false;
	} else {
		return primaryArray;
	}
}

function closePage () {
	gridView.refresh();
}


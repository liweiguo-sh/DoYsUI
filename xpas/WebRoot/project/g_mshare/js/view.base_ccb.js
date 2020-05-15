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
    if (btnExtra.btnKey.equals("addCC")) {
        var node = gridView.tree.selectedNode;
        if (node == null || node.level != 2) {
            showErr("请选择业务类型先！");
            return;
        }
        var prop = {
            title: "请选择产品",
            width: 0.5,
            height: 0.5,
            parent: win
        };
        var para = {
            viewKey: "select_cc",
            viewForm: "",
            userFilter: "",
            viewMode: "multiSelect",
            selectCallback: afterSelectCC
        };
        topWin.openSelectView(prop, para);
    }
    else if (btnExtra.btnKey.equals("switchMust")) {
        if (g.a.send("processType=g_mshare.base.CertBussinessAjax&actionType=switchMust", { ccrId: btnExtra.drViewData["cert_category_r_id"].value }, true)) {
            if (g.a.OK) {
                gridView.refresh();
            }

        }
    } else {

    }
};

// --选择资质分类后的回调--
function afterSelectCC(drs) {
    if (drs.length == 0) {
        return;
    }
    var keys = [];
    for (var i = 0; i < drs.length; i++) {
        keys.push(drs[i]["cert_category_id"].value);
    }
    var bussinessCode = gridView.tree.selectedNode.value;
    if (g.a.send("processType=g_mshare.base.CertBussinessAjax&actionType=bindCertBussiness", { keys: keys, bussinessCode: bussinessCode }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            gridView.refresh();
        }

    }
    showMsg("业务类型与资质类型绑定成功！");
    return true;
};

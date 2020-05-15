var btnExtra = {
    viewKey: "",            // -- 当前视图ViewKey --
    gridview: null,         // -- 当前视图对象 --
    btnKey: "",             // -- 按钮Key --
    dtbViewData: null,      // -- 数据记录集 --
    drViewData: null,       // -- 当前行记录 --
    recordRow: 0,           // -- 当前行在记录集中的下标(下标从0开始) --
    gridRow: 0,             // -- 当前行在网格中的行号(下标从0开始) --
    gridCol: 0              // -- 当前列在网格中的下标 --

};
function viewExtraButtonClick(jsonProp) {
    btnExtra = g.x.extendJSON(btnExtra, jsonProp);
    if (btnExtra.btnKey.equals("export_uview")) {
        var arrMenus = new Array();
        arrMenus.push({ key: "db2", text: "导出视图结构到 DB2", title: "生成 DB2 格式的创建视图SQL文件", type: "exportUView" });
        arrMenus.push({ key: "oracle", text: "导出视图结构到 ORACLE", title: "生成 ORACLE 格式的创建视图SQL文件", type: "exportUView" });
        arrMenus.push({ key: "sqlserver", text: "导出视图结构到 SQLSERVER", title: "生成 SQL Server 格式的创建视图SQL文件", type: "exportUView" });
        arrMenus.push({ key: "mysql", text: "导出视图结构到 MySQL", title: "生成 MySQL 格式的创建视图SQL文件", type: "exportUView" });
        topWin.context.show({ arrMenus: arrMenus, menuClick: export_uview, objDom: btnExtra.button, top: 0, left: 0 });
    }
    else if (btnExtra.btnKey.equals("xTFS")) {
        xTFS.openMenu({ objDom: btnExtra.button, mdataType: "view", mdataField: "view_key" });
    }
    else {

    }
};

// -- 导出视图 ----------------------------------------------------------------
function export_uview(para) {
    var arrKeys = new Array();
    // ----------------------------------------------------
    for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
        if (btnExtra.dtbViewData.rows[i].checked) {
            arrKeys.push(btnExtra.dtbViewData.rows[i]["view_key"].value);
        }
    }
    if (arrKeys.length == 0) {
        alert("请选择要导出的视图。");
        return false;
    }
    if (para.key.equals("db2")) {
        alert("暂未实现。");
        return false;
    }
    // ----------------------------------------------------
    if (g.a.send("processType=com.xznext.xpas.FrameworkPublish&actionType=" + para.type, { dbType: para.key, viewKeys: ("'" + arrKeys.join("', '") + "'") }, true)) {
        if (g.a.OK) {
            topWin.downloadFile(g.a.cReturn.urlFile);
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};

// -- 导航节点Click事件 -------------------------------------------------------
function beforeTreeNodeClick(treeKey, node) {
    if (treeKey.equals("view_xtfs")) {
        if (node.value.equals("newMData")) {
            node.treeFilter = "view_key NOT IN (SELECT mdata_key FROM XT_CDATA WHERE mdata_type = 'view')";
        }
        else if (node.value.equals("myCheckout")) {
            node.treeFilter = "view_key IN (SELECT mdata_key FROM XT_CDATA WHERE mdata_type = 'view' AND mdata_status = 1 AND check_computer = '%computer%')";
        }
        else {
            node.treeFilter = "1 = 0";
        }
    }
};
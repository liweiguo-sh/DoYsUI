var btnExtra = {
    btnKey: "",             //-- 按钮Key --
    dtbViewData: null,      //-- 数据记录集 --
    drViewData: null,       //-- 当前行记录 --
    iIndex: 0,              //-- 当前行在记录集中的下标(下标从0开始) --
    iRow: 0                 //-- 当前行在网格中的行号(下标从0开始) --
};
function viewExtraButtonClick(jsonProp) {
    btnExtra = g.x.extendJSON(btnExtra, jsonProp);
    if (btnExtra.btnKey.equals("export_structure")) {
        var arrMenus = new Array();
        arrMenus.push({ key: "db2", text: "导出表结构到 DB2", title: "生成DB2格式的建表SQL文件", type: "exportDBStructure" });
        arrMenus.push({ key: "oracle", text: "导出表结构到 ORACLE", title: "生成ORACLE格式的建表SQL文件", type: "exportDBStructure" });
        arrMenus.push({ key: "sqlserver", text: "导出表结构到 SQLSERVER", title: "生成SQL Server格式的建表SQL文件", type: "exportDBStructure" });
        topWin.context.show({ arrMenus: arrMenus, menuClick: export_table, objDom: btnExtra.button, top: 0, left: 0 });
    }
    else if (btnExtra.btnKey.equals("exportStructure")) {
        var arrMenus = new Array();
        arrMenus.push({ key: "sqlserver_db2", text: "导出表结构：SQLServer to DB2" });
        arrMenus.push({ key: "sqlserver_oracle", text: "导出表结构：SQLServer to Oracle" });
        arrMenus.push({ key: "sqlserver_sqlserver", text: "导出表结构：SQLServer to SQLServer" });
        arrMenus.push({ key: "sqlserver_mysql", text: "导出表结构：SQLServer to MySQL" });
        topWin.context.show({ arrMenus: arrMenus, menuClick: export_structure, objDom: btnExtra.button, top: 0, left: 0 });
    }
    else if (btnExtra.btnKey.equals("export_data")) {
        var arrMenus = new Array();
        arrMenus.push({ key: "db2", text: "导出表数据到 DB2", title: "生成 DB2 格式的 INSERT INTO SQL 文件", type: "exportDBData" });
        arrMenus.push({ key: "oracle", text: "导出表数据到 ORACLE", title: "生成 ORACLE 格式的 INSERT INTO SQL 文件", type: "exportDBData" });
        arrMenus.push({ key: "sqlserver", text: "导出表数据到 SQLServer", title: "生成 SQL Server 格式的 INSERT INTO SQL 文件", type: "exportDBData" });
        arrMenus.push({ key: "mysql", text: "导出表数据到 MySQL", title: "生成 MySQL 格式的 INSERT INTO SQL 文件", type: "exportDBData" });
        topWin.context.show({ arrMenus: arrMenus, menuClick: export_table, objDom: btnExtra.button, top: 0, left: 0 });
    }
    else if (btnExtra.btnKey.equals("clear_data")) {
        clear_data();
    }
    else if (btnExtra.btnKey.equals("insert_zero")) {
        insert_zero();
    }
    else if (btnExtra.btnKey.equals("xTFS")) {
        xTFS.openMenu({ objDom: btnExtra.button, mdataType: "table", mdataField: "table_key" });
    }
    // -- 新版 --------------------------------------------
    function export_structure(para) {
        var databaseKey = "";
        var arrKeys = new Array();
        // ----------------------------------------------------
        if (gridView.tree.selectedNode.level != 2) {
            showWarn("请先选择左侧导航树中的数据库。");
            return false;
        }
        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            if (btnExtra.dtbViewData.rows[i].checked) {
                arrKeys.push(btnExtra.dtbViewData.rows[i]["table_key"].value);
            }
        }
        if (arrKeys.length == 0) {
            alert("请选择要导出的表。");
            return false;
        }
        if (arrKeys.length > 100) {
            alert("选择表数量请控制在100以内。");
            return false;
        }
        // ----------------------------------------------------
        databaseKey = btnExtra.dtbViewData.rows[0]["table_key"].value.split(".")[0];
        if (g.a.send("processType=com.xznext.xpas.DBStructure&actionType=exportDBStructure", { fromTo: para.key, databaseKey: databaseKey, tableKeys: ("'" + arrKeys.join("', '") + "'") }, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                var fileName = cReturn.fileName;
                window.open(g.xpasRunPath + "framework/" + fileName);
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    // -- 旧版 --------------------------------------------
    function export_table(para) {
        var arrKeys = new Array();
        // ----------------------------------------------------
        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            if (btnExtra.dtbViewData.rows[i].checked) {
                arrKeys.push(btnExtra.dtbViewData.rows[i]["table_key"].value);
            }
        }
        if (arrKeys.length == 0) {
            alert("请选择要导出的表。");
            return false;
        }
        if (arrKeys.length > 100) {
            alert("选择表数量请控制在100以内。");
            return false;
        }
        // ----------------------------------------------------
        if (g.a.send("processType=com.xznext.xpas.Common&actionType=" + para.type, { dbType: para.key, tableKeys: ("'" + arrKeys.join("', '") + "'") }, true)) {
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
};

// -- 清除表数据 --------------------------------------------------------------
function clear_data() {
    var databaseKey = "", tableName = "";
    var arrKeys = new Array();
    // ----------------------------------------------------
    if (gridView.tree.selectedNode.level != 2) {
        showWarn("请先选择左侧导航树中的数据库。");
        return false;
    }
    for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
        if (btnExtra.dtbViewData.rows[i].checked) {
            tableName = btnExtra.dtbViewData.rows[i]["table_name"].value;
            if (btnExtra.dtbViewData.rows[i]["table_type"].value.equals("U")) {
                arrKeys.push(tableName);
            }
            else {
                showWarn("请勿勾选数据库视图：" + tableName + "。");
            }
        }
    }
    if (arrKeys.length == 0) {
        alert("请选择要清除数据的表。");
        return false;
    }
    if (arrKeys.length > 100) {
        alert("单次选择表数量请控制在100以内。");
        return false;
    }
    // ----------------------------------------------------
    if (!showConfirm("警告：\n表数据清除后不能恢复，请先备份数据。\n您确定要执行当前操作码？")) return;
    if (!showConfirm("警告（第二次）：\n表数据清除后不能恢复，请先备份数据。\n您确定要执行当前操作码？")) return;
    databaseKey = btnExtra.dtbViewData.rows[0]["table_key"].value.split(".")[0];
    if (g.a.send("processType=com.xznext.xpas.Common&actionType=clearTableData", { databaseKey: databaseKey, tableNames: arrKeys.join(",") }, true)) {
        if (g.a.OK) {
            showMsg("选中的表数据清除完毕。");
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
// -- 插入0记录(自增量字段值为零) ---------------------------------------------
function insert_zero() {
    var databaseKey = "", tableName = "";
    var arrKeys = new Array();
    // ----------------------------------------------------
    if (gridView.tree.selectedNode.level != 2) {
        showWarn("请先选择左侧导航树中的数据库。");
        return false;
    }
    for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
        if (btnExtra.dtbViewData.rows[i].checked) {
            tableName = btnExtra.dtbViewData.rows[i]["table_name"].value;
            if (btnExtra.dtbViewData.rows[i]["table_type"].value.equals("U")) {
                arrKeys.push(tableName);
            }
            else {
                showWarn("请勿勾选数据库视图：" + tableName + "。");
            }
        }
    }
    if (arrKeys.length == 0) {
        alert("请选择要插入0记录数据的表。");
        return false;
    }
    if (arrKeys.length > 100) {
        alert("单次选择表数量请控制在100以内。");
        return false;
    }
    // ----------------------------------------------------
    if (!showConfirm("警告：\n您确定要执行当前操作码？")) return;
    databaseKey = btnExtra.dtbViewData.rows[0]["table_key"].value.split(".")[0];
    if (g.a.send("processType=com.xznext.xpas.Common&actionType=insertZeroRecord", { databaseKey: databaseKey, tableNames: arrKeys.join(",") }, true)) {
        if (g.a.OK) {
            showMsg("插入0记录数据完毕，请人工验证结果是否正确。");
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

// -- 导航节点Click事件 -------------------------------------------------------
function beforeTreeNodeClick(treeKey, node) {
    if (treeKey.equals("table_xtfs")) {
        if (node.value.equals("newMData")) {
            node.treeFilter = "table_key NOT IN (SELECT mdata_key FROM XT_CDATA WHERE mdata_type = 'table')";
        }
        else if (node.value.equals("myCheckout")) {
            node.treeFilter = "table_key IN (SELECT mdata_key FROM XT_CDATA WHERE mdata_type = 'table' AND mdata_status = 1 AND check_computer = '%computer%')";
        }
        else {
            node.treeFilter = "1 = 0";
        }
    }
};
var btnExtra = {
    btnKey: "",             // -- 按钮Key --
    dtbViewData: null,      // -- 数据记录集 --
    drViewData: null,       // -- 当前行记录 --
    iIndex: 0,              // -- 当前行在记录集中的下标(下标从0开始) --
    iRow: 0                 // -- 当前行在网格中的行号(下标从0开始) --
};
function viewExtraButtonClick(jsonProp) {
    btnExtra = g.x.extendJSON(btnExtra, jsonProp);
    if (btnExtra.btnKey.equals("up") || btnExtra.btnKey.equals("down")) {
        if (gridView.tree.selectedNode == null || gridView.tree.selectedNode.level < 2) {
            alert("请先选择菜单导航树 1 级以下节点.");
            return;
        }
        if (gridView.totalRows == 1 || (btnExtra.iRow == 0 && btnExtra.btnKey.equals("up")) || (btnExtra.iRow == gridView.totalRows - 1 && btnExtra.btnKey.equals("down"))) {
            alert("无效操作.");
            return;
        }

        var iIndexNew = btnExtra.iIndex + (btnExtra.btnKey.equals("up") ? -1 : 1);
        var json = {
            viewKey: viewKey,
            nodeKey1: btnExtra.dtbViewData.rows[btnExtra.iIndex]["menu_key"].value,
            nodeKey2: btnExtra.dtbViewData.rows[iIndexNew]["menu_key"].value
        };

        if (g.a.send("processType=com.xznext.xpas.Menu&actionType=exchangeRow", json, true)) {
            if (g.a.OK) {
                gridView.exchangeRow(btnExtra.iIndex, iIndexNew);
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    else if (btnExtra.btnKey.equals("export_menu")) {
        var arrMenus = new Array();
        arrMenus.push({ key: "db2", text: "导出菜单定义到 DB2", title: "生成 DB2 格式的菜单定义SQL文件" });
        arrMenus.push({ key: "oracle", text: "导出菜单定义到 Oracle", title: "生成 Oracle 格式的菜单定义SQL文件" });
        arrMenus.push({ key: "sqlserver", text: "导出菜单定义到 SQLServer", title: "生成 SQL Server 格式的菜单定义SQL文件" });
        arrMenus.push({ key: "mysql", text: "导出菜单定义到 MySQL", title: "生成 MySQL 格式的菜单定义SQL文件" });
        topWin.context.show({ arrMenus: arrMenus, menuClick: export_menu, objDom: btnExtra.button, top: 0, left: 0 });
    }
    else if (btnExtra.btnKey.equals("xTFS")) {
        xTFS.openMenu({ objDom: btnExtra.button, mdataType: "menu", mdataField: "menu_key" });
    }
    else {
        alert("缺少处理程序。");
        return false;
    }
};

// -- 导出菜单 ----------------------------------------------------------------
function export_menu(para) {
    if (gridView.tree.selectedNode == null || gridView.tree.selectedNode.level < 2) {
        alert("请先选择子系统或子系统以下节点.");
        return;
    }
    var arrKeys = new Array();
    for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
        if (btnExtra.dtbViewData.rows[i].checked) {
            arrKeys.push(btnExtra.dtbViewData.rows[i]["menu_key"].value);
        }
    }
    if (arrKeys.length == 0) {
        alert("请选择要导出的菜单。");
        return false;
    }
    // ----------------------------------------------------
    if (g.a.send("processType=com.xznext.xpas.FrameworkPublish&actionType=exportMenu", { menuKeys: arrKeys.join(","), dbType: para.key }, true)) {
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

// ----------------------------------------------------------------------------
function afterViewLoad(prop) {
    prop.gridView.tree.dragDrop = dragDrop;
};
function dragDrop(para) {
    var tree = para.tree;
    var nodeDrag = para.nodeDrag;
    var nodeDrop = para.nodeDrop;
    // ----------------------------------------------------
    if (nodeDrag.level != 5 || nodeDrop.level != 4) return;
    if (nodeDrag.parent.key.equals(nodeDrop.key)) return;
    // ----------------------------------------------------
    if (!showConfirm("确定将菜单【" + nodeDrag.text + "】移动到【" + nodeDrop.text + "】下面吗？")) return;
    if (g.a.send("processType=com.xznext.xpas.Menu&actionType=dragDrop", { viewKey: "fv_menu", nodeKeyDrag: nodeDrag.value, nodeKeyDrop: nodeDrop.value }, true)) {
        if (g.a.OK) {
            if (nodeDrop.generated || nodeDrop.children == 0) {
                tree.reloadNode(nodeDrop);
            }
            tree.reloadNode(nodeDrag.parent);
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
            node.treeFilter = "menu_key NOT IN (SELECT mdata_key FROM XT_CDATA WHERE mdata_type = 'menu')";
        }
        else if (node.value.equals("myCheckout")) {
            node.treeFilter = "menu_key IN (SELECT mdata_key FROM XT_CDATA WHERE mdata_type = 'menu' AND mdata_status = 1 AND check_computer = '%computer%')";
        }
        else {
            node.treeFilter = "1 = 0";
        }
    }
};
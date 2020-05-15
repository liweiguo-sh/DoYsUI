/*
* xwf.DataControl JavaScript Library v1.0
* Author: Volant Lee
* Create Date: 2013-03-21
* Modify Date: 2020-01-06
* Copyright 2013-2020, xpas-next.com
* Description: DataControl 
*/
var css_xwf_uvform = true;
// -- 模块变量定义 --------------------------------------------------------------
var vf = {
    prefix: "xwf_vf_",
    cssPrefix: "xwf_vf_",           // -- 样式前缀 --
    flowKey: "",                    // -- 流程标识 --
    viewKey: null,                  // -- 视图标识 --
    primaryKey: "",                 // -- 当前记录主键 --
    foreignKey: {},                 // -- 当前导航外键 --
    isAddnew: false,                // -- 无网格状态下新增记录 --
    copyAdd: false,                 // -- 是否复制方式的添加 --
    status: "",                     // -- 当前记录状态（添加、浏览等） --

    allowAddnew: false,             // -- 允许添加 --
    allowCopy: false,               // -- 允许复制（前提条件允许添加） --
    allowModify: false,             // -- 允许修改 --
    allowDelete: false,             // -- 允许删除 --
    allowSave: false,               // -- 允许保存（允许添加或修改） --
    allowMove: true,                // -- 允许移动 --

    gridView: null,                 // -- gridView类实例 --
    toolbar: null,                  // -- toolbar类实例 --
    arrField: new Array(),          // -- 界面数据绑定控件数组 --

    dtbView: null,                  // --
    dtbViewField: null,             // --
    dtbViewOne: null,               // -- 视图数据 --
    drViewOne: null,                // -- 视图记录 --
    dtbBase: null,                  // -- 基础表记录 --

    dtbFlowNode: null,              // -- 流程节点表记录 --
    dtbFlowButton: null,            // -- 流程节点按钮表记录 --

    buttons: {},                    // -- 兼容旧代码 --
    arrExtraButtons: new Array()    // -- 扩展按钮数组（临时） --
};
//-- 初始化视图 -----------------------------------------------------------------
window.frameElement.win.addEventListener("afterLoad", function () {
    var strAllowMove = gId("divDC").getAttribute("allowMove");
    if (strAllowMove != null) {
        vf.allowMove = strAllowMove.equals("true");
    }

    vf.initUView();
    if (vf) vf.afterLoad();
});
vf.addExtraButton = function (_para) {
    ///<summary>添加扩展按钮，格式为 { key, text, [title], [width], [onclick] }</summary>
    var para = { type: "button", key: "", text: "", title: "", width: 0, onclick: null, icon: "fa fa-rss" };
    para = g.x.extendJSON(para, _para);
    if (para.key.equals("addnew") || para.key.equals("delete") || para.key.equals("edit") || para.key.equals("save") || para.key.equals("cancel") || para.key.equals("close")
        || para.key.equals("") || para.key.equals("audit") || para.key.equals("cancelAudit")) {
        if (!para.type.equals("space")) {
            showErr("参数key不能为" + (para.key.equals("") ? "空" : "关键字: " + para.key) + ", 请修改参数key值.");
            return false;
        }
    }
    vf.arrExtraButtons.push(para);
};

vf.initUView = function () {
    var getViewSchema = false;

    vf.flowKey = win.para.flowKey || "";                // -- 流程标识 --
    vf.viewKey = win.para.viewKey;                      // -- 当前视图标识 --
    vf.primaryKey = win.para.primaryKey;                // -- 当前记录主键 --
    vf.isAddnew = win.para.isAddnew;                    // -- 新增或编辑 --

    if (win.para.gridView) {
        vf.foreignKey = win.para.foreignKey;            // -- 当前导航外键 --
        vf.gridView = win.para.gridView;                // -- 网格控件 --
        vf.dtbView = win.para.dtbView;                  // -- 视图定义记录集 --
        vf.dtbViewField = win.para.dtbViewField;        // -- 视图字段定义记录集 --
        vf.dtbViewOne = win.para.dtbViewOne,            // -- 网格数据记录集 --
            vf.drViewOne = win.para.drViewOne;              // -- 网格数据记录行 --
    }
    else {
        getViewSchema = true;
    }
    //-- 1、后台取视图架构 --------------------------------
    var existGridview = vf.gridView ? 1 : 0;
    if (g.a.send("processType=com.xznext.View&actionType=getUViewFormSchema", { viewKey: vf.viewKey, flowKey: vf.flowKey, getViewSchema: (getViewSchema ? "1" : "0"), existGridview: existGridview }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            vf.dtbBase = cReturn.dtbBase;
            if (getViewSchema) {
                vf.dtbView = cReturn.dtbView;
                vf.dtbViewField = cReturn.dtbViewField;
            }
            vf.dtbFlowNode = cReturn.dtbFlowNode;
            vf.dtbFlowButton = cReturn.dtbFlowButton;
            if (vf.dtbFlowButton) {
                var dataRow = null, groupKeys = "", userKeys = "";
                for (var i = 0; i < vf.dtbFlowButton.rowCount; i++) {
                    dataRow = vf.dtbFlowButton.rows[i];

                    groupKeys = dataRow["group_keys"].value.replace("\n", ",") || dataRow["fb_groups"].value;
                    if (groupKeys.equals("") && dataRow["user_keys"].value.equals("") && dataRow["fb_users"].value.equals("")) {
                        groupKeys = "everyone";
                    }
                    groupKeys = "developers," + groupKeys;
                    vf.dtbFlowButton.rows[i]["group_keys"].value = groupKeys;

                    userKeys = dataRow["user_keys"].value.replace("\n", ",") || dataRow["fb_users"].value;
                    vf.dtbFlowButton.rows[i]["user_keys"].value = userKeys;
                }
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }

    vf.dtbViewField.sort("field_name");
    //-- 2、初始化界面控件 --------------------------------
    var nFind = 0;
    var strErrControlIds = "";
    var ctl = null, tdText = "";
    var all = document.getElementsByTagName("*");
    for (var i = 0; i < all.length; i++) {
        ctl = all[i];
        if (!ctl.id) continue;
        if (ctl.id.indexOf("_c") == 0 || ctl.id.indexOf("_g") == 0 || ctl.id.indexOf("_x") == 0) {
            ctl.controlType = ctl.getAttribute("controlType") || "";
            nFind = vf.dtbViewField.find([ctl.id.substring(2)]);
            ctl.colType = ctl.id.substring(0, 2);

            if (ctl.colType.equals("_c")) {
                ctl.baseColName = vf.dtbBase.getColName(ctl.id.substring(2));
                var dtbSource = g.a.cReturn["_c" + ctl.baseColName];
                if (dtbSource != null) {
                    vf.initDataSource(ctl, dtbSource);
                }
                else {
                    var dataSource = ctl.getAttribute("dataSource");
                    if (dataSource) {
                        var dtbSource = new window.xwf_datatable();
                        dtbSource.readFromString(dataSource);
                        if ("dropdown".equals(ctl.controlType)) {
                        }
                        else {
                            var columnCount = dtbSource.columnCount;
                            ctl.setAttribute("valueField", dtbSource.columns[columnCount - 1].name);
                            ctl.setAttribute("textField", dtbSource.columns[0].name);
                            ctl.setAttribute("colCount", columnCount > 1 ? columnCount - 1 : 1);
                        }
                        vf.initDataSource(ctl, dtbSource);
                    }
                }
            }
            else if (ctl.colType.equals("_g")) {
                var dtbSource = g.a.cReturn[ctl.id.toLowerCase()];
                if (dtbSource != null) {
                    vf.initDataSource(ctl, dtbSource);
                }
                if (vf.dtbViewOne) {
                    ctl.gridColName = vf.dtbViewOne.getColName(ctl.id.substring(2));
                }
                else {
                    // -- 特殊情况, 无网格, 独立单记录窗口 --
                    ctl.gridColName = ctl.id.substring(2).toLowerCase();
                }
            }
            else {

            }

            if (!ctl.colType.equals("_x") && !ctl.baseColName && !ctl.gridColName) {
                strErrControlIds += "\n" + ctl.id;
                continue;
            }
            vf.arrField.push(ctl);
            //-------------------------
            if (nFind >= 0) {
                ctl.title = vf.dtbViewField.rows[nFind]["field_title"].value || ctl.title;
                ctl.fieldType = vf.dtbViewField.rows[nFind]["field_type"].value;
                ctl.dataType = vf.dtbViewField.rows[nFind]["datatype"].value;
                ctl.validationKey = vf.dtbViewField.rows[nFind]["field_validation_key"].value;
                ctl.dataFormat = vf.dtbViewField.rows[nFind]["field_input_format"].value;
                ctl.fieldNullable = vf.dtbViewField.rows[nFind]["field_nullable"].value;

                if (!ctl.fieldNullable) {   // -- 非空字段标题标红 --
                    if (ctl.tagName == "SPAN" || ctl.type == "checkbox" || ctl.disabled) {
                        // -- 不处理 --
                    }
                    else {
                        if (ctl.parentElement.tagName.equals("TD") && ctl.parentElement.previousElementSibling) {
                            tdText = ctl.parentElement.previousElementSibling;
                            if (tdText.children.length == 0 && tdText.className.equals("")) {
                                // tdText.className = this.cssPrefix + "tdTextNullable";
                                tdText.innerHTML = tdText.innerHTML.replace("：", "").replace(":", "") + "<span style='color:chocolate;'> *</span>";
                            }
                        }
                    }
                }
                if (ctl.colType.equals("_c") && vf.dtbViewField.rows[nFind]["field_pkey"].value == 1) {
                    ctl.isPKeyField = true;
                }
            }
        }
    }
    if (strErrControlIds != "") {
        alert("下列控件（id）：\n" + strErrControlIds + "\n\n在视图 [" + vf.viewKey + "] 中没有定义，请检查。");
    }
    //-- 3、初始化DataControl控件 -------------------------
    vf.initDataControl();
    if (win.para.gridView) {
        if (vf.drViewOne) {
            vf.status = "view";
            vf.gridView.showRecord();
        }
        else {
            vf.addnew();
        }
    }
    else {  //-- 没有网格控件 --
        if (vf.isAddnew) {
            vf.addnew();
        }
        else {
            if (vf.primaryKey) {
                vf.getRecord();
                vf.fillData();

                if (vf.buttons["addnew"]) vf.buttons["addnew"].style.display = "none";
                //if (vf.buttons["delete"]) vf.buttons["delete"].style.display = "none";
            }
            else {
                alert("缺少主键参数。");
            }
        }
    }
};
vf.initDataControl = function () {
    var idx = 0;
    var arrHtml = new Array();
    var json = {
        domContainer: gId("divAA") || gId("divDC"),
        height: "M",
        onclick: vf.toolbarClick
    };

    vf.toolbar = new window.xwf_toolbar(json);
    // ----------------------------------------------------
    if (win.para.allowAddnew == undefined && vf.gridView) {    // -- 没有“添加”定义 --
        if (vf.gridView.dtbView.rows[0]["view_allow_addnew"].value == 1) {
            this.allowAddnew = true;
        }
    }
    else if (win.para.allowAddnew) {
        this.allowAddnew = true;
    }
    if (win.para.allowModify == undefined && vf.gridView) {    // -- 没有“修改”定义 --
        if (vf.gridView.dtbView.rows[0]["view_allow_modify"].value == 1) {
            this.allowModify = true;
        }
    }
    else if (win.para.allowModify) {
        this.allowModify = true;
    }
    if (win.para.allowDelete == undefined && vf.gridView) {    // -- 没有“删除”定义 --
        if (vf.gridView.dtbView.rows[0]["view_allow_delete"].value == 1) {
            this.allowDelete = true;
        }
    }
    else if (win.para.allowDelete) {
        this.allowDelete = true;
    }
    if (this.allowAddnew) {
        if (win.para.allowCopy == undefined && vf.gridView) {    // -- 没有“复制”定义 --
            if (vf.gridView.dtbView.rows[0]["view_allow_copy"].value == 1) {
                this.allowCopy = true;
            }
        }
        else if (win.para.allowCopy) {
            this.allowCopy = true;
        }
    }
    if (win.para.allowMove == undefined) {    // -- 没有“移动”定义 --
    }
    else {
        this.allowMove = win.para.allowMove;
    }
    if (this.allowAddnew || this.allowModify) {
        this.allowSave = true;
    }
    // ----------------------------------------------------
    if (this.allowMove) {
        vf.toolbar.addBar({ type: "button", group: "move", key: "first", marginRight: 0, borderRight: 0, width: 30, text: "<i class='fa fa-step-backward'></i>" });
        vf.toolbar.addBar({ type: "button", group: "move", key: "previous", marginRight: 0, borderRight: 0, borderLeft: 0, width: 30, text: "<i class='fa fa-backward'></i>" });
        vf.toolbar.addBar({ type: "button", group: "move", key: "next", marginRight: 0, borderRight: 0, borderLeft: 0, width: 30, text: "<i class='fa fa-forward'></i>" });
        vf.toolbar.addBar({ type: "button", group: "move", key: "last", width: 30, borderLeft: 0, text: "<i class='fa fa-step-forward'></i>" });
    }
    if (this.allowSave) {
        vf.toolbar.addBar({ type: "button", group: "command", key: "save", width: 70, text: "<i class='fa fa-check'></i> 保存" });
    }
    if (this.allowAddnew) {
        vf.toolbar.addBar({ type: "button", group: "command", key: "addnew", width: 70, text: "<i class='fa fa-plus'></i> 添加" });
    }
    if (this.allowCopy) {
        vf.toolbar.addBar({ type: "button", group: "command", key: "copy", width: 70, text: "<i class='fa fa-plus'></i> 复制" });
    }
    if (this.allowDelete) {
        vf.toolbar.addBar({ type: "button", group: "command", key: "delete", width: 70, text: "<i class='fa fa-minus'></i> 删除" });
    }

    for (var i = 0; i < vf.arrExtraButtons.length; i++) {
        vf.toolbar.addBar({ type: "button", group: "extra", key: vf.arrExtraButtons[i].key, title: vf.arrExtraButtons[i].title, text: "<i class='" + vf.arrExtraButtons[i].icon + "'></i> " + vf.arrExtraButtons[i].text });
    }
    // -- 添加流程控制按钮 --------------------------------
    if (!vf.flowKey.equals("")) {
        for (var i = 0; i < vf.dtbFlowButton.rowCount; i++) {
            var drRow = vf.dtbFlowButton.rows[i];
            vf.toolbar.addBar({ type: "button", group: "flow", key: "fb_" + drRow["fb_key"].value, drFB: drRow, title: drRow["fb_tip"].value, text: "<i class='fa fa-cog'></i> " + drRow["fb_name"].value });
        }
    }
    // ---------------------------------------------------- 
    vf.toolbar.addBar({ type: "button", group: "command", key: "cancel", width: 70, text: "<i class='fa fa-close'></i> 取消" });
    vf.toolbar.addBar({ type: "button", group: "command", key: "close", width: 70, text: "<i class='fa fa-close'></i> 关闭" });

    // -- 兼容旧版本 --
    for (var i = 0; i < vf.toolbar.bars.length; i++) {
        var bar = vf.toolbar.bars[i];
        vf.buttons[bar.key] = bar.dom;

        if (g.debug) {
            if (bar.key.equals("close")) {
                bar.dom.onmouseover = function () {
                    this.title = vf.primaryKey;
                };
            }
        }
    }
};
vf.initDataSource = function (ctl, dtbSource) {
    var iColValue = 0;
    var iColText = (dtbSource.columnCount == 1 ? 0 : 1);

    if (ctl.type == "select-one") {
        for (var i = 0; i < dtbSource.rowCount; i++) {
            ctl.options[i] = new Option(dtbSource.rows[i][iColText].value, dtbSource.rows[i][iColValue].value);
        }
    }
    else if (ctl.type == "text") {
        if (ctl.controlType.equals("dropdown")) {
            ctl.dropdown = new window.xwf_dropdown({ txtHost: ctl, dtbSource: dtbSource });
        }
        else {
            ctl.dtbSource = dtbSource;
            topWin.dropgrid.bindTextbox(ctl, { dtb: dtbSource });
        }
    }
    else if (ctl.type == "hidden") {
        showWarn("不能为控件类型为hidden的控件加载数据源,\n问题控件ID为：" + ctl.id);
    }
    else {
        alert("未知的控件类型，无法加载数据。");
    }
};

//-- 读取数据，填充界面 -----------------------------------------------------------
vf.getRecord = function () {
    //-- 后台取基础表及视图单条记录数据 -------------------
    if (g.a.send("processType=com.xznext.View&actionType=getBaseData", { viewKey: vf.viewKey, primaryKey: vf.primaryKey, flowKey: vf.flowKey }, true)) {
        if (g.a.OK) {
            vf.dtbBase = g.a.cReturn.dtbBase;
            vf.dtbViewOne = g.a.cReturn.dtbViewOne;
            vf.drViewOne = g.a.cReturn.dtbViewOne.rows[0];
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
    return true;
};
vf.fillData = function (preventEvent) {
    var dtTemp = null;
    var numberFormat = "";
    for (var i = 0; i < vf.arrField.length; i++) {
        var ctl = vf.arrField[i];
        var fieldValue = "";
        if (ctl.colType.equals("_c")) {
            fieldValue = vf.dtbBase.rows[0][ctl.baseColName].value;
        }
        else if (ctl.colType.equals("_g")) {
            fieldValue = vf.drViewOne[ctl.gridColName].value;
        }
        else {
            continue;
        }

        if (ctl.dataFormat) {
            if (fieldValue.equals("")) {
            }
            else if (ctl.fieldType.equals("datetime")) {
                dtTemp = fieldValue.toDate();
                if (dtTemp != null) {
                    fieldValue = dtTemp.toString(ctl.dataFormat);
                }
            }
            else if (ctl.fieldType.equals("number")) {
                numberFormat = ctl.dataFormat.replaceAll(",", "");
                if (!numberFormat.equals("")) {
                    fieldValue = g.x.numberFormat(fieldValue, numberFormat);
                }
            }
            else {
                debug("暂未实现对数据类型为[" + ctl.fieldType + "]的格式化.");
            }
        }
        else {
            if (ctl.id.equals("_cCDate") || ctl.id.equals("_cMDate") || ctl.id.equals("_cADate")) {
                fieldValue = fieldValue.substring(0, 16);   // -- yyyy-MM-dd HH:mm --
            }
            else if (ctl.fieldType == null) {
                debug("视图：" + vf.viewKey + " 的基础表表结构发生变化，请重新保存视图。");
            }
            else if (ctl.fieldType.equals("datetime")) {
                fieldValue = fieldValue.substring(0, 10);
            }
            else {
            }
        }

        if (ctl.type == "text" || ctl.type == "textarea" || ctl.type == "hidden" || ctl.type == "select-one") {
            if (ctl.controlType.equals("dropdown")) {
                ctl.setValue(fieldValue);
            }
            else if (ctl.controlType.equals("dropgrid")) {
                ctl.value = "";
                ctl.underValue = fieldValue;
                ctl.dtbSource.filter();

                var dtbSource = ctl.dtbSource;
                var textField = ctl.getAttribute("textField");
                var valueField = ctl.getAttribute("valueField");
                if (textField == null) textField = ctl.baseColName;
                if (valueField == null) valueField = ctl.baseColName;
                for (var j = 0; j < dtbSource.rowCount; j++) {
                    if (dtbSource.rows[j][valueField].value.equals(fieldValue)) {
                        ctl.value = dtbSource.rows[j][textField].value;
                        break;
                    }
                }
            }
            else {
                ctl.value = fieldValue;
            }
        }
        else if (ctl.type == "checkbox") {
            ctl.checked = (fieldValue == 1 || fieldValue == "1");
        }
        else {
            if (ctl.tagName == "SPAN") {
                ctl.innerHTML = fieldValue;
            }
            else if (ctl.tagName.equals("IMG")) {
                ctl.value = fieldValue;
                ctl.src = fieldValue + "?rnd=" + Math.random();
            }
            else {
                alert("unknown control type: " + ctl.type);
            }
        }
    }
    // ----------------------------------------------------
    if (preventEvent) return;
    vf.setStatus("view");
    ////vf.buttons["close"].title = vf.primaryKey;
};
vf.refreshRecord = function () {
    this.getRecord();
    this.fillData(true);
    if (vf.gridView) {
        vf.gridView.update(vf.drViewOne);
    }
};
vf.clearForm = function (copyMode) {
    for (var i = 0; i < vf.arrField.length; i++) {
        ctl = vf.arrField[i];
        if (copyMode && !ctl.isPKeyField) continue;    // -- 拷贝模式，非主键字段保留原值 --

        if (ctl.type == "text" || ctl.type == "textarea" || ctl.type == "hidden") {
            if (ctl.controlType.equals("dropdown")) {
                ctl.setValue("");
            }
            else if (ctl.controlType.equals("dropgrid")) {
                ctl.underValue = "";
            }
            ctl.value = "";
        }
        else if (ctl.type == "checkbox") {
            ctl.checked = false;
        }
        else if (ctl.type == "select-one") {
            ctl.selectedIndex = -1;
        }
        else {
            if (ctl.tagName == "SPAN") {
                ctl.innerHTML = "";
            }
            else if (ctl.tagName.equals("IMG")) {
                ctl.value = "";
                ctl.src = "";
            }
            else {
                alert("unknown control type: " + ctl.type);
                continue;
            }
        }
    }
    //-- 预填外键值 ---------------------------------------
    for (var key in vf.foreignKey) {
        var value = vf.foreignKey[key];
        var arrKey = key.split(".");
        key = arrKey[arrKey.length - 1];
        for (var i = 0; i < vf.arrField.length; i++) {
            var ctl = vf.arrField[i];
            if (!ctl.colType.equals("_c") || !key.equals(ctl.baseColName)) continue;
            if (ctl.type == "text" || ctl.type == "textarea" || ctl.type == "hidden" || ctl.type == "select-one") {
                if (ctl.controlType.equals("dropdown")) {
                    ctl.setValue(value);
                }
                else if (ctl.controlType.equals("dropgrid")) {
                    ctl.setValue(value);
                }
                else {
                    ctl.value = value;
                }
            }
            else if (ctl.type == "checkbox") {
                ctl.checked = value ? true : false;
            }
            else {
                alert("导航外键字段不支持的控件类型: " + ctl.type + ".");
                continue;
            }
        }
    }
    //-- 空记录 ----------------------------------------------
    if (vf.status.equals("none")) {

    }
};

vf.getPrimaryKey = function () {
    var primaryKey = "", colName = "";
    for (var i = 0; i < vf.dtbViewField.rowCount; i++) {
        if (vf.dtbViewField.rows[i]["field_pkey"].value == 1) {
            colName = vf.dtbViewField.rows[i]["field_name"].value;
            colName = vf.dtbBase.getColName(colName);
            primaryKey += g.c.CHAR7 + colName + "," + vf.dtbBase.rows[0][colName].value;
        }
    }
    primaryKey = primaryKey.substring(1);
    return primaryKey;
};
vf.checkNeedSave = function (autoInvokeSave, askUser) {
    var blNeedSave = false;
    var fieldValue = "", numberFormat = "";

    var dtTemp = null;
    var ctl = null;
    // ----------------------------------------------------
    if (vf.dtbBase.rowCount == 0) return false;
    if (vf.toolbar.Bars["save"] && vf.toolbar.Bars["save"].dom.style.display.equals("none")) return false;

    for (var i = 0; i < vf.arrField.length; i++) {
        ctl = vf.arrField[i];
        if (!ctl.colType.equals("_c")) continue;

        fieldValue = vf.dtbBase.rows[0][ctl.baseColName].value;
        if (ctl.dataFormat) {
            if (fieldValue.equals("")) {
            }
            else if (ctl.fieldType.equals("datetime")) {
                dtTemp = fieldValue.toDate();
                if (dtTemp != null) {
                    fieldValue = dtTemp.toString(ctl.dataFormat);
                }
            }
            else if (ctl.fieldType.equals("number")) {
                numberFormat = ctl.dataFormat.replaceAll(",", "");
                if (!numberFormat.equals("")) {
                    fieldValue = g.x.numberFormat(fieldValue, numberFormat);
                }
            }
            else {
                continue;
            }
        }
        else {
            if (ctl.id.equals("_cCDate") || ctl.id.equals("_cMDate") || ctl.id.equals("_cADate")) {
                continue;
            }
            else if (ctl.fieldType == null) {
                continue;
            }
            else if (ctl.fieldType.equals("datetime")) {
                fieldValue = fieldValue.substring(0, 10);
            }
            else {
            }
        }

        if (ctl.type == "text" || ctl.type == "textarea" || ctl.type == "hidden" || ctl.type == "select-one") {
            if (ctl.controlType.equals("dropdown")) {
                if (!ctl.underValue.equals(fieldValue)) {
                    debug("ctlId = " + ctl.id + ", underValue = " + ctl.underValue + ", fieldValue = " + fieldValue);
                    blNeedSave = true;
                    break;
                }
            }
            else if (ctl.controlType.equals("dropgrid")) {
                if (!ctl.underValue.equals(fieldValue)) {
                    blNeedSave = true;
                    break;
                }
            }
            else {
                if (ctl.value.replaceAll("\r", "").replaceAll("\n", "") != fieldValue.toString().replaceAll("\r", "").replaceAll("\n", "")) {
                    blNeedSave = true;
                    break;
                }
            }
        }
        else if (ctl.type == "checkbox") {
            if (ctl.checked != (fieldValue == 1 || fieldValue == "1")) {
                blNeedSave = true;
                break;
            }
        }
        else {
        }
    }
    // ----------------------------------------------------
    if (blNeedSave) {
        if (autoInvokeSave) {
            if (askUser) {
                if (!showConfirm("记录修改后尚未保存，要保存当前修改吗？")) {
                    return false;   // -- 用户主动放弃保存 --
                }
            }
            if (!vf.save()) {
                return true;        // -- 自动保存失败 --
            }
            else {
                return false;
            }
        }
    }
    // ----------------------------------------------------
    return blNeedSave;
};

//-- 移动、添加、删除、保存等常规操作 -----------------------------------------------
vf.del = function () {
    var dataForm = vf.getFormValues();

    if (!vf.beforeDelete()) return;
    if (!confirm("记录删除后不能恢复，您确定要删除吗？")) return false;
    dataForm.primaryKey = vf.primaryKey;
    if (g.a.send("processType=com.xznext.View&actionType=vfDelete&viewKey=" + vf.viewKey + "&flowKey=" + vf.flowKey, dataForm, true)) {
        if (!g.a.OK) {
            return false;
        }
    }
    else {
        return false;
    }

    vf.flashTitle("数据删除成功");
    vf.afterDelete();
    if (vf.gridView) {
        vf.gridView.remove();
    }
    else {
        showMsg("数据删除成功。");
        vf.close();
    }
};
vf.remove = function () {
    if (vf.gridView) {
        vf.gridView.remove();
    }
    else {
        vf.close();
    }
};
vf.addnew = function () {
    if (!vf.beforeAddnew()) {
        if (vf.gridView && vf.gridView.recordRow < 0) {
            vf.close();
        }
        return;
    }
    vf.clearForm();
    vf.setStatus("addnew");
    try {
        //在某种条件下，flashTitle不存在，导致js报错
        win.flashTitle("添加新数据");
    } catch (e) { };
};
vf.copy = function () {
    this.copyAdd = true;
    if (!vf.beforeAddnew()) {
        this.copyAdd = false;
        return false;
    }
    if (!vf.beforeCopy()) {
        this.copyAdd = false;
        return false;
    }
    vf.clearForm(true);
    vf.afterCopy();
    vf.setStatus("addnew");
};
vf.checkData = function () {
    // -- save之前检查数据 ------------
    var nFind = 0, fieldLength = 0, dataLength = 0;
    var ctl = null;
    var fieldText = "", dataValue = "", validationKey = "";
    // ----------------------------------------------------
    for (var i = 0; i < vf.arrField.length; i++) {
        ctl = vf.arrField[i];
        if (!ctl.style.display.equals("")) continue;
        if (ctl.disabled) {
            if (ctl.controlType && ctl.controlType.equals("dropdown")) {
            }
            else {
                continue;
            }
        }
        if (ctl.type == "text" || ctl.type == "textarea" || ctl.type == "select-one") {
            if (ctl.controlType.equals("dropdown")) {
                dataValue = ctl.underValue;
            }
            else if (ctl.controlType.equals("dropgrid")) {
                dataValue = ctl.underValue;
            }
            else {
                if (ctl.getAttribute("keepblank")) {
                    // -- debug(ctl.value) --
                    // -- 保留空格 --
                }
                else {
                    dataValue = ctl.value.trim();
                }
            }
        }
        else {
            if (ctl.type == "hidden" || ctl.tagName == "SPAN" || ctl.type == "checkbox" || ctl.tagName == "IMG") {
                continue;
            }
            else {
                alert("unknown control type: " + ctl.type);
                continue;
            }
        }
        // -- 检查是否为空 ------------
        nFind = vf.dtbViewField.find([ctl.id.substring(2)]);
        if (nFind < 0) continue;
        fieldText = vf.dtbViewField.rows[nFind]["field_text"].value;
        fieldLength = vf.dtbViewField.rows[nFind]["field_length"].value;

        if (dataValue.equals("") && vf.dtbViewField.rows[nFind]["field_nullable"].value == 0) {
            showWarn(fieldText + " 不允许为空, 请输入。");
            if (ctl.controlType.equals("dropdown")) {
                ctl.instance.expand();
            }
            else {
                ctl.focus();
            }
            return false;
        }
        // -- 数据合法性校验 ----------
        if (dataValue.equals("")) continue;
        if (ctl.type == "text" || ctl.type == "textarea") {
            if (ctl.fieldType.equals("number")) {
                if (ctl.dataType.equals("int")) {
                    if (!g.x.verifyInt(dataValue)) {
                        showWarn("字段（" + fieldText + "）内容输入格式不合法，请输入整数。");
                        ctl.focus();
                        return;
                    }
                }
                else {
                    if (!g.x.verifyNum(dataValue)) {
                        showWarn("字段（" + fieldText + "）内容输入格式不合法，请输入数字。");
                        ctl.focus();
                        return;
                    }
                }
            }
            else if (ctl.fieldType.equals("datetime")) {
                if (ctl.dataType.equals("datetime")) {
                    if (!g.x.verifyDatetime(dataValue)) {
                        showWarn("字段（" + fieldText + "）内容输入格式不合法，请输入日期。");
                        ctl.focus();
                        return;
                    }
                }
            }
            else if (ctl.fieldType.equals("string")) {
                if (ctl.dataType.equals("varchar")) {
                    dataLength = ("" + dataValue).replace(/[^\x00-\xff]/g, 'xx').length;
                    if (dataLength > fieldLength) {
                        showWarn("字段（" + fieldText + "）内容长度(" + dataLength + ") 超过系统允许长度(" + fieldLength + ")，请检查。");
                        ctl.focus();
                        return;
                    }
                }
            }

            validationKey = vf.dtbViewField.rows[nFind]["field_validation_key"].value;
            if (!validationKey.equals("")) {
                //alert(validationKey + "(" + dataValue + ")");
            }
        }
    }
    // ----------------------------------------------------
    return true;
};
vf.getFormValues = function () {
    var ctl = null;
    var dataForm = {};
    var columnName = "", dataValue = "";
    // ----------------------------------------------------
    if (vf.dtbBase.rowCount == 1) {
        if (vf.dtbBase.getColIndex("creator") >= 0) {
            for (var i = 0; i < vf.dtbBase.columnCount; i++) {
                columnName = vf.dtbBase.columns[i].name;
                dataValue = vf.dtbBase.rows[0][columnName].value;
                dataForm["_c" + columnName] = dataValue;
            }
        }
    }
    // ----------------------------------------------------
    for (var i = 0; i < vf.arrField.length; i++) {
        ctl = vf.arrField[i];

        if (ctl.type == "text" || ctl.type == "textarea" || ctl.type == "hidden" || ctl.type == "select-one") {
            if (ctl.controlType.equals("dropdown")) {
                dataValue = ctl.underValue;
            }
            else if (ctl.controlType.equals("dropgrid")) {
                dataValue = ctl.underValue;
            }
            else {
                dataValue = ctl.value.trim();
            }
        }
        else if (ctl.type == "checkbox") {
            dataValue = (ctl.checked ? "1" : "0");
        }
        else {
            if (ctl.tagName == "SPAN") {
                dataValue = ctl.innerHTML;
            }
            else if (ctl.tagName.equals("IMG")) {
                dataValue = ctl.value;
            }
            else {
                alert("unknown control type: " + ctl.type);
                continue;
            }
        }
        dataForm[ctl.id.toLocaleLowerCase()] = dataValue;   // -- 一律转为小写 --
    }
    //-----------------------------------------------------
    if (window.document.forms.length > 0) {
        if (window.document.forms[0].target) {
            dataForm["formTarget"] = window.document.forms[0].target;
        }
        else {
            dataForm["formTarget"] = window.document.forms["frm"].target;
        }
    }

    return dataForm;
};
vf.save = function () {
    var ctl = null;
    //-- 1. beforeSave && check data ----------------------
    if (!vf.beforeSave()) return;
    if (!vf.checkData()) return;
    //-- 2. 提交数据 --------------------------------------
    var dataForm = vf.getFormValues();
    dataForm.primaryKey = vf.primaryKey;
    if (vf.status.equals("view")) {
        if (g.a.send("processType=com.xznext.View&actionType=vfUpdate&viewKey=" + vf.viewKey + "&flowKey=" + vf.flowKey, dataForm, true)) {
            if (!g.a.OK) {
                return false;
            }
        }
        else {
            return false;
        }
    }
    else {
        if (g.a.send("processType=com.xznext.View&actionType=vfAddnew&viewKey=" + vf.viewKey + "&flowKey=" + vf.flowKey, dataForm, true)) {
            if (!g.a.OK) {
                return false;
            }
        }
        else {
            return false;
        }
    }
    var c = g.a.cReturn;
    vf.dtbBase = c.dtbBase;
    vf.dtbViewOne = c.dtbViewOne;
    if (vf.gridView && vf.dtbViewOne.rowCount == 0) {
        // -- 记录保存后不符合视图条件，取不到符合视图条件的记录 --        
        vf.afterSave();
        if (!vf.status.equals("addnew")) {
            vf.remove();
        }
        else {
            showWarn("您添加的新纪录已成功保存，\n但不符合视图条件，不能正常显示。");
            vf.close();
        }
        return true;
    }
    vf.drViewOne = c.dtbViewOne.rows[0];
    vf.primaryKey = this.getPrimaryKey();
    //-- 3. 更新网格 --------------------------------------
    if (vf.gridView) {
        if (vf.status.equals("addnew")) {
            vf.gridView.addRow(vf.drViewOne);
        }
        else {
            vf.gridView.update(vf.drViewOne);
        }
    }
    //-- 4. 填充界面 && afterSave -------------------------
    vf.fillData();
    vf.flashTitle("数据保存成功");
    vf.afterSave();
    this.copyAdd = false;
    return true;
};
vf.cancel = function () {
    this.copyAdd = false;
    if (vf.drViewOne) {
        vf.fillData();
    }
    else {
        if (vf.gridView && vf.gridView.currentRow >= 0 && vf.gridView.dtbViewData.rowCount - vf.gridView.indexFrom > vf.gridView.currentRow) {
            vf.gridView.showRecord();
        }
        else {
            vf.setStatus("none");
            // -- vf.clearForm(); --
            vf.close();
        }
    }
};
vf.close = function () {
    if (!vf.status.equals("none") && vf.toolbar.Bars["save"] && vf.toolbar.Bars["save"].dom.style.display == "") {
        if (vf.checkNeedSave(true, true)) return;
    }
    win.close();
};

vf.move = function (p1) {
    if (vf.gridView == null) return;
    if (vf.status.equals("addnew")) {
        vf.flashTitle("数据尚未保存，不能移动操作。");
        return;
    }
    if (!vf.beforeMove()) return;

    if (vf.checkNeedSave(true, true)) return;

    win.setTitle(win.p.title);
    vf.gridView.move(p1);

    if (g.debug) {
        if (vf.buttons["close"]) {
            vf.buttons["close"].title = vf.primaryKey;
        }
    }
};
vf.setStatus = function (status) {
    vf.status = status;

    var drFlowNode = null;
    // ----------------------------------------------------
    if (vf.status.equals("view")) {
        for (var i = 0; i < vf.toolbar.bars.length; i++) {
            vf.toolbar.bars[i].setVisible(true);
        }
        vf.toolbar.setBarVisible("cancel", false);
    }
    else if (vf.status.equals("addnew")) {
        for (var i = 0; i < vf.toolbar.bars.length; i++) {
            vf.toolbar.bars[i].setVisible(false);
        }
        vf.toolbar.setBarVisible("save", true);
        vf.toolbar.setBarVisible("cancel", true);
    }
    else if (vf.status.equals("none")) {
        for (var i = 0; i < vf.toolbar.bars.length; i++) {
            vf.toolbar.bars[i].setVisible(false);
        }
        vf.toolbar.setBarVisible("close", true);
    }
    // ----------------------------------------------------
    if (!vf.flowKey.equals("")) {
        if (vf.gridView) {
            var nodeSelected = vf.gridView.tree.selectedNode;
            if (nodeSelected.level == 1) {
                nodeSelected = nodeSelected.first;
            }
            drFlowNode = nodeSelected.drFlowNode
        }
        else {
            drFlowNode = vf.dtbFlowNode.rows[0];
        }

        for (var i = 0; i < vf.toolbar.bars.length; i++) {
            var btn = vf.toolbar.Bars[this.toolbar.bars[i].key].dom;
            if (vf.toolbar.bars[i].group.equals("flow") && vf.status.equals("view")) {
                btn.style.display = "none";
                var blShow = false;

                var drFB = vf.toolbar.bars[i].drFB;
                var fbSqlCondition = drFB["fb_sql_condition"].value;
                var fbGroups = drFB["group_keys"].value;
                var fbUsers = drFB["user_keys"].value;
                // --------------------
                if (("," + fbUsers + ",").indexOf(",creator,") >= 0) {
                    if (vf.dtbBase.rows[0]["creator"].value.equals(topWin.userKey)) {
                        blShow = true;
                    }
                }
                if (blShow == false) {
                    if (!topWin.matchGroup(fbGroups) && !topWin.matchUser(fbUsers)) {
                        continue;
                    }
                    blShow = true;
                }
                // --------------------
                if (fbSqlCondition.equals("")) {
                    btn.style.display = "";
                    continue;
                }

                var arrSql = g.x.sqlToArray(fbSqlCondition);
                for (var j = 0; j < arrSql.length; j++) {
                    var fieldName = arrSql[j].fieldName;
                    var fieldType = vf.dtbBase.columns[fieldName].columnType;
                    var valueRecord = vf.dtbBase.rows[0][fieldName].value;
                    if (arrSql[j].symbol.equals("=")) {
                        if (!arrSql[j].fieldValue.equals(valueRecord)) {
                            blShow = false
                        }
                    }
                    else if (arrSql[j].symbol.equals("IN")) {
                        var arrFiledValue = arrSql[j].fieldValue.replace("(", "").replace(")", "").split(",");
                        blShow = false;
                        for (var k = 0; k < arrFiledValue.length; k++) {
                            if (arrFiledValue[k].equals(valueRecord)) {
                                blShow = true;
                                break;
                            }
                        }
                    }
                    else {
                        var valueCondition = parseInt(arrSql[j].fieldValue);
                        if (arrSql[j].symbol.equals(">")) {
                            blShow = valueCondition < valueRecord;

                        }
                        else if (arrSql[j].symbol.equals(">=")) {
                            blShow = valueCondition <= valueRecord;

                        }
                        else if (arrSql[j].symbol.equals("<")) {
                            blShow = valueCondition > valueRecord;

                        }
                        else if (arrSql[j].symbol.equals("<=")) {
                            blShow = valueCondition >= valueRecord;

                        }
                        else if (arrSql[j].symbol.equals("<>")) {
                            blShow = valueCondition != valueRecord;
                        }
                        else {
                            blShow = false;
                            showErr("暂不支持的sql表达式" + fbSqlCondition);
                        }
                    }
                    if (blShow == false) break;
                }
                if (blShow == false) continue;
                btn.style.display = "";
            }
            else {
                if (vf.toolbar.bars[i].group.equals("command")) {
                    if (!vf.status.equals("addnew")) {
                        if (vf.toolbar.bars[i].key.equals("save")) {
                            if (!drFlowNode.fn_allow_update || drFlowNode.fn_allow_update.value == 0) {
                                btn.style.display = "none";
                            }
                        }
                        else if (vf.toolbar.bars[i].key.equals("delete")) {
                            if (!drFlowNode.fn_allow_delete || drFlowNode.fn_allow_delete.value == 0) {
                                btn.style.display = "none";
                            }
                        }
                        else if (vf.toolbar.bars[i].key.equals("addnew")) {
                            if (!drFlowNode.fn_allow_addnew || drFlowNode.fn_allow_addnew.value == 0) {
                                btn.style.display = "none";
                            }
                        }
                    }
                }
            }
        }
    }
    // ----------------------------------------------------
    if (status.equals("addnew")) {
        vf.afterAddnew();
    }
    vf.afterMove();

    if (vf.toolbar.Bars["addnew"] && vf.toolbar.Bars["copy"]) vf.toolbar.Bars["copy"].dom.style.display = vf.toolbar.Bars["addnew"].dom.style.display;
    vf.afterSetStatus();
};
vf.getStatus = function () {
    var astatus = 0;
    if (this.dtbBase.rowCount == 1) {
        astatus = this.dtbBase.rows[0]["astatus"].value;
    }
    return astatus;
};

vf.toolbarClick = function (para) {
    if (para.group.equals("move")) {
        if (para.key.equals("first")) {
            vf.move(0);
        }
        else if (para.key.equals("previous")) {
            vf.move(1);
        }
        else if (para.key.equals("next")) {
            vf.move(2);
        }
        else if (para.key.equals("last")) {
            vf.move(3);
        }
    }
    else if (para.group.equals("command")) {
        if (para.key.equals("save")) {
            vf.save();
        }
        else if (para.key.equals("addnew")) {
            vf.addnew();
        }
        else if (para.key.equals("copy")) {
            vf.copy();
        }
        else if (para.key.equals("delete")) {
            vf.del();
        }
        else if (para.key.equals("cancel")) {
            vf.cancel();
        }
        else if (para.key.equals("close")) {
            vf.close();
        }
    }
    else if (para.group.equals("flow")) {
        vf.flowClick(para);
    }
    else if (para.group.equals("extra")) {
        vf.buttonClick(para);
    }
    else {
        alert(" debug here");
    }
};
vf.buttonClick = function (para) {
    var prop = {
        button: para.dom,
        buttonKey: para.key
    };
    if (!vf.beforeClick(prop)) return;

    var dataForm = vf.getFormValues();
    if (g.a.send("processType=com.xznext.View&actionType=vfClick&viewKey=" + vf.viewKey + "&primaryKey=" + vf.primaryKey + "&flowKey=" + vf.flowKey + "&buttonKey=" + encodeURIComponent(prop.buttonKey), dataForm, true)) {
        if (g.a.OK) {
            if (vf.afterClick) {
                vf.afterClick(prop);
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};
vf.flowClick = function (para) {
    var drRow = para.drFB;
    var propFlow = {
        button: para.dom,
        fbKey: para.drFB["fb_key"].value,
        drFlowButton: para.drFB
    };
    if (win.arrChildren.length > 0) {
        for (var i = 0; i < win.arrChildren.length; i++) {
            if (win.arrChildren[i].hidden) {
                win.arrChildren[i].close();
            }
            else {
                showWarn("子窗口尚未关闭，不能执行当前操作。");
                return false;
            }
        }
    }

    if (!showConfirm("确定要执行 [" + drRow["fb_name"].value + "] 操作吗？")) return false;
    if (!vf.beforeFlowClick(propFlow)) return false;

    if (vf.checkNeedSave(true, false)) return;

    var dataForm = vf.getFormValues();
    var flowPara = "&flowKey=" + vf.flowKey + "&fbKey=" + propFlow.fbKey;
    if (g.a.send("processType=com.xznext.View&actionType=vfFlowClick&viewKey=" + vf.viewKey + "&primaryKey=" + vf.primaryKey + flowPara, dataForm, true)) {
        if (g.a.OK) {
            try {
                vf.afterFlowClick(propFlow);
            } catch (e) {

            }
            vf.flashTitle("流程操作成功。");
            showMsg("当前操作成功。");
            if (vf.gridView) {
                vf.gridView.remove();
            }
            else {
                vf.close();
            }
        }
        return true;
    }
    else {
        return false;
    }
};
vf.anchor = function () {
    var prop = {
    };
    var para = {
        flowKey: vf.flowKey,
        flowDataGroupId: vf.dtbBase.rows[0]["flow_data_group_id"].value
    };
    win.p.topWin.openFlowData(prop, para);
};

//-- 辅助功能，处理控件的宽度/提示 --------------------------------------------------
vf.css = function (tbContainer) {
    cssFormat(tbContainer);
}
vf.flashTitle = function (strMessage) {
    if (win.p.noTitle) {
        //vf.buttons["status"].innerHTML = strMessage;
    }
    else {
        win.flashTitle(strMessage);
    }
};
vf.setBarVisible = function (key, visible) {
    vf.toolbar.setBarVisible(key, visible);
};

//-- 控件事件(需要程序员重载的方法) -------------------------------------------------
vf.beforeMove = function () { return true; };
vf.beforeAddnew = function () { return true; };
vf.beforeCopy = function () { return true; };
vf.beforeDelete = function () { return true };
vf.beforeSave = function () { return true; };
vf.beforeClick = function (prop) { return true; };
vf.beforeFlowClick = function (prop) { return true; };

vf.afterLoad = function () { };
vf.afterMove = function () { };
vf.afterAddnew = function () { };
vf.afterCopy = function () { };
vf.afterDelete = function () { };
vf.afterSave = function () { };
vf.afterClick = function (prop) {
    if (g.a.OK) {
        alert("当前操作成功。");
    }
    return true;
};
vf.afterFlowClick = function (prop) { };
vf.afterSetStatus = function () { };
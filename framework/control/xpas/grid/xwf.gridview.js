/*
 * xwf.grid JavaScript Library v1.0
 * Author: Volant Lee
 * Create Date: 2013-01-06
 * Modify Date: 2019-08-19
 * Copyright 2013-2019, xpas-next.com
 * Description: 网格视图控件，在网格控件基础上集成了视图功能
 */
var css_xwf_gridview = true;
// -- 类定义 ------------------------------------------------------------------
window.xwf_gridview = function (prop) {
    ///<summary>GridView，对Grid进行扩展，集成了视图数据</summary>
    if (prop == null) return;
    for (var key in prop) {
        this[key] = prop[key];
    }
    // -- 重新初始化类成员变量，避免类实例间共享 ----------
    this.prefix += this.instanceIndex.index++ + "_";
    this.arrColumns = new Array();

    // -- 初始化类 ----------------------------------------
    if (window.beforeInit) {
        var prop1 = window.beforeInit();
        for (var key in prop1) {
            this[key] = prop1[key];
        }
    }
    this.init();
}
window.xwf_gridview.prototype = {
    prefix: "xwf_gridview_", // -- 控件统一前缀名称，用于控件id命名 --
    cssPrefix: "xwf_gridview_", // -- 控件css前缀命名 --
    instanceIndex: { index: 0 }, // -- 类实例下标 --
    doc: document, // -- 类控件document --
    divContainer: null, // -- 控件容器 --

    toolbar: null, // -- @1:顶部工具条控件(类实例) --    
    toolbarVisible: false, // -- 顶部工具栏是否可见 -- 
    jsonToolbar: null, // -- 顶部工具栏初始化参数 --   
    divToolbar: null, // -- 顶部工具栏容器区域 --
    toolbarClick: null, // -- 工具栏按钮click事件回调函数 --

    tree: null, // -- @2:导航树控件(类实例) --
    treeVisible: false, // -- 导航树是否可见 --
    divTree: null, // -- 导航树区域 --        
    dtbFlowNode: null, // -- 流程节点记录集 --

    grid: null, // -- @3:网格控件(类实例) --
    tdGrid: null, // -- 网格区域 --
    divGrid: null, // -- 网格控件容器区域 --

    divStatusBar: null, // -- @5:底部工具栏(组件容器) --
    statusBarVisible: true, // -- 底部状态栏是否可见 --    
    txtPageNum: null, // -- 当前页控件 --    
    tdPageSummary: null, // -- 页摘要控件 --
    scroll: null, // -- @6:滚动条控件(类实例) --
    treeSqlFilter: "", //树筛选sql，and 开头
    flowKey: "", // -- 流程KEY --
    flowTextMenu: "", // -- 流程标题(当前菜单的流程标题) --
    viewKey: "", // -- 视图ViewKey --
    viewForm: "", // -- 视图编辑窗口url --
    viewForm2: "", // -- 视图编辑窗口url(个性化url，例如不同的流程节点对应不同的编辑窗口) --
    viewFormTarget: "", // -- 视图后台实力类 --
    tableKey: "", // -- 视图基础表tableKey --
    viewFilter: "", // -- 视图过滤条件(程序员通过代码设定) --
    userFilter: "", // -- 用户查询条件(用户通过筛选界面操作设定) --
    onceFilter: "", // -- 首次查询条件(仅第一次打开有效) --
    navFilter: null, // -- 导航树替换条件(程序员通过代码设定) --
    treeFilter: "", // -- 导航树查询条件(SQL格式, 用户通过选中导航树节点操作) --
    jsonFKey: {}, // -- 导航树查询条件(JSON格式) --
    sqlUVData: "", // -- 后台生成的实际视图数据SQL语句 --
    sqlQuickSort: "", // -- 排序SQL(用户通过鼠标点击标题栏排序) --

    viewMode: "", // -- 视图模式(空：普通视图；singleSelect：单选择视图；multiSelect：多选视图) --
    selectCallback: null, // -- 选择视图模式回调函数 --
    callbackPara: null, // -- 调用选择视图时传入的对象 --
    funCols: 0, // -- 功能列列数 --
    fixedCols: 0, // -- 固定列列数 --
    floatCols: 0, // -- 浮动列列数 --

    totalRows: 0, // -- 总记录条数 --
    currentRows: 0, // -- 当前页总记录条数 --
    recordRow: -1, // -- 当前选中行行号(记录集下标，非网格下标) --
    indexFrom: 0, // -- 当前起始记录下标(在记录集中的下标) --
    totalPages: 0, // -- 总页数 --
    pageMaxRows: 100, // -- 每页允许最大行数 --
    currentPage: 1, // -- 当前页页号 --    

    system_name: "", // -- 子系统名称(客户端路径) --
    winForm: null, // -- 视图窗口 --
    vf: null, // -- 视图窗口UViewForm.js对象 --    
    dtbView: null, // -- 视图记录集 --
    dtbViewField: null, // -- 视图字段记录集 --
    dtbViewData: null, // -- 视图数据记录集 --
    dtbTree: null, // -- 视图导航树记录集 --
    dtbExtra: null, // -- 视图功能扩展记录集 --
    arrColumns: new Array(), // -- 列字段集合 --
    arrEditColumns: {}, // -- 允许编辑的列集合定义 --

    vfAllowAddnew: undefined, // -- 允许添加(以传入参数为准, 无传入参数时, 以视图设计为准) --
    vfAllowModify: undefined, // -- 允许修改 --
    vfAllowDelete: undefined, // -- 允许删除 --
    vfAllowCopy: undefined, // -- 允许拷贝 --
    vfAllowMove: undefined, // -- 允许移动 --

    extColumns: {}, // -- 扩展列集合, 示例: {confirm: {invisible: true}}, 即扩展的confirm功能列不可见, 默认可见 --
    fnViewName: "", // -- 编辑列名称 --
    showEditColumn: true, // -- 显示编辑列 --
    showDeleteColumn: true, // -- 显示删除列 --
    autoSelectFirstRow: false, // -- 默认选中第一条记录 --
    allowModify: true, // -- 允许单元格编辑 --
    allowDelete: true, // -- 允许网格删除 --
    allowSort: true, // -- 允许点击标题栏排序 --
    allowFilter: true, // -- 允许点击标题栏快速筛选 --
    allowConfig: false, // -- 允许配置 --
    beforeAddnew: null, // -- 添加之前处理程序 --

    commandClick: null, // -- 功能列click回调函数(包括勾选/全选，实际情况是目前只实现了勾选/全选的回调) --
    rowFill: null, // -- 行数据填充回调事件 --
    rowClick: null, // -- 行单击事件回调函数 --
    cellClick: null, // -- 单元格click事件回调函数 --
    cellFocus: null, // -- 单元格焦点事件回调函数 --
    cellBlur: null, // -- 单元格离开事件回调函数 --
    cellChange: null, // -- 单元格change事件(单元格允许编辑时，用户输入引起的改变) --

    beforeDelete: null, // -- 行删除beforeDelete事件回调函数 --
    afterDelete: null, // -- 行删除afterDelete事件回调函数 --

    // ----------------------------------------------------
    summary: function () {
        var strSummary = "xwf 控件类库，网格视图控件类。";
        return strSummary;
    }
};

// -- 初始化数据视图控件 ------------------------------------------------------
window.xwf_gridview.prototype.init = function () {
    ///<summary>初始化视图</summary>
    this.allowConfig = (g.debug || g.local || topWin.isDeveloper);
    if (this.pageMaxRows <= 0 || this.pageMaxRows > 10000) this.pageMaxRows = 1000;

    this.loadData({ getViewSchema: 1, recordBegin: 0, recordEnd: this.pageMaxRows });
    if (window.afterViewLoad) {
        window.afterViewLoad({ gridView: this });
    }
};
window.xwf_gridview.prototype.initControl = function () {
    if (this.vfAllowAddnew == undefined) {
        this.vfAllowAddnew = (this.dtbView.rows[0]["view_allow_addnew"].value == 1 ? true : false);
    }
    if (this.vfAllowAddnew) {
        //this.toolbarVisible = true;
    }

    this.system_name = this.dtbView.rows[0]["system_name"].value;
    this.viewFormTarget = this.dtbView.rows[0]["view_form_target"].value;
    this.tableKey = this.dtbView.rows[0]["table_key"].value;
    this.fixedCols = this.dtbView.rows[0]["view_fixed_columns"].value;
    this.floatCols = this.floatCols || this.dtbView.rows[0]["view_float_columns"].value;
    if (this.dtbViewData.columnCount - this.fixedCols < this.floatCols) this.floatCols = this.dtbViewData.columnCount - this.fixedCols;
    if (!this.system_name.equals("")) { // -- 动态加载扩展 view.[view_key].js --
        g.a.attachJavaScriptFile(g.appPath + "project/" + this.system_name + "/js/view." + this.viewKey + ".js");
        if (window.beforeViewLoad) {
            window.beforeViewLoad({ gridView: this });
        }
    }
    // ----------------------------------------------------
    var html = "<div id='" + this.prefix + "divToolbar'></div>";
    html += "<table id='" + this.prefix + "tbMain' class='" + this.cssPrefix + "tbMain'><tr>"
    if (this.dtbTree || this.dtbFlowNode) {
        html += "<td id='" + this.prefix + "tdTree' class='" + this.cssPrefix + "tdMain'><div id='" + this.prefix + "divTree' class='" + this.cssPrefix + "divTree'></div></td>"
    }
    html += "<td id='" + this.prefix + "tdGrid' class='" + this.cssPrefix + "tdMain'>";
    html += "<div id='" + this.prefix + "divGrid' class='" + this.cssPrefix + "divGrid'></div>"
    html += "<div id='" + this.prefix + "divStatusBar' class='" + this.cssPrefix + "divStatusBar'></div>";
    html += "</td></tr></table>";
    this.divContainer.innerHTML = html;

    this.divToolbar = gId(this.prefix + "divToolbar");
    this.tbMain = gId(this.prefix + "tbMain");
    this.tdTree = gId(this.prefix + "tdTree");
    this.tdGrid = gId(this.prefix + "tdGrid");
    this.divTree = gId(this.prefix + "divTree");
    this.divGrid = gId(this.prefix + "divGrid");
    this.divStatusBar = gId(this.prefix + "divStatusBar");

    if (this.dtbTree && this.dtbTree.rowCount > 0) {
        this.treeFilter = this.dtbTree.rows[0]["tree_root_where"].value;
    }
    // ----------------------------------------------------
    this.initToolBar();
    this.initStatusBar();
    this.resize();
    this.initTree(); // -- 初始化导航树/流程树 --                
    this.initGrid(); // -- 初始化 Grid 控件 --
    this.initScroll(); // -- 初始化滚动条 --
    this.grid.scroll = this.scroll;
};
window.xwf_gridview.prototype.initGrid = function () {
    var _this = this;
    var index = 0;
    //-- 1.1、功能列 --------------------------------------
    this.arrColumns[index++] = { type: "sn", text: "序", align: "center", width: 30, gridControl: "" }; // -- 序号列 --
    if (this.dtbView.rows[0]["view_fn_select"].value > 0 || this.viewMode.equals("multiSelect")) { // -- 选择列 --
        this.arrColumns[index++] = { type: "select", text: "<input type='checkbox' id='" + this.prefix + "selectAll' />", width: 30, align: "center", gridControl: "" };
    }
    if (this.showEditColumn && this.dtbView.rows[0]["view_fn_view"].value == 1) { // -- 查看列 --
        var strText = this.fnViewName || this.dtbView.rows[0]["view_fn_view_name"].value || "编辑";
        this.arrColumns[index++] = { type: "view", text: strText, width: 50, align: "center", gridControl: "" };
    }
    if (this.showDeleteColumn && this.dtbView.rows[0]["view_fn_delete"].value == 1) { // -- 删除列 --
        if (this.allowDelete) {
            this.arrColumns[index++] = { type: "delete", text: "删除", width: 50, align: "center", gridControl: "" };
        }
    }
    if (this.viewMode.equals("singleSelect")) { // -- 选择列(选择视图模式) --
        this.arrColumns[index++] = { type: "singleSelect", text: "选择", width: 50, align: "center", gridControl: "" };
    }
    //-- 1.2、扩展功能列 ----------------------------------
    var arrExtra = this.dtbExtra.filter([
        ["view_extra_type", "2"]
    ]);
    for (var i = 0; i < arrExtra.length; i++) {
        var key = arrExtra[i]["view_extra_key"].value;
        var text = arrExtra[i]["view_extra_text"].value;
        var width = (arrExtra[i]["view_extra_width"].value > 0 ? arrExtra[i]["view_extra_width"].value : 25 * text.length);
        if (this.extColumns[key] && this.extColumns[key].invisible) continue;
        this.arrColumns[index++] = { type: "command", key: key, text: text, width: width, align: "center", gridControl: "" };
    }

    this.funCols = this.arrColumns.length;
    this.fixedCols += this.arrColumns.length;
    //-- 2、数据列（固定列和浮动列）-----------------------
    for (var i = 0; i < this.dtbViewData.columnCount & i < (this.fixedCols + this.floatCols); i++) {
        var fieldName = this.dtbViewData.columns[i].name;
        var nFind = this.dtbViewField.find([fieldName]);
        if (nFind >= 0) {
            this.arrColumns[index] = {
                type: "data",
                //index: index - 1,
                colIndex: index - this.funCols, // -- 列在dtbViewData中的列下标 --
                fixedCol: this.fixedCols - this.funCols > i, // -- 是否固定列字段 --
                fieldName: fieldName,
                viewKey: this.viewKey,
                text: this.dtbViewField.rows[nFind]["field_text"].value,
                width: this.dtbViewField.rows[nFind]["field_pixel_width"].value,
                align: this.dtbViewField.rows[nFind]["field_align"].value,
                gridControl: (this.allowModify ? this.dtbViewField.rows[nFind]["field_grid_control"].value : ""),
                fieldQuerySource: this.dtbViewField.rows[nFind]["field_query_source"].value,
                editable: this.dtbViewField.rows[nFind]["field_editable"].value,
                fieldType: this.dtbViewField.rows[nFind]["field_type"].value,
                gridFormat: this.dtbViewField.rows[nFind]["field_grid_format"].value,
                css: this.dtbViewField.rows[nFind]["field_css"].value,
                dataSource: null
            };
            // -- 设定默认值 ----------
            if (this.arrColumns[index].fieldType.equals("datetime")) {
                if (this.arrColumns[index].gridFormat.equals("")) this.arrColumns[index].gridFormat = "yyyy-MM-dd";
                if (this.arrColumns[index].align.equals("")) this.arrColumns[index].align = "center";
            }
            if (this.arrColumns[index].fieldType.equals("number")) {
                if (this.arrColumns[index].align.equals("")) this.arrColumns[index].align = "right";
            }
            // -- 编辑模式控件类型 ----
            if (this.arrEditColumns[fieldName]) {
                this.arrColumns[index] = g.x.extendJSON(this.arrColumns[index], this.arrEditColumns[fieldName]);
            }
            index++;
        } else if (fieldName.equals("orn")) {
            // -- ORACLE特殊字段 
            this.arrColumns[index++] = {
                type: "data",
                index: index - 1,
                fixedCol: false,
                fieldName: "ORN",
                viewKey: this.viewKey,
                text: "ORN",
                width: 100,
                align: "right",
                gridControl: "",
                fieldType: "int"
            };
        } else {
            alert("视图字段 [" + fieldName + "] 未找到, 请检查.");
            this.arrColumns[index++] = { text: fieldName, width: 100 };
        }
    }
    //-- 3、初始化网格控件 --------------------------------
    var jsonProp = {
        prefix: this.divContainer.id + "_",
        divContainer: this.divGrid,
        gridview: this,
        funCols: this.funCols,
        fixedCols: this.fixedCols,
        floatCols: this.floatCols,
        pageMaxRows: this.pageMaxRows,
        currentRows: this.dtbViewData.rowCount,
        onRowClick: this.onRowClick(this),
        toolbarAddClick: function () { _this.addnew(_this) },
        toolbarConfigClick: function () { _this.config(_this) },
        onSNClick: this.onSNClick(_this),
        onCellFocus: this.onCellFocus,
        onCellBlur: this.onCellBlur,
        onCellClick: this.onCellClick,
        allowModify: this.allowModify,
        allowSort: this.allowSort,
        allowFilter: this.allowFilter
    };
    this.grid = new window.xwf_grid(jsonProp, this.arrColumns);

    if (this.dtbView.rows[0]["view_fn_select"].value > 0 || this.viewMode.equals("multiSelect")) { //-- 选择列 --
        var checkbox = gId(this.prefix + "selectAll");
        checkbox.onclick = function () { _this.onSelectAll(_this, this) };
        this.checkboxAll = checkbox;
    }
};
window.xwf_gridview.prototype.resize = function () {
    var treeWidth = 0,
        treeHeight = 0,
        gridWidth = 0,
        gridHeight = 0;
    // ----------------------------------------------------
    treeHeight = this.divContainer.clientHeight;
    gridHeight = this.divContainer.clientHeight;
    gridWidth = this.divContainer.clientWidth;

    if (this.toolbarVisible) {
        treeHeight -= this.divToolbar.offsetHeight;
        gridHeight -= this.divToolbar.offsetHeight;
    }
    if (this.statusBarVisible) gridHeight -= this.divStatusBar.offsetHeight;

    if (this.treeVisible) {
        treeWidth = this.dtbView.rows[0]["view_tree_width"].value;
        treeWidth = (treeWidth < 1 ? treeWidth * this.divContainer.clientWidth : treeWidth);
        this.tdTree.style.width = treeWidth + "px";
        this.divTree.style.width = (treeWidth - 0) + "px";
        this.divTree.style.height = (treeHeight - 2) + "px";

        gridWidth -= treeWidth;
    }

    this.tbMain.style.width = (treeWidth + gridWidth) + "px";
    this.tdGrid.style.width = gridWidth + "px";
    this.divGrid.style.width = gridWidth + "px";
    this.divGrid.style.height = gridHeight + "px";
};

// -- 加载数据 ----------------------------------------------------------------
window.xwf_gridview.prototype.loadData = function (jsonPara) {
    ///<summary>加载(重新加载)视图数据</summary>
    if (this.winForm && !this.winForm.closed) this.winForm.close();

    var jsonPostData = {
        flowKey: this.flowKey,
        viewKey: this.viewKey,
        getViewSchema: jsonPara.getViewSchema, // -- 是否读取视图结构 --
        recordBegin: jsonPara.recordBegin, // -- 记录起始下标 --
        recordEnd: jsonPara.recordEnd, // -- 记录结束下标 --

        viewFilter: this.viewFilter, // -- 程序员筛选条件 --
        treeFilter: this.treeFilter, // -- 导航树筛选条件 --
        userFilter: this.userFilter, // -- 用户筛选条件 --
        onceFilter: this.onceFilter, // -- 首次筛选条件 --
        sqlQuickSort: this.sqlQuickSort // -- 快速排序sql --
    };
    this.onceFilter = "";
    //-- 1、ajax读取视图信息及数据 ------------------------
    if (this.pageMaxRows == 0) {
        jsonPostData.recordBegin = 0;
        jsonPostData.recordEnd = 0;
    }
    if (jsonPostData.recordBegin == 0) this.currentPage = 1;

    if (g.a.send("processType=com.xznext.View&actionType=getView&formTarget=" + this.viewFormTarget, jsonPostData, true)) {
        var c = g.a.cReturn;
        if (g.a.OK) {
            //-- 1.1 取视图数据 -------
            this.totalRows = parseInt(c.totalRows);
            var mode = this.totalRows % this.pageMaxRows;
            this.totalPages = (this.totalRows - mode) / this.pageMaxRows + (mode == 0 ? 0 : 1);
            this.dtbViewData = c.dtbViewData;
            this.sqlUVData = c.sqlUVData;

            if (this.pageMaxRows == 0) {
                this.currentRows = this.totalRows;
                if (this.grid) {
                    this.grid.currentRows = this.currentRows;
                }
            }
            //-- 1.2 取视图结构 -------
            if (jsonPara.getViewSchema) {
                this.dtbView = c.dtbView;
                this.dtbExtra = c.dtbExtra;
                this.dtbViewField = c.dtbViewField;
                this.dtbViewField.sort("field_name");

                this.dtbTree = c.dtbTree;
                this.dtbFlowNode = c.dtbFlowNode;
                if (this.dtbFlowNode) {
                    var dataRow = null,
                        groupKeys = "",
                        userKeys = "";
                    for (var i = 0; i < this.dtbFlowNode.rowCount; i++) {
                        dataRow = this.dtbFlowNode.rows[i];

                        groupKeys = dataRow["group_keys"].value.replace("\n", ",") || dataRow["fn_groups"].value;
                        if (groupKeys.equals("") && dataRow["user_keys"].value.equals("") && dataRow["fn_users"].value.equals("")) {
                            groupKeys = "everyone";
                        }
                        groupKeys = "developers," + groupKeys;
                        this.dtbFlowNode.rows[i]["group_keys"].value = groupKeys;

                        userKeys = dataRow["user_keys"].value.replace("\n", ",") || dataRow["fn_users"].value;
                        this.dtbFlowNode.rows[i]["user_keys"].value = userKeys;
                    }
                }
                if (this.dtbTree || this.dtbFlowNode) {
                    this.treeVisible = true;
                }

                this.initControl();
            }
            //-- 1.3 ------------------
            this.indexFrom = 0;
            this.grid.currentRows = c.dtbViewData.rowCount;
            try {
                if (window.afterLoadData) afterLoadData();
            } catch (e) {

            }
        } else {
            return false;
        }
    } else {
        return false;
    }
    //-- 2、填充网格数据 ----------------------------------
    if (this.checkboxAll) this.checkboxAll.checked = false;
    this.recordRow = -1;
    this.indexFrom = 0;
    this.fillData();
    // ----------------------------------------------------
    this.scroll.setMultipleV(this.grid.currentRows / this.grid.screenRows);
    this.scroll.setMultipleH(this.grid.floatDataWidth / this.grid.floatWidth);
    this.scroll.setScrollTop(0);

    this.setPage();
    // ----------------------------------------------------
    return true;
};
window.xwf_gridview.prototype.fillData = function () {
    var recordRow = 0;
    var colCount = this.fixedCols + this.floatCols;
    var jsonColumn = null,
        ctlId = "",
        css = "";
    var jsonReturn = null,
        jsonRtCol = null;
    var drRow = null;
    // -- 1、填充数据 -------------------------------------
    for (var iRow = 0; iRow < this.grid.screenRows; iRow++) {
        recordRow = this.indexFrom + iRow;
        if (recordRow < this.dtbViewData.rowCount) {
            drRow = this.dtbViewData.rows[recordRow];
            if (this.rowFill) {
                jsonReturn = this.rowFill({ recordRow: recordRow, drRow: drRow });
            }
        }
        // ------------------------------------------------
        for (var iCol = 0; iCol < colCount; iCol++) {
            var dataValue = "";
            if (recordRow < this.dtbViewData.rowCount) {
                jsonColumn = this.arrColumns[iCol];
                if (iCol < this.funCols) { //-- 功能列 --                    
                    ctlId = this.prefix + "command_" + iRow + "_" + iCol;
                    if (jsonColumn.type.equals("sn")) {
                        dataValue = (recordRow + 1);
                    } else if (jsonColumn.type.equals("select")) {
                        dataValue = "<input type='checkbox' id='" + ctlId + "' " + (drRow.checked ? "checked='checked'" : "") + " />";
                    } else if (jsonColumn.type.equals("command")) {
                        if (jsonReturn && jsonReturn.command && jsonReturn.command[jsonColumn["key"]]) {
                            jsonRtCol = jsonReturn.command[jsonColumn["key"]];
                            if (jsonRtCol.dataValue != undefined) {
                                dataValue = jsonRtCol.dataValue;
                            } else if (jsonRtCol.text != undefined) {
                                dataValue = "<span class='" + this.grid.cssPrefix + "spanFN' id='" + ctlId + "' />" + jsonRtCol.text + "</span>"
                            } else {
                                dataValue = "<span class='" + this.grid.cssPrefix + "spanFN' id='" + ctlId + "' />" + jsonColumn.text + "</span>";
                            }
                        } else {
                            dataValue = "<span class='" + this.grid.cssPrefix + "spanFN' id='" + ctlId + "' />" + jsonColumn.text + "</span>";
                        }
                    } else {
                        dataValue = "<span class='" + this.grid.cssPrefix + "spanFN' id='" + ctlId + "' />" + jsonColumn.text + "</span>";
                    }
                } else { // -- 数据列 --
                    if (jsonColumn.fieldName.equals("ORN")) continue;
                    dataValue = drRow[iCol - this.funCols].value;
                    if (dataValue.equals("")) { } else if (jsonColumn.fieldType.equals("datetime") && !jsonColumn.gridFormat.equals("")) {
                        dataValue = dataValue.substring(0, jsonColumn.gridFormat.length);
                    } else if (jsonColumn.fieldType.equals("number") && !jsonColumn.gridFormat.equals("")) {
                        dataValue = g.x.numberFormat(dataValue, jsonColumn.gridFormat);
                    } else { }
                    // -- 程序员指定样式 --
                    if (drRow[iCol - this.funCols].className) {
                        dataValue = "<uspan class='" + drRow[iCol - this.funCols].className + "'>" + dataValue + "</uspan>";
                    }
                }
            }
            this.grid.setData(iRow, iCol, dataValue);
        }
    }

    this.grid.showData();
    // -- 2、后期绑定函数 ---------------------------------
    if (this.checkboxAll) this.checkboxAll.arrChildren = new Array();
    for (var iRow = 0; iRow < this.grid.screenRows; iRow++) {
        recordRow = this.indexFrom + iRow;
        if (recordRow < this.dtbViewData.rowCount) {
            for (var iCol = 0; iCol < this.funCols; iCol++) {
                var jsonColumn = this.arrColumns[iCol];
                if (jsonColumn.type.equals("sn")) continue;

                var ctlId = this.prefix + "command_" + iRow + "_" + iCol;
                var ctl = gId(ctlId);

                if (ctl == null) continue; // -- commandFill 事件回调或称修改过 command 功能列 --
                ctl.onclick = this.extraColumnClick(this, iRow, iCol, ctl);
                if (jsonColumn.type.equals("select")) {
                    this.checkboxAll.arrChildren.push(ctl);
                }
            }
        }
    }
    // -- 3、一级通用视图时，默认选中第一条记录 -----------
    if (this.recordRow < 0) {
        if (this.autoSelectFirstRow && this.dtbViewData.rowCount > 0) {
            this.recordRow == 0;
        }
    }
    if (this.recordRow >= 0) {
        this.selectRow(this.recordRow);
    }
};

window.xwf_gridview.prototype.refresh = function () {
    this.userFilter = "";
    this.loadData({ recordBegin: 0, recordEnd: this.pageMaxRows });
};
window.xwf_gridview.prototype.setViewFilter = function (viewFilter) {
    ///<summary>程序员或导航筛选条件</summary>
    ///<param name="viewFilter">筛选条件，格式样例：field1 = 'A' AND field2 = 10 AND ... </param>
    this.viewFilter = viewFilter;
    this.loadData({ recordBegin: 0, recordEnd: this.pageMaxRows });
};
window.xwf_gridview.prototype.setUserFilter = function (userFilter) {
    ///<summary>用户筛选数据</summary>    
    ///<param name="userFilter">筛选条件，格式参考viewFilter </param>
    this.userFilter = userFilter;
    this.loadData({ recordBegin: 0, recordEnd: this.pageMaxRows });
};
window.xwf_gridview.prototype.quickQuery = function (jsonColumn, queryValue) {
    var quickFilter = "";
    var databaseType = this.dtbView.rows[0]["database_type"].value;
    var fieldType = jsonColumn.fieldType;
    var fieldName = jsonColumn.fieldName;
    // ----------------------------------------------------
    if (!queryValue.equals("")) {
        if (fieldType.equals("number")) {
            quickFilter = fieldName + " = " + queryValue;
        } else if (fieldType.equals("datetime")) {
            if (databaseType.equals("SQLServer")) {
                quickFilter = "CONVERT(varchar(" + queryValue.length + "), " + fieldName + ", 120) = '" + queryValue + "'";
            } else if (databaseType.equals("Oracle")) {
                var strFormat = "YYYY-MM-DD HH:MI:SS";
                strFormat = strFormat.substring(0, queryValue.length).replace("HH", "HH24");
                quickFilter = "TO_CHAR(" + fieldName + ",'" + strFormat + "') = '" + queryValue + "'";
            } else {
                alert("暂未实现" + databaseType + "日期类型的快速筛选。");
            }
        } else {
            quickFilter = fieldName + " LIKE '%" + queryValue + "%'";
        }
    }
    // ----------------------------------------------------
    this.userFilter = quickFilter;
    this.loadData({ recordBegin: 0, recordEnd: this.pageMaxRows });
};
window.xwf_gridview.prototype.quickSort = function (sqlSort) {
    this.sqlQuickSort = sqlSort;
    this.loadData({ recordBegin: 0, recordEnd: this.pageMaxRows });
};

// -- 顶部工具条 --------------------------------------------------------------
window.xwf_gridview.prototype.initToolBar = function () {
    if (this.jsonToolbar == null) {
        this.divToolbar.style.display = "none";
        return;
    }

    this.jsonToolbar.domContainer = this.divToolbar;
    this.toolbar = new window.xwf_toolbar(this.jsonToolbar);

    this.divToolbar.className = this.cssPrefix + "divToolbar";
    this.divToolbar.style.display = (this.toolbarVisible ? "" : "none");
};

// -- 导航树 ------------------------------------------------------------------
window.xwf_gridview.prototype.initTree = function (replaceFilter) {
    if (!this.treeVisible) return;

    var _this = this;
    var jsonPara = {
        divContainer: this.divTree,
        imgPath: "../../../../res/control/tree/" + top.cssStyle + "/",
        title: "数据导航",
        beforeExpand: this.onNodeFirstExpand(_this),
        nodeClick: this.onNodeClick(_this),
        replaceFilter: replaceFilter
    };
    this.tree = new window.xwf_tree(jsonPara);
    // -- 流程树 ------------------------------------------
    if (this.dtbFlowNode && this.dtbFlowNode.rowCount > 0) {
        this.tree.addNode({ key: "0" + this.tree.sd + "FLOW", text: this.flowTextMenu || this.dtbFlowNode.rows[0]["flow_name"].value, treeKey: this.dtbFlowNode.rows[0]["flow_key"].value, flowRootFilter: this.dtbFlowNode.rows[0]["flow_root_filter"].value, isFlowNode: true });
        for (var i = 0; i < this.dtbFlowNode.rowCount; i++) {
            var drRow = this.dtbFlowNode.rows[i];
            var nodeKey = "0" + this.tree.sd + "FLOW" + this.tree.sd + i;
            var fnGroups = drRow["group_keys"].value;
            var fnUsers = drRow["user_keys"].value;

            if (topWin.matchGroup(fnGroups) || topWin.matchUser(fnUsers)) {
                this.tree.addNode({ key: nodeKey, text: drRow["fn_name"].value, value: drRow["fn_key"].value, drFlowNode: drRow, isFlowNode: true });
            }
        }
    }
    // -- 导航树 ------------------------------------------
    if (this.dtbTree) {
        for (var i = 0; i < this.dtbTree.rowCount; i++) {
            var nodeKey = "0" + this.tree.sd + i;
            var nodeValue = this.dtbTree.rows[i]["tree_first_node_value"].value;
            var noteText = this.dtbTree.rows[i]["tree_name"].value;

            var treeKey = this.dtbTree.rows[i]["tree_key"].value;
            var rootFilter = this.dtbTree.rows[i]["tree_root_where"].value;
            var navType = this.dtbTree.rows[i]["vt_nav_type"].value;

            this.tree.addNode({ key: nodeKey, text: noteText, value: nodeValue, treeKey: treeKey, rootFilter: rootFilter, navType: navType });
            this.tree.addNode({ key: nodeKey + this.tree.sd + "loading", text: "loading..." });
        }
    }
    //-- 展开根节点及一级节点中需要自动展开的节点 ---------
    this.tree.expand("");
    if (this.tree.nodes[0].first) {
        this.tree.setNodeSelected(this.tree.nodes[0].first.key);
    }

    if (this.dtbFlowNode) {
        this.tree.expand("0" + this.tree.sd + "FLOW");
    }
    if (this.dtbTree) {
        for (var i = 0; i < this.dtbTree.rowCount; i++) {
            if (this.dtbTree.rows[i]["tree_auto_expand"].value == 1) {
                this.tree.expand("0" + this.tree.sd + i);
                if (this.tree.nodes["0" + this.tree.sd + i].children == 1) {
                    this.tree.expand(this.tree.nodes["0" + this.tree.sd + i].first.key);
                }
            }
        }
    }
};
window.xwf_gridview.prototype.onNodeFirstExpand = function (_this) {
    return function (node, firstExpand) {
        if (!firstExpand) return;
        if (node.key.equals("0")) return;
        if (!_this.tree.nodes[node.key + _this.tree.sd + "loading"]) return;
        _this.tree.removeNode(node.key + _this.tree.sd + "loading");

        var nodeRoot = node;
        var jsonPost = {};
        // ----------------------------------------------------
        while (nodeRoot.level > 1) {
            nodeRoot = nodeRoot.parent;
            jsonPost["NodeValue_" + nodeRoot.level] = nodeRoot.value;
        }
        jsonPost["NodeValue_" + node.level] = node.value;
        jsonPost["tree_key"] = nodeRoot.treeKey;
        jsonPost["tree_node_level"] = node.level;
        jsonPost["replaceFilter"] = this.replaceFilter;
        if (_this.navFilter && _this.navFilter[nodeRoot.treeKey]) {
            var json = _this.navFilter[nodeRoot.treeKey];
            if (json["level" + nodeRoot.level]) {
                jsonPost["replaceFilter"] = json["level" + nodeRoot.level];
            }
        }
        // ----------------------------------------------------
        if (g.a.send("processType=com.xznext.Tree&actionType=getNodeData", jsonPost, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                var dtbNodeData = cReturn.dtbNodeData;
                for (var i = 0; i < dtbNodeData.rowCount; i++) {
                    var jsonNode = { sub_nodes: 0, treeNodeField: cReturn.treeNodeField, singleCondition: cReturn.singleCondition, treeNodeFieldType: cReturn.treeNodeFieldType };
                    var jsonColumnValue = {};
                    for (var j = 0; j < dtbNodeData.columnCount; j++) {
                        var colName = dtbNodeData.columns[j].name;
                        if (colName.equals("node_value")) {
                            jsonNode["value"] = dtbNodeData.rows[i][colName].value;
                        } else if (colName.equals("node_text")) {
                            jsonNode["text"] = dtbNodeData.rows[i][colName].value;
                        } else if (colName.equals("node_title")) {
                            jsonNode["title"] = dtbNodeData.rows[i][colName].value;
                        } else if (colName.equals("sub_nodes")) {
                            jsonNode["sub_nodes"] = dtbNodeData.rows[i][colName].value;
                        }
                        jsonColumnValue[colName] = dtbNodeData.rows[i][colName].value;
                    }
                    jsonNode["key"] = node.key + _this.tree.sd + i;
                    jsonNode["Columns"] = jsonColumnValue;
                    jsonNode["navType"] = node.navType;
                    _this.tree.addNode(jsonNode);

                    if (jsonNode["sub_nodes"] != 0) {
                        _this.tree.addNode({ key: jsonNode["key"] + _this.tree.sd + "loading", text: "loading..." });
                    }
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
};
window.xwf_gridview.prototype.onNodeClick = function (_this) {
    return function (node) {
        var strFilter = "";
        var jsonFKey = {};
        // ------------------------------------------------
        _this.viewForm2 = "";
        // ------------------------------------------------
        if (node.navType && node.navType.equals("script")) {
            if (!node.treeFilter) {
                if (window.beforeTreeNodeClick) {
                    var nodeP = node;
                    while (nodeP.level > 1) {
                        nodeP = nodeP.parent;
                    }
                    window.beforeTreeNodeClick(nodeP.treeKey, node);
                }
            }
            strFilter = node.treeFilter;
        } else if (node.isFlowNode) {
            if (node.level == 1) { // -- 流程根节点 --
                strFilter = node.flowRootFilter;
            } else {
                var fnFilter = node.drFlowNode["fn_filter"].value;
                var fnUsers = node.drFlowNode["user_keys"].value;
                var fnGroups = node.drFlowNode["group_keys"].value;

                if (topWin.matchGroup(fnGroups) || topWin.matchUser(fnUsers)) {
                    strFilter = fnFilter;
                } else {
                    strFilter = "1 = 0";
                }
            }
        } else {
            if (node.level == 1) {
                strFilter = node.rootFilter;
            } else {
                if (node.treeNodeField == null || node.treeNodeField.equals("")) {
                    debug("未设定节点导航条件字段，不能导航。");
                    return;
                }
                var nodeP = node;
                while (nodeP.level >= 1) {
                    if (nodeP.level == 1) { // -- 根节点 --
                        if (!nodeP.rootFilter.equals("")) {
                            strFilter += " AND (" + nodeP.rootFilter + ")";
                        }
                        break;
                    } else {
                        if (nodeP.treeNodeField.length > 0) {
                            if (nodeP.treeNodeFieldType.equals("field")) { // -- 字段 --
                                if (strFilter.toUpperCase().indexOf(" AND (" + nodeP.treeNodeField.toUpperCase() + " = ") < 0) {
                                    strFilter += " AND (" + nodeP.treeNodeField + " = '" + nodeP.value + "')";
                                    jsonFKey[nodeP.treeNodeField] = nodeP.value;
                                }
                            } else { // -- sql --
                                var strSQL = nodeP.treeNodeField;
                                for (var key in nodeP.Columns) {
                                    strSQL = strSQL.replaceAll("%" + key + "%", nodeP.Columns[key]);
                                }
                                var nodeTemp = node;
                                while (nodeTemp.level > 1) {
                                    strSQL = strSQL.replaceAll("%" + (nodeTemp.level - 1) + "%", nodeTemp.value);
                                    nodeTemp = nodeTemp.parent;
                                }
                                strFilter += " AND (" + strSQL + ")";
                            }
                        }
                    }
                    if (nodeP.singleCondition == 1) break; // -- 条件到此为止，递归结束 --
                    nodeP = nodeP.parent;
                }
                strFilter = strFilter.substring(5);
            }
        }
        _this.jsonFKey = jsonFKey;
        // ------------------------------------------------
        _this.treeFilter = strFilter;
        _this.loadData({ recordBegin: 0, recordEnd: _this.pageMaxRows });

        // -- raise navigate event ------------------------
        if (window.afterTreeNodeClick) {
            var nodeP = node;
            while (nodeP.level > 1) {
                nodeP = nodeP.parent;
            }
            window.afterTreeNodeClick(nodeP.treeKey, node);
        }
    };
};

// -- 底部状态条(分页)、滚动条 ------------------------------------------------
window.xwf_gridview.prototype.initStatusBar = function () {
    var _this = this;
    // ----------------------------------------------------
    var tbStatusBar = this.doc.createElement("TABLE");
    this.divStatusBar.appendChild(tbStatusBar);
    tbStatusBar.className = this.cssPrefix + "tbStatusBar xwf_select_none";
    var trStatusBar = tbStatusBar.insertRow(0);

    var tdPageRefresh = trStatusBar.insertCell();
    tdPageRefresh.className = this.cssPrefix + "tdPageRefresh";
    tdPageRefresh.innerHTML = "<span class='fa fa-refresh'></span>";
    tdPageRefresh.onclick = this.onRefreshClick(_this);

    // ----------------------------------------------------
    var tdPageFirst = trStatusBar.insertCell();
    tdPageFirst.className = this.cssPrefix + "tdPageMove ";
    tdPageFirst.innerHTML = "<span class='fa fa-angle-double-left'></span>";
    tdPageFirst.onclick = this.onPageClick(_this, "first");
    var tdPagePrev = trStatusBar.insertCell();
    tdPagePrev.className = this.cssPrefix + "tdPageMove";
    tdPagePrev.innerHTML = "<span class='fa fa-angle-left'></span>";
    tdPagePrev.onclick = this.onPageClick(_this, "prev");

    var tdPageNum = trStatusBar.insertCell();
    tdPageNum.className = this.cssPrefix + "tdPageNum";
    this.txtPageNum = this.doc.createElement("INPUT");
    tdPageNum.appendChild(this.txtPageNum);
    this.txtPageNum.className = this.cssPrefix + "txtPageNum";
    this.txtPageNum.onkeypress = this.onPageNumKeypress(_this);

    var tdPageNext = trStatusBar.insertCell();
    tdPageNext.className = this.cssPrefix + "tdPageMove";
    tdPageNext.innerHTML = "<span class='fa fa-angle-right'></span>";
    tdPageNext.onclick = this.onPageClick(_this, "next");
    var tdPageLast = trStatusBar.insertCell();
    tdPageLast.className = this.cssPrefix + "tdPageMove";
    tdPageLast.innerHTML = "<span class='fa fa-angle-double-right'></span>";
    tdPageLast.onclick = this.onPageClick(_this, "last");

    // ----------------------------------------------------
    this.tdPageSummary = trStatusBar.insertCell();
    this.tdPageSummary.className = this.cssPrefix + "tdPageSummary";
};
window.xwf_gridview.prototype.setPage = function () {
    this.txtPageNum.value = this.currentPage;
    this.tdPageSummary.innerHTML = "共 " + this.totalPages + " 页 / " + this.totalRows + " 条";
};
window.xwf_gridview.prototype.onPageClick = function (_this, pageAction) {
    return function (evt) {
        var newPage = _this.currentPage;
        // ------------------------------------------------
        if (pageAction.equals("first")) {
            newPage = 1;
        } else if (pageAction.equals("prev")) {
            newPage--;
        } else if (pageAction.equals("next")) {
            newPage++;
        } else if (pageAction.equals("last")) {
            newPage = _this.totalPages;
        }
        // ------------------------------------------------
        _this.changePage(newPage);
    }
};
window.xwf_gridview.prototype.changePage = function (newPage) {
    if (newPage < 1 || newPage > this.totalPages || newPage == this.currentPage) return;

    this.currentPage = newPage;
    this.loadData({ recordBegin: (this.currentPage - 1) * this.pageMaxRows, recordEnd: this.currentPage * this.pageMaxRows });
};
window.xwf_gridview.prototype.onRefreshClick = function (_this) {
    return function (evt) {
        _this.refresh();
    }
};
window.xwf_gridview.prototype.onPageNumKeypress = function (_this) {
    return function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 13) {
            _this.changePage(_this.txtPageNum.value.toInt());
        }
    }
};

window.xwf_gridview.prototype.initScroll = function () {
    var _this = this;
    // -- 创建滚动条 --------------------------------------
    var json = {
        domContainer: this.grid.tdLayoutD2,
        onVScroll: this.onVerticalScroll(_this),
        onHScroll: this.onHorizontalScroll(this)
    };
    this.scroll = new window.xwf_scrollbar(json);
};
window.xwf_gridview.prototype.onVerticalScroll = function (_this) {
    return function (percent) {
        var nIndexFrom = 0;
        if (_this.winForm && !_this.winForm.closed) {
            _this.winForm.close();
        }

        nIndexFrom = parseInt(_this.grid.currentRows * percent);
        if (_this.indexFrom == nIndexFrom) return;
        _this.indexFrom = nIndexFrom;
        _this.fillData();
    }
};
window.xwf_gridview.prototype.onHorizontalScroll = function (_this) {
    return function (percent) {
        var scrollLeft = parseInt(_this.grid.divLayoutH2.scrollWidth * percent);

        if (_this.grid.divLayoutH2.scrollLeft != scrollLeft) {
            _this.grid.divLayoutH2.scrollLeft = scrollLeft;
            _this.grid.divLayoutD2.scrollLeft = scrollLeft;
        }
    }
};

// -- 功能列Click等 -----------------------------------------------------------
window.xwf_gridview.prototype.extraColumnClick = function (_this, iRow, iCol, ctl) {
    return function () {
        var jsonColumn = _this.arrColumns[iCol]; // -- 操作列 --

        _this.recordRow = _this.indexFrom + iRow; // -- 数据行在记录集中的下标 --
        if (!jsonColumn.type.equals("view") && _this.winForm && !_this.winForm.closed) {
            _this.winForm.flashTitle("数据窗口打开时，不能执行当前操作。");
            return;
        }
        _this.grid.selectRow(iRow);
        // ------------------------------------------------
        if (jsonColumn.type.equals("view")) {
            if (_this.winForm == null || _this.winForm.closed) {
                _this.showWinForm();
            }
            else {
                _this.showRecord();
            }
        }
        else if (jsonColumn.type.equals("delete")) {
            var nFind = 0;
            var columnName = "";

            var drRow = _this.dtbViewData.rows[_this.recordRow];
            //------ 明细删除前验证一下 表单状态
            if(!verifyFormStatus()){
            	return false;
            }
            
            var dataForm = { formTarget: _this.viewFormTarget, primaryKey: _this.getPrimaryKey() };
            // ------------------------
            for (var j = 0; j < _this.dtbViewData.columnCount; j++) {
                columnName = _this.dtbViewData.columns[j].name;
                nFind = _this.dtbViewField.find([columnName]);
                if (nFind < 0) {
                    showErr("未知错误, 请与开发人员联系.");
                    return;
                }
                if (_this.tableKey.equals(_this.dtbViewField.rows[nFind]["table_key"].value)) {
                    dataForm["_c" + columnName] = drRow[columnName].value;
                }
                else {
                    dataForm["_g" + columnName] = drRow[columnName].value;
                }
            }
            // ------------------------
            if (_this.beforeDelete || window.beforeDelete) {
                var prop = {
                    viewKey: _this.viewKey,
                    dtbViewData: _this.dtbViewData,
                    dataRow: _this.dtbViewData.rows[_this.recordRow],
                    recordRow: _this.recordRow,
                    gridRow: iRow,
                    drViewData: _this.dtbViewData.rows[_this.recordRow], // -- 本行及以下为兼容旧代码 --
                    iIndex: _this.recordRow,
                    iRow: iRow
                };
                if (_this.beforeDelete) {
                    if (!_this.beforeDelete(prop)) return false;
                }
                else if (window.beforeDelete) {
                    if (!beforeDelete(prop)) return false;
                }
            }
            if (!confirm("记录删除后不能恢复，您确定要删除吗？")) return false;
            if (g.a.send("processType=com.xznext.View&actionType=vfDelete&viewKey=" + _this.viewKey + "&flowKey=" + _this.flowKey + "&formTarget=" + _this.viewFormTarget, dataForm, true)) {
                if (g.a.OK) {
                    if (_this.afterDelete || window.afterDelete) {
                        var prop = {
                            viewKey: _this.viewKey,
                            dtbViewData: _this.dtbViewData,
                            dataRow: _this.dtbViewData.rows[_this.recordRow],
                            recordRow: _this.recordRow,
                            gridRow: iRow,
                            drViewData: _this.dtbViewData.rows[_this.recordRow], // -- 本行及以下为兼容旧代码 --
                            iIndex: _this.recordRow,
                            iRow: iRow
                        };
                        if (_this.afterDelete) {
                            _this.afterDelete(prop);
                        }
                        else if (window.afterDelete) {
                            afterDelete(prop);
                        }
                    }
                    _this.remove();
                    if (_this.afterRemove) {
                        _this.afterRemove();
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else if (jsonColumn.type.equals("singleSelect")) {
            if (_this.selectCallback) {
                if (_this.selectCallback(_this.dtbViewData.rows[_this.recordRow], _this.callbackPara)) {
                    win.close();
                }
            }
            else {
                showWarn("缺少选中回调函数()");
            }
        }
        else if (jsonColumn.type.equals("select")) {
            _this.dtbViewData.rows[_this.recordRow].checked = ctl.checked;
            if (_this.commandClick) {
                _this.commandClick(ctl, _this.recordRow); // -- checkbox控件，对应的数据行下标 --
            }
        }
        else {
            if (window.viewExtraButtonClick) {
                viewExtraButtonClick({
                    viewKey: _this.viewKey,
                    gridview: _this,
                    btnKey: jsonColumn.key,
                    dtbViewData: _this.dtbViewData,
                    drViewData: _this.dtbViewData.rows[_this.recordRow],
                    recordRow: _this.indexFrom + iRow, // -- 当前行在记录集中的下标(下标从0开始) --
                    gridRow: iRow, // -- 当前行在网格中的下标 --
                    gridCol: iCol, // -- 网格列下标 --
                    iIndex: _this.indexFrom + iRow, // -- 兼容旧代码, 新代码中使用 recordRow --
                    iRow: iRow // -- 兼容旧代码, 新代码中使用 gridRow --                           
                });
            }
        }
    }
};
window.xwf_gridview.prototype.onSelectAll = function (_this, ctlCheckbox) {
    var checked = ctlCheckbox.checked;
    for (var i = 0; i < _this.dtbViewData.rowCount; i++) {
        _this.dtbViewData.rows[i].checked = checked;
    }
    for (var i = 0; i < _this.checkboxAll.arrChildren.length; i++) {
        _this.checkboxAll.arrChildren[i].checked = checked;
    }
    if (_this.commandClick) {
        _this.commandClick(ctlCheckbox, -1);
    }
};
window.xwf_gridview.prototype.selectAll = function (blChecked) {
    var chkAll = gId(this.prefix + "selectAll");

    chkAll.checked = blChecked;
    for (var i = 0; i < this.checkboxAll.arrChildren.length; i++) {
        this.checkboxAll.arrChildren[i].checked = blChecked;
    }

    for (var i = 0; i < this.dtbViewData.rowCount; i++) {
        this.dtbViewData.rows[i].checked = blChecked;
    }
};
window.xwf_gridview.prototype.reInit = function (json) {
    var _json = {
        pageMaxRows: this.pageMaxRows
    };
    json = g.x.extendJSON(_json, json);

    this.pageMaxRows = json.pageMaxRows;
    this.grid.pageMaxRows = this.pageMaxRows;
    this.arrColumns = new Array();
    this.loadData({ getViewSchema: 1, recordBegin: 0, recordEnd: this.pageMaxRows });
};

// -- 网格属性 ----------------------------------------------------------------
window.xwf_gridview.prototype.setEditMode = function (jsonPara) {
    // -- 待删除代码 --
    ///<summary>设置自网格的列编辑模式，格式样例：{ columnName: "column1", gridControl: "textbox" }</summary>
    for (var i = 0; i < this.arrColumns.length; i++) {
        if (this.arrColumns[i].type.equals("data") && this.arrColumns[i].fieldName.equals(jsonPara.columnName)) {
            this.grid.arrColumns[i].gridControl = jsonPara.gridControl;

            if (jsonPara.gridControl.equals("dropgrid")) {
                this.grid.arrColumns[i].dataSource = jsonPara.dataSource;
                for (var iRow = 0; iRow < this.grid.screenRows; iRow++) {
                    txt = gId(this.grid.prefix + "txtDATA_" + iRow + "_" + i);
                    txt.title = txt.id;
                    var jsonProp = {
                        dtb: jsonPara.dataSource,
                        colCount: 3,
                        textField: jsonPara.dataSource.columns[2].name,
                        valueField: jsonPara.dataSource.columns[0].name,
                        searchField: jsonPara.dataSource.columns[0].name + ",enum_value,enum_text",
                        itemSelect: null
                    };
                    topWin.dropgrid.bindTextbox(txt, jsonProp);
                }
            }
            return;
        }
    }
    showErr("setEditMode:\n字段列【" + jsonPara.columnName + "】不存在, 请检查.");
};

// -- 网格方法(添加、修改、删除、赋值、选中) ----------------------------------
window.xwf_gridview.prototype.addRow = function (drViewOne) {
    this.dtbViewData.addRow(0);
    this.dtbViewData.rows[0] = drViewOne;

    this.totalRows++;
    this.currentRows++;
    this.pageMaxRows = Math.max(this.pageMaxRows, this.currentRows);

    this.grid.currentRows = this.currentRows;
    this.grid.pageMaxRows = this.pageMaxRows;
    this.indexFrom = 0;
    this.recordRow = 0;

    this.fillData();
    this.grid.selectRow(0);

    this.scroll.setMultipleV(this.grid.currentRows / this.grid.screenRows);
    this.scroll.setScrollTop(0);
    this.setPage();
};
window.xwf_gridview.prototype.update = function (drViewOne) {
    this.dtbViewData.rows[this.recordRow] = drViewOne;

    this.fillData(this.indexFrom);
    this.grid.selectRow(this.recordRow + this.indexFrom);
};
window.xwf_gridview.prototype.remove = function (drViewOne) {
    if (this.dtbViewData.rowCount == 0) return;
    this.dtbViewData.removeAt(this.recordRow);

    if (this.dtbViewData.rowCount > 0) {
        if (this.recordRow == this.dtbViewData.rowCount) {
            this.recordRow--;
        }
    } else {
        this.recordRow = -1;
    }

    this.totalRows--;
    this.grid.currentRows--;
    this.currentRows--;
    if (this.indexFrom > 0) {
        this.indexFrom--;
    }
    this.fillData();

    if (this.winForm && !this.winForm.closed) {
        this.showRecord();
    } else {
        this.selectRow(this.recordRow > 0 ? this.recordRow : 0);
    }

    this.scroll.setMultipleV(this.grid.currentRows / this.grid.screenRows);
    this.setPage();
};

window.xwf_gridview.prototype.setValue = function (recordRow, columnName, newValue) {
    ///<summary>网格单元格赋值，外部程序调用。</summary>
    ///<param name="recordRow">网格数据记录集(dtbViewData)中的行下标</param>
    ///<param name="columnName">字段名称</param>
    ///<param name="newValue">单元格新值</param>
    if (this.dtbViewData.columns[columnName].columnType.equals("number")) {
        if (!(typeof (newValue)).equals("number")) {
            newValue = new Number(newValue);
        }
    }

    var recordCol = this.dtbViewData.getColIndex(columnName);
    this.dtbViewData.rows[recordRow][recordCol].value = newValue;
    this.grid.setValue(recordRow - this.indexFrom, this.funCols + recordCol, newValue);
};
window.xwf_gridview.prototype.setCommand = function (recordRow, commandName, para) {
    var gridRow = recordRow - this.indexFrom;
    var gridCol = 0;
    var ctlId = "";
    var ctl = null;
    // ----------------------------------------------------
    for (var i = 0; i < this.arrColumns.length; i++) {
        if (this.arrColumns[i].type.equals("command") && this.arrColumns[i].key.equals(commandName)) {
            gridCol = i;
            break;
        }
    }
    ctlId = this.prefix + "command_" + gridRow + "_" + gridCol;
    ctl = gId(ctlId);
    // ----------------------------------------------------
    if (para.invisible) {
        ctl.style.display = "none";
    }
};
window.xwf_gridview.prototype.selectRow = function (recordRow) {
    this.recordRow = recordRow;
    if (this.recordRow < 0 || this.recordRow > this.dtbViewData.rowCount) {
        this.recordRow = -1;
    }
    this.grid.selectRow(this.recordRow - this.indexFrom);
};

// -- 网格事件 ----------------------------------------------------------------
window.xwf_gridview.prototype.onRowClick = function (_this) {
    return function (gridRow) {
        var dataRow = null;

        if (_this.indexFrom + gridRow < _this.dtbViewData.rowCount) {
            _this.recordRow = _this.indexFrom + gridRow;
            dataRow = _this.dtbViewData.rows[_this.recordRow];
        } else {
            _this.recordRow = -1;
        }

        if (_this.rowClick) {
            // -- drRow = dataRow，兼容旧代码 --
            _this.rowClick({ recordRow: _this.recordRow, dataRow: dataRow, drRow: dataRow });
        }
    };
};

window.xwf_gridview.prototype.onCellFocus = function (para) {
    var _this = para.grid.gridview;
    var jsonPara = {};
    // ---------------------------------------------------- 
    if (_this.indexFrom + para.gridRow >= _this.dtbViewData.rowCount) return;
    _this.recordRow = _this.indexFrom + para.gridRow;
    if (_this.cellFocus) {
        jsonPara.jsonColumn = _this.arrColumns[para.gridCol];
        jsonPara.fieldName = jsonPara.jsonColumn.fieldName;
        jsonPara.recordRow = _this.recordRow;
        jsonPara.drRow = _this.dtbViewData.rows[_this.recordRow];
        jsonPara.control = para.control;
        jsonPara.value = para.value;
        _this.cellFocus(jsonPara);
    }
};
window.xwf_gridview.prototype.onCellBlur = function (para) {
    var _this = para.grid.gridview;
    var jsonPara = {};
    // ----------------------------------------------------
    if (_this.indexFrom + para.gridRow >= _this.dtbViewData.rowCount) {
        para.control.value = "";
        return;
    }

    jsonPara.jsonColumn = _this.arrColumns[para.gridCol];
    jsonPara.fieldName = jsonPara.jsonColumn.fieldName;
    jsonPara.recordRow = _this.recordRow;
    jsonPara.dataRow = _this.dtbViewData.rows[_this.recordRow];
    jsonPara.drRow = _this.dtbViewData.rows[_this.recordRow]; // -- 等同于dataRow，兼容旧代码 --
    jsonPara.control = para.control;
    jsonPara.oldValue = jsonPara.drRow[jsonPara.fieldName].value;

    if (_this.dtbViewData.columns[jsonPara.fieldName].columnType.equals("number")) {
        jsonPara.newValue = new Number(para.newValue);
    }
    else {
        jsonPara.newValue = para.newValue;
    }

    // ----------------------------------------------------
    if (_this.cellBlur) {
    	//------ 编辑明细前验证一下 表单状态
        if(!verifyFormStatus()){
        	return false;
        }
        if (_this.cellBlur(jsonPara) == false) {
            jsonPara.control.value = jsonPara.oldValue;
            jsonPara.control.focus();
            para.grid.cancelClick = true; // -- 用于阻止后续事件的响应 --
            return false;
        }
    }

    if (jsonPara.oldValue != jsonPara.newValue) {
        jsonPara.control.value = jsonPara.newValue;
        _this.dtbViewData.setDataCell(_this.recordRow, jsonPara.fieldName, jsonPara.newValue);
        if (_this.cellChange) {
        	//------ 编辑明细前验证一下 表单状态
            if(!verifyFormStatus()){
            	return false;
            }
            _this.cellChange(jsonPara);
        }
    }
    return true;
};
window.xwf_gridview.prototype.onCellClick = function (para) {
    var _this = para.grid.gridview;
    var jsonColumn = null;
    var jsonPara = { btnKey: "", fieldName: "" };
    // ----------------------------------------------------
    if (_this.indexFrom + para.gridRow >= _this.dtbViewData.rowCount) {
        return;
    }
    if (_this.cellClick) {
        jsonColumn = _this.arrColumns[para.gridCol];
        jsonPara.type = jsonColumn.type;

        if (jsonColumn.type.equals("data")) {
            jsonPara.fieldName = jsonColumn.fieldName;
        } else if (jsonColumn.type.equals("command")) {
            jsonPara.btnKey = jsonColumn.key;
        } else {
            return;
        }

        jsonPara.recordRow = _this.recordRow;
        jsonPara.drRow = _this.dtbViewData.rows[_this.recordRow];

        _this.cellClick(jsonPara);
    }
};

// -- public method 2 ---------------------------------------------------------
window.xwf_gridview.prototype.exchangeRow = function (iRow1, iRow2) {
    ///<summary>两行数据交换位置，iRow1、iRow2为记录集下标，不是网格行号</summary>
    if (iRow1 < 0 || iRow2 < 0 || iRow1 == iRow2 || iRow1 >= this.totalRows || iRow2 >= this.totalRows) {
        alert("当前操作无效(行下标越界)。");
        return false;
    }

    var valueTemp = null;
    for (var iCol = 0; iCol < this.dtbViewData.columnCount; iCol++) {
        valueTemp = this.dtbViewData.rows[iRow1][iCol].value;
        this.dtbViewData.rows[iRow1][iCol].value = this.dtbViewData.rows[iRow2][iCol].value;
        this.dtbViewData.rows[iRow2][iCol].value = valueTemp;
    }
    this.fillData();
    this.grid.selectRow(iRow2);
};
window.xwf_gridview.prototype.getViewDataString = function () {
    ///<summary>将当前视图的数据dtbViewData转换为字符串, 供服务端使用</summary>
    var strBaseFields = "";
    var tableKey = this.dtbView.rows[0]["table_key"].value;
    for (var i = 0; i < this.dtbViewField.rowCount; i++) {
        if (this.dtbViewField.rows[i]["table_key"].value.equals(tableKey)) {
            strBaseFields += "," + this.dtbViewField.rows[i]["field_name"].value;
        }
    }
    return this.dtbViewData.toString(strBaseFields.substring(1));
};

// -- 关联控件uvform相关：添加、显示、移动等 ----------------------------------
window.xwf_gridview.prototype.addnew = function (_this) {
    if (_this == null) _this = this;
    if (!_this.vfAllowAddnew) {
        // debug("添加操作不可用。");
        // return false;
    }
    if (_this.beforeAddnew) {
        if (!_this.beforeAddnew()) return false;
    }
    // ----------------------------------------------------
    var prop = {
        title: _this.dtbView.rows[0]["view_name"].value + " 编辑窗口",
        url: _this.viewForm2 || _this.viewForm,
        modal: false,
        parent: win
    };
    if (this.vfWindowState && this.vfWindowState.equals("maximized")) {
        prop.windowState = "maximized";
        prop.noTitle = true;
    }
    var para = {
        flowKey: this.flowKey,
        viewKey: _this.viewKey,
        primaryKey: "",

        dtbView: _this.dtbView,
        dtbViewField: _this.dtbViewField,
        dtbViewOne: _this.dtbViewData,
        drViewOne: null,
        foreignKey: _this.jsonFKey,

        gridView: _this
    };

    if (_this.winForm == null || _this.winForm.closed) {
        _this.winForm = topWin.openWindow(prop, para);
    } else {
        _this.winForm.window.vf.addnew();
    }

    if (this.rowClick) {
        this.rowClick({ recordRow: -1, dataRow: null });
    }
};
window.xwf_gridview.prototype.showWinForm = function () {
    if (this.recordRow < 0) return;
    var prop = {
        title: this.dtbView.rows[0]["view_name"].value + " 编辑窗口",
        url: this.viewForm2 || this.viewForm,
        modal: false,
        parent: win
    };
    if (this.vfWindowState && this.vfWindowState.equals("maximized")) {
        prop.windowState = "maximized";
        prop.noTitle = true;
    }
    var para = {
        flowKey: this.flowKey,
        viewKey: this.viewKey,
        primaryKey: this.getPrimaryKey(),

        dtbView: this.dtbView,
        dtbViewField: this.dtbViewField,
        dtbViewOne: this.dtbViewData,
        drViewOne: this.dtbViewData.rows[this.recordRow],
        foreignKey: this.jsonFKey,

        allowAddnew: this.vfAllowAddnew,
        allowModify: this.vfAllowModify,
        allowDelete: this.vfAllowDelete,
        allowCopy: this.vfAllowCopy,
        allowMove: this.vfAllowMove,
        gridView: this
    };

    this.winForm = topWin.openWindow(prop, para);
};
window.xwf_gridview.prototype.getPrimaryKey = function () {
    var primaryKey = "";
    var colName = "",
        fieldPrefix = "";

    for (var i = 0; i < this.dtbViewField.rowCount; i++) {
        if (this.dtbViewField.rows[i]["field_pkey"].value == 1) {
            fieldPrefix = this.dtbViewField.rows[i]["field_prefix"].value;
            colName = this.dtbViewField.rows[i]["field_name"].value;
            colName = this.dtbViewData.getColName(colName);
            primaryKey += g.c.CHAR7 + colName + "," + this.dtbViewData.rows[this.recordRow][colName].value;
        }
    }
    primaryKey = primaryKey.substring(1);
    return primaryKey;
};

window.xwf_gridview.prototype.move = function (p1) {
    if (p1 == 0) {
        this.recordRow = 0;
    } else if (p1 == 1) {
        if (this.recordRow - 1 < 0) return;
        this.recordRow--;
    } else if (p1 == 2) {
        if (this.recordRow + 1 > this.dtbViewData.rowCount - 1) return;
        this.recordRow++;
    } else {
        this.recordRow = this.dtbViewData.rowCount - 1;
    }

    this.showRecord();
};
window.xwf_gridview.prototype.showRecord = function () {
    this.vf = this.winForm.iframe.contentWindow.vf;
    this.vf.foreignKey = this.jsonFKey;
    if (this.dtbViewData.rowCount > 0 && this.recordRow >= 0) {
        this.grid.selectRow(this.recordRow - this.indexFrom);
        this.vf.primaryKey = this.getPrimaryKey();
        this.vf.drViewOne = this.dtbViewData.rows[this.recordRow];

        if (this.vf.getRecord()) {
            this.vf.fillData();
        }
    } else {
        this.vf.primaryKey = "";
        this.vf.drViewOne = null;
        this.vf.setStatus("none");
        this.vf.clearForm();

        this.vf.close();
        if (this.rowClick) {
            this.rowClick({ recordRow: -1, dataRow: null });
        }

    }
};

// -- 视图配置 ----------------------------------------------------------------
window.xwf_gridview.prototype.onSNClick = function (_this) {
    return function (evt) {
        _this.showConfig();
    };
};
window.xwf_gridview.prototype.showConfig = function () {
    var _this = this;
    var arrMenus = new Array();
    // ----------------------------------------------------
    if (this.allowConfig) {
        arrMenus.push({ key: "viewDesign", text: "设计" });
        arrMenus.push({ key: "saveConfigWidth", text: "保存列宽" });
    }
    //arrMenus.push({ key: "viewConfig", text: "视图配置" });
    if (arrMenus.length < 1) return;
    // ----------------------------------------------------
    var imgTarget = g.x.getEventTarget(event);
    topWin.context.show({ menuClick: _this.configMenuClick(_this), arrMenus: arrMenus, objDom: imgTarget, top: 0, left: 0 });
};
window.xwf_gridview.prototype.configMenuClick = function (_this) {
    return function (liMenu) {
        if (liMenu.key.equals("viewDesign")) {
            var prop = {
                url: g.appPath + "project/xpas/html/frame/userview.html",
                parent: win
            };
            var para = {
                viewKey: "fv_view",
                primaryKey: "view_key," + _this.viewKey,
                allowModify: true,
                allowMove: false
            };
            topWin.openWindow(prop, para);
        } else if (liMenu.key.equals("saveConfigWidth")) {
            _this.saveConfigWidth();
        } else if (liMenu.key.equals("viewConfig")) {
            var prop = {
                url: g.appPath + "project/xpas/html/frame/uview_config.html",
                parent: win
            };
            var para = {
                viewKey: _this.viewKey,
                pageMaxRows: _this.pageMaxRows,
                gridView: _this
            };
            topWin.openWindow(prop, para);
        } else {
            debug(liMenu.key + " , " + liMenu.text);
        }
    };
};
window.xwf_gridview.prototype.saveConfigWidth = function () {
    var strWidth = "";
    var arrColumns = this.grid.arrColumns;

    for (var i = 0; i < arrColumns.length; i++) {
        if (arrColumns[i].type.equals("data")) {
            strWidth += ";" + arrColumns[i].fieldName + "," + arrColumns[i].width;
        }
    }
    strWidth = strWidth.substring(1);

    if (g.a.send("processType=com.xznext.xpas.ViewAid&actionType=saveConfigWidth", { viewKey: this.viewKey, strWidth: strWidth }, true)) {
        var c = g.a.cReturn;
        if (g.a.OK) {
            showMsg("设置保存成功。");
        }
    }
};
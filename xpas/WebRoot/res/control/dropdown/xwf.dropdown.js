/*
* xwf.dropdown JavaScript Library v1.0
* Author: Volant Lee
* Create Date: 2017-07-04
* Modify Date: 2017-07-10
* Copyright 2017, http://www.xpas-next.com/
* Description: 下拉框控件 
* 包含表头:
* 	<input type="text"  class="form-control" id="_fMaterial_name"  controlType="dropdown" fieldValue="material_id" widthPanel="1000" fieldText="material_name" 
										fieldsSearch="material_name,material_spec,manufacturer_name,price_sp,material_name_py"  
										fieldsVisible="material_name,material_spec,manufacturer_name,price_sp,material_name_py"   
										thNames="序号,名称,规格,厂商,供应商价格,助记码"  
										thWidths="auto,120px"   //不写则auto
										
										/>
*/
var css_xwf_dropdown = true;
// -- 类定义 ------------------------------------------------------------------
window.xwf_dropdown = function(jsonProp) {
    ///<summary>dropdown控件，支持动态加载、数据绑定、默认选中等</summary>
    if (jsonProp == null) return;
    for (var key in jsonProp) {
        this[key] = jsonProp[key];
    }
    // -- 重新初始化类成员变量，避免类实例间共享 ----------
    this.prefix += this.instanceIndex.index++ + "_";
    this.arrCore = new Array();

    // -- 初始化(默认参数、下拉面板、数据数组) ------------
    if (!this.initPara()) return;
    this.initPanel();
    this.initCore();
};
window.xwf_dropdown.prototype = {
    prefix: "xwf_dropdown_", // -- 类实例统一前缀名称，用于类内部创建的控件id命名 --
    cssPrefix: "xwf_dropdown_", // -- 样式表统一前缀名称 --
    instanceIndex: { index: 0 }, // -- 类实例下标 --
    doc: document, // -- 类宿主窗口 --

    dtbSource: null, // -- 数据源 --
    txtHost: null, // -- 宿主文本框 --
    widthPanel: 0, // -- 面板宽度 --
    widthSN: 25, // -- SN列宽度 --
    widthFields: "", // -- 显示列宽度(总宽度的百分比，示例：30,40,30) --    
    widthScroll: 16, // -- 垂直滚动区宽度 --
    visibleSN: false, // -- 是否显示SN列 --
    visibleSearch: true, // -- 是否显示搜索框 --
    enabled: true, // -- 允许操作 --

    expanding: false, // -- 正在展开面板 --
    divPanel: null, // -- 顶层面板 --
    divDrop: null, // -- txtHost的下拉按钮 --
    txtSearch: null, // -- 下拉面板中的搜索框 --
    divData: null, // -- 数据区 --
    tbDataWidth: 0, // -- 数据表格宽度 --
    divScrollA: null, // -- 垂直滚动条A --
    divScrollB: null, // -- 垂直滚动条B --
    expanded: false, // -- 已下拉(下拉面板可见) --
    position: false, // -- 已智能定位 --

    underValue: "", // -- 存储值 --
    fieldValue: "", // -- 存储列 --
    fieldText: "", // -- 显示列 --
    fieldsVisible: "", // -- 显示列 --
    fieldsVisibleCount: 1, // -- 显示列列数 --
    arrFieldsVisible: null, // -- 显示列字段名称数组 --    
    fieldsSearch: "", // -- 搜索列 --
    fieldsSearchCount: 1, // -- 搜索列列数 --

    arrCore: null, // -- 数据模板数组 --
    totalRows: 0, // -- 总记录条数 --
    filterRows: 0, // -- 筛选后的记录总条数 --
    pageRows: 1, // -- 每页实际最大行数 --
    pageMaxRows: 10, // -- 每页允许最大行数 --    
    gridRow: -1, // -- 当前选中行行号(网格行下标，非记录集下标) --
    resultRow: -1, // -- 当前选中行行号(在arrResult中的下标，= indexFrom + gridRow) --
    recordRow: -1, // -- 当前选中行行号(在记录集dtbSource中的下标，非网格下标，= arrResult[resultRow]) --
    indexFrom: 0, // -- 当前起始行行号(在arrResult中的下标) --
    dataRow: null, // -- 当前选中行 --

    coreFromIdx: 0, // -- 第一行数据起始下标 --
    coreRowFromIdx: 0, // -- 每行第1列数据列起始下标 --
    coreRowColCount: 0, // -- 每行数组项数量 --

    arrResult: null, // -- 搜索结果集(符合条件的数据源记录集下标) --
    rowClick: null, // -- 行选中回调函数 --
    // ----------------------------------------------------
    summary: function() {
        var strSummary = "xwf 控件类库，下拉框控件类。";
        return strSummary;
    }
};
// -- 初始化下拉控件 ----------------------------------------------------------
window.xwf_dropdown.prototype.initPara = function() {
    var _this = this;
    var columnName = "";
    // ----------------------------------------------------
    if (!this.dtbSource) {
        var dataSource = this.txtHost.getAttribute("dataSource");
        if (dataSource) {
            this.dtbSource = new window.xwf_datatable();
            this.dtbSource.readFromString(dataSource);
        }
    }
    if (!this.dtbSource) {
        showWarn("类初始化错误，缺少数据源参数dtbSource，请检查。");
        return false;
    }

    this.txtHost.instance = this;
    this.txtHost.setEnabled = function(enabled) {
        _this.setEnabled(enabled);
    }
    this.txtHost.setValue = function(newValue) {
        _this.setValue(newValue);
    };

    if (!window.jsonDropdown) {
        window.jsonDropdown = {};
    }
    window.jsonDropdown[this.prefix + this.instanceIndex.index] = this;

    // -- 1. fieldValue、fieldText ------------------------
    if (this.txtHost.getAttribute("enabled") && this.txtHost.getAttribute("enabled").equals("false")) this.enabled = false;
    this.fieldValue = this.fieldValue || this.txtHost.getAttribute("fieldValue") || this.dtbSource.columns[0].name;
    this.fieldValue = this.fieldValue.replaceAll(" ", "");

    this.fieldText = this.fieldText || this.txtHost.getAttribute("fieldText") || this.fieldValue;
    this.fieldText = this.fieldText.replaceAll(" ", "");

    // -- 2. fieldsVisible、fieldsSearch ------------------
    this.fieldsVisible = this.fieldsVisible || this.txtHost.getAttribute("fieldsVisible") || this.fieldText;
    this.fieldsVisible = this.fieldsVisible.replaceAll(" ", "");
    this.arrFieldsVisible = this.fieldsVisible.split(",");
    this.fieldsVisibleCount = this.arrFieldsVisible.length;

    this.fieldsSearch = this.fieldsSearch || this.txtHost.getAttribute("fieldsSearch") || this.fieldsVisible;
    this.fieldsSearch = this.fieldsSearch.replaceAll(" ", "");
    this.fieldsSearchCount = this.fieldsSearch.split(",").length;

    if ("false".equals(this.txtHost.getAttribute("visibleSearch"))) this.visibleSearch = false;

    // -- 3. 检查字段是否正确 -----------------------------
    var fieldsX = this.fieldValue + "," + this.fieldText + "," + this.fieldsVisible + "," + this.fieldsSearch;
    var arrFieldX = fieldsX.split(",");
    for (var i = 0; i < arrFieldX.length; i++) {
        columnName = arrFieldX[i];
        if (!this.dtbSource.columns[columnName]) {
            showWarn("字段 " + columnName + " 在数据源中不存在，请检查。");
            return false;
        }
    }

    // -- 4. visibleSN、pageMaxRows -----------------------
    var visibleSN = this.txtHost.getAttribute("visibleSN");
    if (visibleSN && !visibleSN.equals("false")) this.visibleSN = true;

    var pageMaxRows = this.txtHost.getAttribute("pageMaxRows");
    if (pageMaxRows) this.pageMaxRows = parseInt(pageMaxRows);
    this.pageMaxRows = screen.height < 800 ? 6 : this.pageMaxRows;

    // -- 5. widthFields ----------------------------------
    this.widthFields = this.widthFields || this.txtHost.getAttribute("widthFields") || "";
    this.widthPanel = this.widthPanel || this.txtHost.getAttribute("widthPanel") || (this.txtHost.offsetWidth - 2);
    this.tbDataWidth = this.widthPanel - this.widthScroll - (g.b.ie ? 2 : 0);

    var widthTotal = 0;
    var width2 = this.tbDataWidth - this.widthSN;
    var arrWidth = this.widthFields ? this.widthFields.split(",") : new Array();
    for (var i = 0; i < this.arrFieldsVisible.length; i++) {
        columnName = this.arrFieldsVisible[i];
        if (arrWidth.length > i) {
            this.dtbSource.columns[columnName].width = parseInt(arrWidth[i]);
        } else {
            if (this.dtbSource.columns[columnName].columnType.equals("number")) {
                this.dtbSource.columns[columnName].width = 60;
            } else {
                this.dtbSource.columns[columnName].width = 150;
            }
        }
        widthTotal += this.dtbSource.columns[columnName].width;
    }
    for (var i = 0; i < this.arrFieldsVisible.length; i++) {
        columnName = this.arrFieldsVisible[i];
        this.dtbSource.columns[columnName].width = width2 * this.dtbSource.columns[columnName].width / widthTotal - 2; // -- 减2目的是消除TD边框和计算的小数 --
    }

    // -- 6. rowClick -------------------------------------
    if (this.txtHost.getAttribute("rowClick")) {
        this.rowClick = eval(this.txtHost.getAttribute("rowClick"));
    }
    // ----------------------------------------------------
    return true;
};
window.xwf_dropdown.prototype.initPanel = function() {
    var _this = this;

    // -- 1. 创建下拉图表及样式 ---------------------------
    var txtHostParent = this.txtHost.parentElement;
    if (!txtHostParent.tagName.equals("TD") && !txtHostParent.tagName.equals("DIV")) {
        showWarn("不支持的文本框容器类型，请检查。");
        return;
    }
    txtHostParent.className = "combo";

    this.divDrop = this.doc.createElement("DIV");
    txtHostParent.appendChild(this.divDrop);
    this.divDrop._this = this;
    this.divDrop.className = (this.enabled ? "fa fa-chevron-down" : "");
    this.divDrop.style.top = this.txtHost.offsetTop + "px";
    this.divDrop.style.width = this.txtHost.clientHeight + "px";
    this.divDrop.style.height = this.txtHost.offsetHeight + "px";
    this.divDrop.style.lineHeight = this.divDrop.clientHeight + "px";
    this.divDrop.style.right = (txtHostParent.clientWidth - this.txtHost.offsetLeft - this.txtHost.offsetWidth) + "px";
    this.divDrop.onclick = this.dropClick(_this);
    // this.txtHost.onclick = this.divDrop.onclick;
    this.txtHost.disabled = true;
    this.txtHost.dropdownControl = true;

    // -- 2. 创建下拉面板 ---------------------------------
    var html = "<div id='" + this.prefix + "divPanel' class='" + this.cssPrefix + "'divPanel' style='width:" + this.widthPanel + "px;' >" +
        "<div><input type='text' id='" + this.prefix + "txtSearch' style='display:" + (this.visibleSearch ? "" : "none") + ";' /></div>" +
        "<table class='" + this.cssPrefix + "tbPanel'><tr>" +
        "    <td class='" + this.cssPrefix + "tdPanel'>" +
        "        <div id='" + this.prefix + "divData'>数据区</div>" +
        "    </td>" +
        "    <td class='" + this.cssPrefix + "tdPanel' style='width:" + this.widthScroll + "px;'>" +
        "        <div id='" + this.prefix + "divScrollA' class='" + this.cssPrefix + "divScrollA' style='width:" + (this.widthScroll) + "px;'>" +
        "            <div id='" + this.prefix + "divScrollB' class='" + this.cssPrefix + "divScrollB'></div>" +
        "        </div>" +
        "    </td>" +
        "</tr></table>" +
        "</div>";
    this.divPanel = this.doc.createElement("DIV");
    this.doc.body.appendChild(this.divPanel);
    this.divPanel._this = this;
    this.divPanel.className = this.cssPrefix + "divPanel";
    this.divPanel.style.display = "none";
    this.divPanel.innerHTML = html;

    // -- 3. 默认定位(防止窗口抖动) ---------------------------------
    this.divPanel.style.top = "0px";
    this.divPanel.style.left = "0px";

    // -- 4. 后期事件绑定 ---------------------------------
    this.txtSearch = gId(this.prefix + "txtSearch");
    this.txtSearch.className = this.cssPrefix + "txtSearch";
    this.txtSearch.style.width = (this.widthPanel - 5) + "px";
    this.txtSearch.dropdownControl = true;
    this.txtSearch.onkeyup = function(evt) {
        evt = evt || window.event;
        if (evt == null) {
            if (g.b.ie && (g.b.ie == 7 || g.b.ie == 8)) {
                evt = this.document.parentWindow.event;
            }
        }
        _this.onTextKeyup(evt);
    };

    this.divData = gId(this.prefix + "divData");
    this.divData.className = this.cssPrefix + "divData";
    this.divData.onclick = this.dataClick(_this);

    this.divScrollA = gId(this.prefix + "divScrollA");
    this.divScrollB = gId(this.prefix + "divScrollB");
    this.divScrollA.onscroll = this.onVerticalScroll(_this);

    // 下拉面板鼠标滚轮滚动
    this.initMouseWheel();
};
window.xwf_dropdown.prototype.initMouseWheel = function() {
    var _this = this;

    var scrollFunc = function(e) {
        e = e || window.event; // evt 代表事件（event）对象，即所谓的事件驱动源
        e.preventDefault();
        e.stopPropagation();

        if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件 
            if (e.wheelDelta > 0) {
                // 鼠标滚轮向上滚动
                _this.scrollbarMouseWheel(_this, 'U');
            } else if (e.wheelDelta < 0) {
                // 鼠标滚轮向下滚动
                _this.scrollbarMouseWheel(_this, 'D');
            }

        } else if (e.detail) { //Firefox滑轮事件
            if (e.detail > 0) {
                // 鼠标滚轮向下滚动
                _this.scrollbarMouseWheel(_this, 'D');
            } else if (e.detail < 0) {
                // 鼠标滚轮向上滚动
                _this.scrollbarMouseWheel(_this, 'U');
            }
        }
    }

    if (this.divData.addEventListener) { // 检测 Firefox
        this.divData.addEventListener('DOMMouseScroll', scrollFunc, false);
    }

    this.divData.onmousewheel = scrollFunc;
};
window.xwf_dropdown.prototype.scrollbarMouseWheel = function(_this, dir) {
    // dir 表示鼠标滚轮滚动的方向，U：鼠标滚轮向上滚动，D：鼠标滚轮向下滚动
    if (dir === 'U') {
        _this.indexFrom -= _this.pageMaxRows;
        if (_this.indexFrom <= 0) {
            _this.indexFrom = 0;
        }
        _this.divScrollA.scrollTop -= _this.divData.clientHeight;
    } else if (dir === 'D') {
        _this.indexFrom += _this.pageMaxRows;
        if (_this.indexFrom >= _this.filterRows) {
            _this.indexFrom = _this.filterRows - _this.pageMaxRows;
        }
        _this.divScrollA.scrollTop += _this.divData.clientHeight;
    }
    _this.fillData();
}
window.xwf_dropdown.prototype.initCore = function() {
    var columnName = "";
    // ----------------------------------------------------
    this.totalRows = this.dtbSource.rowCount;
    this.filterRows = this.totalRows;
    if (this.totalRows < this.pageMaxRows) {
        this.pageMaxRows = this.totalRows || 1;
    }
    this.coreRowColCount = 2 + (this.visibleSN ? 3 : 0) + this.fieldsVisibleCount * 3;
    // ----------------------------------------------------
    var iIdx = 0;
    this.arrCore[iIdx++] = "<table id='" + this.prefix + "tbData' class='" + this.cssPrefix + "tbData' style='width:" + this.tbDataWidth + "px;'>";

    //表头
    var thNames = this.txtHost.getAttribute("thNames"),
        thNamesArr = [];
    var thWidths = this.txtHost.getAttribute("thWidths"),
        thWidthsArr = [];
    if (thNames) thNamesArr = thNames.split(",");
    if (thWidths) thWidthsArr = thWidths.split(",");
    if (thNamesArr.length > 0) {
        var thHtml = ["<thead onclick='event.stopPropagation();'><tr class='xwf_grid_tbHeader' style='text-align:center;'>"];
        var width = "";
        for (var i in thNamesArr) {
            width = "auto";
            if (thWidthsArr.length > i) width = thWidthsArr[i];
            thHtml.push("<td class='" + this.cssPrefix + "th' style='width:" + width + ";'>");
            thHtml.push(thNamesArr[i]);
            thHtml.push("</td>");
        }
        thHtml.push("</tr></thead>");
        this.arrCore[iIdx++] = thHtml.join("");
    }
    this.coreFromIdx = iIdx;

    for (var iRow = 0; iRow < this.pageMaxRows; iRow++) {
        this.arrCore[iIdx++] = "<tr id='" + this.prefix + iRow + "_TR' gridRow=" + iRow + ">";
        if (this.visibleSN) {
            this.arrCore[iIdx++] = "<td class='" + this.cssPrefix + "tdSN'" + (iRow == 0 ? " style='width:" + this.widthSN + "px;' " : "") + ">";
            this.arrCore[iIdx++] = "序号";
            this.arrCore[iIdx++] = "</td>";
        }
        if (iRow == 0) this.coreRowFromIdx = iIdx - this.coreFromIdx;

        for (var iCol = 0; iCol < this.fieldsVisibleCount; iCol++) {
            columnName = this.arrFieldsVisible[iCol];
            if (iRow == 0) {
                this.arrCore[iIdx++] = "<td style='width:" + this.dtbSource.columns[columnName].width + "px;'><span>";
            } else {
                this.arrCore[iIdx++] = "<td><span>";
            }
            this.arrCore[iIdx++] = "(" + iRow + "_" + iCol + ")";
            this.arrCore[iIdx++] = "</span></td>";
        }
        this.arrCore[iIdx++] = "</tr>";
    }
    this.arrCore[iIdx++] = "</table>";
};

// -- events ------------------------------------------------------------------
window.xwf_dropdown.prototype.onVerticalScroll = function(_this) {
    return function() {
        var divScrollA = _this.divScrollA;
        var percent = 1.00 * (divScrollA.scrollTop / divScrollA.scrollHeight);

        var idxFrom = parseInt(_this.filterRows * percent);

        // ------------------------------------------------
        if (_this.indexFrom != idxFrom) {
            _this.indexFrom = idxFrom;
            if (_this.filterRows - _this.indexFrom < _this.pageMaxRows) {
                _this.indexFrom = _this.filterRows - _this.pageMaxRows;
            }
            if (_this.indexFrom < 0) _this.indexFrom = 0;

            _this.fillData();
        }
    }
};

window.xwf_dropdown.prototype.onTextKeyup = function(event) {
    if (event.keyCode == 37 || event.keyCode == 39) return; // -- 左右键 --
    // ----------------------------------------------------
    if (event.keyCode == 27) {
        if (this.txtSearch.value.equals("")) {
            //this.collapse();
        } else {
            //this.txtSearch.value = "";
        }
        //return;
    } else if (event.keyCode == 13) {
        if (this.arrResult.length > 0) {
            if (this.recordRow < 0) {
                this.gridRow = 0;
                this.resultRow = this.gridRow;
                this.recordRow = this.arrResult[this.resultRow];
            }
            this.rowSelect(this.recordRow);
            return;
        }
    } else if (event.keyCode == 38 || event.keyCode == 40) { // -- 上下键 --
        this.moveRow(event.keyCode == 38 ? -1 : 1);
        return;
    }

    // ----------------------------------------------------
    var strSearch = this.txtSearch.value.trim();
    this.filter(strSearch);
    this.fillData();
};
window.xwf_dropdown.prototype.moveRow = function(upDown) {
    var oldGridRow = this.resultRow - this.indexFrom;
    var newGridRow = oldGridRow + upDown;
    // ----------------------------------------------------
    if (oldGridRow < 0 || oldGridRow >= this.pageMaxRows) {
        // -- 原activeRow存在，并且超出面板当前显示范围 --
        var originalPosition = false; // -- true：恢复到activeRow的原始位置；false：重新定位首行位置 --
        if (originalPosition) {
            this.indexFrom = this.resultRow;
        }
        newGridRow = 0;
    } else if (newGridRow < 0) {
        if (this.indexFrom == 0) return; // -- 已经是首行 --
        this.indexFrom = this.indexFrom - 1;
        newGridRow = 0;
    } else if (newGridRow >= this.pageMaxRows) {
        if (this.resultRow == this.filterRows - 1) return; // -- 已经是末行 --
        this.indexFrom = this.indexFrom + 1;
        newGridRow = this.pageMaxRows - 1;
    } else if (newGridRow >= this.filterRows - this.indexFrom) {
        return; // -- 已经是末行 --
    }
    // ----------------------------------------------------
    this.gridRow = newGridRow;
    this.resultRow = this.indexFrom + this.gridRow;
    this.recordRow = this.arrResult[this.resultRow];
    this.fillData();
};

window.xwf_dropdown.prototype.dataClick = function(_this) {
    return function(evt) {
        var evtTarget = g.x.getEventTarget(evt);
        var tagName = evtTarget.tagName;
        // ----------------------------------------------------
        while (!tagName.equals("TR")) {
            evtTarget = evtTarget.parentElement;
            tagName = evtTarget.tagName;
        }

        var gridRow = parseInt(evtTarget.getAttribute("gridRow"));
        if (gridRow + _this.indexFrom >= _this.filterRows) {
            return;
        }
        // ----------------------------------------------------
        _this.gridRow = gridRow;
        _this.resultRow = _this.indexFrom + _this.gridRow;
        _this.recordRow = _this.arrResult[_this.resultRow];
        _this.rowSelect(_this.recordRow);
    }
};
window.xwf_dropdown.prototype.rowSelect = function(recordRow) {
    this.recordRow = recordRow;
    this.dataRow = this.dtbSource.rows[this.recordRow];
    if (this.rowClick) {
        if (!this.rowClick({ dataRow: this.dataRow })) {
            return;
        }
    }
    // ----------------------------------------------------
    this.txtHost.underValue = this.dataRow[this.fieldValue].value;
    this.txtHost.value = this.dataRow[this.fieldText].value;
    this.collapse();
};

// -- private methods ---------------------------------------------------------
window.xwf_dropdown.prototype.dropClick = function(_this) {
    return function(evt) {
        if (_this.expanded) {
            _this.collapse();
        }
        else {
            _this.expand();
        }
    }
};
window.xwf_dropdown.prototype.fillData = function() {
    var idxRow = 0,
        idxCell = 0;
    var indexTo = Math.min(this.indexFrom + this.pageMaxRows, this.dtbSource.rowCount);

    var columnName = "";
    // -- 1. 动态填充数据 ---------------------------------
    for (var iRow = 0; iRow < this.pageMaxRows; iRow++) {
        idxRow = this.coreFromIdx + iRow * this.coreRowColCount; // -- 当前行第1个单元格(<td...>序号)下标 --
        if (this.visibleSN) {
            this.arrCore[idxRow + 2] = this.indexFrom + iRow + 1; // -- 序号单元格 --
        }
        idxRow += this.coreRowFromIdx; // -- 当前行数据列起始单元格(<td...>)下标 --
        if (this.indexFrom + iRow < this.filterRows) {
            for (var iCol = 0; iCol < this.fieldsVisibleCount; iCol++) {
                columnName = this.arrFieldsVisible[iCol];
                idxCell = idxRow + iCol * 3 + 1;
                this.arrCore[idxCell] = this.dtbSource.rows[this.arrResult[this.indexFrom + iRow]][columnName].value;
            }
        } else {
            this.arrCore[idxRow + 2 - this.coreRowFromIdx] = "&nbsp;";
            for (var iCol = 0; iCol < this.fieldsVisibleCount; iCol++) {
                idxCell = idxRow + iCol * 3 + 1;
                this.arrCore[idxCell] = "&nbsp;"; // -- "越界白"; --
            }
        }
    }
    this.divData.innerHTML = this.arrCore.join("");
    this.resetVerticalScroll();

    // -- 2. 高亮显示Active行 -----------------------------
    var activeGridRow = this.resultRow - this.indexFrom;
    if (activeGridRow >= 0 && activeGridRow < this.pageMaxRows) {
        var recordTR = gId(this.prefix + activeGridRow + "_TR");
        recordTR.className = this.cssPrefix + "tdActive";
    }

    if (this.txtSearch.style.display.equals("")) {
        this.txtSearch.focus();
    }
};
window.xwf_dropdown.prototype.resetVerticalScroll = function() {
    if (this.indexFrom == 0) {
        this.divScrollA.style.height = (this.divData.offsetHeight - 2) + "px";
        this.divScrollB.style.height = ((this.filterRows / this.pageMaxRows) * this.divData.offsetHeight) + "px";
    }
};

window.xwf_dropdown.prototype.filter = function(strSearch) {
    if (strSearch.equals("")) {
        this.arrResult = new Array(this.dtbSource.rowCount);
        for (var i = 0; i < this.dtbSource.rowCount; i++) {
            this.arrResult[i] = i;
        }
    } else {
        this.arrResult = this.dtbSource.search(this.fieldsSearch.split(","), strSearch);
    }

    // -- 重置相关变量 ------------------------------------
    this.filterRows = this.arrResult.length;
    this.gridRow = -1;
    this.indexFrom = 0;
    this.resultRow = -1;
    this.recordRow = -1;
};

// -- public methods ----------------------------------------------------------
window.xwf_dropdown.prototype.expand = function() {
    if (!this.enabled || this.expanded) return;
    this.collapseAll();

    this.expanding = true;
    this.expanded = true;
    this.divPanel.style.display = "";
    // ----------------------------------------------------
    if (this.arrResult == null) {
        this.filter(""); // -- 首次展开 --
    }
    this.fillData();

    this.txtSearch.select();
    if (this.txtSearch.style.display.equals("")) {
        this.txtSearch.focus();
    }

    // -- 智能定位 ----------------------------------------
    if (this.position) return;
    var topHost = getOffsetTop(this.txtHost);
    var topLeft = getOffsetLeft(this.txtHost);
    var expandDown = true, expandRight = true;

    if (topHost + this.txtHost.offsetHeight + this.divPanel.offsetHeight < win.p.height) {
        expandDown = true;          // -- 向下展开空间充足 --
    }
    else if (topHost - this.divPanel.offsetHeight > 0) {
        expandDown = false;         // -- 向上展开空间充足 --
    }
    else {
        if (topHost < win.p.height / 2) {   
            expandDown = true;     // -- 上下空间都不足，控件位置偏上，应向下展开 --
        }
        else {
            expandDown = false;
        }
    }
    if (expandDown) {
        this.divPanel.style.top = (topHost + this.txtHost.offsetHeight) + "px";
    }
    else {
        this.divPanel.style.top = (topHost - this.divPanel.offsetHeight) + "px";
    }

    if (topLeft + this.divPanel.offsetWidth < win.p.width) {
        expandRight = true;         // -- 向右展开空间充足 --
    }
    else if (topLeft + this.txtHost.offsetWidth  - this.divPanel.offsetWidth > 0) {
        expandRight = false;         // -- 向左展开空间充足 --
    }
    else {
        if (topLeft < win.p.width / 2) {
            expandRight = true;     // -- 左右空间都不足，控件位置偏左，应向右展开 --
        }
        else {
            expandRight = false;
        }
    }
    if (expandRight) {
        if (topLeft + this.divPanel.offsetWidth > win.p.width) {
            topLeft = win.p.width - this.divPanel.offsetWidth - win.p.width;
            if (topLeft < 0) {
                topLeft = 0;
            }
        }
        this.divPanel.style.left = topLeft + "px";
    }
    else {
        if (topLeft + this.txtHost.offsetWidth - this.divPanel.offsetWidth > 0) {
            this.divPanel.style.left = (topLeft + this.txtHost.offsetWidth - this.divPanel.offsetWidth) + "px";
        }
        else {
            this.divPanel.style.left = "0px";
        }
    }

    this.position = true;
};
window.xwf_dropdown.prototype.collapse = function() {
    if (!this.expanded) return
    if (this.expanding) {
        this.expanding = false;
        return;
    }
    this.divPanel.style.display = "none";
    this.expanded = false;
};
window.xwf_dropdown.prototype.collapseAll = function() {
    ///<summary>收起当前页面的所有下拉框</summary>
    if (window.jsonDropdown) {
        for (var key in window.jsonDropdown) {
            window.jsonDropdown[key].collapse();
        }
    }
};

window.xwf_dropdown.prototype.setEnabled = function(enabled) {
    this.enabled = enabled ? true : false;
    this.divDrop.className = (this.enabled ? "fa fa-chevron-down" : "");
};
window.xwf_dropdown.prototype.setValue = function(newValue) {
    // -- 暂用循环方法实现, 以后改为调用dtb的findByIndex方法 --
    var blFind = false;
    for (var i = 0; i < this.dtbSource.rowCount; i++) {
        if (this.dtbSource.rows[i][this.fieldValue].value == newValue) {
            this.recordRow = i;
            this.dataRow = this.dtbSource.rows[this.recordRow];
            this.txtHost.value = this.dtbSource.rows[i][this.fieldText].value;
            this.txtHost.underValue = this.dtbSource.rows[i][this.fieldValue].value;
            blFind = true;
            break;
        }
    }
    if (!blFind) {
        this.txtHost.value = "";
        this.txtHost.underValue = "";
        this.recordRow = -1;
        this.dataRow = null;
    }
};
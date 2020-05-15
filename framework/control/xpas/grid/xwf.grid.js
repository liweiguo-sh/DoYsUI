/*
* xwf.grid JavaScript Library v1.0
* Author: Volant Lee
* Create Date: 2013-01-06
* Modify Date: 2017-05-29
* Copyright 2013-2017, http://www.xpas-next.com/
* Description: 网格控件 
*/
window.xwf_grid = function (prop, arrColumns) {
    ///<summary>DataGrid，支持固定列、分页、动态加载</summary>
    if (prop == null) return;
    for (var key in prop) this[key] = prop[key];

    // -- 重新初始化类成员变量，避免类实例间共享 ----------
    this.prefix += this.instanceIndex.index++ + "_";
    this.arrColumns = arrColumns;
    // -- 初始化类 ----------------------------------------
    this.init();
    this.resize();
};
window.xwf_grid.prototype = {
    prefix: "xwf_grid_",            // -- 控件统一前缀名称，用于控件id命名 --
    cssPrefix: "xwf_grid_",         // -- 样式表统一前缀名称 --
    instanceIndex: { index: 0 },    // -- 类实例下标 --
    doc: document,                  // -- 类控件document --
    divContainer: null,             // -- 网格容器 --
    imgPath: "",                    // -- 控件图片路径 --

    arrColumns: new Array(),        // -- 字段集数组 --
    funCols: 0,                     // -- 功能列列数 --
    fixedCols: 0,                   // -- 固定列列数 --
    floatCols: 0,                   // -- 浮动列列数 --
    fixedWidth: 0,                  // -- 固定区宽度 --
    floatWidth: 0,                  // -- 浮动区宽度 --
    floatDataWidth: 0,              // -- 浮动区数据表宽度 --    

    height: 0,                      // -- 网格总高度 --
    headerHeight: 35,               // -- 表头区高度 --
    rowHeight: 32,                  // -- 数据区行高(须与css中定义的高度[+1]一致) --

    screenRows: 0,                  // -- 屏幕可显示行数 --
    pageMaxRows: 100,               // -- 每页允许最大行数 --
    currentRows: 0,                 // -- 当前页记录条数 --
    gridRow: -1,                    // -- 当前选中行行号(网格行号) --
    jsonColumnSorted: null,         // -- 当前排序列 --

    arrFixedH: null,                // -- 固定列表头数组 --
    arrFloatH: null,                // -- 浮动列表头数组 --
    arrFixed: null,                 // -- 固定列数据数组 --
    arrFloat: null,                 // -- 浮动列数据数组 --

    divLayoutH2: null,              // -- 浮动列表头表格容器 --
    divLayoutD2: null,              // -- 浮动列数据表格容器 --
    tbFixedH: null,                 // -- 固定列表头表格 --
    tbFloatH: null,                 // -- 浮动列表头表格 --
    tbFixedD: null,                 // -- 固定列数据表格 --
    tbFloatD: null,                 // -- 浮动列数据表格 --

    allowModify: true,              // -- 允许单元格编辑 --
    allowSort: true,                // -- 允许点击标题栏排序 --
    allowFilter: true,              // -- 允许点击标题栏快速筛选 --

    onCellFocus: null,              // -- 单元格焦点事件 --
    onCellBlur: null,               // -- 单元格离开事件 --
    onCellClick: null,              // -- 单元格click事件 --
    onSNClick: null,                // -- 特殊区域SN点击事件回调函数 --

    // ----------------------------------------------------
    summary: function () {
        var strSummary = "xwf 控件类库，网格控件类。";
        return strSummary;
    }
};
// -- 初始化网格 --------------------------------------------------------------
window.xwf_grid.prototype.init = function () {
    ///<summary>初始化网格架构，布局及表头等固定部分</summary>
    var _this = this;
    var i = 0, dataHeight = 0;
    var arrHtml = new Array();
    // ----------------------------------------------------
    if (this.height == 0) this.height = this.divContainer.offsetHeight - 2;
    dataHeight = this.height - this.headerHeight;
    this.screenRows = parseInt(0.3 + dataHeight / this.rowHeight);  //-- 0.3为最后一行最大缺失比例 --
    if (this.screenRows == 0) this.screenRows = 1;

    this._initFixedColumnTH();
    this._initFloatColumnTH();

    this.arrFixed = new Array();
    this.arrFloat = new Array();

    this._initDataColumnTD(this.arrFixed, false);
    this._initDataColumnTD(this.arrFloat, true);
    // ----------------------------------------------------
    arrHtml[i++] = "<table id='" + this.prefix + "tbLayout' class='" + this.cssPrefix + "tbLayout'>";
    arrHtml[i++] = "<tr class='" + this.cssPrefix + "tbLayout_trH'>";
    arrHtml[i++] = "<td id='" + this.prefix + "tdLayoutH1' style='width:" + this.fixedWidth + "px;'></td>";
    arrHtml[i++] = "<td id='" + this.prefix + "tdLayoutH2'><div id='" + this.prefix + "divLayoutH2' style='overflow:hidden;'></div></td>";
    arrHtml[i++] = "</tr>";

    arrHtml[i++] = "<tr>";
    arrHtml[i++] = "<td id='" + this.prefix + "tdLayoutD1' class='" + this.cssPrefix + "tdLayout'><div id='" + this.prefix + "divLayoutD1'></div></td>";
    arrHtml[i++] = "<td id='" + this.prefix + "tdLayoutD2' class='" + this.cssPrefix + "tdLayout'><div id='" + this.prefix + "divLayoutD2' style='overflow:hidden;abackground-color: Red;'></div></td>";
    arrHtml[i++] = "</tr></table>";
    this.divContainer.innerHTML = arrHtml.join("");
    // -- 动态获取对象 ------------------------------------
    this.tbLayout = gId(this.prefix + "tbLayout");
    this.tbLayout._this = _this;

    this.tdLayoutH1 = gId(this.prefix + "tdLayoutH1");
    this.divLayoutH2 = gId(this.prefix + "divLayoutH2");
    this.divLayoutD1 = gId(this.prefix + "divLayoutD1");
    this.tdLayoutD2 = gId(this.prefix + "tdLayoutD2");
    this.divLayoutD2 = gId(this.prefix + "divLayoutD2");
    // -- 生成HTML ----------------------------------------
    this.tdLayoutH1.innerHTML = this.arrFixedH.join("");
    this.divLayoutH2.innerHTML = this.arrFloatH.join("");

    this.tbFixedH = gId(this.prefix + "tbFixedH");
    this.tbFloatH = gId(this.prefix + "tbFloatH");
    //-- 事件绑定 -----------------------------------------
    var jsonColumn = null;
    for (var i = 0; i < this.fixedCols + this.floatCols; i++) {
        jsonColumn = this.arrColumns[i];
        if (jsonColumn.fieldName) {
            jsonColumn.tdHead = gId(this.prefix + "tdHead_" + jsonColumn.fieldName);
            jsonColumn.tdHead.onclick = this._onHeadClick(_this, jsonColumn);
            jsonColumn.tdHead.children[0].onclick = this._onHeadSpanClick(_this, jsonColumn);

            jsonColumn.tdHead.onmousedown = this._onHeadMousedown(_this, jsonColumn);
            jsonColumn.tdHead.onmousemove = this._onHeadMousemove(_this, jsonColumn);
            jsonColumn.tdHead.onmouseup = this._onHeadMouseup(_this);
        }
    }
    gId(this.prefix + "tdSN").onclick = this.onSNClick;
};
window.xwf_grid.prototype.resize = function () {
    this.floatWidth = this.divContainer.clientWidth - this.fixedWidth;

    this.tbLayout.style.width = (this.fixedWidth + this.floatWidth) + "px";
    // -- 宽度 --------------------------------------------
    this.tdLayoutH1.style.width = (this.fixedWidth) + "px";
    this.divLayoutH2.style.width = (this.floatWidth - 2) + "px";
    this.divLayoutD2.style.width = (this.floatWidth - 2) + "px";
    // -- 高度 --------------------------------------------
    this.divLayoutD1.style.height = (this.height - this.headerHeight - 2) + "px";
    this.divLayoutD2.style.height = (this.height - this.headerHeight - 2) + "px";
};

window.xwf_grid.prototype._initFixedColumnTH = function () {
    // -- 生成固定列表头HTML ------
    var iIndex = 0, jsonColumn = {};
    this.arrFixedH = new Array();
    this.fixedWidth = this.fixedCols;   //-- td分隔线本身占用宽度 --

    this.arrFixedH[iIndex++] = "";
    this.arrFixedH[iIndex++] = "<tr>";

    for (var i = 0; i < this.fixedCols; i++) {
        jsonColumn = this.arrColumns[i];
        this.fixedWidth += jsonColumn.width;
        if (jsonColumn.fieldName) {
            this.arrFixedH[iIndex++] = "<td id=" + this.prefix + "tdHead_" + jsonColumn.fieldName + " style='width:" + jsonColumn.width + "px;height:" + (this.headerHeight) + "px;text-align:center;'>";
        }
        else {
            if (jsonColumn.type.equals("sn")) {
                this.arrFixedH[iIndex++] = "<td id='" + this.prefix + "tdSN' style='width:" + jsonColumn.width + "px;height:" + (this.headerHeight) + "px;text-align:" + jsonColumn.align + ";cursor:point;'>";
            }
            else {
                this.arrFixedH[iIndex++] = "<td style='width:" + jsonColumn.width + "px;height:" + (this.headerHeight) + "px;text-align:" + jsonColumn.align + ";'>";
            }
        }
        this.arrFixedH[iIndex++] = "<span>" + jsonColumn.text + "</span></td>";
    }
    this.arrFixedH[iIndex++] = "</tr></table>";
    this.arrFixedH[0] = "<table id='" + this.prefix + "tbFixedH' class='" + this.cssPrefix + "tbHeader xwf_select_none' style='width:" + this.fixedWidth + "px;'>";
};
window.xwf_grid.prototype._initFloatColumnTH = function () {
    // -- 生成浮动列表头HTML ------------------------------
    var iIndex = 0, jsonColumn = {};
    this.arrFloatH = new Array();
    this.floatDataWidth = 0;

    this.arrFloatH[iIndex++] = "";
    this.arrFloatH[iIndex++] = "<tr>";
    for (var i = this.fixedCols; i < this.fixedCols + this.floatCols; i++) {
        jsonColumn = this.arrColumns[i];
        this.floatDataWidth += jsonColumn.width;
        this.arrFloatH[iIndex++] = "<td id=" + this.prefix + "tdHead_" + jsonColumn.fieldName + " style='width:" + jsonColumn.width + "px;height:" + (this.headerHeight) + "px;text-align:center;'>";
        this.arrFloatH[iIndex++] = "<span class='" + this.cssPrefix + "spanCell'>" + jsonColumn.text + "</span></td>";
    }
    this.arrFloatH[iIndex++] = "</tr></table>";
    this.arrFloatH[0] = "<table id='" + this.prefix + "tbFloatH' class='" + this.cssPrefix + "tbHeader xwf_select_none' style='width:" + this.floatDataWidth + "px;'>";
};
window.xwf_grid.prototype._initDataColumnTD = function (arrData, isFloatTD) {
    var iIndex = 0;
    var nColCount = (isFloatTD ? this.floatCols : this.fixedCols);
    var gridRow = 0, gridCol = 0;
    var htmlL = "", htmlR = "", cellId = "";

    var jsonColumn = {};
    // ----------------------------------------------------
    for (var j = 0; j < nColCount; j++) {
        gridCol = (isFloatTD ? this.fixedCols : 0) + j;
        jsonColumn = this.arrColumns[gridCol];
        for (var i = 0; i <= this.screenRows; i++) {    // -- 应该是i < this.screenRows，多一行用于补齐缺半行空白问题 --
            gridRow = i, htmlL = ""; htmlR = "";
            iIndex = 3 * nColCount * i + 3 * j + 1;
            //-- 每行开始 ---------------------------------
            if (j == 0) {
                if (i == 0) {   //-- 首行首列 --
                    htmlL = "<tr trType='gridRow' class='" + this.cssPrefix + "trBgColorA' gridRow=" + gridRow + ">";
                }
                else {
                    htmlL = "</tr><tr trType='gridRow' class='" + this.cssPrefix + "trBgColor" + (i % 2 == 0 ? "A" : "B") + "' gridRow=" + gridRow + ">";
                }
            }
            //-- 单元格HTML左侧字符串 ---------------------
            cellId = this.prefix + "CD_" + i + "_" + (isFloatTD ? this.fixedCols + j : j);     // -- CD：cell data，cellId的结果是：funCols + 记录集中的列下标 --
            htmlL += "<td tdType='gridCol' gridCol='" + gridCol + "' " + (jsonColumn.css ? "class='" + jsonColumn.css + "'" : "") + " style='text-align:" + jsonColumn.align + (i == 0 ? ";width:" + jsonColumn.width + "px" : "") + ";'>";
            if (jsonColumn.gridControl.equals("textbox")) {
                htmlL += "<input type='text' id='" + cellId + "' class='" + this.cssPrefix + "txtCell' onblur='gId(\"" + this.prefix + "tbLayout\")._this.txtOnCellBlur(this," + i + "," + gridCol + ");' onfocus='this.select();gId(\"" + this.prefix + "tbLayout\")._this.txtOnCellFocus(this," + i + "," + gridCol + ");' autocomplete='off' ";
            }
            else if (jsonColumn.gridControl.equals("checkbox")) {
                htmlL += "<input type='checkbox' onclick='gId(\"" + this.prefix + "tbLayout\")._this.checkboxOnClick(this," + i + "," + gridCol + ");' ";
            }

            else if (jsonColumn.gridControl.equals("")) {
                htmlL += "<div class='" + this.cssPrefix + "divCell'>";
                htmlL += "<span class='" + this.cssPrefix + "spanCell' id='" + cellId + "'>";
            }
            else {
                alert("未知的gridControl类型 " + jsonColumn.gridControl);
            }

            //-- 单元格HTML右侧字符串 ---------------------            
            if (jsonColumn.gridControl.equals("textbox")) {
                htmlR += " />";
            }
            else if (jsonColumn.gridControl.equals("checkbox")) {
                htmlR += " />";
            }
            else if (jsonColumn.gridControl.equals("")) {
                htmlR += "</span></div>";
            }
            htmlR += "</td>";
            // --------------------------------------------
            arrData[iIndex++] = htmlL;
            arrData[iIndex++] = "";
            arrData[iIndex++] = htmlR;
        }
    }
    arrData[iIndex] = "</tr></table>";
    arrData[0] = "<table tbType='gridTB' id='" + this.prefix + (isFloatTD ? "tbFloatD" : "tbFixedD") + "' class='" + this.cssPrefix + "tbData' style='width:" + (isFloatTD ? this.floatDataWidth : this.fixedWidth) + "px;" + (isFloatTD ? "" : "") + "'>";
};

// -- 填充加载数据 ------------------------------------------------------------
window.xwf_grid.prototype.setData = function (nRow, nCol, value) {
    ///<summary>网格赋值，外部程序调用请使用setValue</summary>
    var iIndex = 0;
    var newValue = value;
    var gridControl = this.arrColumns[nCol].gridControl;
    // ----------------------------------------------------
    if (gridControl) {
        if (gridControl.equals("textbox")) {
            newValue = "value='" + value + "'";
        }
        else if (gridControl.equals("checkbox")) {
            newValue = value ? "checked='checked'" : "";
        }
    }
    // ----------------------------------------------------
    if (nCol < this.fixedCols) {
        iIndex = 3 * nRow * this.fixedCols + 3 * nCol + 2;
        this.arrFixed[iIndex] = newValue;
    }
    else {
        iIndex = 3 * nRow * this.floatCols + 3 * (nCol - this.fixedCols) + 2;
        this.arrFloat[iIndex] = newValue;
    }
};
window.xwf_grid.prototype.showData = function (jsonPara) {
    ///<summary>将数据显示到网格中</summary>
    // -- 生成 HTML ---------------------------------------
    var _this = this;
    this.divLayoutD1.innerHTML = this.arrFixed.join("");
    this.divLayoutD2.innerHTML = this.arrFloat.join("");

    this.tbFixedD = gId(this.prefix + "tbFixedD");
    this.tbFloatD = gId(this.prefix + "tbFloatD");

    // -- 后期事件绑定 ------------------------------------
    this.tbFixedD.onclick = this.tbDataClick(this);
    this.tbFloatD.onclick = this.tbDataClick(this);

    this.tbFixedD._this = this;
    this.tbFloatD._this = this;
}

// -- 事件处理(垂直水平条/翻页/排序等) ----------------------------------------
window.xwf_grid.prototype._onHeadClick = function (_this, jsonColumn) {
    return function (event) {
        event = event || window.event;

        var srcElement = event.srcElement || event.target;
        var tdHead = jsonColumn.tdHead;
        var fieldName = jsonColumn.fieldName;

        if (!srcElement.tagName.equals("TD")) return;
        if (!_this.allowSort) return;
        if (_this.onDragging2) {
            _this.onDragging2 = false;
            return;
        }
        // ------------------------------------------------
        if (_this.onDraging || jsonColumn.tdHead.offsetWidth - event.offsetX <= 5) return;
        if (_this.jsonColumnSorted) {
            if (_this.jsonColumnSorted.fieldName.equals(fieldName))
                if (jsonColumn.sortDirection.equals("ASC")) {
                    jsonColumn.sortDirection = "DESC";
                }
                else if (jsonColumn.sortDirection.equals("DESC")) {
                    jsonColumn.sortDirection = "";
                }
                else {
                    jsonColumn.sortDirection = "ASC";
                }
            else {
                _this.jsonColumnSorted.tdHead.style.backgroundImage = "";
                jsonColumn.sortDirection = "ASC";
            }
        }
        else {
            jsonColumn.sortDirection = "ASC";
        }
        _this.jsonColumnSorted = jsonColumn;
        tdHead.style.backgroundImage = "url('" + g.controlPath + "grid/style1/" + jsonColumn.sortDirection.toLowerCase() + ".png')";
        // ------------------------------------------------
        _this.gridview.quickSort(jsonColumn.sortDirection.equals("") ? "" : (fieldName + " " + jsonColumn.sortDirection));
    };
};
window.xwf_grid.prototype._onHeadSpanClick = function (_this, jsonColumn) {
    return function () {
        var tdHead = jsonColumn.tdHead;
        var txtQuery = tdHead.txtQuery;
        var spanHead = tdHead.children[0];

        var fieldName = jsonColumn.fieldName;
        // ------------------------------------------------
        if (!_this.allowFilter) return;
        if (txtQuery == null) {
            txtQuery = document.createElement("INPUT");
            tdHead.appendChild(txtQuery);
            tdHead.txtQuery = txtQuery;

            txtQuery.className = _this.cssPrefix + "txtHead";
            txtQuery.onblur = _this._onTxtQueryBlur(txtQuery, spanHead);
            txtQuery.onkeydown = _this._onTxtQueryKeydown(_this, jsonColumn, txtQuery, spanHead);
        }
        // ------------------------------------------------
        spanHead.style.display = "none";
        txtQuery.style.width = (tdHead.clientWidth - 12) + "px";
        txtQuery.style.display = "";
        txtQuery.focus();
    };
};
window.xwf_grid.prototype._onTxtQueryBlur = function (txtQuery, spanHead) {
    return function () {
        txtQuery.style.display = "none";
        spanHead.style.display = "";
    };
};
window.xwf_grid.prototype._onTxtQueryKeydown = function (_this, jsonColumn, txtQuery, spanHead) {
    return function (event) {
        event = event || window.event;
        if (event.keyCode != 13) return;    // -- 13: 回车键 --
        txtQuery.style.display = "none";
        spanHead.style.display = "";

        txtQuery.value = txtQuery.value.trim();
        var queryValue = txtQuery.value;

        _this.gridview.quickQuery(jsonColumn, queryValue);
    };
};

window.xwf_grid.prototype._onHeadMousedown = function (_this, jsonColumn) {
    return function (event) {
        event = event || window.event;
        // ------------------------------------------------
        if (jsonColumn.tdHead.offsetWidth - event.offsetX <= 5) {
            _this.tbDragH = jsonColumn.fixedCol ? _this.tbFixedH : _this.tbFloatH;
            _this.tbDragD = jsonColumn.fixedCol ? _this.tbFixedD : _this.tbFloatD;
            _this.tdDragH = jsonColumn.tdHead;
            _this.tdDragD = _this.tbDragD.rows[0].children[_this.tdDragH.cellIndex];

            _this.screenX0 = event.screenX; // -- mousedown时鼠标相对屏幕的X位置 --
            _this.dragTbW0 = _this.tbDragH.offsetWidth; // -- mousedown时单元格宽度 --
            _this.dragTdW0 = _this.tdDragH.offsetWidth; // -- mousedown时单元格宽度 --

            if (g.b.ie) _this.tdDragH.setCapture();
            _this.jsonColumnDrag = jsonColumn;
            _this.onDragging = true;
            _this.onDragging2 = true;   // -- 防止拖动后触发click事件 --
        }
    };
};
window.xwf_grid.prototype._onHeadMousemove = function (_this, jsonColumn) {
    return function (event) {
        event = event || window.event;
        // ------------------------------------------------
        if (_this.onDragging) {
            var nMoveX = event.screenX - _this.screenX0;
            if (_this.dragTdW0 + nMoveX < 20) return;   // -- 拖动后最小列宽控制为20 --

            _this.tbDragH.style.width = (_this.dragTbW0 + nMoveX) + "px";
            _this.tdDragH.style.width = (_this.dragTdW0 + nMoveX) + "px";
            _this.tbDragD.style.width = _this.tbDragH.style.width;
            _this.tdDragD.style.width = _this.tdDragH.style.width;
            _this.jsonColumnDrag.width = _this.tdDragH.offsetWidth;   // ??? 
        }
        else {
            jsonColumn.tdHead.style.cursor = (jsonColumn.tdHead.offsetWidth - event.offsetX <= 5 ? "e-resize" : "default");
        }
    };
};
window.xwf_grid.prototype._onHeadMouseup = function (_this) {
    return function (event) {
        if (!_this.onDragging) return;
        event = event || window.event;

        var tdHead = _this.jsonColumnDrag.tdHead;
        var fieldName = _this.jsonColumnDrag.fieldName;
        var cellIndex = tdHead.cellIndex * 3 + 1;
        // ------------------------------------------------ 
        var n1 = 0, n2 = 0;
        var str = "";
        var arrDrag = _this.jsonColumnDrag.fixedCol ? _this.arrFixed : _this.arrFloat;

        _this.jsonColumnDrag.width = _this.tdDragH.clientWidth;

        str = arrDrag[cellIndex];
        n1 = str.indexOf("width:");
        n2 = str.indexOf("px", n1);
        str = str.substring(0, n1 + 6) + _this.tdDragD.style.width + str.substring(n2 + 2);
        arrDrag[cellIndex] = str;

        str = arrDrag[0];
        n1 = str.indexOf("width:");
        n2 = str.indexOf("px", n1);
        str = str.substring(0, n1 + 6) + _this.tbDragD.style.width + str.substring(n2 + 2);
        arrDrag[0] = str;

        if (_this.jsonColumnDrag.fixedCol) {
            _this.fixedWidth = _this.tbDragD.offsetWidth;
        }
        // ------------------------------------------------
        _this.resize();
        if (_this.scroll) {
            _this.scroll.setMultipleH(_this.floatDataWidth / _this.floatWidth);
        }

        if (g.b.ie) tdHead.releaseCapture();
        _this.onDragging = false;
    };
};

// -- 网格方法 ----------------------------------------------------------------
window.xwf_grid.prototype.selectRow = function (gridRow) {
    // -- 取消原选中行的选中状态 --------------------------
    if (this.gridRow >= 0 && this.gridRow < this.screenRows) {
        gId(this.prefix + "tbFixedD").rows[this.gridRow].className = this.cssPrefix + "trBgColor" + (this.gridRow % 2 == 0 ? "A" : "B");
        if (this.floatCols > 0) {
            gId(this.prefix + "tbFloatD").rows[this.gridRow].className = this.cssPrefix + "trBgColor" + (this.gridRow % 2 == 0 ? "A" : "B");
        }
    }

    // -- 更新当前选中行的选中状态 ------------------------
    this.gridRow = gridRow;
    if (this.gridRow >= 0 && this.gridRow < this.screenRows) {
        gId(this.prefix + "tbFixedD").rows[this.gridRow].className = this.cssPrefix + "trHighlight";
        if (this.floatCols > 0) {
            gId(this.prefix + "tbFloatD").rows[this.gridRow].className = this.cssPrefix + "trHighlight";
        }
    }

    // -- 回调上级回调函数 --------------------------------
    if (this.onRowClick) {
        this.onRowClick(this.gridRow);
    }
};
window.xwf_grid.prototype.setValue = function (gridRow, gridCol, newValue) {
    ///<summary>网格单元格赋值，外部程序调用。</summary>
    ///<param name="gridRow">网格控件的行下标</param>
    ///<param name="gridCol">网格控件的列下标</param>
    ///<param name="newValue">单元格新值</param>

    var cellDom = gId(this.prefix + "CD_" + gridRow + "_" + gridCol);  // -- 单元格DOM对象 --
    // ----------------------------------------------------
    if (cellDom == null) return;    // -- 隐藏列 --
    if (cellDom.tagName == "SPAN") {
        cellDom.innerHTML = newValue;
    }
    else if (cellDom.tagName == "INPUT") {
        if (cellDom.type == "text") {
            cellDom.value = newValue;
        }
    }
};

// -- 网格事件 ----------------------------------------------------------------
window.xwf_grid.prototype.tbDataClick = function (_this) {
    return function (evt) {
        if (_this.cancelClick) return;
        // ------------------------------------------------
        var gridRow = 0, gridCol = 0;

        var srcTB = null, srcTR = null, srcTD = null;
        var srcTarget = g.x.getEventTarget(evt);
        var srcParent = srcTarget;
        // -- 1. 得到网格行号和列号 -----------------------
        while (srcParent) {
            if (srcParent.tagName.equals("TD") && srcParent.getAttribute("tdType") == "gridCol") {
                srcTD = srcParent;
                gridCol = parseInt(srcTD.getAttribute("gridCol"));
            }
            else if (srcParent.tagName.equals("TR") && srcParent.getAttribute("trType") == "gridRow") {
                srcTR = srcParent;
                gridRow = parseInt(srcTR.getAttribute("gridRow"));

            }
            else if (srcParent.tagName.equals("TABLE") && srcParent.getAttribute("tbType") == "gridTB") {
                srcTB = srcParent;
                _this = srcTB._this;
                break;
            }
            srcParent = srcParent.parentElement;
        }
        if (srcTR == null) return;
        // ------------------------------------------------
        if (!_this.gridview.winForm || _this.gridview.winForm.closed) {
            // -- 无编辑界面，或编辑界面已关闭，禁止通过网格操作改变高亮行(选中行) --
            _this.selectRow(gridRow);
        }
        if (_this.onCellClick) {
            _this.onCellClick({ grid: _this, gridRow: gridRow, gridCol: gridCol });
        }
    };
};

window.xwf_grid.prototype.txtOnCellFocus = function (txt, gridRow, gridCol) {
    var _this = null;
    var srcParent = txt.parentElement;
    // ----------------------------------------------------
    while (srcParent) {
        if (srcParent.tagName.equals("TABLE")) {
            _this = srcParent._this;
            break;
        }
        srcParent = srcParent.parentElement;
    }
    if (_this.cancelClick) return;
    // ----------------------------------------------------
    var jsonPara = {
        grid: _this,
        gridRow: gridRow,
        gridCol: gridCol,
        control: txt,
        value: txt.value
    };
    _this.onCellFocus(jsonPara);
};
window.xwf_grid.prototype.txtOnCellBlur = function (txt, gridRow, gridCol) {
    var _this = null;
    var srcParent = txt.parentElement;
    // ----------------------------------------------------
    this.cancelClick = false;
    while (srcParent) {
        if (srcParent.tagName.equals("TABLE")) {
            _this = srcParent._this;
            break;
        }
        srcParent = srcParent.parentElement;
    }
    // ----------------------------------------------------
    var jsonPara = {
        grid: _this,
        gridRow: gridRow,
        gridCol: gridCol,
        control: txt,
        newValue: txt.value
    };
    var blReturn = _this.onCellBlur(jsonPara);
};
window.xwf_grid.prototype.checkboxOnClick = function (chk, rowIndex, colIndex) {
    var _this = null;
    var jsonColumn = null;
    var srcParent = chk.parentElement;
    // ----------------------------------------------------
    while (srcParent) {
        if (srcParent.tagName.equals("TABLE")) {
            _this = srcParent._this;
            jsonColumn = _this.arrColumns[colIndex];
            break;
        }
        srcParent = srcParent.parentElement;
    }
    // ----------------------------------------------------
    var jsonPara = {
        grid: _this,
        control: chk,
        rowIndex: _this.indexFrom + rowIndex,
        jsonColumn: jsonColumn,
        newValue: (chk.checked ? 1 : 0)
    };
    var blReturn = _this.onCellBlur(jsonPara);
};
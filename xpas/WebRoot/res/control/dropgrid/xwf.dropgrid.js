/*
* xwf.tab JavaScript Library v1.0
* Author: Volant Lee
* Create Date: 2014-06-24
* Modify Date: 2014-08-25
* Copyright 2014, http://www.xznext.com/
* Description: 下拉网格控件 
*/
var css_xwf_dropgrid = true;
// -- 类定义 ------------------------------------------------------------------
window.xwf_dropgrid = function (prop) {
    ///<summary>下拉网格控件</summary>
    if (prop == null) return;
    if (this.topDoc) {
        alert("用法错误, xwf_dropgrid控件只能实例化一次, 请阅读开发文档.");
        return;
    }

    this.topDoc = document;
    for (var key in prop) {
        this[key] = prop[key];
    }
    // -- 初始化类 ----------------------------------------
    this.init();
};
window.xwf_dropgrid.prototype = {
    prefix: "xwf_dropgrid_",        //-- 类实例统一前缀名称，用于类内部创建的控件id命名 --
    cssPrefix: "xwf_dropgrid_",     //-- 样式表统一前缀名称 --
    topDoc: null,                   //-- 类宿主窗口对象 --
    zIndex: 60000,                  //-- 
    uniqueId: 0,                    //--

    txtProp: {},                    //-- 当前下拉控件的属性集合 --
    pageRows: 12,                   //-- 单页显示最大行数 --
    expanded: false,                //-- 下拉面板是否已展开 --
    // ----------------------------------------------------
    summary: function () {
        var strSummary = "xwf 控件类库，下拉网格控件类。";
        return strSummary;
    }
};

// -- 初始化控件 --------------------------------------------------------------
window.xwf_dropgrid.prototype.init = function () {
    var _this = this;
    var tbPanel = this.topDoc.createElement("TABLE");
    this.topDoc.body.appendChild(tbPanel);
    this.tbPanel = tbPanel;
    tbPanel._this = this;
    tbPanel.id = this.prefix + "tbPanel";
    tbPanel.className = this.cssPrefix + "tbPanel";
    tbPanel.style.zIndex = this.zIndex;
    tbPanel.style.display = "none";

    var trPanel = tbPanel.insertRow(-1);
    var tdData = trPanel.insertCell(-1);
    this.tdData = tdData;

    var tdScroll = trPanel.insertCell(-1);
    this.tdScroll = tdScroll;

    var divVScroll = this.topDoc.createElement("DIV");
    this.divVScroll = divVScroll;
    tdScroll.appendChild(divVScroll);
    divVScroll.className = this.cssPrefix + "divVScroll";

    var divVScrollH = this.topDoc.createElement("DIV");
    this.divVScrollH = divVScrollH;
    divVScroll.appendChild(divVScrollH);
    divVScrollH.className = this.cssPrefix + "divVScrollH";

    // -- 创建背景iframe, 防止被ocx之类的控件遮挡 ---------
    var ifrBack = this.topDoc.createElement("iframe");
    this.topDoc.body.appendChild(ifrBack);
    this.ifrBack = ifrBack;
    ifrBack.className = this.cssPrefix + "ifrBack";
    ifrBack.style.zIndex = this.zIndex - 1;
    ifrBack.style.display = "none";

    //-- 事件绑定 -----------------------------------------
    divVScroll.onscroll = this._onVerticalScroll(_this);
};
window.xwf_dropgrid.prototype.bindTextbox = function (ctlText, prop, ctlDiv) {
    var _this = this;

    if (ctlText.id.equals("")) {
        showErr("控件ID不能为空, bindTextbox失败.");
        return false;
    }
    this.uniqueId++;
    ctlText.controlType = "dropgrid";
    // -- 创建下拉图标控件 --------------------------------
    if (ctlDiv == null) {
        ctlDiv = ctlText.ownerDocument.createElement("DIV");
        ctlText.parentElement.appendChild(ctlDiv);
        ctlDiv._this = this;
        ctlDiv.id = this.prefix + "divDrop_" + this.uniqueId;
        ctlDiv.className = this.cssPrefix + "divDrop";
    }
    else {
        if (ctlDiv.txtProp) {   // -- 已经初始化过 --
            this.txtProp = txtProp;
            return;
        }
    }

    ctlDiv.onclick = this.dropClick(_this);
    // -- 参数初始化 --------------------------------------
    var txtProp = {
        text: ctlText,                      // -- 控件文本框对象 --
        divDrop: ctlDiv,                    // -- 下拉图标对象 --
        maxWidth: ctlText.offsetWidth,
        disabled: false,                    // -- 是否可用 -- 
        itemSelect: null,                   // -- 下列选中事件回调函数 --

        textField: ctlText.getAttribute("textField") || prop.dtb.columns[0].name,          // -- 文本框显示字段名称(只允许一个字段) --
        valueField: ctlText.getAttribute("valueField") || prop.dtb.columns[0].name,        // -- 文本框存储字段名称(只允许一个字段) --
        searchField: ctlText.getAttribute("searchField") || prop.dtb.columns[0].name,      // -- 文本框搜索列名称（允许多字段，逗号分割) --
        colCount: ctlText.getAttribute("colCount") || 1,                                   // -- 要显示的字段列列数 --

        dtb: null,                          // -- 数据源 datatable 类型 --
        lastSearch: "_$_",                  // -- 末次搜索的字符串(初始值为非空任意字符) --
        arrColumn: new Array(),
        arrSearch: new Array(),
        arrResult: new Array(),
        id: this.uniqueId                   // -- 下拉控件全局索引 --
    };
    for (var key in prop) {
        txtProp[key] = prop[key];
    }
    if (txtProp.itemSelect == null && txtProp.text.itemSelect) txtProp.itemSelect = txtProp.text.itemSelect;

    if (txtProp.dtb != null) {
        for (var i = 0; i < txtProp.colCount && i < txtProp.dtb.columnCount; i++) {
            txtProp.arrColumn.push(txtProp.dtb.columns[i].name);
        }
    }
    txtProp.arrSearch = txtProp.searchField.replaceAll(" ", "").replaceAll("，", ",").split(",");

    // ----------------------------------------------------
    ctlText._this = this;
    ctlText.txtProp = txtProp;
    ctlText.divDrop = ctlDiv;

    ctlText.onfocus = function (event) {
        var _this = ctlText._this;
        _this.txtProp = ctlText.txtProp;
    };
    ctlText.onkeyup = function (event) {
        event = event || window.event;
        if (event == null) {
            if (g.b.ie && (g.b.ie == 7 || g.b.ie == 8)) {
                event = this.document.parentWindow.event;
            }
        }
        _this.onTextKeyup(event);
    };
    ctlText.onblur = function (event) {
        return;
        event = event || window.event;
        if (event == null) {
            if (g.b.ie && (g.b.ie == 7 || g.b.ie == 8)) {
                event = this.document.parentWindow.event;
            }
        }

        var _this = ctlText._this;
        if (_this.expanded) {
            if (_this.txtProp.arrResult.length > 0) {
                _this.rowClick(_this.txtProp.arrResult[0]);
                return;
            }
        }
    };

    if (ctlText.ownerDocument.onclick == null) {   // -- 控件脱离框架独立运行时 --
        ctlText.ownerDocument.onclick = function (event) {
            var element = null;
            event = event || window.event;
            if (event) {
                element = event.srcElement ? event.srcElement : event.target;
            }
            else {  // -- 兼容ie7/8 --
                element = this.activeElement;
            }
            if (element && element.txtProp) {
                return;
            }
            if (topWin.dropgrid) topWin.dropgrid.collapse();
            _this.collapse();
        };
    }
    ctlText.underValue = "";
    ctlText.drRow = null;
    ctlText.setValue = this.setValue;
    // ----------------------------------------------------
    ctlDiv.txtProp = txtProp;
    ctlDiv.text = ctlText;
    this.showDrop(ctlText);
};

// -- 控件方法 ----------------------------------------------------------------
window.xwf_dropgrid.prototype.showDrop = function (text) {
    var divDrop = text.divDrop;

    divDrop.style.display = text.style.display;
    divDrop.style.top = (getOffsetTop(text) + 3) + "px";
    divDrop.style.width = (text.offsetHeight) + "px";
    divDrop.style.height = (Math.max(0, text.offsetHeight - 2)) + "px";
    divDrop.style.left = (Math.max(0, getOffsetLeft(text) + text.offsetWidth - divDrop.offsetWidth - 3)) + "px";
};
window.xwf_dropgrid.prototype.expand = function () {
    if (this.expanded) return;
    this.expanded = true;
    this.tbPanel.style.display = "";
    this.txtProp.text.focus();
    this.showData(0);

    this.ifrBack.style.display = "";
    this.ifrBack.style.top = this.tbPanel.offsetTop + "px";
    this.ifrBack.style.left = this.tbPanel.offsetLeft + "px";
    this.ifrBack.style.width = this.tbPanel.offsetWidth + "px";
    this.ifrBack.style.height = this.tbPanel.offsetHeight + "px";
};
window.xwf_dropgrid.prototype.collapse = function () {
    this.tbPanel.style.display = "none";
    this.expanded = false;

    this.ifrBack.style.display = "none";
};

window.xwf_dropgrid.prototype.rowClick = function (rowId) {
    var dtRow = this.txtProp.dtb.rows[rowId];

    this.txtProp.text.value = dtRow[this.txtProp.textField].value;
    this.txtProp.text.underValue = dtRow[this.txtProp.valueField].value;
    this.txtProp.text.drRow = dtRow[this.txtProp.valueField];
    if (this.txtProp.text.onchange) this.txtProp.text.onchange();

    if (this.txtProp.itemSelect) {
        this.txtProp.itemSelect(dtRow);
    }
    this.collapse();
};
// -- 控件事件 ----------------------------------------------------------------
window.xwf_dropgrid.prototype.dropClick = function (_this) {
    return function (event) {
        var divDrop = this;
        var txtProp = divDrop.txtProp;
        // -- 1. 关闭已打开的下拉网格, 切换到当前下拉网格 --
        if (_this.txtProp.id != txtProp.id) {
            _this.collapse();
            _this.txtProp = txtProp;
        }

        if (_this.expanded) {   // -- 如果已展开, 则执行收起操作并退出 --
            _this.collapse();
            return;
        }
        if (txtProp.text.disabled) return;
        // -- 2. 第一次展开, 初始化数据源 -----------------
        if (txtProp.dtb == null) {
            if (txtProp.getDataSource) {
                txtProp.dtb = txtProp.getDataSource();
                if (txtProp.dtb != null) {
                    for (var i = 0; i < txtProp.colCount && i < txtProp.dtb.columnCount; i++) {
                        txtProp.arrColumn.push(txtProp.dtb.columns[i].name);
                    }
                }
            }
        }
        if (txtProp.dtb == null) return;
        // -- 3. 显示数据并展开下拉网格 -------------------
        if (txtProp.text.beforeDropClick) {
            if (!txtProp.text.beforeDropClick()) {
                return false;
            }
        }
        _this.filter("");   //-- 鼠标点击下拉时，显示全部数据 --
        _this.expand();
    };
};
window.xwf_dropgrid.prototype.onTextKeyup = function (event) {
    if (event.keyCode == 37 || event.keyCode == 39) return;
    if (event.keyCode == 13 && this.expanded) {
        if (this.txtProp.arrResult.length > 0) {
            this.rowClick(this.txtProp.arrResult[0]);
            return;
        }
    }
    this.txtProp.text.underValue = "";

    var strSearch = this.txtProp.text.value.trim();
    this.filter(strSearch);
    this.showData(0);
    this.expand();
};

window.xwf_dropgrid.prototype._onVerticalScroll = function (_this) {
    return function () {
        var divVScroll = _this.divVScroll;
        var percent = 1.01 * (divVScroll.scrollTop / divVScroll.scrollHeight);

        _this.showData(percent);
    }
};

// -- 动态过滤、显示数据、程序赋值 --------------------------------------------
window.xwf_dropgrid.prototype.filter = function (strSearch) {
    //if (this.txtProp.lastSearch.equals(strSearch)) return;    // -- 对级联下拉框有影响，暂时去除 --

    if (strSearch.equals("")) {
        this.txtProp.arrResult = new Array(this.txtProp.dtb.rowCount);
        for (var i = 0; i < this.txtProp.dtb.rowCount; i++) {
            this.txtProp.arrResult[i] = i;
        }
    }
    else {
        this.txtProp.arrResult = this.txtProp.dtb.search(this.txtProp.arrSearch, strSearch);
    }
    this.txtProp.lastSearch = strSearch;
};
window.xwf_dropgrid.prototype.showData = function (percent) {
    var d1 = new Date();
    var idx = 0, indexEnd = 0
    var indexFrom = (percent ? parseInt(percent * this.txtProp.arrResult.length) : 0);
    var arrHtml = new Array();
    //-------------------------------------------------
    if (indexFrom > this.txtProp.arrResult.length - this.pageRows) indexFrom = this.txtProp.arrResult.length - this.pageRows;
    if (indexFrom < 0) indexFrom = 0;
    indexEnd = indexFrom + this.pageRows;
    if (indexEnd > this.txtProp.arrResult.length) indexEnd = this.txtProp.arrResult.length;
    if (this.txtProp.arrResult[0] == null) indexEnd = 0;

    arrHtml[idx++] = "<table class='" + this.cssPrefix + "tbData'>";
    for (var i = indexFrom; i < indexEnd; i++) {
        var rowId = this.txtProp.arrResult[i];
        arrHtml[idx++] = "<tr onclick=\"gId('" + this.tbPanel.id + "')._this.rowClick(" + rowId + "); \">";
        for (var j = 0; j < this.txtProp.arrColumn.length; j++) {
            arrHtml[idx++] = "<td>" + this.txtProp.dtb.rows[rowId][this.txtProp.arrColumn[j]].value + "</td>";
        }
        arrHtml[idx++] = "</tr>";
    }
    arrHtml[idx++] = "</table>";
    this.tdData.innerHTML = arrHtml.join("");
    //-- 生成滚动条 ---------------------------------------
    if (indexFrom == 0) this.setSize();

    if (this.txtProp.arrResult.length == 0) this.tdData.style.height = "25px";

    this.tdData.style.width = this.tdData.childNodes[0].offsetWidth + "px";
    if (this.tbPanel.offsetWidth < this.txtProp.text.offsetWidth) {
        this.tdData.style.width = (this.tdData.offsetWidth + this.txtProp.text.offsetWidth - this.tbPanel.offsetWidth - 1) + "px";
    }
    else {

    }

    if (this.txtProp.offsetLeft + this.txtProp.text.offsetWidth - this.tbPanel.offsetWidth > 15) {
        this.tbPanel.style.left = (this.txtProp.offsetLeft + this.txtProp.text.offsetWidth - this.tbPanel.offsetWidth) + "px";
    }
    else {
        this.tbPanel.style.left = "15px";
    }

    this.txtProp.maxWidth = this.tdData.offsetWidth;

    if (this.tdData.childNodes[0].offsetWidth < this.tdData.clientWidth) {
        this.tdData.childNodes[0].style.width = this.tdData.clientWidth + "px";
    }
};

window.xwf_dropgrid.prototype.setValue = function (value) {
    // -- 暂用循环方法实现, 以后改为调用dtb的find方法 --
    var text = this;
    var _this = this._this;

    _this.txtProp = text.txtProp;
    for (var i = 0; i < _this.txtProp.dtb.rowCount; i++) {
        if (_this.txtProp.dtb.rows[i][_this.txtProp.valueField].value.equals(value)) {
            _this.txtProp.text.underValue = value;
            _this.txtProp.text.value = _this.txtProp.dtb.rows[i][_this.txtProp.textField].value;
            _this.txtProp.text.drRow = _this.txtProp.dtb.rows[i];
            break;
        }
    }
};

// -- 其他：控件宽高及定位 ----------------------------------------------------
window.xwf_dropgrid.prototype.setSize = function () {
    this.tbPanel.style.display = "";
    this.divVScroll.style.height = "0px";
    if (this.pageRows >= this.txtProp.arrResult.length) {
        this.tdScroll.style.display = "none";
    }
    else {
        this.tdScroll.style.display = "";
        this.divVScroll.style.height = (this.tdData.clientHeight - 2) + "px";
        this.divVScrollH.style.height = (this.txtProp.arrResult.length / this.pageRows) * this.divVScroll.offsetHeight + "px";
    }
    //-----------------------------------------------------
    var nTxtTop = getTopOffsetTop(this.txtProp.text);
    var nTxtLeft = getTopOffsetLeft(this.txtProp.text);
    if (nTxtTop < screen.height / 2) {
        this.tbPanel.style.top = (nTxtTop + this.txtProp.text.offsetHeight) + "px";
    }
    else {
        this.tbPanel.style.top = (nTxtTop - this.tbPanel.offsetHeight) + "px";
    }
    this.tbPanel.style.left = (nTxtLeft) + "px";
    this.txtProp.offsetLeft = nTxtLeft;
}; 
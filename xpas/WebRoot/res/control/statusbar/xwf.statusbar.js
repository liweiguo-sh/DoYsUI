/*
* xwf.statusbar JavaScript Library v1.0
* Author: Volant Lee
* Create Date: 2017-11-03
* Modify Date: 2017-11-03
* Copyright 2017, http://www.xpas-next.com/
* Description: 状态栏控件 
*/
var css_xwf_statusbar = true;
// -- 类定义 ------------------------------------------------------------------
window.xwf_statusbar = function (jsonProp) {
    ///<summary>statusbar控件</summary>
    if (jsonProp == null) return;
    for (var key in jsonProp) {
        this[key] = jsonProp[key];
    }
    // -- 重新初始化类成员变量，避免类实例间共享 ----------
    this.prefix += this.instanceIndex.index++ + "_";
    this.bars = {};

    // -- 初始化 ------------------------------------------
    this.initControl();
};
window.xwf_statusbar.prototype = {
    prefix: "xwf_statusbar_",             // -- 类实例统一前缀名称，用于类内部创建的控件id命名 --
    cssPrefix: "xwf_statusbar_",          // -- 样式表统一前缀名称 --
    instanceIndex: { index: 0 },        // -- 类实例下标 --
    doc: document,                      // -- 类宿主窗口 --

    domContainer: null,                 // -- 宿主容器 --
    height: "M",                        // -- 状态栏高度(L：36px；M：30px；S：24px) --    
    onclick: null,                      // -- bar点击事件回调函数 --

    bars: null,                         // -- bar集合 --
    tbLayout: null,                     // -- 状态栏布局表格 --
    trLayout: null,                     // -- 布局表格TR对象 --
    tdFirst: null,                      // -- 状态栏第一个bar对象 --

    summary: function () {
        var strSummary = "xwf 控件类库，状态栏控件类。";
        return strSummary;
    }
};
// -- 初始化状态栏控件 --------------------------------------------------------
window.xwf_statusbar.prototype.initControl = function () {
    if (this.height.equals("M") || this.height.equals("")) {
        this.height = 30;
    }
    else if (this.height.equals("L")) {
        this.height = 36;
    }
    else if (this.height.equals("S")) {
        this.height = 24;
    }

    this.domContainer.style.height = this.height + "px";
    this.domContainer.style.overflow = "hidden";
    // ----------------------------------------------------
    this.tbLayout = this.doc.createElement("TABLE");
    this.domContainer.appendChild(this.tbLayout);
    this.tbLayout.className = this.cssPrefix + "tbLayout";
    this.tbLayout.style.width = this.domContainer.offsetWidth + "px";

    this.trLayout = this.tbLayout.insertRow(0);
    // -- 居左按钮组 --------------------------------------
    this.tdFirst = this.trLayout.insertCell(0);
    this.tdFirst.className = this.cssPrefix + "tdFirst";
    if (!g.b.ie || g.b.ie > 6) {
        this.tdFirst.style.height = (this.height - (this.tbLayout.offsetTop - this.domContainer.offsetTop) - 2) + "px";
    }
    else {
        this.tdFirst.style.height = (this.height - this.tbLayout.offsetTop - 2) + "px";
    }
};

// -- private methods ---------------------------------------------------------

// -- events ------------------------------------------------------------------
window.xwf_statusbar.prototype.onBarClick = function (_this, key) {
    return function (evt) {
        if (_this.onclick) {
            _this.onclick(_this.bars[key]);
        }
    };
};

// -- public methods ----------------------------------------------------------
window.xwf_statusbar.prototype.addBar = function (para) {
    var _this = this;
    var tdBar = null;
    var jsonBar = {
        key: "K_" + this.trLayout.children.length,
        type: "text",
        tdBar: null,                // -- TD对象 --
        width: 80,                  // -- 宽度，默认80 --
        text: ""
    };
    jsonBar = g.x.extendJSON(jsonBar, para);

    if (this.bars[jsonBar.key]) {
        // -- 已存在 --
        return;
    }
    // ------------------------------------------------
    tdBar = this.trLayout.insertCell();
    tdBar.className = this.cssPrefix + "tdBar";
    tdBar.style.width = jsonBar.width + "px";
    tdBar.innerHTML = jsonBar.text;
    tdBar.onclick = this.onBarClick(_this, jsonBar.key);

    jsonBar.tdBar = tdBar;
    this.bars[jsonBar.key] = jsonBar;
};
window.xwf_statusbar.prototype.setValue = function (key, value) {
    var bar = this.bars[key];
    bar.tdBar.innerHTML = value;
};
window.xwf_statusbar.prototype.showMessage = function (message) {
    this.tdFirst.innerHTML = message;
};
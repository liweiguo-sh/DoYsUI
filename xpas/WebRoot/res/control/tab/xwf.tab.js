/*
* xwf.tab JavaScript Library v1.0
* Author: Volant Lee
* Create Date: 2013-02-25
* Modify Date: 2018-06-22
* Copyright 2018, xpas-next.com
* Description: 选项卡控件 
* Modify Date: 2018-11-14
* 添加 setTabVisible 方法，可以设置标签是否可见
*/
var css_xwf_tab = true;
// -- 类定义 ------------------------------------------------------------------
window.xwf_tab = function (prop) {
    ///<summary>选项卡控件</summary>
    if (prop == null) return;
    for (var key in prop) {
        this[key] = prop[key];
    }
    // -- 重新初始化类成员变量，避免类实例间共享 ----------
    this.prefix += this.instanceIndex.index++ + "_";
    this.keys = new Array();

    this.init();
};
window.xwf_tab.prototype = {
    prefix: "xwf_tab_",                 // -- 控件统一前缀名称，用于控件id --
    cssPrefix: "xwf_tab_",              // -- 控件css前缀命名 --
    instanceIndex: { index: 0 },        // -- 类实例下标 --
    doc: document,
    divContainer: null,                 // -- 树控件容器 --

    tabs: {},                           // -- 所有标签集合 --
    keys: new Array(),                  // -- 所有标签KEY值数组 --
    defaultTabKey: "",                  // -- 初始化时首次选中的标签, 默认为第一个 --
    trTab: null,                        // -- 

    borderColor: null,                  // -- 边框颜色 --
    borderWidth: null,                  // -- 边框宽度 --

    tabBeforeClick: null,               // -- 标签beforeClick事件回调函数 --
    tabClick: null,                     // -- 标签click事件回调函数 --    
    tabSelected: null,                  // -- 当前选中的TAB --
    // ----------------------------------------------------
    summary: function () {
        var strSummary = "xwf 控件类库，选项卡控件类。";
        return strSummary;
    }
};

// -- 初始化类 ----------------------------------------------------------------
window.xwf_tab.prototype.init = function () {
    if (this.borderColor == null) this.borderColor = g.x.getCurrentStyle(this.divContainer, "borderLeftColor");
    if (this.borderWidth == null) this.borderWidth = g.x.getCurrentStyle(this.divContainer, "borderLeftWidth");

    var tbTab = this.doc.createElement("TABLE");
    this.divContainer.parentElement.insertBefore(tbTab, this.divContainer);
    this.tbTab = tbTab;
    tbTab.className = this.cssPrefix + "tbTab";

    this.trTab = tbTab.insertRow(-1);
    // var tdBlank = this.trTab.insertCell(-1);
    // this.tdBlank = tdBlank;
    // tdBlank.innerHTML = "<div style='border-bottom:solid " + this.borderWidth + " " + this.borderColor + ";'>&nbsp;</div>";

    this.divContainer.style.borderTop = "0px";
};

// -- public method ------------------------------------------------------------
window.xwf_tab.prototype.addTab = function (jsonTab) {
    var tab = {
        key: "",                // -- 选项卡KEY --
        text: "",
        title: "",

        tdTab: "",              // -- 子选项卡对应的TD --
        control: "",            // -- 子选项卡对应的控件 --
        firstSelect: true,      // -- 第一次被选中 --
        selected: false         // -- 子选项卡是否被选中 --
    };
    tab = g.x.extendJSON(tab, jsonTab);
    this.tabs[tab.key] = tab;
    this.keys.push(tab.key);

    var tdTab = this.trTab.insertCell(this.keys.length - 1);
    tab.tdTab = tdTab;
    tdTab.title = tab.title;
    tdTab.onclick = this.onTabClick(this, tab);
    var div = this.doc.createElement("DIV");
    tdTab.appendChild(div);
    div.innerHTML = tab.text
    div.style.borderWidth = this.borderWidth;
    div.style.borderColor = this.borderColor;

    if ((this.defaultTabKey && this.defaultTabKey.equals(tab.key))
        || (!this.defaultTabKey && this.keys.length == 1)) {
        tdTab.className = this.cssPrefix + "tdTabSelected";
        if (tab.control) tab.control.style.display = "";
        this.tabSelected = tab;
    }
    else {
        tdTab.className = this.cssPrefix + "tdTab";
        if (tab.control) tab.control.style.display = "none";
    }
    if (tab.control.tagName.equals("DIV") || tab.control.offsetHeight == 0) {
        tab.control.style.height = (this.divContainer.clientHeight - 20) + "px";
    }
    // this.tdBlank.style.width = (this.tdBlank.clientWidth + this.divContainer.offsetWidth - this.tbTab.offsetWidth) + "px";
};
window.xwf_tab.prototype.selectTab = function (tabKey) {
    this.tabs[tabKey].tdTab.click();
};
window.xwf_tab.prototype.setTabVisible = function (tabKey, visible) {
    this.tabs[tabKey].tdTab.style.display = visible ? "" : "none";
};

// -- 选项卡Click事件 ---------------------------------------------------------
window.xwf_tab.prototype.onTabClick = function (_this, tab) {
    return function (evt) {
        if (_this.tabBeforeClick) {
            if (!_this.tabBeforeClick(tab)) return;
        }
        // ----------------------------------------------------
        if (!_this.tabSelected.key.equals(tab.key)) {
            _this.tabSelected.tdTab.className = _this.cssPrefix + "tdTab";
            if (_this.tabSelected.control) {
                _this.tabSelected.control.style.display = "none";
            }
        }
        tab.tdTab.className = _this.cssPrefix + "tdTabSelected";

        if (tab.control) {
            tab.control.style.display = "";
        }
        _this.tabSelected = tab;
        // ----------------------------------------------------
        if (_this.tabClick) {
            _this.tabClick(tab);
        }

        tab.firstSelect = false;
    };
};
/*
 * xwf.bar JavaScript Library v1.0
 * Author: Volant Lee
 * Create Date: 2013-03-08
 * Modify Date: 2017-09-27
 * Copyright 2017, http://www.xpas-next.com/
 * Description: 任务栏控件 
 */
var css_xwf_taskbar = true;
// -- 类定义 ------------------------------------------------------------------
window.xwf_taskbar = function(jsonProp) {
    ///<summary>任务栏控件</summary>
    if (jsonProp == null) return;
    for (var key in jsonProp) {
        this[key] = jsonProp[key];
    }

    // -- 重新初始化类成员变量，避免类实例间共享 ----------
    this.prefix += this.instanceIndex.index++ + "_";
    this.doc = this.doc;
    this.init();
};
window.xwf_taskbar.prototype = {
    prefix: "xwf_taskbar_", // -- 类实例统一前缀名称，用于类内部创建的控件id命名 --
    cssPrefix: "xwf_taskbar_", // -- 样式表统一前缀名称 --
    instanceIndex: { index: 0 }, // -- 类实例下标 --
    doc: document, // -- 类宿主窗口 --
    divContainer: null, // -- 控件容器 --

    win: null, // -- 窗口对象 --
    maxWidth: 0, // -- 任务栏最大总宽度 --
    minWidth: 150, // -- 单个任务条最小宽度 --
    defaultBarKey: "", // -- 初始化是首次选中的标签, 默认为第一个 --
    barSelect: null, // -- 任务栏选中事件回调函数 --
    barClose: null, // -- 任务栏关闭事件回调函数 --

    barId: 0, // -- 任务栏ID --
    barIds: "", // -- 任务栏ID字符串集合 --
    trBar: null, // -- 
    divClose: null, // -- 关闭图标 --
    bars: {}, // -- 所有标签集合 --
    activeBar: null, // -- 当前活动的BAR --
    // ----------------------------------------------------
    summary: function() {
        var strSummary = "xwf 控件类库，任务栏控件类。";
        return strSummary;
    }
};
// -- 初始化类 ----------------------------------------------------------------
window.xwf_taskbar.prototype.init = function() {
    var _this = this;
    this.maxWidth = document.documentElement.clientWidth - 200;
    // this.maxWidth = this.divContainer.offsetWidth;

    var tbBar = this.doc.createElement("TABLE");
    this.divContainer.appendChild(tbBar);
    this.tbBar = tbBar;
    tbBar.className = this.cssPrefix + "tbBar";

    this.trBar = tbBar.insertRow(-1);
    var tdDesktop = this.trBar.insertCell(-1);
    this.tdDesktop = tdDesktop;
    tdDesktop.onclick = this.showDesktop(_this);
    tdDesktop.className = this.cssPrefix + "tdDesktop xwf_select_none";
    tdDesktop.innerHTML = "<span class='fa fa-desktop' style='margin-left:8px;'>&nbsp;工作台</span>";

    var divClose = this.doc.createElement("DIV");
    this.divContainer.appendChild(divClose);
    this.divClose = divClose;
    divClose.id = this.prefix + "divClose";
    divClose.className = this.cssPrefix + "divClose fa fa-close";
    divClose.style.display = "none";
    divClose.onclick = function(event) {
        var bar = this.bar;
        _this.closeBar(bar);
    };
};

// -- 添加、关闭新任务栏 ------------------------------------------------------
window.xwf_taskbar.prototype.addBar = function(jsonBar) {
    var _this = this;
    var bar = {
        _this: _this,
        key: "", //-- 任务栏KEY --
        text: "", //-- 任务栏标题 --
        title: "", //-- 任务栏提示信息 --

        tdBar: "", //-- 子任务栏对应的TD --
        flashBar: _this.flashBar,
        selected: false //-- 子任务栏是否被选中 --
    };
    bar = g.x.extendJSON(bar, jsonBar);
    bar.id = this.prefix + this.barId++;
    this.bars[bar.id] = bar;
    this.barIds = bar.id + "," + this.barIds;

    var tdBar = this.trBar.insertCell();
    bar.tdBar = tdBar;
    tdBar.className = this.cssPrefix + "tdBar";
    tdBar.innerHTML = "<div class='" + this.cssPrefix + "divText'>" + bar.text + "</div>";
    tdBar.title = bar.title ? bar.title : bar.text;

    tdBar.onclick = function() {
        _this.activeBar(bar);
    };
    tdBar.onmouseover = this.onBarMouseIn(this, bar);
    // ----------------------------------------------------
    this.tdDesktop.className = this.cssPrefix + "tdDesktop xwf_select_none";
    if (this.barActive) {
        this.barActive.win.fakeHide();
        this.barActive.tdBar.className = this.cssPrefix + "tdBar xwf_select_none";
    }
    tdBar.className = this.cssPrefix + "tdBarActive xwf_select_none";
    this.barActive = bar;
    // ----------------------------------------------------
    this.adjustBarWidth();
    return bar;
};
window.xwf_taskbar.prototype.closeBar = function(bar) {
    var index = 0;

    if (bar.win) {
        bar.win.bar = null; //-- 避免循环调用 --
        var blReturn = bar.win.close();
        if (!blReturn) { //-- 关闭窗口失败 --
            bar.win.bar = bar;
            return false;
        }
    }
    // --- 触发close回调函数 --------------------------
    if (this.barClose) {
        var blReturn = this.barClose(bar);
        if (!blReturn) return;
    }
    // --- 关闭任务栏 ---------------------------------
    if (this.barActive && this.barActive.id.equals(bar.id)) this.barActive = null;
    this.divClose.style.display = "none";
    this.trBar.removeChild(bar.tdBar);
    delete bar.tdBar;
    delete this.bars[bar.id];

    this.barIds = this.barIds.replace(bar.id + ",", "");
    this.adjustBarWidth();
    // -- 模拟点击任务栏 ------------------------------
    index = this.barIds.indexOf(",");
    if (index <= 0) return;
    var barId = this.barIds.substring(0, index);
    if (this.bars[barId].tdBar.click) {
        this.bars[barId].tdBar.click();
    } else {
        try { //-- safari不支持td.click方法，采用下面兼容写法实现  --
            var evt = this.doc.createEvent('Event');
            evt.initEvent('click', true, true);
            this.bars[barId].tdBar.dispatchEvent(evt);
        } catch (e) { alert(e) };
    }
};

window.xwf_taskbar.prototype.adjustBarWidth = function() {
    var nWidth = 90 + (this.trBar.children.length - 1) * this.minWidth; // -- 90是tdDesktop的宽度 --
    if (nWidth > this.maxWidth) nWidth = this.maxWidth;
    this.tbBar.style.width = nWidth + "px";

    this.divClose.style.display = "none";
};
// -- 任务栏Click事件 ---------------------------------------------------------
window.xwf_taskbar.prototype.onBarMouseIn = function(_this, bar) {
    return function(event) {
        var tdBar = bar.tdBar;
        _this.divClose.bar = bar;
        _this.divClose.style.display = "";
        _this.divClose.style.top = (getTopOffsetTop(tdBar) + (tdBar.offsetHeight - _this.divClose.offsetHeight) / 2) + "px";
        _this.divClose.style.left = (getTopOffsetLeft(tdBar) + (tdBar.offsetWidth - _this.divClose.offsetWidth)) + "px";
    };
};
window.xwf_taskbar.prototype.onBarMouseOut = function(_this, bar) {
    return function(evt) {
        var srcElement = g.x.getEventTarget(evt);
        if (srcElement.tagName.equals("DIV")) {
            if (srcElement.id.equals(_this.divClose.id) || srcElement.className.equals(_this.cssPrefix + "divText")) {
                return;
            }
        }
        _this.divClose.style.display = "none";
    };
};

window.xwf_taskbar.prototype.flashBar = function(strMessage) {
    var bar = this;
    var _this = bar._this;
    var className = bar.tdBar.className;
    var classFlash = _this.cssPrefix + "tdFlashBar";
    var nInterval = 150;

    bar.tdBar.className = _this.cssPrefix + "tdFlashBar";
    setTimeout(_this._resetTitle(bar.tdBar, className), 1 * nInterval);

    setTimeout(_this._resetTitle(bar.tdBar, classFlash), 2 * nInterval);
    setTimeout(_this._resetTitle(bar.tdBar, className), 3 * nInterval);

    setTimeout(_this._resetTitle(bar.tdBar, classFlash), 4 * nInterval);
    setTimeout(_this._resetTitle(bar.tdBar, className), 5 * nInterval);
};
window.xwf_taskbar.prototype._resetTitle = function(tdBar, className) {
    return function() {
        tdBar.className = className;
    };
};

// -- 方法 --------------------------------------------------------------------
window.xwf_taskbar.prototype.activeBar = function(bar) {
    if (this.barActive && this.barActive.id.equals(bar.id)) return;

    if (this.barSelect) {
        if (!this.barSelect(bar)) return;
    }

    this.tdDesktop.className = this.cssPrefix + "tdDesktop xwf_select_none";
    if (this.barActive) {
        this.barActive.win.fakeHide();
        this.barActive.tdBar.className = this.cssPrefix + "tdBar";
    }
    bar.tdBar.className = this.cssPrefix + "tdBarActive";

    this.barActive = bar;
    this.barIds = bar.id + "," + this.barIds.replace(bar.id + ",", "");

    if (bar.win) bar.win.activeWin();
};
window.xwf_taskbar.prototype.showDesktop = function(_this) {
    return function(evt) {
        if (_this.barActive) {
            _this.barActive.win.fakeHide();
            _this.barActive.tdBar.className = _this.cssPrefix + "tdBar xwf_select_none";
        }
        _this.tdDesktop.className = _this.cssPrefix + "tdDesktopActive xwf_select_none";
        _this.barActive = null;
    };
};
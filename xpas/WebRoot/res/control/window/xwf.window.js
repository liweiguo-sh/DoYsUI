/*
* xwf.win JavaScript Library v1.0
* Author: Volant Lee
* Create Date: 2013-02-21
* Modify Date: 2019-08-29
* Copyright 2013-2019, xpas-next.com
* Description: 窗口控件 
*/
var css_xwf_window = true;
// -- 类定义 ------------------------------------------------------------------
window.xwf_window = function (jsonProp) {
    ///<summary>window控件，支持窗口拖动、模态窗口、窗口组、最大化等</summary>
    if (jsonProp == null) return;
    for (var key in jsonProp) {
        this[key] = jsonProp[key];
    }
    this.zIndexFrom = this.zIndex;
    this.init();
};
window.xwf_window.prototype = {
    prefix: "xwf_win_",
    doc: top.document,                  // -- 
    rangeContainer: null,               // -- 窗口活动区域容器 --

    taskbar: null,                      // -- 任务栏控件 --
    zIndexFrom: 30000,                  // -- 初始窗口集zIndex --
    zIndex: 30000,                      // -- 当前最大zIndex --

    top: 0,                             // -- 窗口容器区域TOP --
    left: 0,                            // -- 窗口容器区域LEFT --
    maxWidth: 0,                        // -- 窗口最大宽度 --
    maxHeight: 0,                       // -- 窗口最大高度 --
    titleHeight: 30,                    // -- 窗口标题栏高度30，具体数值须与css中设定的值一致 --
    borderWidth: 11,                    // -- 窗体iframe左右padding合计值 --
    borderHeight: 10,                   // -- 窗体iframe上下padding合计值 --  

    windowId: 0,                        // -- 窗口ID下标 --   
    arrWindows: new Array(),            // -- 窗口集数组 --
    divModal: null,                     // -- 通用模态层 --

    // ----------------------------------------------------
    summary: function () {
        var strSummary = "xwf 控件类库，窗口类。";
        return strSummary;
    }
};

window.xwf_window.prototype.init = function () {
    this.zIndex = this.zIndex;
    if (this.rangeContainer == null) {
        if (this.maxWidth == 0) this.maxWidth = this.doc.body.clientWidth;
        if (this.maxHeight == 0) this.maxHeight = this.doc.documentElement.clientHeight;
    }
    else {
        if (this.top == 0) this.top = getOffsetTop(this.rangeContainer);
        if (this.left == 0) this.left = getOffsetLeft(this.rangeContainer);
        if (this.maxWidth == 0) this.maxWidth = this.rangeContainer.clientWidth;
        if (this.maxHeight == 0) this.maxHeight = this.rangeContainer.clientHeight;
    }
    this.maxWidth -= this.borderWidth;
    this.maxHeight -= (this.borderHeight + this.titleHeight);

    this.divModal = top.document.createElement("DIV");
    top.document.body.appendChild(this.divModal);
    this.divModal.id = this.prefix + "divModal";
    this.divModal.className = this.prefix + "divModal";
    this.divModal.style.display = "none";

    if (this.taskbar) {
        this.taskbar.win = this;
    }
};

// -- 创建、打开新窗口 --------------------------------------------------------
window.xwf_window.prototype.openWindow = function (_jsonProp, _jsonPara) {
    if (_jsonProp.url == null || _jsonProp.url.equals("")) {
        alert("缺少参数【窗口url】.");
        return;
    }
    if (_jsonProp.width && _jsonProp.width < 1) _jsonProp.width = this.maxWidth * _jsonProp.width;
    if (_jsonProp.height && _jsonProp.height < 1) _jsonProp.height = this.maxHeight * _jsonProp.height;
    if (_jsonProp.top) _jsonProp.top0 = _jsonProp.top;
    if (_jsonProp.left) _jsonProp.left0 = _jsonProp.left;

    this.cancelactiveWin = true;
    var win = this.createWindow(_jsonProp);
    var p = {
        text: "loading...",
        title: "",
        windowState: "normal",
        width: 360,
        height: 120,
        maxHeight: this.maxHeight,

        noTitle: false,                     // -- 是否无标题栏窗口 --

        onResizeEvents: new Array(),        // -- onresize 事件监听函数集合--
        afterLoadEvents: new Array(),       // -- afterLoad 事件监听函数集合--
        beforeCloseEvents: new Array(),     // -- beforeClose 事件监听函数集合 --
        afterCloseEvents: new Array()       // -- afterClose 事件监听函数集合 --
    };
    win.p = g.x.extendJSON(p, _jsonProp);
    win.para = _jsonPara;
    if (p.parent) {
        win.parent = p.parent;
        win.parentWindow = p.parent.window;
        win.parentDocument = p.parent.window.document;
        win.parent.arrChildren.push(win);
        win.level = 1 + win.parent.level;
    }
    else {
        win.level = 0;
    }
    win.arrChildren = new Array();

    win.setTitle(win.p.title);
    win.closed = false;

    if (win.p.noTitle) win.tbWin.style.display = "none";
    if (win.p.windowState.equals("maximized")) win.maxWindow();

    win.iframe.src = _jsonProp.url + (_jsonProp.url.indexOf("?") > 0 ? "&" : "?") + "rnd=" + Math.random();
    win.show();
    // ----------------------------------------------------
    if (this.taskbar && !win.parent) {
        var bar = this.taskbar.addBar({ key: win.id, text: win.p.text, title: win.p.title });
        bar.win = win;
        win.bar = bar;
    }
    if (win.p.menu) win.p.menu.win = win;

    this.currentWin = win;
    return win;
};
window.xwf_window.prototype.createWindow = function (p) {
    var _this = this;
    var idx = 0, windowId = this.windowId++;
    var arrHtml = new Array();
    // ----------------------------------------------------
    arrHtml[idx++] = "<table id='" + this.prefix + "tbWin_" + windowId + "' class='" + this.prefix + "tbWin' style='width:200px;'><tr>";
    arrHtml[idx++] = "<td id='" + this.prefix + "tdIcon_" + windowId + "' class='" + this.prefix + "tdIcon'></td>";
    arrHtml[idx++] = "<td id='" + this.prefix + "tdTitle_" + windowId + "' class='" + this.prefix + "tdTitle xwf_select_none'></td>";
    arrHtml[idx++] = "<td id='" + this.prefix + "tdClose_" + windowId + "' class='" + this.prefix + "tdClose'><div class='fa fa-close'></div></td>";
    arrHtml[idx++] = "</tr></table>";

    arrHtml[idx++] = "<iframe id='" + this.prefix + "iframe_" + windowId + "' src='about:blank' class='" + this.prefix + "ifrWin" + (p.windowState ? "Max" : "") + "' ";
    arrHtml[idx++] = "frameborder='0' style='width:300px;height:100px;'></iframe>";
    // ----------------------------------------------------
    var divWin = this.doc.createElement("DIV");
    this.doc.body.appendChild(divWin);
    divWin.id = this.prefix + "divWin_" + windowId;
    divWin.className = this.prefix + "divWin" + (p.windowState ? "Max" : "");
    divWin.style.zIndex = this.zIndex;
    divWin.innerHTML = arrHtml.join("");
    divWin.style.left = "-3000px";

    var iframe = gId(this.prefix + "iframe_" + windowId);
    var win = {
        _this: _this,
        id: windowId,
        divWin: divWin,
        tbWin: gId(this.prefix + "tbWin_" + windowId),
        tdIcon: gId(this.prefix + "tdIcon_" + windowId),
        tdTitle: gId(this.prefix + "tdTitle_" + windowId),
        tdClose: gId(this.prefix + "tdClose_" + windowId),
        iframe: iframe,
        closed: false
    };
    divWin.win = win;
    iframe.win = win;
    // ----------------------------------------------------
    win.setTitle = this.setTitle;
    win.flashTitle = this.flashTitle;
    win.setSize = this.setSize;
    win.resize = this.resize;
    win.maxWindow = this.maxWindow;
    win.activeWin = this.activeWin;

    win.show = this.show;
    win.hide = this.hide;
    win.fakeHide = this.fakeHide;
    win.setDisabled = this.setDisabled;
    win.close = this.close;
    win.tdClose.onclick = function (event) { win.close(); };

    win.addEventListener = this.addEventListener;
    // ----------------------------------------------------
    if (iframe.addEventListener) {
        iframe.addEventListener("load", function (event) { _this.onFormLoad(event); }, false);
    }
    else {
        // -- 低版本IE --
        iframe.attachEvent("onload", function (event) { _this.onFormLoad(event); });
        //iframe.attachEvent("onreadystatechange", function (event) { _this.iframe_onreadystatechange(event.srcElement.win); });
        //iframe.addEventListener("load", function (event) { _this.autoSize(event.target.win); }, false);
        //iframe.contentWindow.document.attachEvent("onclick", function (event) { alert(''); });
        //iframe.contentWindow.document.attachEvent("onclick", _this._contentDoc_onclick);
    }
    // -- 窗口拖动类初始化 --------------------------------
    if (g.b.ie && g.b.ie < 9) {
        divWin.xwf_ui = new window.xwf_ui_drag({
            top: _this.top,
            height: _this.maxHeight,
            objTrigger: win.tdTitle,
            objDrag: divWin,
            containerWin: window
        });
    }
    else {
        divWin.onmousedown = function (evt) {
            evt = evt || window.event;
            divWin.mousedownX = evt.screenX;
            divWin.mousedownY = evt.screenY;
            divWin.draggable = true;
        };
        divWin.ondragend = function (evt) {
            evt = evt || window.event;
            var newTop = win.p.top + evt.screenY - divWin.mousedownY;
            var newLeft = win.p.left + evt.screenX - divWin.mousedownX;
            divWin.win.setSize(newLeft, Math.max(0, newTop));
            divWin.draggable = false;   // -- 如果不设为false，ie浏览器中通过鼠标单击input控件无法得到焦点 --
        };
    }

    this.arrWindows.push(win);
    this.zIndex += 2;
    return win;
};

window.xwf_window.prototype.onFormLoad = function (event) {
    var iframe = g.b.ie ? event.srcElement : event.target;
    if (!iframe || iframe.src == "about:blank") return;

    var win = iframe.win;
    var _this = win._this;
    var contentWindow = iframe.contentWindow;
    // ----------------------------------------------------
    contentWindow.win = win;
    contentWindow.topWin = win.p.topWin;
    win.window = contentWindow;
    win.document = contentWindow.document;
    contentWindow.document.onactive = function () {
        alert("onactive ???");
        // _this.activeWin(win);
    };
    contentWindow.document.body.onclick = function (evt) {
        if (_this.cancelactiveWin) {    // -- 避免按钮打开新窗口后, 触发按钮所在窗口的active事件(不是很完美) --
            _this.cancelactiveWin = false;
        }
        else {
            _this.activeWin(win);
            // ------------------------
            var element = g.x.getEventTarget(evt);
            if (!element && win.window) {  // -- 兼容ie7/8 --
                element = win.window.document.activeElement;
            }
            // -- 收起当前窗口的所有dropdown --
            if (!win.closed && win.window.xwf_dropdown) {
                if (element && element.dropdownControl) return;
                win.window.xwf_dropdown.prototype.collapseAll();
            }
        }
    };

    _this.autoSize(_this, win);
    if (contentWindow.formLoad) {
        contentWindow.formLoad();
    }

    for (var i = 0; i < win.p.afterLoadEvents.length; i++) {
        win.p.afterLoadEvents[i](win);
        if (win.closed) return; // -- 特殊情况，打开窗口后立即被代码调用win.close()方法关闭 --
    }

    _this.autoSize(_this, win);
    win.setTitle(contentWindow.document.title || win.p.title);
};
window.xwf_window.prototype.iframe_onreadystatechange = function (win) {
    var winId = win.id;
    var iframe = win.iframe;
    var state = iframe.readyState;

    if (state.equals("loading") || state.equals("interactive")) {
    }
    else if (state.equals("complete")) {
        iframe.contentWindow.jwin = win;
    }
    else {
        alert("未知的状态, " + state + ".");
    }
};

// -- 窗口方法A -----------------------------------------------------------------
window.xwf_window.prototype.show = function () {
    var win = this;
    var _this = win._this;
    // ----------------------------------------------------
    if (win.closed) {
        alert("用法错误, 窗口已关闭.");
        return;
    }
    // ----------------------------------------------------
    if (win.hidden) {
        _this.activeWin(win)
    }
    win.divWin.style.display = "";
    _this.showModal(_this, win);
    // ----------------------------------------------------
    win.hidden = false;
};
window.xwf_window.prototype.hide = function () {
    var win = this;
    var _this = win._this;
    win.divWin.style.display = "none";
    win.hidden = true;

    if (win.p.modal) {
        _this.divModal.style.display = "none";
    }
};
window.xwf_window.prototype.fakeHide = function () {
    var win = this;
    var _this = win._this;
    // -- 递归子窗口 --------------------------------------
    for (var i = 0; i < win.arrChildren.length; i++) {
        win.arrChildren[i].fakeHide();
    }

    // -- 隐藏当前窗口 ------------------------------------
    if (win.divWin.style.display.equals("")) {
        win.divWin.style.display = "none";
    }
    if (_this.divModal.style.display.equals("")) {
        _this.divModal.style.display = "none";
    }
};
window.xwf_window.prototype.close = function (para) {
    var win = this;
    var _this = win._this;
    var divWin = win.divWin;
    if (win.closed || win.closing) return;

    win.closing = true;
    // -- 0、beforeCloseEvent -----------------------------
    for (var i = 0; i < win.p.beforeCloseEvents.length; i++) {
        var blReturn = win.p.beforeCloseEvents[i](win);
        if (para && (para.callerIsParent || para.callerIsSystem)) {
            // -- 父窗口关闭时，递归关闭子窗口 --
        }
        else {
            if (blReturn == false) {
                win.closing = false;
                return;
            }
        }
    }
    //-- 1、关闭子窗口 ------------------------------------
    for (var i = win.arrChildren.length - 1; i >= 0; i--) {
        win.arrChildren[i].close({ callerIsParent: true });
    }
    if (win.parent) {
        var winParent = win.parent;
        for (var i = 0; i < winParent.arrChildren.length; i++) {
            if (win.id == winParent.arrChildren[i].id) {
                winParent.arrChildren.splice(i, 1);
            }
        }
    }
    for (var i = 0; i < _this.arrWindows.length; i++) {
        if (_this.arrWindows[i].id == win.id) {
            _this.arrWindows.splice(i, 1);
            break;
        }
    }
    // -- 2、关闭任务栏 -----------------------------------
    if (win.bar) {
        win.bar.win = null; //-- 避免bar关闭时调用win.close() --
        _this.taskbar.closeBar(win.bar);
    }

    // -- 3、回调事件 -------------------------------------
    for (var i = 0; i < win.p.afterCloseEvents.length; i++) {
        win.p.afterCloseEvents[i](win);
    }
    if (win.p.menu && win.p.menu.drMenu) {
        if (win.p.menu.drMenu["menu_onlyone"].value == 1) {
            win.p.menu.opened = false;
        }
    }
    // -- 4、回收资源  ------------------------------------
    if (win.p.modal) {
        _this.divModal.style.display = "none";
    }
    if (win.p.parent) {
        if (win.p.parent.p.modal) {
            _this.divModal.style.display = "";
            _this.divModal.style.zIndex = win.p.parent.divWin.style.zIndex - 1;
        }
    }

    win.iframe.win = null;
    win.iframe.src = "about:blank";
    divWin.removeChild(win.tbWin);
    divWin.removeChild(win.iframe);
    _this.doc.body.removeChild(win.divWin);

    for (var key in win) {
        win[key] = null;
    }
    win.closed = true;
    win.closing = false;

    if (g.b.ie) CollectGarbage();
    return true;
};
window.xwf_window.prototype.closeCurrentWin = function () {
    if (this.currentWin == null) return;
    this.currentWin.close();
};

window.xwf_window.prototype.showModal = function (_this, winModal) {
    if (!winModal.p.modal) return;

    if (true) {
        _this.divModal.style.top = "0px";
        _this.divModal.style.left = "0px";
        _this.divModal.style.width = screen.availWidth + "px";
        _this.divModal.style.height = screen.availHeight + "px";
    }
    else {
        _this.divModal.style.top = _this.rangeContainer.offsetTop + "px";
        _this.divModal.style.left = _this.rangeContainer.offsetLeft + "px";
        _this.divModal.style.width = _this.rangeContainer.offsetWidth + "px";
        _this.divModal.style.height = _this.rangeContainer.offsetHeight + "px";
    }

    _this.divModal.style.zIndex = winModal.divWin.style.zIndex - 1;
    _this.divModal.style.display = "";
    _this.divModal.win = winModal;  // -- 记录当前模态层为谁服务 --
};

window.xwf_window.prototype.setTitle = function (newTitle) {
    var win = this;
    var _this = win._this;

    win.p.title = newTitle;
    win.tdTitle.innerHTML = win.p.title;
    win.tdTitle.className = _this.prefix + "tdTitle";
};
window.xwf_window.prototype.flashTitle = function (strMessage) {
    var win = this;
    var _this = win._this;
    var tdTitle = win.tdTitle;

    tdTitle.innerHTML = strMessage;
    tdTitle.className = _this.prefix + "tdTitle " + _this.prefix + "tdTitleFlash";
    if (_this.handleTimeout) {
        clearTimeout(_this.handleTimeout);
    }
    _this.handleTimeout = setTimeout(function () { if (win.closed) return; win.setTitle(win.p.title) }, 3000);
};

// -- 窗口方法B -----------------------------------------------------------------
window.xwf_window.prototype.setSize = function (left, top, width, height) {
    var win = this;

    if (top != null) win.p.top = top;
    if (left != null) win.p.left = left;
    if (width != null) win.p.width = width;
    if (height != null) win.p.height = height;

    win.divWin.style.top = win.p.top + "px";
    win.divWin.style.left = win.p.left + "px";
    win.iframe.style.width = win.p.width + "px";
    win.iframe.style.height = win.p.height + "px";
    win.tbWin.style.width = win.iframe.offsetWidth + "px";

    for (var i = 0; i < win.p.onResizeEvents.length; i++) {
        win.p.onResizeEvents[i]();
    }
};
window.xwf_window.prototype.autoSize = function (_this, win) {
    if (win.p.windowState.equals("maximized")) return;

    var divWin = win.divWin;
    var tbWin = win.tbWin;
    var iframe = win.iframe;
    var contentWindow = iframe.contentWindow;
    var contentDocument = contentWindow.document;
    var contentBody = contentWindow.document.body;

    var scrollHeight = Math.max(contentDocument.body.scrollHeight, contentDocument.documentElement.scrollHeight);
    var scrollWidth = Math.max(contentDocument.body.scrollWidth, contentDocument.documentElement.scrollWidth);

    var top = win.p.top, left = win.p.left, width = win.p.width, height = win.p.height;
    //-------------------------------------------------
    if (height < scrollHeight) {
        var marginBottom = parseInt(g.x.getCurrentStyle(contentBody, "marginBottom").replace("px"));
        height = scrollHeight + marginBottom;
    }
    height = Math.min(height, _this.maxHeight);
    iframe.style.height = height + "px";

    if (width < scrollWidth) {
        var marginRight = parseInt(g.x.getCurrentStyle(contentBody, "marginRight").replace("px"));
        width = scrollWidth + marginRight;
    }
    width = Math.min(width, _this.maxWidth);
    iframe.style.width = Math.min(width, _this.maxWidth) + "px";

    if (_this.top0 == null) top = _this.top + 0.5 * (_this.maxHeight - height);
    if (_this.left0 == null) left = _this.left + 0.5 * (_this.maxWidth - divWin.offsetWidth);
    if (top < _this.top) top = _this.top;
    if (left < _this.left) left = _this.left;

    win.setSize(left, top, width, height);
};
window.xwf_window.prototype.maxWindow = function () {
    var win = this;
    var _this = win._this;

    win.setSize(_this.left, _this.top, (_this.maxWidth + 1), _this.maxHeight + (win.p.noTitle ? _this.titleHeight : 0));
};

window.xwf_window.prototype.activeWin = function (win) {
    var win = win || this;
    var _this = win._this;
    var divWin = win.divWin;

    if (win.closed) return;
    if (win.divWin.style.zIndex + 2 == _this.zIndex && win.divWin.style.display.equals("")) return;
    // -- 依次得到上级窗口, 窗口组整体前移 ----------------
    for (var i = win.level; i > 0; i--) {
        var winParent = win;
        for (var j = 0; j < i; j++) {
            winParent = winParent.parent;
        }
        _this.toFront(winParent, (_this.zIndex - parseInt(winParent.divWin.style.zIndex)));
    }
    //-- 当前窗口及下级窗口整体前移 -----------------------
    _this.toFront(win, (_this.zIndex - parseInt(divWin.style.zIndex)));

    //-- 调整zIndex值, 避免zIndex值增长过大 ---------------
    if (_this.zIndex > _this.zIndexFrom + 9000) {
        var arrIdx = new Array();
        for (var i = 0; i < _this.arrWindows.length; i++) {
            arrIdx.push((100000 + parseInt(_this.arrWindows[i].divWin.style.zIndex)).toString() + "_" + _this.arrWindows[i].id);
        }
        arrIdx.sort();

        _this.zIndex = _this.zIndexFrom;
        for (var i = 0; i < arrIdx.length; i++) {
            gId(_this.prefix + "divWin_" + arrIdx[i].split("_")[1]).style.zIndex = _this.zIndex;
            _this.zIndex += 2;
        }
    }

    // -- 显示模态层 --------------------------------------
    if (_this.divModal.win && !_this.divModal.win.closed) {
        _this.divModal.style.zIndex = _this.divModal.win.divWin.style.zIndex - 1;
    }
};
window.xwf_window.prototype.toFront = function (winRoot, margin) {
    if (!winRoot.hidden) winRoot.divWin.style.display = "";
    winRoot.divWin.style.zIndex = parseInt(winRoot.divWin.style.zIndex) + margin;
    this.zIndex = Math.max(this.zIndex, 2 + parseInt(winRoot.divWin.style.zIndex));

    for (var i = 0; i < winRoot.arrChildren.length; i++) {
        this.toFront(winRoot.arrChildren[i], margin);
    }
};

// -- 窗口效果 --------------------------------------------------------------------
window.xwf_window.prototype.setDisabled = function (blDisabled, title) {
    var win = this;
    var _this = win._this;
    var docContent = win.document;

    if (!docContent.divDisabled) {
        docContent.divDisabled = docContent.createElement("DIV");
        docContent.body.appendChild(docContent.divDisabled);
        docContent.divDisabled.className = "divWinDisabled";    // -- 引用页面自行实现Disabled效果 --
        docContent.divDisabled.style.position = "absolute";
    }

    if (blDisabled) {
        docContent.divDisabled.style.display = "";
        docContent.divDisabled.innerHTML = title;

        docContent.divDisabled.style.top = "0px";
        docContent.divDisabled.style.left = "0px";
        docContent.divDisabled.style.width = docContent.body.offsetWidth + "px";
        docContent.divDisabled.style.height = docContent.body.offsetHeight + "px";
    }
    else {
        docContent.divDisabled.style.display = "none";
    }
};

// -- 窗口事件 ----------------------------------------------------------------
window.xwf_window.prototype.addEventListener = function (eventName, fn) {
    var win = this;
    var _this = win._this;

    if (eventName.equals("afterLoad")) {
        win.p.afterLoadEvents.push(fn);
    }
    else if (eventName.equals("beforeClose")) {
        win.p.beforeCloseEvents.push(fn);
    }
    else if (eventName.equals("afterClose")) {
        win.p.afterCloseEvents.push(fn);
    }
    else if (eventName.equals("onResize")) {
        win.p.onResizeEvents.push(fn);
    }
    else {
        alert("Unknown event name (" + eventName + "), please check it.");
    }
};
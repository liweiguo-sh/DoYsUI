/*
 * xwf.scrollbar JavaScript Library v1.0
 * Author: Volant Lee
 * Create Date: 2017-10-19
 * Modify Date: 2017-10-23
 * Copyright 2017, http://www.xpas-next.com/
 * Description: 滚动条控件 
 */
var css_xwf_scrollbar = true;
// -- 类定义 ------------------------------------------------------------------
window.xwf_scrollbar = function(jsonProp) {
    ///<summary>scrollbar控件</summary>
    if (jsonProp == null) return;
    for (var key in jsonProp) {
        this[key] = jsonProp[key];
    }
    // -- 重新初始化类成员变量，避免类实例间共享 ----------
    this.prefix += this.instanceIndex.index++ + "_";

    // -- 初始化 ------------------------------------------
    this.initControl();
};
window.xwf_scrollbar.prototype = {
    prefix: "xwf_scrollbar_", // -- 类实例统一前缀名称，用于类内部创建的控件id命名 --
    cssPrefix: "xwf_scrollbar_", // -- 样式表统一前缀名称 --
    instanceIndex: { index: 0 }, // -- 类实例下标 --
    doc: document, // -- 类宿主窗口 --

    domContainer: null, // -- 宿主容器 --
    scrollWidth: 20, // -- 控件宽度 --
    multipleV: 1, // -- 垂直高度倍数(滚动高度/容器高度) --
    multipleH: 1, // -- 水平宽度倍数 --

    containerTop: 0, // -- 容器offsetTop --
    containerLeft: 0, // -- 容器offsetLeft --
    divModal: null, // -- 模态层，滚动时覆盖容器 --

    divPanelV: null, // -- 垂直滚动条主面板 --
    divT: null, // -- 垂直滚动条顶部三角区 --
    divM: null, // -- 垂直滚动条中间区域 --
    divB: null, // -- 垂直滚动条底部三角区 --
    divV: null, // -- 垂直滚动块 --
    scrollingV: false, // -- 垂直滚动快滚动中 --
    mouseoutV: true, // -- 鼠标离开垂直滚动条区域 --

    divPanelH: null, // -- 水平滚动条主面板 --
    divL: null, // -- 水平滚动条左侧三角区 --
    divC: null, // -- 水平滚动条中间区域 --
    divR: null, // -- 水平滚动条右侧三角区 --
    divH: null, // -- 水平滚动块 --
    scrollingH: false, // -- 水平滚动快滚动中 --
    mouseoutH: true, // -- 鼠标离开水平滚动条区域 --

    onVScroll: null, // -- 垂直滚动事件回调函数 --
    onHScroll: null, // -- 水平滚动事件回调函数 --
    // ----------------------------------------------------
    summary: function() {
        var strSummary = "xwf 控件类库，滚动条控件类。";
        return strSummary;
    }
};
// -- 初始化滚动条控件 ----------------------------------------------------------
window.xwf_scrollbar.prototype.initControl = function() {
    var _this = this;

    this.divModal = this.doc.createElement("DIV");
    this.domContainer.appendChild(this.divModal);
    this.divModal.className = this.cssPrefix + "divModal xwf_select_none";

    this.initVScroll();
    this.initHScroll();
    this.initShow();
    this.initMouseWheel();

    // -- 没办法，只好放大招了，解决容器位置发生变化后滚动条位置不正确的问题 --
    setInterval(function() { _this.abc(); }, 1000);
};
window.xwf_scrollbar.prototype.initMouseWheel = function() {
    var _this = this;
    var divPanelVId = _this.divPanelV ? _this.divPanelV.id : '';

    var scrollFunc = function(e) {
        e = e || window.event; // evt 代表事件（event）对象，即所谓的事件驱动源
        var isScroll = document.getElementById(divPanelVId).style.display;

        if (isScroll !== 'none') {
            // 鼠标滚轮滚动时，判断滚动内容是否超出显示区域，如果是，则支持鼠标滚轮滚动；否则依然。
            if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件 
                if (e.wheelDelta > 0) {
                    // 鼠标滚轮向上滚动
                    _this.divT.onclick();
                } else if (e.wheelDelta < 0) {
                    // 鼠标滚轮向下滚动
                    _this.divB.onclick();
                }

            } else if (e.detail) { //Firefox滑轮事件
                if (e.detail > 0) {
                    // 鼠标滚轮向下滚动
                    _this.divB.onclick();
                } else if (e.detail < 0) {
                    // 鼠标滚轮向上滚动
                    _this.divT.onclick();
                }
            }
        } else {
            return false;
        }
    };

    if (this.domContainer.parentElement.addEventListener) { // 检测 Firefox
        this.domContainer.parentElement.addEventListener('DOMMouseScroll', scrollFunc, false);
    }

    this.domContainer.parentElement.onmousewheel = scrollFunc;

};
window.xwf_scrollbar.prototype.initVScroll = function() {
    var _this = this;
    // ----------------------------------------------------
    this.divPanelV = this.doc.createElement("DIV");
    this.domContainer.appendChild(this.divPanelV);
    this.divPanelV._this = _this;
    this.divPanelV.id = this.prefix + "divPanelV";
    this.divPanelV.className = this.cssPrefix + "divPanelV " + _this.cssPrefix + "out xwf_select_none";
    this.divPanelV.style.width = this.scrollWidth + "px";
    this.divPanelV.onmouseover = this.mouseover(_this, "V");
    this.divPanelV.onmouseout = this.mouseout(_this, "V");

    this.divT = this.doc.createElement("DIV");
    this.divPanelV.appendChild(this.divT);
    this.divT._this = _this;
    this.divT.id = this.prefix + "divT";
    this.divT.className = this.cssPrefix + "divTriangle fa fa-caret-up xwf_select_none";
    this.divT.style.width = this.scrollWidth + "px";
    this.divT.style.height = this.scrollWidth + "px";
    this.divT.style.lineHeight = (this.scrollWidth * 0.9) + "px";
    this.divT.onclick = this.VTriangleClick(_this, "T");

    this.divM = this.doc.createElement("DIV");
    this.divPanelV.appendChild(this.divM);
    this.divM._this = _this;
    this.divM.id = this.prefix + "divM";
    this.divM.className = this.cssPrefix + "divM xwf_select_none";
    this.divM.style.top = this.scrollWidth + "px";
    this.divM.style.width = this.scrollWidth + "px";
    this.divM.onclick = this.MClick(_this);

    this.divV = this.doc.createElement("DIV");
    this.divM.appendChild(this.divV);
    this.divV._this = _this;
    this.divV.id = this.prefix + "divV";
    this.divV.className = this.cssPrefix + "divV fa fa-navicon xwf_select_none";
    this.divV.style.top = "0px";
    this.divV.style.width = this.scrollWidth + "px";
    this.divV.onmousedown = this.mousedown(_this, "V");

    this.divB = this.doc.createElement("DIV");
    this.divPanelV.appendChild(this.divB);
    this.divB._this = _this;
    this.divB.id = this.prefix + "divB";
    this.divB.className = this.cssPrefix + "divTriangle fa fa-caret-down xwf_select_none";
    this.divB.style.width = this.scrollWidth + "px";
    this.divB.style.height = this.scrollWidth + "px";
    this.divB.style.lineHeight = (this.scrollWidth * 0.9) + "px";
    this.divB.onclick = this.VTriangleClick(_this, "B");
};
window.xwf_scrollbar.prototype.initHScroll = function() {
    var _this = this;
    // -- LC(H)R ------------------------------------------
    this.divPanelH = this.doc.createElement("DIV");
    this.domContainer.appendChild(this.divPanelH);
    this.divPanelH._this = _this;
    this.divPanelH.id = this.prefix + "divPanelH";
    this.divPanelH.className = this.cssPrefix + "divPanelH " + _this.cssPrefix + "out xwf_select_none";
    this.divPanelH.style.height = this.scrollWidth + "px";
    this.divPanelH.onmouseover = this.mouseover(_this, "H");
    this.divPanelH.onmouseout = this.mouseout(_this, "H");

    this.divL = this.doc.createElement("DIV");
    this.divPanelH.appendChild(this.divL);
    this.divL._this = _this;
    this.divL.id = this.prefix + "divL";
    this.divL.className = this.cssPrefix + "divTriangle fa fa-caret-left xwf_select_none";
    this.divL.style.width = this.scrollWidth + "px";
    this.divL.style.height = this.scrollWidth + "px";
    this.divL.style.lineHeight = (this.scrollWidth * 0.9) + "px";
    this.divL.onclick = this.HTriangleClick(_this, "L");

    this.divC = this.doc.createElement("DIV");
    this.divPanelH.appendChild(this.divC);
    this.divC._this = _this;
    this.divC.id = this.prefix + "divC";
    this.divC.className = this.cssPrefix + "divC xwf_select_none";
    this.divC.style.left = this.scrollWidth + "px";
    this.divC.style.height = this.scrollWidth + "px";
    this.divC.onclick = this.CClick(_this);

    this.divH = this.doc.createElement("DIV");
    this.divC.appendChild(this.divH);
    this.divH._this = _this;
    this.divH.id = this.prefix + "divH";
    this.divH.className = this.cssPrefix + "divH  fa fa-navicon xwf_select_none";
    this.divH.style.left = "0px";
    this.divH.style.height = this.scrollWidth + "px";
    this.divH.onmousedown = this.mousedown(_this, "H");

    this.divR = this.doc.createElement("DIV");
    this.divPanelH.appendChild(this.divR);
    this.divR._this = _this;
    this.divR.id = this.prefix + "divR";
    this.divR.className = this.cssPrefix + "divTriangle fa fa-caret-right xwf_select_none";
    this.divR.style.width = this.scrollWidth + "px";
    this.divR.style.height = this.scrollWidth + "px";
    this.divR.style.lineHeight = (this.scrollWidth * 0.9) + "px";
    this.divR.onclick = this.HTriangleClick(_this, "R");
};
window.xwf_scrollbar.prototype.initShow = function() {
    var containerTop = getOffsetTop(this.domContainer);
    var containerLeft = getOffsetLeft(this.domContainer);
    var containerWidth = this.domContainer.offsetWidth;
    var containerHeight = this.domContainer.offsetHeight;

    var borderTopWidth = parseInt(g.x.getCurrentStyle(this.domContainer, "borderTopWidth").replace("px", "")) || 0;
    var borderLeftWidth = parseInt(g.x.getCurrentStyle(this.domContainer, "borderLeftWidth").replace("px", "")) || 0;
    var borderRightWidth = parseInt(g.x.getCurrentStyle(this.domContainer, "borderRightWidth").replace("px", "")) || 1;
    var borderBottomWidth = parseInt(g.x.getCurrentStyle(this.domContainer, "borderBottomWidth").replace("px", "")) || 1;
    // -- 1. 垂直滚动条 -----------------------------------
    this.divPanelV.style.display = "";
    // this.divPanelV.style.top = (containerTop + borderTopWidth) + "px";
    // this.divPanelV.style.left = (containerLeft + containerWidth - borderRightWidth - this.divPanelV.offsetWidth) + "px";
    this.divPanelV.style.height = (this.domContainer.clientHeight - borderTopWidth) + "px";

    this.divM.style.height = (this.divPanelV.clientHeight - this.divT.offsetHeight - this.divB.offsetHeight) + "px";
    this.divB.style.top = (this.divT.offsetHeight + this.divM.offsetHeight) + "px";
    this.divV.style.height = (this.multipleV == 0 ? 0 : this.divM.clientHeight / this.multipleV) + "px";
    this.divV.style.lineHeight = (this.divV.offsetHeight) + "px";

    // -- 2. 水平滚动条 -----------------------------------
    this.divPanelH.style.display = "";
    // this.divPanelH.style.top = (containerTop + containerHeight - borderBottomWidth - this.divPanelH.offsetHeight) + "px";
    // this.divPanelH.style.left = (containerLeft + borderLeftWidth) + "px";
    this.divPanelH.style.width = (this.domContainer.clientWidth - borderLeftWidth) + "px";

    this.divC.style.width = (this.divPanelH.clientWidth - this.divL.offsetWidth - this.divR.offsetWidth) + "px";
    this.divR.style.left = (this.divL.offsetWidth + this.divC.offsetWidth) + "px";
    this.divH.style.width = (this.multipleH == 0 ? 0 : this.divC.clientWidth / this.multipleH) + "px";
    this.divH.style.lineHeight = (this.divC.offsetHeight) + "px";

    // -- 3. 模态层 ---------------------------------------
    this.divModal.style.display = "";
    this.divModal.style.height = (this.domContainer.clientHeight - this.divPanelH.offsetHeight) + "px";
    this.divModal.style.width = (this.domContainer.clientWidth - this.divPanelV.offsetWidth) + "px";
    this.divModal.style.left = (this.divPanelV.offsetLeft - this.divModal.offsetWidth) + "px";
    this.divModal.style.top = (this.divPanelH.offsetTop - this.divModal.offsetHeight) + "px";
    this.divModal.style.display = "none";

    this.divPanelV.style.display = (this.multipleV > 1 ? "" : "none");
    this.divPanelH.style.display = (this.multipleH > 1 ? "" : "none");

    // -- 4. 记住当前容器位置 -----------------------------
    this.containerTop = containerTop;
    this.containerLeft = containerLeft;
};

// -- private methods ---------------------------------------------------------
window.xwf_scrollbar.prototype.show = function(VH) {
    if (VH.equals("V")) {
        this.divPanelV.className = this.cssPrefix + "divPanelV xwf_select_none";
    } else if (VH.equals("H")) {
        this.divPanelH.className = this.cssPrefix + "divPanelH xwf_select_none";
    } else {
        alert("xwf_scrollbar debug here.");
    }
};
window.xwf_scrollbar.prototype.hide = function(VH) {
    var blHideV = false,
        blHideH = false;
    // ----------------------------------------------------
    if (VH.equals("V")) {
        blHideV = (this.mouseoutV && !this.scrollingV);
    } else if (VH.equals("H")) {
        blHideH = (this.mouseoutH && !this.scrollingH);
    } else {
        blHideV = (this.mouseoutV && !this.scrollingV);
        blHideH = (this.mouseoutH && !this.scrollingH);
    }
    // ----------------------------------------------------
    if (blHideV) {
        this.divPanelV.className = this.cssPrefix + "divPanelV " + this.cssPrefix + "out xwf_select_none";
    }
    if (blHideH) {
        this.divPanelH.className = this.cssPrefix + "divPanelH " + this.cssPrefix + "out xwf_select_none";
    }
};

window.xwf_scrollbar.prototype.abc = function() {
    if (this.containerTop != getOffsetTop(this.domContainer) || this.containerLeft != getOffsetLeft(this.domContainer)) {
        this.initShow();
        // debug("fix position", true);
    }
};

// -- events ------------------------------------------------------------------
window.xwf_scrollbar.prototype.mousedown = function(_this, VH) {
    return function(evt) {
        evt = evt || window.event;
        // ------------------------------------------------
        if (VH.equals("V")) {
            _this.scrollingV = true;
            _this.divV.Y0 = getOffsetTop(_this.divV) + evt.offsetY; // -- 原始鼠标在当前窗口的Y轴位置 --
            _this.divV.T0 = _this.divV.offsetTop;

            if (g.b.ie && g.b.ie < 9) {
                g.x.addEventListener("mousemove", _this.mousemove, _this.divV);
                g.x.addEventListener("mouseup", _this.mouseup, _this.divV);
            } else {
                g.x.addEventListener("mousemove", _this.mousemove, document.body);
                g.x.addEventListener("mouseup", _this.mouseup, document.body);
            }
            _this.hide("H");
        } else if (VH.equals("H")) {
            _this.scrollingH = true;
            _this.divH.X0 = getOffsetLeft(_this.divH) + evt.offsetX; // -- 原始鼠标在当前窗口的X轴位置 --
            _this.divH.L0 = _this.divH.offsetLeft;

            if (g.b.ie && g.b.ie < 9) {
                g.x.addEventListener("mousemove", _this.mousemove, _this.divH);
                g.x.addEventListener("mouseup", _this.mouseup, _this.divH);
            } else {
                g.x.addEventListener("mousemove", _this.mousemove, document.body);
                g.x.addEventListener("mouseup", _this.mouseup, document.body);
            }
            _this.hide("V");
        } else {
            alert("xwf_scrollbar debug here");
        }
        // ------------------------------------------------
        _this.divModal.style.display = "";

        if (!document.xwf_scollbar) document.xwf_scrollbar = {};
        document.xwf_scrollbar._this = _this;
        document.xwf_scrollbar.VH = VH;
    };
};
window.xwf_scrollbar.prototype.mousemove = function(evt) {
    evt = evt || window.event;

    var evtTarget = g.x.getEventTarget(evt);
    var _this = document.xwf_scrollbar._this;
    var VH = document.xwf_scrollbar.VH;

    // ------------------------------------------------
    if (VH.equals("V")) {
        var Y1 = getOffsetTop(evtTarget) + evt.offsetY;
        var newTop = _this.divV.T0 + Y1 - _this.divV.Y0;
        var fix = _this.divM.clientHeight / 100; // -- 增加1%的余量, 修正四舍五入引起的拖不到底的问题 --
        // ----------------------------------------------------
        if (newTop > (_this.divM.clientHeight - _this.divV.offsetHeight + fix)) {
            newTop = _this.divM.clientHeight - _this.divV.offsetHeight + fix;
        } else if (newTop < 0) {
            newTop = 0;
        }
        _this.divV.style.top = newTop + "px";

        // ----------------------------------------------------
        var percent = (newTop / _this.divM.clientHeight);
        if (_this.onVScroll) {
            _this.onVScroll(percent);
        }
    } else {
        var X1 = getOffsetLeft(evtTarget) + evt.offsetX;
        var newLeft = _this.divH.L0 + X1 - _this.divH.X0;
        var fix = _this.divC.clientWidth / 100; // -- 增加1%的余量, 修正四舍五入引起的拖不到右侧的问题 --
        // ----------------------------------------------------
        if (newLeft > (_this.divC.clientWidth - _this.divH.offsetWidth + fix)) {
            newLeft = _this.divC.clientWidth - _this.divH.offsetWidth + fix;
        } else if (newLeft < 0) {
            newLeft = 0;
        }
        _this.divH.style.left = newLeft + "px";

        // ----------------------------------------------------
        var percent = (newLeft / _this.divC.clientWidth);
        if (_this.onHScroll) {
            _this.onHScroll(percent);
        }
    }
};
window.xwf_scrollbar.prototype.mouseup = function(evt) {
    evt = evt || window.event;

    var evtTarget = g.x.getEventTarget(evt);
    var _this = document.xwf_scrollbar._this;
    var VH = document.xwf_scrollbar.VH;
    // ----------------------------------------------------
    if (VH.equals("V")) {
        if (g.b.ie && g.b.ie < 9) {
            g.x.removeEventListener("mousemove", _this.mousemove, _this.divV);
            g.x.removeEventListener("mouseup", _this.mouseup, _this.divV);
        } else {
            g.x.removeEventListener("mousemove", _this.mousemove, document.body);
            g.x.removeEventListener("mouseup", _this.mouseup, document.body);
        }
        _this.scrollingV = false;
        _this.hide("V");
    } else {
        if (g.b.ie && g.b.ie < 9) {
            g.x.removeEventListener("mousemove", _this.mousemove, _this.divH);
            g.x.removeEventListener("mouseup", _this.mouseup, _this.divH);
        } else {
            g.x.removeEventListener("mousemove", _this.mousemove, document.body);
            g.x.removeEventListener("mouseup", _this.mouseup, document.body);
        }
        _this.scrollingH = false;
        _this.hide("H");
    }
    // ----------------------------------------------------
    _this.divModal.style.display = "none";
};

window.xwf_scrollbar.prototype.mouseover = function(_this, VH) {
    return function(evt) {
        if (VH.equals("V")) {
            _this.mouseoutV = false;
            _this.show("V");

            if (_this.multipleH > 1) {
                _this.divPanelH.style.display = "none";
            }
        } else if (VH.equals("H")) {
            _this.mouseoutH = false;
            _this.show("H");

            if (_this.multipleV > 1) {
                _this.divPanelV.style.display = "none";
            }
        }
    };
};
window.xwf_scrollbar.prototype.mouseout = function(_this, VH) {
    return function(evt) {
        if (VH.equals("V")) {
            _this.mouseoutV = true;
            _this.hide("V");

            if (_this.multipleH > 1) {
                _this.divPanelH.style.display = "";
            }
        } else if (VH.equals("H")) {
            _this.mouseoutH = true;
            _this.hide("H");

            if (_this.multipleV > 1) {
                _this.divPanelV.style.display = "";
            }
        }
    };
};

window.xwf_scrollbar.prototype.VTriangleClick = function(_this, TB) {
    return function(evt) {
        var topChange = (_this.divM.clientHeight / 20) * (TB.equals("T") ? -1 : 1);
        var newTop = _this.divV.offsetTop + topChange;
        // ------------------------------------------------
        if (newTop < 0) {
            newTop = 0;
        } else if (newTop > _this.divM.clientHeight - _this.divV.offsetHeight) {
            newTop = 1.01 * (_this.divM.clientHeight - _this.divV.offsetHeight);
        }
        // ------------------------------------------------
        _this.divV.style.top = newTop + "px";
        if (_this.onVScroll) {
            _this.onVScroll(_this.divV.offsetTop / _this.divM.clientHeight);
        }
    };
};
window.xwf_scrollbar.prototype.HTriangleClick = function(_this, LR) {
    return function(evt) {
        var leftChange = (_this.divC.clientWidth / 20) * (LR.equals("L") ? -1 : 1);
        var newLeft = _this.divH.offsetLeft + leftChange;
        // ------------------------------------------------
        if (newLeft < 0) {
            newLeft = 0;
        } else if (newLeft > _this.divC.clientWidth - _this.divH.offsetWidth) {
            newLeft = 1.01 * (_this.divC.clientWidth - _this.divH.offsetWidth);
        }
        // ------------------------------------------------
        _this.divH.style.left = newLeft + "px";
        if (_this.onHScroll) {
            _this.onHScroll(_this.divH.offsetLeft / _this.divC.clientWidth);
        }
    };
};
window.xwf_scrollbar.prototype.MClick = function(_this) {
    return function(evt) {
        evt = evt || window.event;

        if (!_this.divM.id.equals(g.x.getEventTarget(evt).id)) return false;

        var TB = (evt.offsetY < (_this.divV.offsetTop + _this.divV.offsetHeight / 2) ? "T" : "B");
        var topChange = (_this.divM.clientHeight / 5) * (TB.equals("T") ? -1 : 1);
        var newTop = _this.divV.offsetTop + topChange;
        // ------------------------------------------------
        if (newTop < 0) {
            newTop = 0;
        } else if (newTop > _this.divM.clientHeight - _this.divV.offsetHeight) {
            newTop = 1.01 * (_this.divM.clientHeight - _this.divV.offsetHeight);
        }
        // ------------------------------------------------
        _this.divV.style.top = newTop + "px";
        if (_this.onVScroll) {
            _this.onVScroll(_this.divV.offsetTop / _this.divM.clientHeight);
        }
    };
};
window.xwf_scrollbar.prototype.CClick = function(_this) {
    return function(evt) {
        evt = evt || window.event;
        if (!_this.divC.id.equals(g.x.getEventTarget(evt).id)) return false;

        var LR = (evt.offsetX < (_this.divH.offsetLeft + _this.divH.offsetWidth / 2) ? "L" : "R");
        var leftChange = (_this.divC.clientWidth / 5) * (LR.equals("L") ? -1 : 1);
        var newLeft = _this.divH.offsetLeft + leftChange;
        // ------------------------------------------------
        if (newLeft < 0) {
            newLeft = 0;
        } else if (newLeft > _this.divC.clientWidth - _this.divH.offsetWidth) {
            newLeft = 1.01 * (_this.divC.clientWidth - _this.divH.offsetWidth);
        }
        // ------------------------------------------------
        _this.divH.style.left = newLeft + "px";
        if (_this.onHScroll) {
            _this.onHScroll(_this.divH.offsetLeft / _this.divC.clientWidth);
        }
    };
};

// -- public methods ----------------------------------------------------------
window.xwf_scrollbar.prototype.setMultipleV = function(multipleV) {
    this.multipleV = multipleV;
    this.initShow();
};
window.xwf_scrollbar.prototype.setMultipleH = function(multipleH) {
    this.multipleH = multipleH;
    this.initShow();
};
window.xwf_scrollbar.prototype.setScrollTop = function(top) {
    top = top || 0;
    this.divV.style.top = top + "px";
};
window.xwf_scrollbar.prototype.setScrollLeft = function(left) {
    left = left || 0;
    this.divH.style.left = left + "px";
};
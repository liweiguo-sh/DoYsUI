/*
* xwf.toolbar JavaScript Library v1.0
* Author: Volant Lee
* Create Date: 2017-10-30
* Copyright 2017-2019, xpas-next.com
* Description: 工具条控件，支持按钮、文本框、单选框、标签、链接5种控件类型
* Modify Date: 2020-01-06
*/
var css_xwf_toolbar = true;
// -- 类定义 ------------------------------------------------------------------
window.xwf_toolbar = function (jsonProp) {
    ///<summary>toolbar控件</summary>
    if (jsonProp == null) return;
    for (var key in jsonProp) {
        this[key] = jsonProp[key];
    }
    // -- 重新初始化类成员变量，避免类实例间共享 ----------
    this.prefix += this.instanceIndex.index++ + "_";
    this.bars = new Array();
    this.Bars = {};

    // -- 初始化 ------------------------------------------
    this.initControl();
};
window.xwf_toolbar.prototype = {
    prefix: "xwf_toolbar_",             // -- 类实例统一前缀名称，用于类内部创建的控件id命名 --
    cssPrefix: "xwf_toolbar_",          // -- 样式表统一前缀名称 --
    instanceIndex: { index: 0 },        // -- 类实例下标 --
    doc: document,                      // -- 类宿主窗口 --

    domContainer: null,                 // -- 宿主容器 --
    height: "M",                        // -- 工具条高度(L：36px；M：30px；S：24px) --    
    onclick: null,                      // -- bar点击事件回调函数 --
    onkeydown: null,                    // -- bar回车事件回调函数 --

    bars: null,                         // -- bar数组 --
    Bars: null,                         // -- bar集合 --
    tbLayout: null,                     // -- 工具条布局表格 --
    trLeft: null,                       // -- 居左按钮组TR对象 --
    trRight: null,                      // -- 居右按钮组TR对象 --

    disabled: false,                    // -- 是否disabled状态 --

    summary: function () {
        var strSummary = "xwf 控件类库，工具条控件类。";
        return strSummary;
    }
};
// -- 初始化工具条控件 ----------------------------------------------------------
window.xwf_toolbar.prototype.initControl = function () {
    if (this.height.equals("M") || this.height.equals("")) {
        this.height = 32;
    }
    else if (this.height.equals("L")) {
        this.height = 38;
    }
    else if (this.height.equals("S")) {
        this.height = 26;
    }

    this.domContainer.style.height = this.height + "px";
    this.domContainer.style.overflow = "hidden";
    // ----------------------------------------------------
    this.tbLayout = this.doc.createElement("TABLE");
    this.domContainer.appendChild(this.tbLayout);
    this.tbLayout.className = this.cssPrefix + "tbLayout";
    this.tbLayout.style.width = this.domContainer.offsetWidth + "px";

    var trLayout = this.tbLayout.insertRow(0);
    // -- 居左按钮组 --------------------------------------
    var tdLayoutLeft = trLayout.insertCell(0);
    tdLayoutLeft.className = this.cssPrefix + "tdLayout";

    var tbLeft = this.doc.createElement("TABLE");
    tbLeft.className = this.cssPrefix + "tbBars";
    tdLayoutLeft.appendChild(tbLeft);
    this.trLeft = tbLeft.insertRow(0);
    // -- 居右按钮组 --------------------------------------
    var tdLayoutRight = trLayout.insertCell(1);
    tdLayoutRight.className = this.cssPrefix + "tdLayout";

    var tbRight = this.doc.createElement("TABLE");
    tbRight.className = this.cssPrefix + "tbBars " + this.cssPrefix + "tbBarsRight";
    tdLayoutRight.appendChild(tbRight);
    this.trRight = tbRight.insertRow(0);
};

window.xwf_toolbar.prototype.buildBar_button = function (tdBar, para) {
    var _this = this;
    // ----------------------------------------------------
    // -- var button = this.doc.createElement("INPUT"); 
    // -- button.type = "button";       // -- IE8及以下不支持 --
    tdBar.innerHTML = "<Button >" + para.text + "</Button>";
    var button = tdBar.children[0];
    button.className = this.cssPrefix + "button " + this.cssPrefix + "button" + para.style;
    button.style.height = this.height + "px";
    button.title = para.title || "";
    if (para.align.equals("left")) {
        if (para.marginRight == null) para.marginRight = 10;
        button.style.marginRight = para.marginRight + "px";
    }
    else {
        if (para.marginLeft == null) para.marginLeft = 10;
        button.style.marginLeft = para.marginLeft + "px";
    }

    if (para.borderRight != null) button.style.borderRight = para.borderRight + "px";
    if (para.borderLeft != null) button.style.borderLeft = para.borderLeft + "px";

    if (para.width && para.width > button.offsetWidth) {
        button.style.width = para.width + "px";
    }
    button.onclick = this.onBarClick(_this, para);

    return button;
};
window.xwf_toolbar.prototype.buildBar_text = function (tdBar, para) {
    var _this = this;
    // ----------------------------------------------------
    var txt = this.doc.createElement("INPUT");
    tdBar.appendChild(txt);
    txt.type = "text";
    txt.className = this.cssPrefix + "text";
    txt.style.height = (this.height - 2) + "px";
    txt.style.lineHeight = (this.height - 2) + "px";
    txt.placeholder = para.placeholder || "";
    txt.onkeydown = this.onBarKeydown(_this, para);
    return txt;
};
window.xwf_toolbar.prototype.buildBar_checkbox = function (tdBar, para) {
    var _this = this;
    var chkId = this.prefix + para.key;
    // ----------------------------------------------------
    tdBar.innerHTML = "<input type='checkbox' id='" + chkId + "'><label for='" + chkId + "'>" + para.text + "</label>";
    var chk = tdBar.children[0];
    var lbl = tdBar.children[1];
    chk.lable = lbl;
    chk.className = this.cssPrefix + "checkbox " + this.cssPrefix + "checkbox" + para.style;
    lbl.className = this.cssPrefix + "label " + this.cssPrefix + "label" + para.style;
    if (para.align.equals("left")) {
        if (para.marginRight == null) para.marginRight = 10;
        lbl.style.marginRight = para.marginRight + "px";
    }
    else {
        if (para.marginLeft == null) para.marginLeft = 10;
        chk.style.marginLeft = para.marginLeft + "px";
    }

    if (para.borderRight != null) lbl.style.borderRight = para.borderRight + "px";
    if (para.borderLeft != null) chk.style.borderLeft = para.borderLeft + "px";

    if (para.width && para.width > lbl.offsetWidth) {
        lbl.style.width = para.width + "px";
    }
    if (para.value) {
        chk.checked = true;
    }
    chk.onclick = this.onBarClick(_this, para);

    return chk;
};
window.xwf_toolbar.prototype.buildBar_label = function (tdBar, para) {
    var lblId = this.prefix + para.key;
    // ----------------------------------------------------
    tdBar.innerHTML = "<label id='" + lblId + "'>" + para.text + "</label>";
    var lbl = gId(lblId);
    lbl.className = this.cssPrefix + "info " + this.cssPrefix + para.style;
    if (para.align.equals("left")) {
        if (para.marginRight == null) para.marginRight = 10;
        lbl.style.marginRight = para.marginRight + "px";
    }
    else {
        if (para.marginLeft == null) para.marginLeft = 10;
        lbl.style.marginLeft = para.marginLeft + "px";
    }

    if (para.borderRight != null) lbl.style.borderRight = para.borderRight + "px";
    if (para.borderLeft != null) lbl.style.borderLeft = para.borderLeft + "px";

    if (para.width && para.width > lbl.offsetWidth) {
        lbl.style.width = para.width + "px";
    }

    return lbl;
};
window.xwf_toolbar.prototype.buildBar_alink = function (tdBar, para) {
    var _this = this;

    // ----------------------------------------------------
    tdBar.innerHTML = "<a href='#' target='_blank' title='" + (para.title ? para.title: "") + "'>" + para.text + "</a>";
    var alink = tdBar.children[0];
    alink.className = this.cssPrefix + "alink " + this.cssPrefix + "alink" + para.style;
    if (para.align.equals("left")) {
        if (para.marginRight == null) para.marginRight = 10;
        alink.style.marginRight = para.marginRight + "px";
    }
    else {
        if (para.marginLeft == null) para.marginLeft = 10;
        alink.style.marginLeft = para.marginLeft + "px";
    }

    if (para.borderRight != null) alink.style.borderRight = para.borderRight + "px";
    if (para.borderLeft != null) alink.style.borderLeft = para.borderLeft + "px";

    if (para.width && para.width > alink.offsetWidth) {
        alink.style.width = para.width + "px";
    }
    alink.onclick = this.onBarClick(_this, para);

    return alink;
};

// -- private methods ---------------------------------------------------------
window.xwf_toolbar.prototype._setBarDisplay = function (key, display) {
    if (this.Bars[key]) {
        this.Bars[key].tdBar.style.display = display;
    }
};

// -- events ------------------------------------------------------------------
window.xwf_toolbar.prototype.onBarClick = function (_this, para) {
    return function (evt) {
        var key = para["key"];
        var bar = _this.Bars[key];

        if (para.type.equals("checkbox")) {
            var chk = gId(_this.prefix + key);
            bar.checked = chk.checked;
        }
        if (_this.onclick) {
            _this.onclick(para); 
            if (win) {
                if (para.type.equals("alink")) {
                    return false;
                }
            }
        }
        return true;
    };
};
window.xwf_toolbar.prototype.onBarKeydown = function (_this, para) {
    return function (evt) {
        evt = evt || window.event;
        if (evt.keyCode != 13) return;

        var txt = g.x.getEventTarget(evt);
        if (_this.onkeydown) {
            para.value = txt.value.trim();
            _this.onkeydown(para);
        }
    };
};

// -- public methods ----------------------------------------------------------
window.xwf_toolbar.prototype.addBar = function (para) {
    var _this = this;
    var tdBar = null;
    var domBar = null;
    var objBar = {
        type: "button",
        value: "",                  // -- 值 --
        align: "left",
        width: null,                // -- 指定宽度 --
        style: "",                  // -- 样式 --
        display: "",                // -- 显示状态 --
        onclick: null
    };
    objBar = g.x.extendJSON(objBar, para);
    if (objBar.width == null) {
        objBar.width = 70;

        var text = objBar.text.substring(1 + objBar.text.lastIndexOf(">")).trim();
        var textLen = text.replace(/[^\x00-\xff]/g, 'xx').length;
        if (textLen - 4 > 0) {
            objBar.width += (textLen - 4) * 6;
        }
    }
    // ------------------------------------------------
    if (objBar.align.equals("left")) {
        tdBar = this.trLeft.insertCell();
    }
    else {
        tdBar = this.trRight.insertCell();
    }
    tdBar.className = this.cssPrefix + "tdBars";

    if (objBar.type.equals("button")) {
        domBar = this.buildBar_button(tdBar, objBar);
    }
    else if (objBar.type.equals("text")) {
        domBar = this.buildBar_text(tdBar, objBar);
    }
    else if (objBar.type.equals("checkbox")) {
        domBar = this.buildBar_checkbox(tdBar, objBar);
    }
    else if (objBar.type.equals("label")) {
        domBar = this.buildBar_label(tdBar, objBar);
    }
    else if (objBar.type.equals("alink")) {
        domBar = this.buildBar_alink(tdBar, objBar);
    }
    else {
        alert("未知的toolbar类型 [" + objBar.type + "]。");
        return;
    }
    // ------------------------------------------------
    this.bars.push(objBar);
    this.bars[this.bars.length - 1].dom = domBar;
    this.bars[this.bars.length - 1].tdBar = tdBar;
    domBar.id = this.prefix + objBar.key;
    if (objBar.display && objBar.display.equals("none")) {
        domBar.style.display = "none";
    }

    this.Bars[objBar.key] = this.bars[this.bars.length - 1];
    if (objBar.type.equals("checkbox")) {
        if (objBar.value) {
            this.Bars[objBar.key].checked = true;
        }
    }
    objBar.setVisible = function (visible) {
        _this.setBarVisible(objBar.key, visible);
    };
    objBar.setText = function (visible) {
        _this.setBarText(objBar.key, visible);
    };
    objBar.setUrl = function (url) {
        _this.setBarUrl(objBar.key, url);
    };
};
window.xwf_toolbar.prototype.setDisable = function (blDisabled) {
    var domBar = null;

    for (var i = 0; i < this.bars.length; i++) {
        domBar = this.bars[i].dom;
        domBar.disabled = blDisabled;
        if (this.bars[i].type.equals("button")) {
            if (blDisabled) {
                domBar.className = this.cssPrefix + "buttonDisabled";
            }
            else {
                domBar.className = this.cssPrefix + "button";
            }
        }
        else if (this.bars[i].type.equals("text")) {
            if (blDisabled) {
                domBar.className = this.cssPrefix + "textDisabled";
                domBar.style.display = "none";
            }
            else {
                domBar.className = this.cssPrefix + "text";
                if (this.bars[i].display == undefined || this.bars[i].display.equals("")) {
                    domBar.style.display = "";
                }
            }
        }
        else {
            alert("debug here");
        }
    }
    this.disabled = blDisabled;
};

window.xwf_toolbar.prototype.setBarVisible = function (key, visible) {
    this._setBarDisplay(key, (visible ? "" : "none"));
};
window.xwf_toolbar.prototype.setBarText = function (key, text, style) {
    var bar = this.Bars[key];

    if (bar.type.equals("label")) {
        bar.dom.innerHTML = text;
        if (style == undefined) {
            // -- do nothing ... --
        }
        else if (style.equals("")) {
            bar.dom.className = this.cssPrefix + "info";
        }
        else {
            bar.dom.className = this.cssPrefix + "info " + this.cssPrefix + style;
        }
    }
    else {
        bar.dom.innerHTML = text;
    }

};
window.xwf_toolbar.prototype.setBarUrl = function (key, url) {
    var bar = this.Bars[key];
    var barType = bar.type;

    if (barType.equals("alink")) {
        bar.url = url;
        bar.dom.href = url;
    }
    else {
        showWarn("类型为 " + barType + " 的Bar不支持对属性url赋值。");
    }
};
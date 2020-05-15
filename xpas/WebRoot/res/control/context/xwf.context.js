/*
* xwf.context JavaScript Library v1.0
* Author: Volant Lee
* Create Date: 2013-07-05
* Modify Date: 2015-09-29
* Copyright 2013, http://www.xznext.com/
* Description: 上下文菜单 
*/
var css_xwf_context = true;
// -- 类定义 ------------------------------------------------------------------
window.xwf_context = function (jsonProp) {
    ///<summary>context menu控件</summary>
    if (jsonProp == null) return;
    for (var key in jsonProp) {
        this[key] = jsonProp[key];
    }
    // -- 重新初始化类成员变量，避免类实例间共享 ----------
    this.prefix += this.instanceIndex.index++ + "_";
    // -- 初始化类 ----------------------------------------
    this.init();
};
window.xwf_context.prototype = {
    prefix: "xwf_context_",             // -- 类实例统一前缀名称，用于类内部创建的控件id命名 --
    cssPrefix: "xwf_context_",          // -- 样式表统一前缀名称 --
    instanceIndex: { index: 0 },        // -- 类实例下标 --
    doc: document,                      // -- 类宿主窗口 --
    zIndex: 60000,

    handleMouse: 0,                     // -- setInterval句柄 --
    nInterval: 1000,                    // -- 鼠标离开菜单区域后自动关闭菜单的延时时间(ms) --
    dtMouseout: null,                   // -- 鼠标离开菜单区域的时间 --

    menuClick: null,                    // -- 菜单项回调函数 --
    // ----------------------------------------------------
    summary: function () {
        var strSummary = "xwf 控件类库，上下文菜单控件类。";
        return strSummary;
    }
};
// -- 初始化菜单控件 ----------------------------------------------------------
window.xwf_context.prototype.init = function () {
    var divContainer = this.doc.createElement("DIV");
    this.doc.body.appendChild(divContainer);
    this.divContainer = divContainer;
    divContainer._this = this;
    divContainer.id = this.prefix + "divContainer";
    divContainer.className = this.cssPrefix + "divContainer";
    divContainer.style.display = "none";
    divContainer.style.zIndex = this.zIndex;

    var ulMenu = this.doc.createElement("UL");
    divContainer.appendChild(ulMenu);
    ulMenu._this = this;
    ulMenu.id = this.prefix + "ulMenu1";
    ulMenu.className = this.cssPrefix + "ulMenu";
    this.ulMenu = ulMenu;

    // -- 添加事件，无操作时自动隐藏菜单 ------------------
    divContainer.onmouseover = function (event) {
        var _this = divContainer._this;
        _this.dtMouseout = null;
        _this.nInterval = 500;
    };
    divContainer.onmouseout = function (event) {
        var _this = divContainer._this;
        _this.dtMouseout = new Date();
    };

    // -- 创建一个iframe层, 解决菜单展开时会被ocx等控件遮挡问题 --
    var ifrLayer = this.doc.createElement("IFRAME");
    this.doc.body.appendChild(ifrLayer);
    this.ifrLayer = ifrLayer;
    ifrLayer.className = this.cssPrefix + "ifrLayer";
    ifrLayer.style.zIndex = this.zIndex - 1;
    ifrLayer.style.display = "none";
};

// -- 添加菜单项 --------------------------------------------------------------
window.xwf_context.prototype.show = function (jsonPara) {
    var _this = this;

    var strTable = "";
    var objDom = jsonPara.objDom;
    var arrMenus = jsonPara.arrMenus;

    var topDom = getTopOffsetTop(objDom);
    var leftDom = getTopOffsetLeft(objDom);    
    // ----------------------------------------------------
    this.menuClick = jsonPara.menuClick;
    this.ulMenu.innerHTML = "";
    for (var i = 0; i < arrMenus.length; i++) {
        if (!arrMenus[i].title) arrMenus[i].title = "";

        var liMenu = this.doc.createElement("LI");
        this.ulMenu.appendChild(liMenu);

        strTable = "<table class='" + this.cssPrefix + "tbLi'><tr><td class='" + this.cssPrefix + "tdImage'>";
        if (arrMenus[i].image) {
            strTable += "<img src='" + arrMenus[i].image + "' alt='' >";
        }
        strTable += "</td><td class='" + this.cssPrefix + "tdText xwf_select_none'>" + arrMenus[i].text + "</td></tr></table>";
        liMenu.innerHTML = strTable;
        liMenu.title = arrMenus[i].title;

        liMenu.onclick = this.liMenuClick(_this, arrMenus[i]);
    }
    // -- 计算位置，显示菜单 ------------------------------
    if (jsonPara.top == null) jsonPara.top = 0;
    if (jsonPara.left == null) jsonPara.left = 0;

    this.divContainer.style.display = "";
    if (objDom) {
        jsonPara.top += topDom;
        if (jsonPara.top < 0.618 * top.window.document.body.offsetHeight) {
            jsonPara.top += objDom.offsetHeight;
        }
        else {
            jsonPara.top += -this.divContainer.offsetHeight;
        }

        jsonPara.left += leftDom;
        if (jsonPara.left + this.divContainer.offsetWidth > top.window.document.body.offsetWidth) {
            jsonPara.left = top.window.document.body.offsetWidth - this.divContainer.offsetWidth;
        }
    }
    this.divContainer.style.top = jsonPara.top + "px";
    this.divContainer.style.left = jsonPara.left + "px";
    // ----------------------------------------------------
    this.nInterval = 5000;
    this.dtMouseout = new Date();
    this.handleMouse = setInterval(this.doInterval(_this), 200);

    this.ifrLayer.style.display = "";
    this.ifrLayer.style.top = this.divContainer.offsetTop + "px";
    this.ifrLayer.style.left = this.divContainer.offsetLeft + "px";
    this.ifrLayer.style.width = this.divContainer.offsetWidth + "px";
    this.ifrLayer.style.height = this.divContainer.offsetHeight + "px";
};
window.xwf_context.prototype.doInterval = function (_this) {
    return function () {
        if (_this.dtMouseout == null) return;
        if (new Date() - _this.dtMouseout > _this.nInterval) _this.hide();
    }
};
window.xwf_context.prototype.hide = function () {
    this.divContainer.style.display = "none";
    this.ifrLayer.style.display = "none";
    if (this.handleMouse > 0) clearInterval(this.handleMouse);
};

window.xwf_context.prototype.liMenuClick = function (_this, liMenu) {
    return function () {
        _this.hide();
        _this.menuClick(liMenu);
    };
};
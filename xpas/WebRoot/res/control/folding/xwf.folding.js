/*
* xwf.tab JavaScript Library v1.0
* Author: Volant Lee
* Create Date: 2013-02-25
* Modify Date: 2013-02-25
* Copyright 2013, http://www.xznext.com/
* Description: 折叠控件 
*/
var css_xwf_folding = true;
// -- 类定义 ------------------------------------------------------------------
window.xwf_folding = function (prop) {
    ///<summary>选项卡控件</summary>
    if (prop == null) return;
    for (var key in prop) {
        this[key] = prop[key];
    }
    // -- 重新初始化类成员变量，避免类实例间共享 ----------
    this.prefix += this.instanceIndex.index++ + "_";
    this.keys = new Array();
    this.pages = new Array();
    this.doc = this.doc;
    this.init();
};
window.xwf_folding.prototype = {
    prefix: "xwf_folding_",             // -- 控件统一前缀名称，用于控件id --
    cssPrefix: "xwf_folding_",          // -- 控件css前缀命名 --
    instanceIndex: { index: 0 },        // -- 类实例下标 --
    doc: document,
    divContainer: null,                 // -- 折叠控件容器 --

    pages: new Array(),                 // -- 所有折叠页集合 --
    keys: new Array(),                  // -- 所有折叠页KEY值数组 --
    selectedKey: "",                    // -- 当前选中的导航树的Key --
    showNavigate: false,                // -- 显示导航树 --
    navAlign: "right",                  // -- 导航栏贴左还是右 right,left --
    navPos: {},                         // -- 可设置top:left:width:height --
    navContainer: null,                 // -- 导航树的容器 --
    navClick: null,                     // -- 导航树单击回调 --
    navShowNumber: true,                // -- 显示导航的序号 --

    borderColor: null,                  // -- 边框颜色 --
    borderWidth: null,                  // -- 边框宽度 --

    imgPath: "",                        // -- 图片路径 --
    beforeExpand: null,                 // -- 在展开或收起前的回调函数（返回FALSE，取消折叠动作)
    afterExpand: null,                  // -- 折叠框展开之后的回调函数(add by volant) --
    foldingClick: null,                 // -- 折叠页click事件回调函数(用户操作) --
    // ----------------------------------------------------
    summary: function () {
        var strSummary = "xwf 控件类库，折叠页控件类。";
        return strSummary;
    }
};
// -- 初始化类 ----------------------------------------------------------------
window.xwf_folding.prototype.init = function () {
    if (this.borderColor == null) this.borderColor = g.x.getCurrentStyle(this.divContainer, "borderLeftColor");
    if (this.borderWidth == null) this.borderWidth = g.x.getCurrentStyle(this.divContainer, "borderLeftWidth");
};

// -- 添加新选项卡 ------------------------------------------------------------
window.xwf_folding.prototype.addPage = function (jsonPage) {
    var page = {
        key: "",                    //-- 选项卡KEY --
        text: "",
        title: "",
        scrollTop: 0,                //-- 当前的scrollTop值 --
        tdIndicator: null,          //-- 指示是否展开的控件 --
        tbControl: null,             //-- 控制的tb控件 --
        containerCtl: null,         //-- 折叠页容器控件(必填） --
        isFirst: true,              //-- 是否是第一次操作展开或收起 --
        isFirstExpand: true,        //-- 是否第一次展开 --
        canExpand: true,            //-- 允许展开和收起 --
        expand: true                //-- 是否已经展开（初始按照此值）--
    };
    page = g.x.extendJSON(page, jsonPage);
    page.isFirst = true;
    page.isFirstExpand = true;
    this.pages.push(page);
    this.keys.push(page.key);

    var tbPage = this.doc.createElement("TABLE");
    tbPage.id = this.prefix + "tbCtl" + page.key;
    this.divContainer.insertBefore(tbPage, page.containerCtl);
    tbPage.className = this.cssPrefix + "tbCtl";

    var tr = tbPage.insertRow(-1);
    var tdIndicator = tr.insertCell(-1);
    tdIndicator.onclick = this._foldingClick(page, this);
    tdIndicator.className = this.cssPrefix + "tdIndicator";

    page.indicatorCtl = tdIndicator;
    page.tbControl = tbPage;
    var tdTitle = tr.insertCell(-1);
    tdTitle.innerHTML = page.text;
    tdTitle.className = this.cssPrefix + "tdTitle";

    var flagOperateBySystem = true;
    this._changeExpandStatus(page, page.expand, flagOperateBySystem);
    //this.refreshNavigateTree();
};
// -- 点击展开或关闭
window.xwf_folding.prototype._foldingClick = function (page, _this) {
    return function (event) {
        if (_this._changeExpandStatus(page, !page.expand, false)) {
            if (_this.foldingClick) {
                _this.foldingClick(page);
                page.isFirst = false;
                if (page.expand) {
                    page.isFirstExpand = false;
                }
            }
        }
    }
}
// -- 点击导航 --
window.xwf_folding.prototype._navigateClick = function (pageKey, _this) {
    return function (event) {
        _this._setNavigateStatus(pageKey);
        if (_this.navClick) {
            _this.navClick(pageKey);
        }
    }
}
// -- 展开或收起操作 --
window.xwf_folding.prototype._changeExpandStatus = function (page, targetStatus, flagOperateBySystem) {
    if (!page.canExpand) {
        return false;
    }

    if (!flagOperateBySystem && this.beforeExpand && !this.beforeExpand(page, targetStatus)) {  
        // -- 不是系统第一次展开，并且beforeExpand回调返回false --
        return false;
    }    

    page.containerCtl.style.display = targetStatus ? "" : "none";
    page.indicatorCtl.style.backgroundImage = "url(" + this.imgPath + "folding_" + (targetStatus ? "1" : "0") + ".png)";
    page.expand = targetStatus;
    //重新计算scrollTop;
    this._calculateScrolltop();
    // ===处理dropgrid===
    if (topWin.dropgrid) {//系统第一此展开或收起
        var elements = this.divContainer.getElementsByTagName("INPUT");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].type.equals("text") && elements[i].txtProp) {
                topWin.dropgrid.showDrop(elements[i]);
            }
        }
    }

    if (this.afterExpand) this.afterExpand(page, targetStatus);
    return true;
}
// -- 通过pagekey获取page对象 --
window.xwf_folding.prototype.getPageByKey = function (pageKey) {
    for (var i = 0; i < this.pages.length; i++) {
        if (this.pages[i].key.equals(pageKey)) {
            return this.pages[i];
        }
    }
    return null;
}
// -- 展开或收起操作,控件调用 --
window.xwf_folding.prototype.expandPage = function (pageKey, targetStatus) {
    var page = this.getPageByKey(pageKey);
    if (page) {
        this._changeExpandStatus(page, targetStatus, false);
    }
}
// -- 显示导航页 --
window.xwf_folding.prototype.refreshNavigateTree = function (selectedKey) {
    if (!this.showNavigate) {
        return false;
    }
    this._createNavigateTree(selectedKey);
}
// -- 显示导航页 --
window.xwf_folding.prototype._createNavigateTree = function (initKey) {
    //设置导航容器
    this.navContainer.className = this.cssPrefix + "navContainer";

    if (this.navPos.top) {
        this.navContainer.style.top = (this.divContainer.offsetTop + 50) + "px";
    } else {
        this.navContainer.style.top = "50px";
    }
    if (this.navPos.width) {
        this.navContainer.style.width = this.navPos.width + "px";
    } else {
        this.navContainer.style.width = "150px";
    }
    if (this.navPos.height) {
        this.navContainer.style.height = this.navPos.height + "px";
    }
    if (this.navPos.left) {
        this.navContainer.style.left = this.navPos.left + "px";
    } else {
        if (this.navAlign == null || this.navAlign.equals("right")) {
            this.navContainer.style.left = (this.divContainer.offsetLeft + this.divContainer.offsetWidth + 5) + "px";
        } else {
            this.navContainer.style.left = (this.divContainer.offsetLeft - this.navContainer.offsetWidth - 5) + "px";
        }
    }
    this.navContainer.innerHTML = "";
    var tb = this.doc.createElement("TABLE");
    tb.className = this.cssPrefix + "nav_tb";

    for (var i = 0; i < this.pages.length; i++) {
        var pageKey = this.pages[i].key;

        var tr = tb.insertRow(-1);
        var tdCation = tr.insertCell(-1);
        tdCation.id = this.prefix + "tdCaption_" + pageKey;
        tdCation.innerHTML = "<a href='#" + this.pages[i].tbControl.id + "'>" + (this.navShowNumber ? (i + 1) + "." : "") + this.pages[i].text + "</a>";
        tdCation.onclick = this._navigateClick(pageKey, this);
        tdCation.className = this.cssPrefix + "nav_tdCaption";

        var tdImg = tr.insertCell(-1);
        tdImg.id = this.prefix + "tdImg_" + pageKey;
        var pos = "nav-mid-un";
        if (i == 0) {
            pos = "nav-first-un";
        } else if (i == this.pages.length - 1) {
            pos = "nav-last-un";
        }
        tdImg.className = this.cssPrefix + "nav_tdImage";
        tdImg.style.backgroundImage = "url(" + this.imgPath + pos + ".png)";

    }
    this.navContainer.appendChild(tb);

    this.selectedKey = "";
    //初始化选中项
    if (initKey == null || initKey.equals("")) {
        if (this.pages.length > 0) {
            this._setNavigateStatus(this.pages[0].key);
        }
    } else {
        this._setNavigateStatus(initKey);
    }

}
// -- 通过pagekey设置导航的选中项，同时取消选择原先的选中项（如果有） --
window.xwf_folding.prototype._setNavigateStatus = function (key) {
    if (this.selectedKey.equals(key)) {
        return false;
    }
    if (!this.selectedKey.equals("")) {//取消原来的选择
        var preTdImage = gId(this.prefix + "tdImg_" + this.selectedKey);
        var preTdCaption = gId(this.prefix + "tdCaption_" + this.selectedKey);

        preTdImage.style.backgroundImage = preTdImage.style.backgroundImage.replace(".png", "-un.png");
        preTdCaption.style.fontWeight = "normal";
    }
    //设置新的选中项
    var curTdImage = gId(this.prefix + "tdImg_" + key);
    var curTdCaption = gId(this.prefix + "tdCaption_" + key);
    curTdImage.style.backgroundImage = curTdImage.style.backgroundImage.replace("-un", "");
    curTdCaption.style.fontWeight = "bolder";
    this.selectedKey = key;
}
// -- 重新计算锚点的SCROLLTOP值 --
window.xwf_folding.prototype._calculateScrolltop = function () {
    for (var i = 0; i < this.pages.length; i++) {
        this.pages[i].scrollTop = this.pages[i].tbControl.offsetTop;
    }
}
// -- 调用者在容器的父容器scroll事件中调用本方法，传入scrollTop的值 --
window.xwf_folding.prototype.navigateScroll = function (currentScroll) {
    for (var i = this.pages.length - 1; i >= 0; i--) {
        if (currentScroll > this.pages[i].scrollTop - 80) {
            this._setNavigateStatus(this.pages[i].key);
            break;
        }
    }
    if (topWin.dropgrid) {
        topWin.dropgrid.collapse();
    }
}

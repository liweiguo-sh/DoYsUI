/*
 * xwf.menu JavaScript Library v1.0
 * Author: Volant Lee
 * Create Date: 2016-11-01
 * Modify Date: 2017-11-02
 * Copyright 2017, http://www.xpas-next.com/
 * Description: 三级菜单 
 */
var css_xwf_menu2 = true;
// -- 类定义 ------------------------------------------------------------------
window.xwf_menu = function(prop) {
    ///<summary>菜单控件</summary>
    if (prop == null) return;
    for (var key in prop) {
        this[key] = prop[key];
    }
    // -- 重新初始化类成员变量，避免类实例间共享 ----------
    this.prefix += this.instanceIndex.index++ + "_";
    this.beforeClickEvents = new Array();

    // -- 初始化类 ----------------------------------------
    this.init();
};
window.xwf_menu.prototype = {
    prefix: "xwf_menu2_",
    cssPrefix: "xwf_menu2_", // -- 样式表统一前缀名称 --
    instanceIndex: { index: 0 }, // -- 类实例下标 --
    doc: document, // -- 类宿主窗口 --
    zIndex_M1: 10, // -- 一级菜单zIndex --
    zIndex: 90000, // -- 菜单zIndex --

    left: 15, // -- 1级菜单初始LEFT --
    top: 15, // -- 1级菜单初始TOP --
    imgPath: "", // -- 菜单图片路径（框架目录） --
    imgPath2: "", // -- 菜单图片路径（项目目录，以"/"开头） --
    dblLine: false, // -- 1级菜单图标和标题是否分2行显示 --
    maxWidth: screen.width, // -- 2、3级菜单最大宽度 --
    showTime: 800, // -- 鼠标移入时，菜单延时展开毫秒数 --
    hideTime: 600, // -- 鼠标离开时，菜单延时隐藏毫秒数 --
    click: null, // -- 菜单click事件回调函数 --

    trMenu2: null,
    divMenu23: null, // -- 2、3级菜单顶级DIV --
    divArrowUp: null, // -- 向上的小箭头
    menu2H: 47, // -- 二级菜单高度 --
    menu3H: 30, // -- 三级菜单高度 --
    M2: 0, // -- 当前栏2级菜单总数量 --
    M3: 0, // -- 当前2级菜单下的3级菜单总数量 --
    M3s: 0, // -- 当前栏3级菜单总数量 --
    activeMenu1: null, // -- 当前活动1级菜单 --

    dtMousein: null, // -- 鼠标进入菜单区域最后时间 --
    dtMouseout: null, // -- 鼠标离开菜单区域时间 --
    handleMousein: 0, // -- 鼠标定时器函数句柄 --
    expand: false, // -- 菜单是否已展开 --

    menuClick: null, // -- 菜单click回调事件 --
    beforeClickEvents: null, // -- 菜单beforeClick事件数组 --

    ulMenu1: null,
    // ----------------------------------------------------
    summary: function() {
        var strSummary = "xwf 控件类库，三级菜单类。";
        return strSummary;
    }
};
// -- 初始化、销毁菜单 --------------------------------------------------------
window.xwf_menu.prototype.init = function(jsonMenu) {
    this.zIndex = 90000; // 重置菜单 zIndex 初始值
    var divMenu1 = this.doc.createElement("DIV");
    this.doc.body.appendChild(divMenu1);
    this.divMenu1 = divMenu1;
    divMenu1._this = this;
    divMenu1.id = this.prefix + "divMenu1";
    divMenu1.className = this.cssPrefix + "divMenu1 xwf_select_none";
    divMenu1.style.zIndex = this.zIndex_M1;
    divMenu1.style.left = this.left + "px";
    divMenu1.style.top = this.top + "px";
    divMenu1.style.width = this.maxWidth + "px";
    if (false) {
        divMenu1.xwf_ui = new window.xwf_ui_drag({
            top: 0,
            height: 500,
            objDrag: divMenu1,
            containerWin: window
        });
    }

    divMenu1.onmouseover = function(event) {
        var _this = divMenu1._this;
        _this.dtMouseout = null;
        if (_this.dtMousein == null) {
            _this.dtMousein = new Date();
        }
        if (_this.handleMousein == 0) {
            _this.handleMousein = setInterval("gId('" + divMenu1.id + "')._this.onMouseIn('" + divMenu1.id + "')", 20);
        }
    };
    divMenu1.onmouseout = function(event) {
        var _this = divMenu1._this;
        _this.dtMouseout = new Date();
    };

    var ulMenu1 = this.doc.createElement("UL");
    divMenu1.appendChild(ulMenu1);
    ulMenu1._this = this;
    ulMenu1.id = this.prefix + "ulMenu1";
    ulMenu1.className = this.cssPrefix + "ulMenu1 xwf_select_none";
    this.ulMenu1 = ulMenu1;

    // -- 2、3级菜单DIV ---------------
    var divMenu23 = this.doc.createElement("DIV");
    this.doc.body.appendChild(divMenu23);
    this.divMenu23 = divMenu23;
    divMenu23._this = this;
    divMenu23.className = this.cssPrefix + "divMenu23 xwf_select_none";
    divMenu23.style.display = "none";
    divMenu23.style.zIndex = this.zIndex + 10;
    divMenu23.style.left = (this.left + this.maxWidth - 6) + "px";

    // --- steven modify begin --
    var divArrowUp = document.createElement("DIV");
    divArrowUp.className = this.cssPrefix + "arrow_up";
    this.doc.body.appendChild(divArrowUp);
    this.divArrowUp = divArrowUp;
    divArrowUp.style.display = "none";
    // --- steven modify end --

    divMenu23.onmouseover = function(event) {
        var _this = divMenu23._this;
        _this.dtMouseout = null;
        if (_this.dtMousein == null) {
            _this.dtMousein = new Date();
        }
    };
    divMenu23.onmouseout = function(event) {
        var _this = divMenu23._this;
        _this.dtMouseout = new Date();
    };

    // -- 创建一个iframe层, 解决菜单展开时会被ocx等控件遮挡问题 --
    var ifrLayer2 = this.doc.createElement("IFRAME");
    this.doc.body.appendChild(ifrLayer2);
    this.ifrLayer2 = ifrLayer2;
    ifrLayer2.style.display = "none";
    ifrLayer2.style.zIndex = this.zIndex - 1;
    ifrLayer2.className = this.cssPrefix + "ifrLayer2";
};
window.xwf_menu.prototype.destroy = function() {
    ///<summary>js重新执行new class()时，不能够真正初始化类，特别是之前生成的DOM对象，需要代码实现</summary>
    if (this.handleMousein > 0) {
        this.hideMenu2();
    }
    if (!this.divMenu1) return;

    this.doc.body.removeChild(this.divMenu1);
    this.doc.body.removeChild(this.divMenu23);
};

// -- 添加菜单 ----------------------------------------------------------------
window.xwf_menu.prototype.addMenu = function(jsonMenu) {
    if (jsonMenu.icon == null || jsonMenu.icon.equals("")) {
        jsonMenu.icon = "_m" + jsonMenu.level + ".png";
    }
    if (jsonMenu.icon.indexOf("/") == 0) {
        // -- 菜单图片位于项目目录下 --
        jsonMenu.icon = g.systemPath + "images/menu/" + top.cssStyle + jsonMenu.icon;
    } else {
        // -- 菜单图片位于框架菜单控件目录下 --
        jsonMenu.icon = this.imgPath + jsonMenu.icon;
    }
    // ----------------------------------------------------
    if (jsonMenu.level == 1) {
        this.addMenu1(jsonMenu);
    } else {
        if (jsonMenu.level == 2) {
            this.addMenuCol();
            this.addMenu2(jsonMenu);
        } else {
            this.addMenu3(jsonMenu);
        }
    }
};
window.xwf_menu.prototype.addMenu1 = function(jsonMenu) {
    var li = this.doc.createElement("LI");
    this.ulMenu1.appendChild(li);
    li._this = this;
    li.p = { jsonMenu: jsonMenu };

    li.innerHTML = jsonMenu.text;
    li.title = jsonMenu.title;
    li.style.marginRight = "20px";
    //-- 添加2、3级菜单 TABLE --
    var tbMenu2 = document.createElement("TABLE");
    this.divMenu23.appendChild(tbMenu2);
    li.p.tbMenu2 = tbMenu2;
    tbMenu2.style.display = "none";
    tbMenu2.className = this.cssPrefix + "tbMenu2";
    this.trMenu2 = tbMenu2.insertRow(-1);

    //-- 鼠标单击1级菜单，展开2级菜单 --
    li.onclick = function(event) {
        var evt = event || window.event;
        var _this = li._this;
        _this.expand = true;
        _this.dtMousein = 0;
        _this.showMenu2(li);

        _this.onMenuClick(li.p.jsonMenu, evt);
    };
    //-- 如果2级菜单已经展开(第一次展开需要鼠标单击1级菜单)，自动切换2级菜单 --
    li.onmouseover = function(event) {
        var _this = li._this;
        if (_this.expand) {
            _this.showMenu2(li);
        }
    };
};
window.xwf_menu.prototype.addMenuCol = function() {
    var tdMenu2 = this.trMenu2.insertCell(-1);
    this.tdMenu2 = tdMenu2;
    tdMenu2.className = this.cssPrefix + "tdMenu2";
    this.M2 = 0;
    this.M3 = 0;
    this.M3s = 0;
};
window.xwf_menu.prototype.addMenu2 = function(jsonMenu) {
    var divMenu2B = document.createElement("DIV");
    this.tdMenu2.appendChild(divMenu2B);
    divMenu2B.className = this.cssPrefix + "divMenu2_border";

    var divMenu2 = document.createElement("DIV");
    divMenu2B.appendChild(divMenu2);
    divMenu2._this = this;
    divMenu2.p = { jsonMenu: jsonMenu };
    divMenu2.className = this.cssPrefix + "divMenu2";

    //divMenu2.style.backgroundImage = "url('" + jsonMenu.icon + "')";
    divMenu2.innerHTML = jsonMenu.text;
    divMenu2.title = jsonMenu.title;

    this.M2++;
    this.M3 = 0;

    divMenu2.onclick = function(event) {
        var evt = event || window.event;
        var _this = divMenu2._this;

        _this.onMenuClick(divMenu2.p.jsonMenu, evt);
    };
};
window.xwf_menu.prototype.addMenu3 = function(jsonMenu) {
    var ulMenu3 = null;
    if (this.M3 == 0) {
        ulMenu3 = document.createElement("UL");
        this.tdMenu2.appendChild(ulMenu3);
        ulMenu3.className = this.cssPrefix + "ulMenu3";
        this.ulMenu3 = ulMenu3;
    } else {
        ulMenu3 = this.ulMenu3;
    }

    if (jsonMenu.text.equals("-")) { //-- 分割线 --
        var divLine = document.createElement("DIV");
        ulMenu3.appendChild(divLine);
        divLine.className = this.cssPrefix + "divLine";
        return;
    }
    //-----------------------------------------------------
    var liMenu3 = document.createElement("LI");
    ulMenu3.appendChild(liMenu3);
    liMenu3._this = this;
    liMenu3.id = this.prefix + jsonMenu.menuKey;
    liMenu3.p = { jsonMenu: jsonMenu };
    liMenu3.className = this.cssPrefix + "liMenu3";
    if (jsonMenu.text.equals("-")) {
        liMenu3.innerHTML = "-";
    } else {
        liMenu3.innerHTML = "<table><tr><td style='width:24px'><img src='" + jsonMenu.icon + "' style='width:16px;height:16px;' /></td>" +
            "<td style='padding-left:4px;' title='" + jsonMenu.title + "'>" + jsonMenu.text + "</td></tr><table>";
    }
    this.M3++;
    this.M3s++;
    //-- 菜单事件 -------------------------------------
    liMenu3.onclick = function(event) {
        var evt = event || window.event;
        var _this = liMenu3._this;
        _this.hideMenu2();
        _this.onMenuClick(liMenu3.p.jsonMenu, evt);
        _this.dtMouseout = new Date();
        _this.dtMouseout.setTime((new Date()).getTime() - 1000); //-- 变相达到快速收起一级菜单的效果 --
    };
};

// -- public event ------------------------------------------------------------
window.xwf_menu.prototype.onMenuClick = function(menu, evt) {
    if (!evt.ctrlKey && !evt.altKey) {
        if (menu.drMenu["menu_type"].value.equals("click")) {
            for (var i = 0; i < this.beforeClickEvents.length; i++) {
                if (!this.beforeClickEvents[i](menu)) {
                    return;
                }
            }
        }
    }
    this.menuClick(menu, evt);
};
window.xwf_menu.prototype.addEventListener = function(eventName, eventFunction) {
    if (eventName.equals("beforeClick")) {
        this.beforeClickEvents.push(eventFunction);
    } else {
        alert("unknown event type, please check it.");
    }
};

// -- public method ----------------------------------------------------------------
window.xwf_menu.prototype.showMenu2 = function(liMenu1) {
    if (this.activeMenu1) {
        this.activeMenu1.p.tbMenu2.style.display = "none";
    }
    this.activeMenu1 = liMenu1;
    this.divMenu23.style.display = "";
    this.divArrowUp.style.display = "";
    liMenu1.p.tbMenu2.style.display = "";

    var nTop = getOffsetTop(liMenu1) + liMenu1.offsetHeight + 22;
    var nLeft = getOffsetLeft(liMenu1);
    this.divMenu23.style.top = nTop + "px";
    this.divArrowUp.style.top = (nTop - 5) + "px";
    this.divArrowUp.style.left = (nLeft + 20) + "px";

    this.divMenu23.style.left = "0px";
    if (nLeft + this.divMenu23.offsetWidth > document.body.clientWidth) {
        nLeft = document.body.clientWidth - this.divMenu23.offsetWidth;
    }
    this.divMenu23.style.left = nLeft + "px";

    this.ifrLayer2.style.display = "";
    this.ifrLayer2.style.top = this.divMenu23.offsetTop + "px";
    this.ifrLayer2.style.left = this.divMenu23.offsetLeft + "px";
    this.ifrLayer2.style.width = this.divMenu23.offsetWidth + "px";
    this.ifrLayer2.style.height = this.divMenu23.offsetHeight + "px";
};
window.xwf_menu.prototype.hideMenu2 = function() {
    if (this.activeMenu1) {
        this.activeMenu1.p.tbMenu2.style.display = "none";
    }
    this.divMenu23.style.display = "none";
    this.divArrowUp.style.display = "none";
    this.expand = false;

    this.ifrLayer2.style.display = "none";
};

window.xwf_menu.prototype.openMenu = function(para) {
    var menuKey = para.menuKey;
    var liMenu = gId(this.prefix + menuKey);
    liMenu.click();
}

// -- 菜单动画 ----------------------------------------------------------------
window.xwf_menu.prototype.onMouseIn = function(divMenu1Id) {
    var divMenu1 = gId(divMenu1Id);
    var _this = divMenu1._this;

    if (_this.dtMouseout == null) {} else {
        var nInterval = new Date() - _this.dtMouseout;
        if (nInterval > _this.hideTime) {
            clearInterval(_this.handleMousein);
            _this.handleMousein = 0;
            _this.dtMousein = null;
            _this.hideMenu2();
        }
    }
};
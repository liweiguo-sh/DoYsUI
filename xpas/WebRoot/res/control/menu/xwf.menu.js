/*
 * xwf.menu JavaScript Library v2.0
 * Author: Volant Lee
 * Create Date: 2017-09-25
 * Modify Date: 2017-11-02
 * Copyright 2017, http://www.xpas-next.com/
 * Description: 二(三)级菜单 
 */
var css_xwf_menu = true;
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
    prefix: "xwf_menu_",
    cssPrefix: "xwf_menu_", // -- 样式表统一前缀名称 --
    instanceIndex: { index: 0 }, // -- 类实例下标 --
    doc: document, // -- 类宿主窗口 --
    zIndex: 90000, // -- 菜单zIndex --
    divContainer: null, // -- 控件容器 --

    // ----------------------------------------------------
    maxLevel: 2, // -- 2：2级菜单，3：3级菜单 --

    menu1Expanded: null, // -- 当前展开的1级菜单 --
    menu2Expanded: null, // -- 当前展开的2级菜单 --
    menuSelected: null, // -- 当前选中的菜单 --

    menuClick: null, // -- 菜单click回调函数 --
    beforeClickEvents: null, // -- 菜单beforeClick事件数组 --

    summary: function() {
        var strSummary = "xwf 控件类库，二级菜单类。";
        return strSummary;
    }
};
// -- 初始化 ------------------------------------------------------------------
window.xwf_menu.prototype.init = function(jsonMenu) {
    var _this = this;
    this.divContainer.innerHTML = "";
};
window.xwf_menu.prototype.addMenu = function(jsonMenu) {
    var menu = {
        nodeKeyParent: "", // -- 菜单父节点KEY --
        nodeKey: "", // -- 菜单节点KEY --
        menuKey: "", // -- 菜单KEY --
        text: "", // -- 菜单标题 --
        icon: "", // -- 菜单图标 --
        level: "", // -- 第几级菜单 --
        children: 0 // -- 子菜单数量 --
    };
    menu = g.x.extendJSON(menu, jsonMenu);

    var _this = this;
    var tbMenuParent = null; // -- 父菜单table对象 --
    var menuParent = null; // -- 父菜单menu对象 --
    var divParent = null; // -- 父菜单子菜单容器对象 --
    var arrHtml = new Array();
    // ----------------------------------------------------
    if (menu.level == 1) {
        divParent = this.divContainer;
    } else if (menu.level >= 4) {
        return;
    } else if (menu.level > 1) {
        tbMenuParent = gId(this.prefix + menu.nodeKeyParent);
        if (tbMenuParent == null) {
            return;
        }
        menuParent = tbMenuParent.menu;
        divParent = menuParent.divMenu;
        menuParent.children++;
        if (menuParent.children == 1) {
            var tbMenuParent = menuParent.tbMenu;
            var trMenuParent = tbMenuParent.children[0].children[0];
            var tdMenuParentIconR = trMenuParent.insertCell(trMenuParent.children.length);

            menuParent.tdIconR = tdMenuParentIconR;
            tdMenuParentIconR.className = this.cssPrefix + "tdUpDown";
            tdMenuParentIconR.innerHTML = "<span><i class='fa fa-caret-left'></i><span>";
        }
    }
    // ----------------------------------------------------
    var tbMenu = this.doc.createElement("TABLE");
    divParent.appendChild(tbMenu);
    tbMenu._this = _this;
    tbMenu.id = this.prefix + menu.nodeKey;
    tbMenu.className = this.cssPrefix + "tbMenu" + menu.level;

    menu.tbMenu = tbMenu;
    tbMenu.menu = menu;
    tbMenu.onclick = this.onMenuClick(_this, menu);

    var trMenu = tbMenu.insertRow(0);
    if (menu.text.equals("-")) {
        var tdLine = trMenu.insertCell(0);
        tdLine.style.height = "5px";
    } else {
        var tdMenuIndent = trMenu.insertCell(0);
        var tdMenuText = trMenu.insertCell(1);
        tdMenuIndent.innerHTML = "";
        tdMenuIndent.className = this.cssPrefix + "tdIndent" + menu.level;
        tdMenuText.innerHTML = "<span class='xwf_select_none'><i class='fa " + menu.icon + "'></i>&nbsp;&nbsp;" + menu.text + "</span>";
    }

    // -- 子菜单区域 --------------------------------------
    if (menu.level == 3) return;
    var divMenu = this.doc.createElement("DIV");
    divParent.appendChild(divMenu);
    menu.divMenu = divMenu;
    divMenu.className = this.cssPrefix + "divMenu" + menu.level + " xwf_select_none";
    divMenu.style.display = "none";
};

// -- 菜单方法 ----------------------------------------------------------------
window.xwf_menu.prototype.expandMenu = function(menu) {
    if (this.menu1Expanded) {
        if (!menu.nodeKey.indexOf(this.menu1Expanded.nodeKey) == 0) {
            this.collapseMenu(this.menu1Expanded);
        }
    }
    if (this.menu2Expanded) {
        if (!menu.nodeKey.indexOf(this.menu2Expanded.nodeKey) == 0) {
            this.collapseMenu(this.menu2Expanded);
        }
    }

    menu.tbMenu.className = this.cssPrefix + "tbMenu" + menu.level + "_E";
    menu.tdIconR.innerHTML = "<span><i class='fa fa-caret-down'></i><span>";
    menu.divMenu.style.display = "";
    menu.expanded = true;

    if (menu.level == 1) {
        this.menu1Expanded = menu;
    }
    if (menu.level == 2) {
        this.menu2Expanded = menu;
    }
};
window.xwf_menu.prototype.collapseMenu = function(menu) {
    menu.tbMenu.className = this.cssPrefix + "tbMenu" + menu.level;
    menu.tdIconR.innerHTML = "<span><i class='fa fa-caret-left'></i><span>";
    menu.divMenu.style.display = "none";
    menu.expanded = false;

    if (menu.level == 1) {
        this.menu1Expanded = null;
    }
    if (menu.level == 2) {
        this.menu2Expanded = null;
    }
};

// -- 菜单事件 ----------------------------------------------------------------
window.xwf_menu.prototype.onMenuClick = function(_this, menu) {
    return function(evt) {
        var tbMenu = menu.tbMenu;
        // ------------------------------------------------
        if (menu.text.equals("-")) return;
        if (evt.ctrlKey || evt.altKey) {
            _this.menuClick(menu, evt);
            return;
        }
        // ------------------------------------------------
        if (!menu.isLeaf) {
            if (menu.expanded) {
                _this.collapseMenu(menu);
            } else {
                _this.expandMenu(menu);
            }
        } else {
            if (_this.menuSelected) {
                _this.menuSelected.tbMenu.className = _this.cssPrefix + "tbMenu" + menu.level;
            }
            if (_this.menuClick) {
                tbMenu.className = _this.cssPrefix + "tbMenu" + menu.level + "_S";
                _this.menuSelected = menu;

                if (menu.drMenu["menu_type"].value.equals("click")) {
                    for (var i = 0; i < _this.beforeClickEvents.length; i++) {
                        if (!_this.beforeClickEvents[i](menu)) {
                            return;
                        }
                    }
                }
                _this.menuClick(menu, evt);
            }
        }
    }
};

// -- public method -----------------------------------------------------------
window.xwf_menu.prototype.openMenu = function(para) {
    var menuKey = para.menuKey;
    var liMenu = gId(this.prefix + menuKey);
    liMenu.click();
}
window.xwf_menu.prototype.addEventListener = function(eventName, eventFunction) {
    if (eventName.equals("beforeClick")) {
        this.beforeClickEvents.push(eventFunction);
    } else {
        alert("unknown event type, please check it.");
    }
};
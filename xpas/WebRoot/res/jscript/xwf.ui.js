/*
* xwf.ui JavaScript Library v1.0
* Author: Volant Lee
* Create Date: 2012-06-27
* Modify Date: 2013-03-13
* Copyright 2012, http://www.xpas-next.com/
* Description: web控件拖动(非HTML5) --
*/

var _objDRAG = null;                //-- 拖动对象 --
var _offsetX0 = 0, _offsetY0 = 0;   //-- 用于拖动窗口位置, _offsetX0、_offsetY0：鼠标初始位置距离窗口原始位置的偏移量 --

// -- 类定义 ------------------------------------------------------------------
window.xwf_ui_drag = function (_jsonProp) {
    if (_jsonProp == null) return;
    this.p = g.x.extendJSON(this.p, _jsonProp);

    if (this.p.objDrag == null) {
        alert("Parameter error.");
        return;
    }
    if (this.p.objTrigger == null) this.p.objTrigger = this.p.objDrag;
    // ----------------------------------------------------
    this.init();
}
window.xwf_ui_drag.prototype = {
    p: {
        top: 0,                     //-- 拖动区域 TOP --
        left: 0,                    //-- 拖动区域 LEFT --
        width: 0,                   //-- 拖动区域 WIDTH --
        height: 0,                  //-- 拖动区域 HEIGHT --

        objDrag: null,              //-- 拖动控件 --
        objTrigger: null            //-- 触发拖动事件的对象（objDrag本身或objDrag的子对象） --
    }
};

window.xwf_ui_drag.prototype.init = function () {
    var _this = this;

    this.objDrag = this.p.objDrag;
    this.objDrag._this = this;
    this.objDrag.style.position = "absolute";

    this.p.objTrigger.onmousedown = function (event) {
        if (event == null) event = window.event;
        _this.beginDrag(event);
    };
};

// -- 拖动事件 ----------------------------------------------------------------
window.xwf_ui_drag.prototype.beginDrag = function (event) {
    _objDRAG = g.x.getEventTarget(event);
    while (_objDRAG._this == null) {
        _objDRAG = _objDRAG.parentElement;
    }
    var _this = _objDRAG._this;

    if (_objDRAG.win) {
        if (topWin.dropgrid) topWin.dropgrid.collapse();  // -- 拖动窗口前关闭全局下拉网格控件 --
        _objDRAG.win.activeWin();
    }
    if (event.button < 2) {
        _offsetX0 = event.clientX - _objDRAG.offsetLeft;
        _offsetY0 = event.clientY - _objDRAG.offsetTop;

        g.x.addEventListener("mousemove", _this.onDrag, _objDRAG);
        g.x.addEventListener("mouseup", _this.endDrag, _objDRAG);
    }
};
window.xwf_ui_drag.prototype.onDrag = function (event) {
    var _this = _objDRAG._this;
    var top = event.clientY - _offsetY0;
    var left = event.clientX - _offsetX0;

    if (top < _this.p.top) top = _this.p.top;
    if (top > _this.p.top + _this.p.height) top = _this.p.top + _this.p.height;
    //if (left <= _this.p.left) left = _this.p.left;

    _objDRAG.style.top = top + "px";
    _objDRAG.style.left = left + "px";

};
window.xwf_ui_drag.prototype.endDrag = function (event) {
    var _this = _objDRAG._this;
    g.x.removeEventListener("mousedown", _this.beginDrag, _objDRAG);
    g.x.removeEventListener("mousemove", _this.onDrag, _objDRAG);
    g.x.removeEventListener("mouseup", _this.endDrag, _objDRAG);
};
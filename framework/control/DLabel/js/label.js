﻿/**
 * DoYs JavaScript Library v1.0
 * Author: David.Li
 * Create Date: 2021-03-19
 * Modify Date: 2021-06-29
 * Copyright 2021, doys-next.com
 * DLabel class
 * 
 * 事件命名规则，标签事件：on(after)-label-xxx，元素事件：on(after)-xxx
 * 
 */
class Label {
    constructor(jsp) {
        let _this = this;
        // -- 1. init --
        this.prefix = "doys_label_";
        this.doc = window.document;
        this._designMode = jsp.designMode || false;                  // -- true:设计环境;false:预览环境 --
        this.id = 1;

        // -- 2. label container --
        this.zoom = 1;
        this.container = jsp.container;                             // -- 标签容器 --
        this.container._this = this;

        this.parentContainer = this.container.parentElement;        // -- 标签容器的父对象 --
        this.parentContainer.ondblclick = function (evt) {
            console.log("可以考虑设计为当前缩放比例和100%比例之间切换");
        }
        this.parentContainer.onclick = function (evt) {
            if (!_this._designMode) return;

            _this.activatedElement = null;
            _this.hideResize();
            _this.clearMultiSelect({ raiseEvent: true });
        }

        this.container.ondragenter = function (evt) {
            evt.preventDefault();
        }
        this.container.ondragover = function (evt) {
            evt.preventDefault();
        }
        this.container.onclick = function (evt) {
            // -- 此处不处理，事件自动传导到父容器执行，参见：this.parentContainer.onclick --
            // -- evt.stopPropagation();
            // -- return false;
        }

        // -- 3. label element --
        this.minElementWidth = 1;                                   // -- 元素最小宽度 --
        this.minElementHeight = 1;                                  // -- 元素最小高度 --

        this.dragOffsetX = 0; this.dragOffsetY = 0;                 // -- 元素开始拖动时的坐标 --

        this.divHoverT = null; this.divHoverR = null; this.divHoverB = null; this.divHoverL = null;     // -- element hover border --
        this.divT = null; this.divR = null; this.divB = null; this.divT = null;                         // -- element resize border --

        // -- 4. label properties --
    }
    initConstructor() {
        let X = 0, Y = 0;

        X = this.container.offsetLeft;                              // -- 容器偏移量 --
        X += this.container.clientLeft;                             // -- 容器边框宽度 --
        X -= g.x.getStyleValue(this.container, "marginLeft");       // -- 容器margin --
        X += g.x.getStyleValue(this.container, "paddingLeft");      // -- 容器padding --

        Y = this.container.offsetTop;                               // -- 容器偏移量 --
        Y += this.container.clientTop;                              // -- 容器边框宽度 --
        Y -= g.x.getStyleValue(this.container, "marginTop");        // -- 容器padding --
        Y += g.x.getStyleValue(this.container, "paddingTop");       // -- 容器padding --

        this.containerLeft = X;
        this.containerTop = Y;
    }
    // -- label methods -------------------------------------------------------
    loadLabel(labelString, jsp = {}) {
        if (this.elements) this.clearLabel();

        // -- 1. 初始化参数 --        
        this._designMode = this._designMode || jsp.designMode;
        this.zIndexCanvas = 100;
        this.zIndexResize = 200;
        this.zIndexHover = 210;

        // -- 2. 解析labelString --
        if (!labelString) {
            this.label = this.newLabel(jsp);
        }
        else {
            this.label = JSON.parse(labelString);
        }

        if (jsp.fields) {
            // -- 以传进来的fields为准，便于外部管理fields --
            // -- this.label.fields = g.x.extendJSON(this.label.fields, jsp.fields);
            this.label.fields = jsp.fields;
        }
        if (jsp.width) this.label.head.width = jsp.width;
        if (jsp.height) this.label.head.height = jsp.height;
        if (jsp.point) this.label.head.point = jsp.point;
        if (jsp.imageBaseUrl) this.label.head.imageBaseUrl = jsp.imageBaseUrl;
        this.labelId = jsp.labelId || "";
        this.head = this.label.head;
        this.head.element_id = this.head.element_id || this.label.elements.length + 1;
        this.fields = this.label.fields;
        this.elements = this.label.elements;
        this.multiCount = 0;                                        // -- 多选选中的元素数量 --
        this.container.style.backgroundColor = "white";             // -- 标签底色(暂时设为白色，后续有需要再加配置参数) --
        if (!this.label.page) this.label.page = { width: this.head.width, height: this.head.height, marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0, rows: 1, cols: 1, horizontalSpace: 0, verticalSpace: 0 };

        // -- 3. 计算标签换算系数(毫米|像素) --
        let mmW = this.head.width, mmH = this.head.height, mmWH = mmW / mmH;
        let pxW = this.parentContainer.offsetWidth - g.x.getStyleValue(this.parentContainer, "padding-left") - g.x.getStyleValue(this.parentContainer, "padding-right") - (this._designMode ? 12 : 0);   // -- 如果有矩形元素(宽高等于标签的宽高)，设计环境下hover时会出现不必要的滚动条，所以减12 --
        let pxH = this.parentContainer.offsetHeight - g.x.getStyleValue(this.parentContainer, "padding-top") - g.x.getStyleValue(this.parentContainer, "padding-bottom") - (this._designMode ? 12 : 0);
        let pxWH = pxW / pxH;

        if (mmWH >= pxWH) {
            this.width = pxW;
            this.height = pxW / mmWH;
        }
        else {
            this.height = pxH;
            this.width = pxH * mmWH;
        }
        this.width *= this.zoom;
        this.height *= this.zoom;
        this.pxmm = this.width / mmW;

        this.container.style.width = this.width + "px";
        this.container.style.height = this.height + "px";
        this.initConstructor();
        this.container.onmousemove = function (evt) {
            let _this = evt.srcElement._this;
            if (_this && _this.hoveredElement) {
                _this.hideHover();
            }
        }

        // -- 4. 加载标签元素 --
        let es = {};
        for (let i = 0; i < this.elements.length; i++) {
            let element = this.elements[i];

            element._designMode = this._designMode;
            element._labelHead = this.head;

            if (!element.head.name) {   // -- 估计是历史版本原因 --
                topWin.alert("早期版本bug，需要重新保存标签文件(" + element.head.name + ")", "error");
                element.head.name = "element_" + this.head.element_id++;
            }
            this.createElement(element);
            UtilElement.computeProp({ element: element });

            if (es[element.head.name]) {
                topWin.alert("早期版本bug，需要重新保存标签文件(" + element.head.name + ")", "error");
                this.head.element_id += 100;
                element.head.name = "element_" + this.head.element_id++;
            }
            else {
                es[element.head.name] = element.head.name;
            }
        }

        // -- 5. 加载脚本 --
        if (this.head.scriptBeforeCompute) {
            try {
                eval("this.jsBeforeCompute = function() {\n" + this.head.scriptBeforeCompute + "\n}");
            }
            catch (e) {
                alert("Script eval error:\n" + e.toString());
            }
        }
        else {
            this.jsBeforeCompute = null;
        }
        if (this.head.scriptAfterCompute) {
            try {
                eval("this.jsAfterCompute = function() {\n" + this.head.scriptAfterCompute + "\n}");
            }
            catch (e) {
                alert("Script eval error:\n" + e.toString());
            }
        }
        else {
            this.jsAfterCompute = null;
        }

        // -- 6. RaiseEvent --
        this.raiseEvent("after-label-load");
    }
    clearLabel() {
        this.activatedElement = null;
        this.hideResize();
        this.hideHover();

        this.divT = null, this.divB = null, this.divL = null, this.divR = null;
        this.divHoverT = null, this.divHoverB = null, this.divHoverL = null, this.divHoverR = null;

        this.container.innerHTML = "";
        this.elements = null;
        this.fields = null;
        this.label = null;

        this.multiCount = 0;
        this.raiseEvent("on-select");
    }
    clearMultiSelect(jsp = { raiseEvent: false, excludeActivated: false }) {
        let nameActivated = this.activatedElement ? this.activatedElement.head.name : "";
        for (let i = 0; i < this.elements.length; i++) {
            let element = this.elements[i];

            if (!element.head._selected) continue;
            if (jsp.excludeActivated) {
                if (element.head.name.equals(nameActivated)) continue;
            }

            this.multiCount--;
            element.head._selected = false;
            UtilElement.draw({ element: element });
        }

        if (jsp.raiseEvent) {
            this.raiseEvent("on-select");
        }
    }
    newLabel(jsp = {}) {
        return {
            head: {
                width: jsp.width || 80,
                height: jsp.height || 60
            },
            fields: jsp.fields || {},
            elements: []
        }
    }

    addEventListener(name, callback, jsp = {}) {
        if (name.equals("after-label-load")) {
            if (!this.afterLabelLoadEvents) {
                this.afterLabelLoadEvents = [];
            }
            this.afterLabelLoadEvents.push({ callback: callback, jsp: jsp });
        }
        else if (name.equals("on-save") || name.equals("onSave")) {
            if (!this.onSaveEvents) {
                this.onSaveEvents = [];
            }
            this.onSaveEvents.push({ callback: callback, jsp: jsp });
        }
        else if (name.equals("on-export")) {
            if (!this.onExportEvents) {
                this.onExportEvents = [];
            }
            this.onExportEvents.push({ callback: callback, jsp: jsp });
        }
        else if (name.equals("on-import")) {
            if (!this.onImportEvents) {
                this.onImportEvents = [];
            }
            this.onImportEvents.push({ callback: callback, jsp: jsp });
        }
        else if (name.equals("on-select")) {
            if (!this.onSelectEvents) {
                this.onSelectEvents = [];
            }
            this.onSelectEvents.push({ callback: callback, jsp: jsp });
        }
        else {
            throw ("unsupport event: " + name);
        }
    }
    raiseEvent(name, jsp = {}) {
        let evt;

        if (name.equals("after-label-load")) {
            if (this.afterLabelLoadEvents) {
                for (let i = 0; i < this.afterLabelLoadEvents.length; i++) {
                    evt = this.afterLabelLoadEvents[i];
                    evt.callback(jsp, evt.jsp);     // -- 事件参数，事件注册时的原始参数 --
                }
            }
        }
        else if (name.equals("on-select")) {
            if (this.onSelectEvents) {
                for (let i = 0; i < this.onSelectEvents.length; i++) {
                    evt = this.onSelectEvents[i];
                    evt.callback(jsp, evt.jsp);     // -- 事件参数，事件注册时的原始参数 --
                }
            }
        }
        else {
            throw ("unsupport event: " + name);
        }
    }
    save() {
        if (this.onSaveEvents) {
            for (let i = 0; i < this.onSaveEvents.length; i++) {
                let evt = this.onSaveEvents[i];
                evt.callback(
                    g.x.extendJSON(evt.jsp, {
                        labelString: this.toJson()
                    })
                );
            }
        }
    }
    exportLabel() {
        if (this.onExportEvents) {
            for (let i = 0; i < this.onExportEvents.length; i++) {
                let evt = this.onExportEvents[i];
                evt.callback(evt.jsp);
            }
        }
    }
    importLabel() {
        if (this.onImportEvents) {
            for (let i = 0; i < this.onImportEvents.length; i++) {
                let evt = this.onImportEvents[i];
                evt.callback(evt.jsp);
            }
        }
    }

    zoomIn() {
        if (this.zoom > 2) return;
        this.zoom = this.zoom * 1.1;
        this.loadLabel(this.toJson());
        this.compute(true);
    }
    zoomOut() {
        if (this.zoom < 0.5) return;
        this.zoom = this.zoom * 0.9;
        this.loadLabel(this.toJson());
        this.compute(true);
    }
    zoomFit() {
        this.zoom = 1;
        this.loadLabel(this.toJson());
        this.compute(true);
    }

    // -- element base --------------------------------------------------------
    addBlankTextElement(elementType) {
        this.clearMultiSelect();

        let element = DLbelExample.getElement(elementType);
        element._designMode = this._designMode;
        element._this = this;
        element._labelHead = this.head;
        element.head.name = "element_" + this.head.element_id++;
        element.position.top = (this.head.height * Math.random() / 2).toFixed(2);
        element.position.left = (this.head.width * Math.random() / 2).toFixed(2);

        this.elements.push(element);
        this.createElement(element);

        UtilElement.computeProp({ element: element });
        UtilElement.computeValue({ element: element, fields: this.fields });
        UtilElement.draw({ element: element });

        this.activatedElement = element;
        this.showResize();
        this.raiseEvent("on-select");
    }
    pasteElements(elementsCopy) {
        this.clearMultiSelect();
        this.activatedElement = null;
        this.hideResize();
        this.hideHover();

        let element, elementString;
        let count = elementsCopy.length;
        // ------------------------------------------------
        for (let i = 0; i < count; i++) {
            elementString = UtilElement.getJson(elementsCopy[i]);
            element = JSON.parse(elementString);

            element._designMode = this._designMode;
            element._this = this;
            element._labelHead = this.head;
            element.head.name = "element_" + this.head.element_id++;
            element.head._selected = (count > 1);

            element.position.top = parseFloat(elementsCopy[i].position.top) + 5;
            element.position.left = parseFloat(elementsCopy[i].position.left) + 10;

            this.elements.push(element);
            this.createElement(element);

            UtilElement.computeProp({ element: element });
            UtilElement.computeValue({ element: element, fields: this.fields });
            UtilElement.draw({ element: element });
        }

        // ------------------------------------------------
        if (count == 1) {
            this.activatedElement = element;
            this.showResize();
        }
        else {
            this.multiCount = count;
        }
        this.raiseEvent("on-select");
    }
    delElement(element) {
        if (!element) {
            element = this.activatedElement;
        }
        if (!element) return;

        let domCanvas = element._canvas;

        this.container.removeChild(domCanvas);
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i]._canvasId == element._canvasId) {
                this.elements.splice(i, 1);
                break;
            }
        }

        this.activatedElement = null;
        this.hideResize();
        this.hideHover();
    }
    getElementByName(elementName) {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].head.name.equals(elementName)) {
                return this.elements[i];
            }
        }
        return null;
    }

    createElement(element) {
        let _this = this;
        let canvasId = _this.prefix + "cvs_" + _this.id++;
        let cvsElement = _this.doc.createElement("canvas");

        cvsElement._this = _this;
        cvsElement._element = element;
        cvsElement.id = canvasId;
        cvsElement.tabIndex = _this.id;     // -- 可以解决keydown事件无效问题，参考：https://stackoverflow.com/questions/12886286/addeventlistener-for-keydown-on-canvas
        cvsElement.className = _this.prefix + "element";
        cvsElement.title = element.head.name;

        _this.container.appendChild(cvsElement);
        element._this = _this;
        element._canvas = cvsElement;
        element._canvasId = canvasId;

        if (this._designMode) {
            cvsElement.draggable = true;
            cvsElement.ondragstart = function (evt) {
                let _dom = evt.srcElement;
                let _this = _dom._this;

                _this.activeElement(_dom._element);

                evt.dataTransfer.setDragImage(new Image(), 0, 0);
                _this.ondragstart(evt);
            };
            cvsElement.ondrag = _this.onCanvasDrag;

            cvsElement.onkeydown = this.cvsElementOnKeydown;
            cvsElement.onmousemove = this.cvsElementOnMousemove;

            cvsElement.onmouseenter1 = this.showHover;
            cvsElement.onmouseleave1 = function (evt) {
                let _dom = evt.srcElement;
                let _this = _dom._this;

                _this.hideHover();
            }

            cvsElement.onclick = this.onElementClick;
            cvsElement.ondblclick = function (evt) {
                _this.onElementDblClick(_this, evt);
            }
        }
    }
    activeElement(element) {
        let _this = this;

        _this.activatedElement = element;
        _this.hideHover();
        _this.showResize();
    }

    // -- element event: drag -------------------------------------------------
    ondragstart(evt) {
        let domDrag = evt.srcElement;
        let element = domDrag._element;
        let dragOffsetX = 0, dragOffsetY = 0;

        dragOffsetX = this.containerLeft;                                   // -- 容器偏移量、边框、margin、padding --
        dragOffsetX += g.x.getStyleValue(domDrag, "marginLeft");            // -- 拖动对象margin --
        dragOffsetX += domDrag.clientLeft;                                  // -- 拖动对象边框宽度 --
        dragOffsetX += evt.offsetX;                                         // -- 拖动对象偏移量(鼠标坐标相对于拖动对象) --

        dragOffsetY = this.containerTop;                                    // -- 容器偏移量、边框、margin、padding --
        dragOffsetY += g.x.getStyleValue(domDrag, "marginTop");             // -- 拖动对象margin --
        dragOffsetY += domDrag.clientTop;                                   // -- 拖动对象边框宽度 --
        dragOffsetY += evt.offsetY;                                         // -- 拖动对象偏移量(鼠标坐标相对于拖动对象) --

        this.dragOffsetX = dragOffsetX;
        this.dragOffsetY = dragOffsetY;
        for (let i = 0; i < this.elements.length; i++) {
            let el = this.elements[i];
            if (!el.head._selected) continue;

            el._canvas.offsetLeft0 = el._canvas.offsetLeft;                 // -- 拖动前X坐标 --
            el._canvas.offsetTop0 = el._canvas.offsetTop;                   // -- 拖动前Y坐标 --
        }
    }
    onCanvasDrag(evt) {
        let domDrag = evt.srcElement;
        let _this = domDrag._this;
        let element = _this.activatedElement;
        let x, y;

        if (element.head.locked) return;

        x = evt.clientX - _this.dragOffsetX;
        y = evt.clientY - _this.dragOffsetY;
        if (x < -domDrag.offsetWidth + 50) return;
        if (y < -domDrag.offsetHeight + 50) return;

        domDrag.style.left = x + "px";
        domDrag.style.top = y + "px";
        element.position.left = (x / _this.pxmm).toFixed(2);
        element.position.top = (y / _this.pxmm).toFixed(2);

        if (_this.activatedElement) {
            _this.showResize();
        }

        // -- 多选拖动联动 --------------------------------------
        if (!element.head._selected) return;
        let cvs, el;
        let xMove = domDrag.offsetLeft - domDrag.offsetLeft0;
        let yMove = domDrag.offsetTop - domDrag.offsetTop0;
        for (let i = 0; i < _this.elements.length; i++) {
            el = _this.elements[i];
            if (!el.head._selected || el.head.name.equals(element.head.name)) continue;

            cvs = el._canvas;
            x = cvs.offsetLeft0 + xMove;
            y = cvs.offsetTop0 + yMove;

            cvs.style.left = x + "px";
            cvs.style.top = y + "px";
            el.position.left = (x / _this.pxmm).toFixed(2);
            el.position.top = (y / _this.pxmm).toFixed(2);
        }
    }

    cvsElementOnMousemove(evt) {
        if (evt.buttons > 0) return;

        let _dom = evt.srcElement;
        let _this = _dom._this;
        let element = _dom._element;
        let position = element.position;

        let points = [position.P1, position.P2, position.P3, position.P4];
        let blIn = Util.inPolygon(evt.layerX / _this.pxmm, evt.layerY / _this.pxmm, points);
        if (blIn) {
            _this.showHover(evt);
        }
        else {
            _this.hideHover();
        }

        evt.stopPropagation();
        return false;
    }
    cvsElementOnKeydown(evt) {
        let _dom = evt.srcElement;
        let _this = _dom._this;

        if (evt.code.equals("Delete") || evt.code.equals("Backspace")) {
            _this.delElement();
            for (let i = _this.elements.length - 1; i >= 0; i--) {
                if (_this.elements[i].head._selected) {
                    _this.delElement(_this.elements[i]);
                }
            }
            _this.multiCount = 0;
            _this.raiseEvent("on-select");
        }
    }
    // -- element event: click and hover --------------------------------------
    onElementClick(evt) {
        let _dom = evt.srcElement;
        let _this = _dom._this;
        let element = _dom._element;
        // ------------------------------------------------
        evt.stopPropagation();

        // ------------------------------------------------
        if (evt.ctrlKey) {
            if (_this.activatedElement) {
                _this.activatedElement = null;
                _this.hideResize();
                _this.hideHover();
            }

            if (element.head._selected) {
                element.head._selected = false;
                _this.multiCount--;
            }
            else {
                element.head._selected = true;
                _this.multiCount++;
            }
            UtilElement.draw({ element: element });
        }
        else {
            if (_this.multiCount > 0) {
                _this.clearMultiSelect();
            }
            _this.activeElement(element);
        }
        _this.raiseEvent("on-select");
    }
    onElementDblClick(_this, evt) {
        let domElement = evt.srcElement;
        let element = domElement._element;
        let elementType = element.head.elementType;
        if (!elementType.equals("text") && !elementType.equals("barcode")) return;

        let prop = {
            url: g.x.getPath() + "element.html",
            parent: window.win,
            parent: null,
            modal: true
        };
        let para = {
            fields: _this.fields,

            canvasId: element._canvasId,
            head: element.head,
            _labelHead: element._labelHead,
            segments: element.segments,
            sections: element.sections,

            callback: _this.onElementDblClickCallback
        };
        cWin.openWindow(prop, para);

        event.stopPropagation();
    }
    onElementDblClickCallback(jsp) {
        let domCanvas = gId(jsp.canvasId);
        let _this = domCanvas._this;
        let element = _this.activatedElement;

        element.head = jsp.head;
        element.segments = jsp.segments;
        element.sections = jsp.sections;
        UtilElement.reduce({ element: element });

        UtilElement.computeProp({ element: element });
        UtilElement.computeValue({ element: element, fields: _this.fields });
        UtilElement.draw({ element: element });
        _this.showResize();
    }

    showHover(evt) {
        let domC = evt.srcElement;      // -- domCanvas --
        let _this = domC._this;
        let element = domC._element;
        let P = element.position;
        let angle = P.angle, angleR = P.angleR;

        let divL = _this.divHoverL, divR = _this.divHoverR, divT = _this.divHoverT, divB = _this.divHoverB;
        // ------------------------------------------------
        if (element.head.locked) return;
        if (_this.activatedElement) {
            if (_this.activatedElement._canvas.id.equals(domC.id)) {
                return;
            }
        }
        if (_this.hoveredElement) {
            if (_this.hoveredElement._canvas.id.equals(domC.id)) {
                return;
            }
        }
        _this.hoveredElement = element;

        // ------------------------------------------------
        if (!divT) {
            divT = _this.doc.createElement("DIV");
            divT.className = _this.prefix + "hoverTB";
            divT.style.zIndex = _this.zIndexHover;
            _this.container.appendChild(divT);

            divB = _this.doc.createElement("DIV");
            divB.className = _this.prefix + "hoverTB";
            divB.style.zIndex = _this.zIndexHover;
            _this.container.appendChild(divB);


            divL = _this.doc.createElement("DIV");
            divL.className = _this.prefix + "hoverLR";
            divL.style.zIndex = _this.zIndexHover;
            _this.container.appendChild(divL);

            divR = _this.doc.createElement("DIV");
            divR.className = _this.prefix + "hoverLR";
            divR.style.zIndex = _this.zIndexHover;
            _this.container.appendChild(divR);

            _this.divHoverT = divT; _this.divHoverB = divB; _this.divHoverL = divL; _this.divHoverR = divR;
        }
        else {
            divT.style.display = ""; divB.style.display = "";
            divL.style.display = ""; divR.style.display = "";
        }

        // ------------------------------------------------
        divT.style.transform = "rotate(" + angle + "deg)"; divB.style.transform = "rotate(" + angle + "deg)";
        divL.style.transform = "rotate(" + angle + "deg)"; divR.style.transform = "rotate(" + angle + "deg)";

        divT.style.width = (P.width * _this.pxmm) + "px";
        divT.style.left = (domC.offsetLeft + P.P15.x * _this.pxmm + divT.offsetHeight / 2 * Math.sin(angleR) - P.width / 2 * _this.pxmm) + "px";
        divT.style.top = (domC.offsetTop + P.P15.y * _this.pxmm - divT.offsetHeight / 2 * Math.cos(angleR) - divT.offsetHeight / 2) + "px";

        divB.style.width = divT.style.width;
        divB.style.left = (domC.offsetLeft + P.P35.x * _this.pxmm - divB.offsetHeight / 2 * Math.sin(angleR) - P.width / 2 * _this.pxmm) + "px";
        divB.style.top = (domC.offsetTop + P.P35.y * _this.pxmm + divB.offsetHeight / 2 * Math.cos(angleR) - divB.offsetHeight / 2) + "px";

        divL.style.height = (P.height * _this.pxmm + 2 * divT.offsetHeight) + "px";
        divL.style.left = (domC.offsetLeft + P.P45.x * _this.pxmm - divL.offsetWidth / 2 * Math.cos(angleR) - divL.offsetWidth / 2) + "px";
        divL.style.top = (domC.offsetTop + P.P45.y * _this.pxmm - divL.offsetWidth / 2 * Math.sin(angleR) - divL.offsetHeight / 2) + "px";

        divR.style.height = divL.style.height;
        divR.style.left = (domC.offsetLeft + P.P25.x * _this.pxmm + divR.offsetWidth / 2 * Math.cos(angleR) - divR.offsetWidth / 2) + "px";
        divR.style.top = (domC.offsetTop + P.P25.y * _this.pxmm + divR.offsetWidth / 2 * Math.sin(angleR) - divR.offsetHeight / 2) + "px";
    }
    hideHover() {
        let _this = this;
        if (_this.hoveredElement) {
            _this.divHoverT.style.display = "none";
            _this.divHoverB.style.display = "none";
            _this.divHoverL.style.display = "none";
            _this.divHoverR.style.display = "none";

            _this.hoveredElement = null;
        }
    }

    // -- element event: resize -----------------------------------------------
    showResize() {
        let _this = this;
        let domC = _this.activatedElement._canvas;

        let divT, divB, divL, divR;
        let P = _this.activatedElement.position;
        let angle = P.angle, angleR = P.angleR;
        // ------------------------------------------------
        if (_this.divT) {
            divT = _this.divT; divB = _this.divB;
            divL = _this.divL; divR = _this.divR;

            divT.style.display = ""; divB.style.display = "";
            divL.style.display = ""; divR.style.display = "";
        }
        else {
            divT = _this.doc.createElement("DIV");
            divT.resizeType = "T";
            divT.className = _this.prefix + "resizeTB";
            divT.style.zIndex = _this.zIndexResize;
            divT.draggable = true;
            divT.ondragstart = function (evt) {
                let _this = evt.srcElement._this;
                _this.ondragstart(evt);
                evt.dataTransfer.setDragImage(new Image(), 0, 0);
            };
            divT.ondrag = _this.onResizeDrag;
            divT.ondragend = _this.onResizeDragEnd;
            divT._this = _this;
            _this.container.appendChild(divT);
            _this.divT = divT;

            divB = _this.doc.createElement("DIV");
            divB.resizeType = "B";
            divB.className = _this.prefix + "resizeTB";
            divB.style.zIndex = _this.zIndexResize;
            divB.draggable = true;
            divB.ondragstart = function (evt) {
                let _this = evt.srcElement._this;
                _this.ondragstart(evt);
                evt.dataTransfer.setDragImage(new Image(), 0, 0);
            };
            divB.ondrag = _this.onResizeDrag;
            divB.ondragend = _this.onResizeDragEnd;
            divB._this = _this;
            _this.container.appendChild(divB);
            _this.divB = divB;

            divR = _this.doc.createElement("DIV");
            divR.resizeType = "R";
            divR.className = _this.prefix + "resizeLR";
            divR.style.zIndex = _this.zIndexResize;
            divR.draggable = true;
            divR.ondragstart = function (evt) {
                let _this = evt.srcElement._this;
                _this.ondragstart(evt);
                evt.dataTransfer.setDragImage(new Image(), 0, 0);
            };
            divR.ondrag = _this.onResizeDrag;
            divR.ondragend = _this.onResizeDragEnd;
            divR._this = _this;
            _this.container.appendChild(divR);
            _this.divR = divR;

            divL = _this.doc.createElement("DIV");
            divL.resizeType = "L";
            divL.className = _this.prefix + "resizeLR";
            divL.style.zIndex = _this.zIndexResize;
            divL.draggable = true;
            divL.ondragstart = function (evt) {
                let _this = evt.srcElement._this;
                _this.ondragstart(evt);
                evt.dataTransfer.setDragImage(new Image(), 0, 0);
            };
            divL.ondrag = _this.onResizeDrag;
            divL.ondragend = _this.onResizeDragEnd;
            divL._this = _this;
            _this.container.appendChild(divL);
            _this.divL = divL;
        }

        // ------------------------------------------------
        divT.style.transform = "rotate(" + angle + "deg)"; divB.style.transform = "rotate(" + angle + "deg)";
        divL.style.transform = "rotate(" + angle + "deg)"; divR.style.transform = "rotate(" + angle + "deg)";
        if ((angle > 22.5 && angle <= 67.5) || (angle > 202.5 && angle <= 247.5)) {
            divT.style.cursor = "ne-resize"; divL.style.cursor = "se-resize";
        }
        else if ((angle > 67.5 && angle <= 112.5) || (angle > 247.5 && angle <= 292.5)) {
            divT.style.cursor = "ew-resize"; divL.style.cursor = "ns-resize";
        }
        else if ((angle > 112.5 && angle <= 157.5) || (angle > 292.5 && angle <= 337.5)) {
            divT.style.cursor = "se-resize"; divL.style.cursor = "ne-resize";
        }
        else if ((angle > 157.5 && angle <= 202.5) || angle > 337.5 || angle <= 22.5) {
            divT.style.cursor = "ns-resize"; divL.style.cursor = "ew-resize";
        }
        divB.style.cursor = divT.style.cursor; divR.style.cursor = divL.style.cursor;


        // ------------------------------------------------
        divT.style.width = (P.width * _this.pxmm) + "px";
        divT.style.left = (domC.offsetLeft + P.P15.x * _this.pxmm + divT.offsetHeight / 2 * Math.sin(angleR) - P.width / 2 * _this.pxmm) + "px";
        divT.style.top = (domC.offsetTop + P.P15.y * _this.pxmm - divT.offsetHeight / 2 * Math.cos(angleR) - divT.offsetHeight / 2) + "px";

        divB.style.width = divT.style.width;
        divB.style.left = (domC.offsetLeft + P.P35.x * _this.pxmm - divB.offsetHeight / 2 * Math.sin(angleR) - P.width / 2 * _this.pxmm) + "px";
        divB.style.top = (domC.offsetTop + P.P35.y * _this.pxmm + divB.offsetHeight / 2 * Math.cos(angleR) - divB.offsetHeight / 2) + "px";

        divL.style.height = (P.height * _this.pxmm + 2 * divT.offsetHeight) + "px";
        divL.style.left = (domC.offsetLeft + P.P45.x * _this.pxmm - divL.offsetWidth / 2 * Math.cos(angleR) - divL.offsetWidth / 2) + "px";
        divL.style.top = (domC.offsetTop + P.P45.y * _this.pxmm - divL.offsetWidth / 2 * Math.sin(angleR) - divL.offsetHeight / 2) + "px";

        divR.style.height = divL.style.height;
        divR.style.left = (domC.offsetLeft + P.P25.x * _this.pxmm + divR.offsetWidth / 2 * Math.cos(angleR) - divR.offsetWidth / 2) + "px";
        divR.style.top = (domC.offsetTop + P.P25.y * _this.pxmm + divR.offsetWidth / 2 * Math.sin(angleR) - divR.offsetHeight / 2) + "px";
    }
    hideResize() {
        let _this = this;

        if (_this.divT) {
            _this.divT.style.display = "none";
            _this.divB.style.display = "none";
            _this.divL.style.display = "none";
            _this.divR.style.display = "none";
        }
    }
    onResizeDrag(evt) {
        let _this = evt.srcElement._this;
        let pxmm = _this.pxmm;
        let domResize = evt.srcElement;
        let element = _this.activatedElement;
        let P = element.position;
        let domCanvas = element._canvas;
        let width, height, widthNew, heightNew;
        let angle = P.angle, angleR = P.angleR;

        // -- 1. 计算domCanvas的位置及宽高 -------------------
        let pDrag = {
            x: (evt.clientX - _this.containerLeft) / pxmm - P.left,
            y: (evt.clientY - _this.containerTop) / pxmm - P.top
        }

        if (domResize.resizeType.equals("L")) {
            widthNew = Util.getTriangleHeight(P.P2, P.P3, pDrag);

            if (angle <= 90) {
                P.top = parseFloat(P.top) + (P.width - widthNew) * Math.sin(angleR);
                P.left = parseFloat(P.left) + (P.width - widthNew) * Math.cos(angleR);
            }
            else if (angle <= 180) {
                P.top = parseFloat(P.top) + (P.width - widthNew) * Math.sin(angleR);
            }
            else if (angle <= 270) {
                // -- do nothing --
            }
            else {
                P.left = parseFloat(P.left) + (P.width - widthNew) * Math.cos(angleR);
            }
            P.width = widthNew.toFixed(2);
        }
        else if (domResize.resizeType.equals("R")) {
            widthNew = Util.getTriangleHeight(P.P1, P.P4, pDrag);

            if (angle <= 90) {
                // -- do nothing --
            }
            else if (angle <= 180) {
                P.left = parseFloat(P.left) + (P.width - widthNew) * Math.abs(Math.cos(angleR));
            }
            else if (angle <= 270) {
                P.top = parseFloat(P.top) + (P.width - widthNew) * Math.abs(Math.sin(angleR));
                P.left = parseFloat(P.left) + (P.width - widthNew) * Math.abs(Math.cos(angleR));
            }
            else {
                P.top = parseFloat(P.top) + (P.width - widthNew) * Math.abs(Math.sin(angleR));
            }
            P.width = widthNew.toFixed(2);
        }
        else if (domResize.resizeType.equals("T")) {
            heightNew = Util.getTriangleHeight(P.P3, P.P4, pDrag);

            if (angle <= 90) {
                P.top = parseFloat(P.top) + (P.height - heightNew) * Math.abs(Math.cos(angleR));
            }
            else if (angle <= 180) {
                // -- do nothing --
            }
            else if (angle <= 270) {
                P.left = parseFloat(P.left) + (P.height - heightNew) * Math.abs(Math.sin(angleR));
            }
            else {
                P.top = parseFloat(P.top) + (P.height - heightNew) * Math.abs(Math.cos(angleR));
                P.left = parseFloat(P.left) + (P.height - heightNew) * Math.abs(Math.sin(angleR));
            }
            P.height = heightNew.toFixed(2);;
        }
        else if (domResize.resizeType.equals("B")) {
            heightNew = Util.getTriangleHeight(P.P1, P.P2, pDrag);

            if (angle <= 90) {
                P.left = parseFloat(P.left) + (P.height - heightNew) * Math.abs(Math.sin(angleR));
            }
            else if (angle <= 180) {
                P.left = parseFloat(P.left) + (P.height - heightNew) * Math.abs(Math.sin(angleR));
                P.top = parseFloat(P.top) + (P.height - heightNew) * Math.abs(Math.cos(angleR));
            }
            else if (angle <= 270) {
                P.top = parseFloat(P.top) + (P.height - heightNew) * Math.abs(Math.cos(angleR));
            }
            else {
                // -- no nothing --
            }
            P.height = heightNew.toFixed(2);;
        }

        UtilElement.computeProp({ element: element });
        UtilElement.draw({ element: element });
        _this.showResize();

        if (false) {
            // -- 2. 根据旋转角度，重新计算元素宽高，使元素适应新的domCanvas边框范围 --
            element.position.left = (domCanvas.offsetLeft / pxmm).toFixed(2);
            element.position.top = (domCanvas.offsetTop / pxmm).toFixed(2);

            element.position.width = (domCanvas.offsetWidth / pxmm).toFixed(2);
            element.position.height = (domCanvas.offsetHeight / pxmm).toFixed(2);

            width = domCanvas.offsetWidth / pxmm;
            height = domCanvas.offsetHeight / pxmm;
            element.position.width = (width * Math.abs(Math.cos(angleR)) + height * Math.sin(angleR)).toFixed(2);
            element.position.height = (height * Math.abs(Math.cos(angleR)) + width * Math.sin(angleR)).toFixed(2);

            // -- 9. 实时重绘 -------------------------------------
            if (element.head.elementType.equals("image")) {
                // -- 通过重置canvas宽度，让图像消失，避免拖动过程中抖动 --
                domCanvas.width = (element.position.width * pxmm).toFixed(2);
            }
            else {
                // -- 非图像元素抖动不明显，可以实时重绘，提升用户体验 --
                UtilElement.computeProp({ element: element });
                UtilElement.draw({ element: element });
            }
        }
    }
    onResizeDragEnd(evt) {
        let domDrag = evt.srcElement;
        let _this = domDrag._this;
        let element = _this.activatedElement;

        UtilElement.computeProp({ element: element });
        UtilElement.draw({ element: element });
    }

    // -- properties change ---------------------------------------------------
    setAngle(angle) {
        if (!this.activatedElement) return;

        let _this = this;
        let element = _this.activatedElement;

        if (Math.abs(angle) > 360) {
            angle = (Math.abs(angle) % 360) * (angle < 0 ? -1 : 1);
        }
        if (angle < 0) angle = angle + 360;

        element.position.angle = angle;
        UtilElement.computeProp({ element: element });
        UtilElement.draw({ element: element });

        _this.showResize();
        return angle;
    }

    // -- toJson, getData, setValue, etc. -------------------------------------
    toJson() {
        try {
            // -- 按照图层排序 --
            this.elements.sort(function (e1, e2) {
                return e1.position.layer - e2.position.layer;
            });


            return JSON.stringify(this.label,
                (k, v) => {
                    if (k.startsWith("_") || k.startsWith("$")) {    // -- _this, _canvas --                        
                        return undefined;
                    }
                    else {
                        // -- console.log(k); --
                    }
                    return v;
                }, "  "
            );
        }
        catch (e) {
            topWin.alert(e, "error");
        }
    }
    getData() {
        let data = {};
        let element, head;
        // ------------------------------------------------        
        for (let i = 0; i < this.elements.length; i++) {
            element = this.elements[i];
            head = element.head;

            if (head.elementType.equals("text")) {
                data[head.name] = head._sectionsText || "";
            }
            else if (head.elementType.equals("barcode")) {
                data[head.name] = {
                    text: head._sectionsText || "",
                    value: head._segmentsText || ""
                }
            }
            else if (head.elementType.equals("image")) {
                if (!element.image.url) {
                    data[head.name] = "";
                }
                else if (element.image.url.startsWith("http")) {
                    data[head.name] = element.image.url;
                }
                else {
                    data[head.name] = element._labelHead.imageBaseUrl + element.image.url;
                }
            }
        }
        // ------------------------------------------------
        return data;
    }

    setValue(name, value) {
        if (this.fields[name] == undefined) {
            throw new Error("The label variable (" + name + ") was not found, please check.");
        }
        this.fields[name] = value;
    }
    setElementValue(name, value) {
        let element = this.getElementByName(name);
        if (!element) {
            throw new Error("No element named " + name + " was found");
        }
        let elementType = element.head.elementType;
        if (elementType.equals("text")) {
            if (element.sections[0].type.equals("fixed")) {
                element.sections[0].value = value;
            }
            else {
                throw new Error("对元素直接赋值，元素数据类型必须是固定值，请检查。");
            }
        }
        else if (elementType.equals("barcode")) {
            if (element.segments[0].type.equals("fixed")) {
                element.segments[0].value = value;
            }
            else {
                throw new Error("对元素直接赋值，元素数据类型必须是固定值，请检查。");
            }
        }
        else if (elementType.equals("image")) {
            element.image.value = "";
            element.image.url = value;
        }
        else {
            throw new Error("不支持对类型为" + elementType + " 的元素赋值，请检查。");
        }
    }
    setElementText(name, value) {
        let element = this.getElementByName(name);
        if (!element) {
            throw new Error("No element named " + name + " was found");
        }
        let elementType = element.head.elementType;
        if (elementType.equals("barcode")) {
            if (element.sections[0].type.equals("fixed")) {
                element.sections[0].value = value;
            }
            else {
                throw new Error("对元素直接赋值，元素数据类型必须是固定值，请检查。");
            }
        }
        else {
            throw new Error("不支持对类型为" + elementType + " 的元素赋值，请检查。");
        }
    }
    getElementByName(name) {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].head.name.equals(name)) {
                return this.elements[i];
            }
        }
    }
    compute(redraw = false) {
        // -- 1. before compute --
        if (this.jsBeforeComputeDebug) {
            this.jsBeforeComputeDebug();
        }
        else {
            if (this.jsBeforeCompute) {
                try {
                    this.jsBeforeCompute();
                }
                catch (e) {
                    alert("Script jsBeforeCompute execute error:\n" + e.toString());
                }
            }
        }

        // -- 2. compute elements --
        for (let i = 0; i < this.elements.length; i++) {
            UtilElement.computeValue({ element: this.elements[i], fields: this.fields });
        }

        // -- 3. after compute --
        if (this.jsAfterComputeDebug) {
            this.jsAfterComputeDebug();
        }
        else {
            if (this.jsAfterCompute) {
                try {
                    this.jsAfterCompute();
                }
                catch (e) {
                    alert("Script jsAfterCompute execute error:\n" + e.toString());
                }
            }
        }

        // -- 4. redraw(循环赋值过程中，可以不重绘，最后一张标签重绘即可) --
        if (redraw) {
            this.draw();
        }
    }
    draw() {
        for (let i = 0; i < this.elements.length; i++) {
            UtilElement.draw({ element: this.elements[i] });
        }
    }

    // -- print and printer ---------------------------------------------------
    async getPrinterList() {
        let res = await crossLocal.getPrinterList();
        if (res.ok) {
            return res.data.printers;
        }
    }
    getPrinterName() {
        return this.printerName || "";
    }
    setPrinterName(printerName) {
        this.printerName = printerName;
    }
    print(jsp) {
        let labelString = this.toJson();
        let dataString = JSON.stringify(jsp.data, null, " ");
        let para = {
            labelString: labelString,
            dataString: dataString,
            printerName: jsp.printerName || "",
            copies: jsp.copies || 1,
            md5Origin: jsp.md5Origin || ""
        }
        crossLocal.printLabel(para);
    }

    // -- temporary script debug --
    jsBeforeComputeDebug1() {
        let mfgDate = this.fields["生产日期"].toDate("yyMMdd");
        let expDate = mfgDate.add(1, "year").add(-1, "day");
        this.fields["失效日期"] = expDate.toString("yyMMdd");

        return;
        let imagePara = this.fields["图片参数"];
        let arr = imagePara.split("");
        for (let i = 1; i <= arr.length && i <= 6; i++) {
            let element = this.getElementByName("图片0" + i);
            let idxImg = parseInt(arr[i - 1]);
            let imgUrl = this.head.imageBaseUrl + this.fields["image0" + idxImg];

            element.image.url = imgUrl;
        }
        for (let i = arr.length + 1; i <= 6; i++) {
            let element = this.getElementByName("图片0" + i);
            let imgUrl = this.head.imageBaseUrl + this.fields["image00"];

            element.image.url = imgUrl;
        }
    }
    jsAfterComputeDebug1() {
        

        let mfgDate = this.fields["生产日期"].toDate("yyMMdd");
        let expDate = mfgDate.add(1, "year").add(-1, "day");
        let exp = expDate.toString("yyMMdd");

        debugger
        debugger
        this.setElementValue("exp_date", exp);


        //this.fields["失效日期"] = date2.toString("yyMMdd");

        return;
        let imagePara = this.fields["图片参数"];
        let arr = imagePara.split("");
        for (let i = 1; i <= arr.length && i <= 6; i++) {
            let element = this.getElementByName("图片0" + i);
            let idxImg = parseInt(arr[i - 1]);
            let imgUrl = this.head.imageBaseUrl + this.fields["image0" + idxImg];

            element.image.url = imgUrl;
        }
        for (let i = arr.length + 1; i <= 6; i++) {
            let element = this.getElementByName("图片0" + i);
            let imgUrl = this.head.imageBaseUrl + this.fields["image00"];

            element.image.url = imgUrl;
        }
    }
}
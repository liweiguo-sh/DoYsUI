﻿class Label {
    constructor(jsp) {
        let _this = this;
        // -- 1. init --
        this.prefix = "doys_label_";
        this.doc = window.document;
        this.env = jsp.env || "preview";                            // -- design:设计环境;preview:预览环境 --
        this.id = 1;

        // -- 2. label container --
        this.container = jsp.container;                             // -- 标签容器 --
        this.parentContainer = this.container.parentElement;        // -- 标签容器的父对象 --
        this.parentContainer.ondblclick = function (evt) {
            let prop = {
                url: g.path.framework + "/control/label/form/label.html",
                parent: win,
                modal: true
            };

            let para = {
                head: _this.head,
                callback: function (jsp) {
                    // let _this = jsp._this;
                },
                _this: _this
            };

            topWin.openWindow(prop, para);
        }

        this.container.ondragenter = function (evt) {
            evt.preventDefault();
        }
        this.container.ondragover = function (evt) {
            evt.preventDefault();
        }
        this.container._this = this;
        this.container.onclick = function (evt) {
            let _domContainer = evt.srcElement;
            let _this = _domContainer._this;

            _this.activatedElement = null;
            _this.hideResize();
        }

        // -- 3. label element --
        this.minElementWidth = 1;                                   // -- 元素最小宽度 --
        this.minElementHeight = 1;                                  // -- 元素最小高度 --

        this.dragOffsetX = 0;
        this.dragOffsetY = 0;
        this.divHoverT = null; this.divHoverR = null; this.divHoverB = null; this.divHoverL = null;     // -- element hover border --
        this.divT = null; this.divR = null; this.divB = null; this.divT = null;                         // -- element resize border --
    }
    // -- label methods -------------------------------------------------------
    loadLabel(labelString, jsp = {}) {
        if (this.elements) this.clearLabel();

        // -- 1. 初始化参数 --        
        this.imageBaseUrl = jsp.imageBaseUrl;
        this.readonly = jsp.readonly;
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
        if (jsp.fields) this.label.fields = jsp.fields;
        if (jsp.width) this.label.head.width = jsp.width;
        if (jsp.height) this.label.head.height = jsp.height;
        this.labelId = jsp.labelId || "";
        this.head = this.label.head;
        this.fields = this.label.fields;
        this.elements = this.label.elements;

        // -- 3. 计算标签换算系数(毫米|像素) --
        let mmW = this.head.width, mmH = this.head.height, mmWH = mmW / mmH;
        let pxW = this.parentContainer.clientWidth - g.x.getStyleValue(this.parentContainer, "padding-left") - g.x.getStyleValue(this.parentContainer, "padding-right")
        let pxH = this.parentContainer.clientHeight - g.x.getStyleValue(this.parentContainer, "padding-top") - g.x.getStyleValue(this.parentContainer, "padding-bottom")
        let pxWH = pxW / pxH;

        if (mmWH >= pxWH) {
            this.width = pxW;
            this.height = pxW / mmWH;
        }
        else {
            this.height = pxH;
            this.width = pxH * mmWH;
        }
        this.pxmm = this.width / mmW;

        this.container.style.width = this.width + "px";
        this.container.style.height = this.height + "px";

        // -- 4. 加载标签元素 --
        for (let i = 0; i < this.elements.length; i++) {
            let element = this.elements[i];

            element.env = this.env;
            element.imageBaseUrl = this.imageBaseUrl;

            this.createElement(element);
            UtilElement.computeProp({ element: element });
        }

        // -- 5. 加载脚本 --
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
    }
    clearLabel() {
        this.activatedElement = null;
        this.hideResize();
        this.hideHover();

        this.container.innerHTML = "";
        this.elements = null;
        this.fields = null;
        this.label = null;
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

    // -- element base --------------------------------------------------------
    addBlankTextElement() {
        let element = {
            imageBaseUrl: this.imageBaseUrl,
            head: {
                name: this.prefix + "element_" + this.id,
                elementType: "text"
            },
            sections: [
                UtilElement.getFixedSection({ pos: 0 }),
                UtilElement.getBlankSection({ pos: 1 })
            ],
            font: {},
            frame: {},
            position: {
                "layer": 1,
                top: 5,
                left: 10,
                width: 20,
                height: 8
            }
        }
        element._this = this;

        this.elements.push(element);
        UtilElement.computeProp({ element: element });

        this.createElement(element);

        UtilElement.computeProp({ element: element });
        UtilElement.computeValue({ element: element, fields: this.fields });
        UtilElement.draw({ element: element });

        this.activatedElement = element;
        this.showResize();
    }
    delElement() {
        if (!this.activatedElement) return;

        let domCanvas = this.activatedElement._canvas;

        this.container.removeChild(domCanvas);

        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i]._canvasId == this.activatedElement._canvasId) {
                this.elements.splice(i, 1);
                break;
            }
        }

        this.activatedElement = null;
        this.hideResize();
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
        cvsElement.className = _this.prefix + "element";
        cvsElement.title = element.head.name;

        _this.container.appendChild(cvsElement);
        element._this = _this;
        element._canvas = cvsElement;
        element._canvasId = canvasId;

        if (!this.readonly) {
            cvsElement.draggable = true;
            cvsElement.ondragstart = function (evt) {
                let _dom = evt.srcElement;
                let _this = _dom._this;

                _this.activeElement(_dom._element);

                evt.dataTransfer.setDragImage(new Image(), 0, 0);
                _this.ondragstart(evt, _this.container);
            };
            cvsElement.ondrag = _this.onCanvasDrag;

            cvsElement.onmouseenter = this.showHover;
            cvsElement.onmouseleave = function (evt) {
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
    ondragstart(evt, domContainer) {
        let domDrag = evt.srcElement;
        let dragOffsetX = 0, dragOffsetY = 0;

        dragOffsetX = domContainer.offsetLeft;                              // -- 容器偏移量 --
        dragOffsetX += domContainer.clientLeft;                             // -- 容器边框宽度 --
        dragOffsetX -= g.x.getStyleValue(domContainer, "marginLeft");       // -- 容器margin --
        dragOffsetX += g.x.getStyleValue(domContainer, "paddingLeft");      // -- 容器padding --
        dragOffsetX += g.x.getStyleValue(domDrag, "marginLeft");            // -- 拖动对象margin --
        dragOffsetX += domDrag.clientLeft;                                  // -- 拖动对象边框宽度 --
        dragOffsetX += evt.offsetX;                                         // -- 拖动对象偏移量(鼠标坐标相对于拖动对象) --

        dragOffsetY = domContainer.offsetTop;                               // -- 容器偏移量 --
        dragOffsetY += domContainer.clientTop;                              // -- 容器边框宽度 --
        dragOffsetY -= g.x.getStyleValue(domContainer, "marginTop");        // -- 容器padding --
        dragOffsetY += g.x.getStyleValue(domContainer, "paddingTop");       // -- 容器padding --
        dragOffsetY += g.x.getStyleValue(domDrag, "marginTop");             // -- 拖动对象margin --
        dragOffsetY += domDrag.clientTop;                                   // -- 拖动对象边框宽度 --
        dragOffsetY += evt.offsetY;                                         // -- 拖动对象偏移量(鼠标坐标相对于拖动对象) --

        this.dragOffsetX = dragOffsetX;
        this.dragOffsetY = dragOffsetY;
    }
    onCanvasDrag(evt) {
        let domDrag = evt.srcElement;
        let _this = domDrag._this;
        let element = _this.activatedElement;
        let x, y;

        if (element.head.locked) return;

        x = evt.clientX - _this.dragOffsetX;
        y = evt.clientY - _this.dragOffsetY;

        domDrag.style.left = x + "px";
        domDrag.style.top = y + "px";

        element.position.left = (x / _this.pxmm).toFixed(2);
        element.position.top = (y / _this.pxmm).toFixed(2);

        if (_this.activatedElement) {
            _this.showResize();
        }
    }

    // -- element event: click and hover --------------------------------------
    onElementClick(evt) {
        let _dom = evt.srcElement;
        let _this = _dom._this;
        let element = _dom._element;

        evt.stopPropagation();
        _this.activeElement(element);
    }
    onElementDblClick(_this, evt) {
        let domElement = evt.srcElement;
        let element = domElement._element;

        let prop = {
            url: g.path.framework + "/control/label/form/element.html",
            parent: win,
            modal: true
        };

        let para = {
            fields: _this.fields,

            canvasId: element._canvasId,
            head: element.head,
            segments: element.segments,
            sections: element.sections,
            font: element.font,
            frame: element.frame,
            position: element.position,
            image: element.image,

            callback: _this.onElementDblClickCallback
        };
        topWin.openWindow(prop, para);

        event.stopPropagation();
    }
    onElementDblClickCallback(jsp) {
        let domCanvas = gId(jsp.canvasId);
        let _this = domCanvas._this;
        let element = _this.activatedElement;

        element.head = jsp.head;
        element.segments = jsp.segments;
        element.sections = jsp.sections;
        element.font = jsp.font;
        element.frame = jsp.frame;
        element.position = jsp.position;
        element.image = jsp.image;
        UtilElement.reduce({ element: element });

        UtilElement.computeProp({ element: element });
        UtilElement.computeValue({ element: element, fields: _this.fields });
        UtilElement.draw({ element: element });
        _this.showResize();
    }

    showHover(evt) {
        let _dom = evt.srcElement;
        let _this = _dom._this;
        let element = _dom._element;

        // ------------------------------------------------
        if (element.head.locked) return;

        if (_this.activatedElement) {
            if (_this.activatedElement._canvas.id.equals(_dom.id)) {
                return;
            }
        }
        // ------------------------------------------------
        if (!_this.divHoverT) {
            _this.divHoverT = _this.doc.createElement("DIV");
            _this.divHoverT.className = _this.prefix + "hoverTB";
            _this.divHoverT.style.zIndex = _this.zIndexHover;
            _this.container.appendChild(_this.divHoverT);

            _this.divHoverB = _this.doc.createElement("DIV");
            _this.divHoverB.className = _this.prefix + "hoverTB";
            _this.divHoverB.style.zIndex = _this.zIndexHover;
            _this.container.appendChild(_this.divHoverB);

            _this.divHoverL = _this.doc.createElement("DIV");
            _this.divHoverL.className = _this.prefix + "hoverLR";
            _this.divHoverL.style.zIndex = _this.zIndexHover;
            _this.container.appendChild(_this.divHoverL);

            _this.divHoverR = _this.doc.createElement("DIV");
            _this.divHoverR.className = _this.prefix + "hoverLR";
            _this.divHoverR.style.zIndex = _this.zIndexHover;
            _this.container.appendChild(_this.divHoverR);
        }
        else {
            _this.divHoverT.style.display = "";
            _this.divHoverB.style.display = "";
            _this.divHoverL.style.display = "";
            _this.divHoverR.style.display = "";
        }

        // ------------------------------------------------
        _this.divHoverT.style.top = (_dom.offsetTop - _this.divHoverT.offsetHeight) + "px";
        _this.divHoverT.style.left = (_dom.offsetLeft) + "px";
        _this.divHoverT.style.width = (_dom.offsetWidth) + "px";

        _this.divHoverB.style.top = (_dom.offsetTop + _dom.offsetHeight) + "px";
        _this.divHoverB.style.left = _this.divHoverT.style.left;
        _this.divHoverB.style.width = _this.divHoverT.style.width;

        _this.divHoverL.style.top = (_dom.offsetTop - _this.divHoverT.offsetHeight) + "px";
        _this.divHoverL.style.left = (_dom.offsetLeft - _this.divHoverL.offsetWidth) + "px";
        _this.divHoverL.style.height = (_dom.offsetHeight + 2 * _this.divHoverT.offsetHeight) + "px";

        _this.divHoverR.style.left = (_dom.offsetLeft + _dom.offsetWidth) + "px";
        _this.divHoverR.style.top = _this.divHoverL.style.top;
        _this.divHoverR.style.height = _this.divHoverL.style.height;
    }
    hideHover() {
        let _this = this;
        if (_this.divHoverT) {
            _this.divHoverT.style.display = "none";
            _this.divHoverB.style.display = "none";
            _this.divHoverL.style.display = "none";
            _this.divHoverR.style.display = "none";
        }
    }

    // -- element event: resize -----------------------------------------------
    showResize() {
        let _this = this;
        let domCanvas, divT, divB, divL, divR;
        // ------------------------------------------------
        if (_this.activatedElement) {
            if (_this.activatedElement.head.locked) {
                this.hideResize();
                return;
            }
            domCanvas = _this.activatedElement._canvas;
        }
        else {
            if (_this.divT) {
                _this.divT.style.display = "none";
                _this.divB.style.display = "none";
                _this.divL.style.display = "none";
                _this.divR.style.display = "none";
            }
        }
        // ------------------------------------------------
        if (!_this.divT) {
            divT = _this.doc.createElement("DIV");
            divT.resizeType = "T";
            divT.className = _this.prefix + "resizeTB";
            divT.style.zIndex = _this.zIndexResize;
            divT.draggable = true;
            divT.ondragstart = function (evt) {
                let _this = evt.srcElement._this;
                _this.ondragstart(evt, _this.container);
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
                _this.ondragstart(evt, _this.container);
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
                _this.ondragstart(evt, _this.container);
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
                _this.ondragstart(evt, _this.container);
                evt.dataTransfer.setDragImage(new Image(), 0, 0);
            };
            divL.ondrag = _this.onResizeDrag;
            divL.ondragend = _this.onResizeDragEnd;
            divL._this = _this;
            _this.container.appendChild(divL);
            _this.divL = divL;
        }
        else {
            divT = _this.divT;
            divB = _this.divB;
            divL = _this.divL;
            divR = _this.divR;
        }
        // ------------------------------------------------
        divT.style.display = "";
        divT.style.top = (domCanvas.offsetTop - divT.offsetHeight) + "px";
        divT.style.left = (domCanvas.offsetLeft) + "px";
        divT.style.width = (domCanvas.offsetWidth) + "px";

        divB.style.display = "";
        divB.style.top = (domCanvas.offsetTop + domCanvas.offsetHeight) + "px";
        divB.style.left = divT.style.left;
        divB.style.width = divT.style.width;

        divL.style.display = "";
        divL.style.top = (domCanvas.offsetTop - divT.offsetHeight) + "px";
        divL.style.left = (domCanvas.offsetLeft - divL.offsetWidth) + "px";
        divL.style.height = (domCanvas.offsetHeight + 2 * divT.offsetHeight) + "px";

        divR.style.display = "";
        divR.style.left = (domCanvas.offsetLeft + domCanvas.offsetWidth) + "px";
        divR.style.top = divL.style.top;
        divR.style.height = divL.style.height;
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
        let domResize = evt.srcElement;
        let _this = domResize._this;
        let pxmm = _this.pxmm;
        let element = _this.activatedElement;
        let domCanvas = element._canvas;
        let width, height;

        if (domResize.resizeType.equals("L") || domResize.resizeType.equals("R")) {
            domResize.style.left = (evt.clientX - _this.dragOffsetX) + "px";
            if (domResize.offsetLeft - domResize.offsetWidth < 0) domResize.style.left = -domResize.offsetWidth + "px";
            width = _this.divR.offsetLeft - _this.divL.offsetLeft - _this.divL.offsetWidth;

            if (domResize.resizeType.equals("L")) {
                if (width < _this.minElementWidth) _this.divL.style.left = (_this.divR.offsetLeft - _this.divL.offsetWidth - _this.minElementWidth) + "px";
                domResize.style.top = _this.divR.offsetTop + "px";
            }
            else {
                if (width < _this.minElementWidth) _this.divR.style.left = (_this.divL.offsetLeft + _this.divL.offsetWidth + _this.minElementWidth) + "px";
                domResize.style.top = _this.divL.offsetTop + "px";
            }

            domCanvas.style.left = (_this.divL.offsetLeft + _this.divL.offsetWidth) + "px";
            domCanvas.style.width = (_this.divR.offsetLeft - _this.divL.offsetLeft - _this.divL.offsetWidth) + "px";
            domCanvas._element.position.left = (domCanvas.offsetLeft / pxmm).toFixed(2);
            domCanvas._element.position.width = (domCanvas.offsetWidth / pxmm).toFixed(2);

            _this.divT.style.left = (_this.divL.offsetLeft + _this.divL.offsetWidth) + "px";
            _this.divT.style.width = (_this.divR.offsetLeft - _this.divL.offsetLeft - _this.divL.offsetWidth) + "px";

            _this.divB.style.left = _this.divT.offsetLeft + "px";
            _this.divB.style.width = _this.divT.offsetWidth + "px";
        }
        else {
            domResize.style.top = (evt.clientY - _this.dragOffsetY) + "px";
            if (domResize.offsetTop - domResize.offsetHeight < 0) domResize.style.top = - domResize.offsetHeight + "px";
            height = _this.divB.offsetTop - _this.divT.offsetTop - _this.divT.offsetHeight;
            if (domResize.resizeType.equals("T")) {
                if (height < _this.minElementHeight) _this.divT.style.top = (_this.divB.offsetTop - _this.divT.offsetHeight - _this.minElementHeight) + "px";
                domResize.style.left = _this.divB.offsetLeft + "px";
            }
            else {
                if (height < _this.minElementHeight) _this.divB.style.top = (_this.divT.offsetTop + _this.divT.offsetHeight + _this.minElementHeight) + "px";
                domResize.style.left = _this.divT.offsetLeft + "px";
            }

            domCanvas.style.top = (_this.divT.offsetTop + _this.divT.offsetHeight) + "px";
            domCanvas.style.height = (_this.divB.offsetTop - _this.divT.offsetTop - _this.divT.offsetHeight) + "px";
            domCanvas._element.position.top = (domCanvas.offsetTop / pxmm).toFixed(2);
            domCanvas._element.position.height = (domCanvas.offsetHeight / pxmm).toFixed(2);

            _this.divL.style.top = _this.divT.offsetTop + "px";
            _this.divL.style.height = (_this.divB.offsetTop - _this.divT.offsetTop + _this.divB.offsetHeight) + "px";

            _this.divR.style.top = _this.divL.offsetTop + "px";
            _this.divR.style.height = _this.divL.offsetHeight + "px";
        }

        if (element.head.elementType.equals("image")) {
            domCanvas.width = (element.position.width * pxmm).toFixed(2);
        }
        else {
            UtilElement.computeProp({ element: element });
            UtilElement.draw({ element: element });
        }
    }
    onResizeDragEnd(evt) {
        let domDrag = evt.srcElement;
        let _this = domDrag._this;
        let element = _this.activatedElement;

        UtilElement.computeProp({ element: element });
        UtilElement.draw({ element: element });
    }

    // -- toJson, getData, setValue, etc. -------------------------------------
    toJson() {
        try {
            return JSON.stringify(this.label,
                (k, v) => {
                    if (k.startsWith("_")) {    // -- _this, _canvas --                        
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
                data[head.name] = head._sectionsText;
            }
            else if (head.elementType.equals("barcode")) {
                data[head.name] = {
                    text: head._sectionsText,
                    value: head._segmentsText
                }
            }
            else if (head.elementType.equals("image")) {
                if (element.image.url.startsWith("http")) {
                    data[head.name] = element.image.url;
                }
                else {
                    data[head.name] = element.imageBaseUrl + element.image.url;
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

    // -- temporary script debug --
    jsBeforeComputeDebug1() {
        if (!this.labelId.equals("117")) return;

        debugger
        let imagePara = this.fields["图片参数"];
        let arr = imagePara.split("");
        for (let i = 1; i <= arr.length && i <= 6; i++) {
            let element = this.getElementByName("图片0" + i);
            let idxImg = parseInt(arr[i - 1]);
            let imgUrl = this.imageBaseUrl + this.fields["image0" + idxImg];

            element.image.url = imgUrl;
        }
        for (let i = arr.length + 1; i <= 6; i++) {
            let element = this.getElementByName("图片0" + i);
            let imgUrl = this.imageBaseUrl + this.fields["image00"];

            element.image.url = imgUrl;
        }
    }
    jsAfterComputeDebug1() {
        if (!this.labelId.equals("117")) return;

        debugger
        let imagePara = this.fields["图片参数"];
        let arr = imagePara.split("");
        for (let i = 1; i <= arr.length && i <= 6; i++) {
            let element = this.getElementByName("图片0" + i);
            let idxImg = parseInt(arr[i - 1]);
            let imgUrl = this.imageBaseUrl + this.fields["image0" + idxImg];

            element.image.url = imgUrl;
        }
        for (let i = arr.length + 1; i <= 6; i++) {
            let element = this.getElementByName("图片0" + i);
            let imgUrl = this.imageBaseUrl + this.fields["image00"];

            element.image.url = imgUrl;
        }
    }
}
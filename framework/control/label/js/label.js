class Label {
    constructor(para) {
        // -- 1.0 init variables --
        this.prefix = "doys_label_";
        this.doc = window.document;
        this.id = 1;

        this.minElementWidth = 1;               // -- 元素最小宽度 --
        this.minElementHeight = 1;              // -- 元素最小高度 --

        // -- 1.1 element resize, hover and drag drop --
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;

        this.divHoverT = null; this.divHoverR = null; this.divHoverB = null; this.divHoverL = null;     // -- element hover border --
        this.divT = null; this.divR = null; this.divB = null; this.divT = null;                         // -- element resize border --        

        // -- 2. load para --
        this.container = para.container;
        this.container.ondragenter = function (evt) {
            //evt.stopPropagation();
            evt.preventDefault();
        }
        this.container.ondragover = function (evt) {
            ///evt.stopPropagation();
            evt.preventDefault();
        }
        this.container._this = this;
        this.container.onclick = function (evt) {
            let _this = evt.srcElement._this;

            _this.activatedElement = null;
            _this.hideResize();
        }

        // -- 9. load label --
        if (para.content) {
            this.loadLabel(para.content);
        }
    }
    loadLabel(labelString) {
        if (this.elements) this.clearLabel();

        this.label = JSON.parse(labelString);
        this.fields = this.label.fields;
        this.images = this.label.images;
        this.elements = this.label.elements;

        for (let i = 0; i < this.elements.length; i++) {
            let element = this.elements[i];

            this.createElement(element);

            UtilElement.compute({ element: element, fields: this.label.fields, images: this.label.images });
            UtilElement.draw({ element: element });
        }
    }
    clearLabel() {
        this.activatedElement = null;
        this.hideResize();
        this.hideHover();

        for (let i = 0; i < this.elements.length; i++) {
            this.container.removeChild(this.elements[i]._dom);
            delete this.elements[i]._dom;
        }
    }
    toJson() {
        try {
            return JSON.stringify(this.label,
                (k, v) => {
                    if (k.startsWith("_")) {    // -- _this, _dom --                        
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

    // ------------------------------------------------------------------------
    createElement(element) {
        let _this = this;
        let divCanvas = _this.doc.createElement("canvas");
        _this.container.appendChild(divCanvas);

        element._this = _this;
        element._dom = divCanvas;

        divCanvas._this = _this;
        divCanvas._element = element;
        divCanvas.id = _this.prefix + "el_" + _this.id++;
        divCanvas.className = _this.prefix + "element";

        //divCanvas.style.top = element.position.top + "px";
        //divCanvas.style.left = element.position.left + "px";
        //divCanvas.width = element.position.width;
        //divCanvas.height = element.position.height;

        divCanvas.draggable = true;
        divCanvas.ondragstart = function (evt) {
            let _dom = evt.srcElement;
            let _this = _dom._this;

            _this.activeElement(_dom._element);

            evt.dataTransfer.setDragImage(new Image(), 0, 0);
            _this.ondragstart(evt, _this.container);
        };
        divCanvas.ondrag = _this.onCanvasDrag;

        divCanvas.onmouseenter = this.showHover;
        divCanvas.onmouseleave = function (evt) {
            let _dom = evt.srcElement;
            let _this = _dom._this;

            _this.hideHover();
        }

        divCanvas.onclick = this.onElementClick;
        divCanvas.ondblclick = this.onElementDblClick;
        divCanvas.ondblclick = function (evt) {
            _this.onElementDblClick(_this, evt);
        }
    }
    activeElement(element) {
        let _this = this;

        if (_this.activatedElement) {
            //_this.activatedElement._dom.className = _this.prefix + "element";
        }

        _this.activatedElement = element;
        //_this.activatedElement._dom.className = _this.prefix + "element " + _this.prefix + "activeElement";

        _this.hideHover();
        _this.showResize();
    }
    drawText(element) {
        let dom = element._dom;
        dom.innerHTML = element.text;
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

        element.position.left = evt.clientX - _this.dragOffsetX;
        element.position.top = evt.clientY - _this.dragOffsetY;

        domDrag.style.left = element.position.left + "px";
        domDrag.style.top = element.position.top + "px";

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
            text: "text",
            title: "title",
            parent: win,
            modal: true
        };
        let para = {
            element: element,
            fields: _this.fields,
            images: _this.images,
            callback: _this.onElementDblClickReturn
        };
        topWin.openWindow(prop, para);
    }
    onElementDblClickReturn(jsp) {
        let element = jsp.element;
        let _this = element._this;

        UtilElement.draw({ element: element });
        _this.showResize();
    }

    showHover(evt) {
        let _dom = evt.srcElement;
        let _this = _dom._this;

        // ------------------------------------------------
        if (_this.activatedElement) {
            if (_this.activatedElement._dom.id.equals(_dom.id)) {
                return;
            }
        }
        // ------------------------------------------------
        if (!_this.divHoverT) {
            _this.divHoverT = _this.doc.createElement("DIV");
            _this.divHoverT.className = _this.prefix + "hoverTB";
            _this.container.appendChild(_this.divHoverT);

            _this.divHoverB = _this.doc.createElement("DIV");
            _this.divHoverB.className = _this.prefix + "hoverTB";
            _this.container.appendChild(_this.divHoverB);

            _this.divHoverL = _this.doc.createElement("DIV");
            _this.divHoverL.className = _this.prefix + "hoverLR";
            _this.container.appendChild(_this.divHoverL);

            _this.divHoverR = _this.doc.createElement("DIV");
            _this.divHoverR.className = _this.prefix + "hoverLR";
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
        let domEl, divT, divB, divL, divR;
        // ------------------------------------------------
        if (_this.activatedElement) {
            domEl = _this.activatedElement._dom;
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
        divT.style.top = (domEl.offsetTop - divT.offsetHeight) + "px";
        divT.style.left = (domEl.offsetLeft) + "px";
        divT.style.width = (domEl.offsetWidth) + "px";

        divB.style.display = "";
        divB.style.top = (domEl.offsetTop + domEl.offsetHeight) + "px";
        divB.style.left = divT.style.left;
        divB.style.width = divT.style.width;

        divL.style.display = "";
        divL.style.top = (domEl.offsetTop - divT.offsetHeight) + "px";
        divL.style.left = (domEl.offsetLeft - divL.offsetWidth) + "px";
        divL.style.height = (domEl.offsetHeight + 2 * divT.offsetHeight) + "px";

        divR.style.display = "";
        divR.style.left = (domEl.offsetLeft + domEl.offsetWidth) + "px";
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
        let element = _this.activatedElement;
        let domCanvas = element._dom;
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
            domCanvas._element.position.left = domCanvas.offsetLeft;
            domCanvas._element.position.width = domCanvas.offsetWidth;

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
            domCanvas._element.position.top = domCanvas.offsetTop;
            domCanvas._element.position.height = domCanvas.offsetHeight;

            _this.divL.style.top = _this.divT.offsetTop + "px";
            _this.divL.style.height = (_this.divB.offsetTop - _this.divT.offsetTop + _this.divB.offsetHeight) + "px";

            _this.divR.style.top = _this.divL.offsetTop + "px";
            _this.divR.style.height = _this.divL.offsetHeight + "px";
        }

        if (element.elementType.equals("image")) {
            domCanvas.width = element.position.width;
        }
        else {
            UtilElement.draw({ element: element });
        }
    }
    onResizeDragEnd(evt) {
        let domDrag = evt.srcElement;
        let _this = domDrag._this;
        let element = _this.activatedElement;

        UtilElement.draw({ element: element });
    }
}
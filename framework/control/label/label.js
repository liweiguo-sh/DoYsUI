class Label {
    constructor(para) {
        // -- 1. init variables --
        this.prefix = "doys_label_";
        this.id = 1;
        this.doc = window.document;

        this.dragOffsetX = 0;
        this.dragOffsetY = 0;

        // -- 2. load para --
        this.container = para.container;

        // -- 9. load label --
        if (para.content) {
            this.loadLabel(para.content);
        }
    }

    loadLabel(labelString) {
        this.label = JSON.parse(labelString);
        this.elements = this.label.elements;

        let elements = this.label.elements;
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            let type = element.type;

            this.createElement(element);
            if (type.equals("text")) {
                this.drawText(element);
            }
        }
    }

    toJson() {
        return JSON.stringify(this.label,
            (k, v) => {
                if (k.equals("dom")) {
                    return undefined;
                }
                return v;
            }, "  "
        );
    }

    // ------------------------------------------------------------------------
    createElement(element) {
        let dom = this.doc.createElement("DIV");
        this.container.appendChild(dom);

        element.dom = dom;
        dom._this = this;
        dom._element = element;

        dom.id = this.prefix + "el_" + this.id++;
        dom.className = this.prefix + "element";
        dom.style.top = element.top + "px";
        dom.style.left = element.left + "px";
        dom.style.width = element.width + "px";
        dom.style.height = element.height + "px";

        dom.draggable = true;
        dom.ondragstart = function (evt) {
            let _dom = evt.srcElement;
            let _this = _dom._this;

            _this.ondragstart(evt, _this.container, _dom);
        };
        dom.ondragend = function (evt) {
            let _dom = evt.srcElement;
            let _this = _dom._this;

            _this.ondragend(evt, _dom);
        };

        dom.onclick = this.onclick;
    }
    drawText(element) {
        let dom = element.dom;
        dom.innerHTML = element.text;
    }

    // -- element event (click, drag and resize) ------------------------------
    onclick(evt) {
        let _dom = evt.srcElement;
        let _this = _dom._this;

        if (_this.activeElement) {
            _this.activeElement.className = _this.prefix + "element";
        }
        _dom.className = _this.prefix + "element" + " " + _this.prefix + "activeElement";
        _this.activeElement = _dom;
        _this.showResize();
    }

    ondragstart(evt, domContainer, domDrag) {
        let dragOffsetX = 0, dragOffsetY = 0;

        dragOffsetX = domContainer.offsetLeft;                          // -- 容器偏移量 --
        dragOffsetX += domContainer.clientLeft;                         // -- 容器边框宽度 --
        dragOffsetX -= g.x.getStyleValue(domContainer, "marginLeft");   // -- 容器margin --
        dragOffsetX += g.x.getStyleValue(domContainer, "paddingLeft");  // -- 容器padding --
        dragOffsetX += g.x.getStyleValue(domDrag, "marginLeft");        // -- 拖动对象margin --
        dragOffsetX += domDrag.clientLeft;                              // -- 拖动对象边框宽度 --
        dragOffsetX += evt.offsetX;                                     // -- 拖动对象偏移量(鼠标坐标相对于拖动对象) --

        dragOffsetY = domContainer.offsetTop;                           // -- 容器偏移量 --
        dragOffsetY += domContainer.clientTop;                          // -- 容器边框宽度 --
        dragOffsetY -= g.x.getStyleValue(domContainer, "marginTop");    // -- 容器padding --  19
        dragOffsetY += g.x.getStyleValue(domContainer, "paddingTop");   // -- 容器padding --  19
        dragOffsetY += g.x.getStyleValue(domDrag, "marginTop");         // -- 拖动对象margin --  15
        dragOffsetY += domDrag.clientTop;                               // -- 拖动对象边框宽度 --
        dragOffsetY += evt.offsetY;                                     // -- 拖动对象偏移量(鼠标坐标相对于拖动对象) --

        this.dragOffsetX = dragOffsetX;
        this.dragOffsetY = dragOffsetY;
    }
    ondragend(evt, domDrag) {
        let _this = domDrag._this;

        domDrag._element.left = evt.clientX - this.dragOffsetX;
        domDrag._element.top = evt.clientY - this.dragOffsetY;

        domDrag.style.left = domDrag._element.left + "px";
        domDrag.style.top = domDrag._element.top + "px";

        _this.showResize();
    }

    showResize() {
        let _this = this;
        let domEl, divT, divR, divB, divL;
        // ------------------------------------------------
        if (_this.activeElement) {
            domEl = _this.activeElement;
        }
        else {
            if (_this.divT) {
                _this.divT.style.display = "none";
                _this.divR.style.display = "none";
                _this.divB.style.display = "none";
                _this.divL.style.display = "none";
            }
        }
        // ------------------------------------------------
        if (!_this.divT) {
            divT = _this.doc.createElement("DIV");
            divT.className = _this.prefix + "resizeTB";
            _this.container.appendChild(divT);
            _this.divT = divT;

            divR = _this.doc.createElement("DIV");
            divR.className = _this.prefix + "resizeLR";
            _this.container.appendChild(divR);
            _this.divR = divR;

            divB = _this.doc.createElement("DIV");
            divB.className = _this.prefix + "resizeTB";
            _this.container.appendChild(divB);
            _this.divB = divB;

            divL = _this.doc.createElement("DIV");
            divL.className = _this.prefix + "resizeLR";
            _this.container.appendChild(divL);
            _this.divL = divL;
        }
        else {
            divT = _this.divT;
            divR = _this.divR;
            divB = _this.divB;
            divL = _this.divL;
        }
        // ------------------------------------------------
        divT.style.top = (domEl.offsetTop - divT.offsetHeight) + "px";
        divT.style.left = (domEl.offsetLeft) + "px";
        divT.style.width = (domEl.offsetWidth) + "px";

        divB.style.top = (domEl.offsetTop + domEl.offsetHeight) + "px";
        divB.style.left = divT.style.left;
        divB.style.width = divT.style.width;

        divL.style.top = (domEl.offsetTop - divT.offsetHeight) + "px";
        divL.style.left = (domEl.offsetLeft - divL.offsetWidth) + "px";
        divL.style.height = (domEl.offsetHeight + 2 * divT.offsetHeight) + "px";

        divR.style.left = (domEl.offsetLeft + domEl.offsetWidth) + "px";
        divR.style.top = divL.style.top;
        divR.style.height = divL.style.height;
    }
}
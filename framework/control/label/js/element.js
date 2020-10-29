var UtilElement = {};

UtilElement.getSectionTypes = function () {
    if (UtilElement.__sectionTypes == null) {
        UtilElement.__sectionTypes = [
            { k: "fixed", v: "固定值" },
            { k: "field", v: "变量字段" },
            { k: "symbol", v: "特殊字符" }
        ]
    }
    return UtilElement.__sectionTypes;
}
UtilElement.getAI = function () {
    if (UtilElement.__ai == null) {
        UtilElement.__ai = [
            { k: "GS", v: "GS1分组符" }
        ]
    }
    return UtilElement.__ai;
}

UtilElement.computeProp = function (jsp) {
    let element = jsp.element;

    let head = element.head;
    let font = element.font;
    let frame = element.frame;
    let position = element.position;

    // -- 补全默认值 -------------------------------------------
    font = element.font || {};
    font.lineHeight = parseInt(font.lineHeight || 0);
    font.size = font.size || 12;

    frame.type = element.frame.type || "";
    frame.width = parseInt(frame.width || 0);

    position.textAlign = position.textAlign || "left";
    position.verticalAlign = position.verticalAlign || "top";

    position.marginLeft = parseInt(position.marginLeft || 0);
    position.marginRight = parseInt(position.marginRight || 0);
    position.marginTop = parseInt(position.marginTop || 0);
    position.marginBottom = parseInt(position.marginBottom || 0);

    // ----------------------------------------------------
    if (head.elementType.equals("barcode") || head.elementType.equals("text")) {
        font._fontDraw = UtilElement._getContextFont(font);
        font._fillStyleDraw = UtilElement._getContextFillStyle({ color: font.color });
        font._lineHeightDraw = element.font.lineHeight || UtilElement._getContextLineHeight(font);

        position._topDraw = position.marginTop;
        position._leftDraw = position.marginLeft;
        if (position.textAlign) {
            if (position.textAlign.equals("center")) {
                position._leftDraw = position.width / 2;
            }
            else if (position.textAlign.equals("right")) {
                position._leftDraw = position.width - position.marginRight;
            }
        }
        if (position.verticalAlign) {
            if (position.verticalAlign.equals("middle")) {
                position._topDraw = (position.height - element.font._lineHeightDraw) / 2;
            }
            else if (position.verticalAlign.equals("bottom")) {
                position._topDraw = position.height - element.font._lineHeightDraw - position.marginBottom;
            }
            position._topDraw = Math.max(position._topDraw, 0);
        }
    }
    if (head.elementType.equals("barcode")) {
        position._topDraw = position.height - font._lineHeightDraw - position.marginBottom;
        position._topDraw = Math.max(position._topDraw, 0);

        if (head.pureBarcode) {
            position._barcodeHeight = position.height - position.marginTop - position.marginBottom;
        }
        else {
            position._barcodeHeight = position._topDraw - 2 * position.marginTop;
        }
        position._barcodeHeight = Math.max(position._barcodeHeight, 10);
    }
}
UtilElement.computeValue = function (jsp) {
    let element = jsp.element;
    let fields = jsp.fields;
    let images = jsp.images;

    let head = element.head;
    let segments = element.segments;
    let sections = element.sections;
    let image = element.image;
    let values;
    // ----------------------------------------------------
    if (head.elementType.equals("barcode")) {
        values = new Array();
        for (let i = 0; i < segments.length - 1; i++) {
            let segment = segments[i];
            let value = segment.value || "";
            let type = segment.type;

            if (type.equals("fixed")) {
                values.push(value);
            }
            else if (type.equals("field")) {
                for (let j = 0; j < fields.length; j++) {
                    if (value.equals(fields[j].k)) {
                        values.push(fields[j].v);
                        break;
                    }
                }
            }
            else if (type.equals("symbol")) {
                if (value.equals("GS")) {
                    values.push("{GS}");
                }
                else {
                    values.push(value);
                }
            }
        }
        head._segmentsText = values.join("");
    }
    // ----------------------------------------------------
    if (head.elementType.equals("barcode") || head.elementType.equals("text")) {
        values = new Array();
        for (let i = 0; i < sections.length - 1; i++) {
            let section = sections[i];
            let value = section.value;
            let type = section.type;

            if (type.equals("fixed")) {
                values.push(value);
            }
            else if (type.equals("field")) {
                for (let j = 0; j < fields.length; j++) {
                    if (value.equals(fields[j].k)) {
                        values.push(fields[j].v);
                        break;
                    }
                }
            }
            else if (type.equals("symbol")) {
                if (value.equals("GS")) {
                    values.push("{GS}");
                }
                else {
                    values.push(value);
                }
            }
        }
        head._sectionsText = values.join("");
    }
    // ----------------------------------------------------
    if (head.elementType.equals("image")) {
        let img = image.img || "";
        for (let i = 0; i < images.length; i++) {
            if (img.equals(images[i].k)) {
                image.url = images[i].v;
                break;
            }
        }
    }
}
UtilElement.draw = function (jsp) {
    let element = jsp.element;
    let head = element.head;
    let position = element.position;
    let domCanvas = element._canvas;

    //if (element.position.hidden) return;
    // -- position ----------------------------------------    
    domCanvas.style.zIndex = position.layer;
    domCanvas.style.top = position.top + "px";
    domCanvas.style.left = position.left + "px";
    domCanvas.width = position.width;
    domCanvas.height = position.height;

    // -- repaint -----------------------------------------    
    if (element.frame.type) {
        UtilElement.drawFrame(domCanvas, element);
    }

    if (head.elementType.equals("text")) {
        UtilElement.draw_text(domCanvas, element);
    }
    else if (head.elementType.equals("image")) {
        UtilElement.draw_image(domCanvas, element);
    }
    else if (head.elementType.equals("barcode")) {
        let barcodeType = head.barcodeType;
        if (barcodeType.equals("Code128")) {
            UtilElement.draw_Code128(domCanvas, element);
        }
        else {
            domCanvas.innerHTML = "不支持的条码类型：" + barcodeType;
        }
    }
}

UtilElement.getFixedSegment = function (jsp) {
    let segment = {
        pos: -1,
        type: "fixed",
        value: "12345678",
        format: ""
    }
    segment = g.x.extendJSON(segment, jsp);
    return segment;
}
UtilElement.getBlankSegment = function (jsp) {
    let segment = {
        pos: -1,
        type: "",
        value: "",
        format: ""
    }
    segment = g.x.extendJSON(segment, jsp);
    return segment;
}
UtilElement.getFixedSection = function (jsp) {
    let section = {
        pos: -1,
        type: "fixed",
        value: "12345678",
        format: ""
    }
    section = g.x.extendJSON(section, jsp);
    return section;
}
UtilElement.getBlankSection = function (jsp) {
    let section = {
        pos: -1,
        type: "",
        value: "",
        format: ""
    }
    section = g.x.extendJSON(section, jsp);
    return section;
}

UtilElement.reduce = function (jsp) {
    let element = jsp.element;
    let head = element.head;

    if (!head.elementType.equals("barcode")) {
        element.head.barcodeType = undefined;
        element.segments = undefined;
    }
    if (!head.elementType.equals("barcode") && !head.elementType.equals("text")) {
        element.sections = undefined;
    }
    if (!head.elementType.equals("image")) {
        element.image = undefined;
    }
}

// -- draw frame --------------------------------------------------------------
UtilElement.drawFrame = function (domCanvas, element) {
    let context = domCanvas.getContext("2d");
    let frame = element.frame;
    let width = element.position.width;
    let height = element.position.height;
    let x, y, w, h;
    // ----------------------------------------------------
    if (frame.width > 0) {
        x = frame.width / 2; y = x;
        w = width - frame.width;
        h = height - frame.width;

        // -- context.lineJoin = "round"; --
        context.strokeStyle = frame.color;
        context.lineWidth = frame.width;
        if (frame.type.equals("ellipse")) {
            // context.strokeRect(x, y, w, h);
        }
        else {
            context.strokeRect(x, y, w, h);
        }
    }
    if (frame.fillColor) {
        x = frame.width; y = x;
        w = width - 2 * frame.width;
        h = height - 2 * frame.width;

        context.fillStyle = frame.fillColor;
        context.fillRect(x, y, w, h);
    }
}

// -- draw text ---------------------------------------------------------------
UtilElement.draw_text = function (domCanvas, element) {
    let context = domCanvas.getContext("2d");

    if (!element.head._sectionsText) element.head._sectionsText = "Empty String Empty String";
    if (element.font.wordWrap) {
        UtilElement._drawMultiLine(context, element);
    }
    else {
        UtilElement._drawSingleLine(context, element);
    }
}

UtilElement._drawSingleLine = function (context, element) {
    context.font = element.font._fontDraw;
    context.fillStyle = element.font._fillStyleDraw;
    context.textAlign = element.position.textAlign || "left";
    context.textBaseline = "top";   // -- 固定设置为top，通过计算top位置实现垂直居中 --

    context.fillText(element.head._sectionsText, element.position._leftDraw, element.position._topDraw);
}
UtilElement._drawMultiLine = function (context, element) {
    let font = element.font;
    let position = element.position;

    let txts = new Array();
    let txtString = element.head._sectionsText;
    let chars = txtString.split("");
    let length = chars.length, pos = 0;

    let lineHeight = font._lineHeightDraw;
    let width = position.width;
    let top = position.marginTop, left;

    // -- 1. style ----------------------------------------
    context.font = font._fontDraw;
    context.fillStyle = font._fillStyleDraw;

    // -- 2. 先做简单拆分，将来优化为考虑中文，完整英文单词，标点符号以及空格等因素 --
    while (pos < length) {
        let txt = "";
        for (let i = pos; i < length; i++) {
            txt += chars[i];
            if (context.measureText(txt).width > (width - position.marginLeft - position.marginRight)) {
                if (i > pos) {
                    txt = txt.substring(0, txt.length - 1);
                }
                else {
                    i++;
                }
                txts.push(txt);
                pos = i;
                break;
            }
            else if (i == length - 1) {
                txts.push(txt);
                pos = i + 1;
                break;
            }
        }
    }

    // -- 3. 垂直位置计算 -----------------------------------
    context.textAlign = position.textAlign;
    left = element.position._leftDraw;

    context.textBaseline = "top";   // -- 固定设置为top，通过计算top位置实现垂直居中 --
    if (position.verticalAlign.equals("top")) {
    }
    else {
        if (position.height / txts.length > font._lineHeightDraw) {
            if (position.verticalAlign.equals("middle")) {
                top = (position.height - (txts.length * font._lineHeightDraw)) / 2;
            }
            else if (position.verticalAlign.equals("bottom")) {
                top = position.height - (txts.length * font._lineHeightDraw) - position.marginBottom;
            }
        }
        top = Math.max(top, 0);
    }

    // -- 4. draw -----------------------------------------
    for (let i = 0; i < txts.length; i++) {
        let txt = txts[i];
        context.fillText(txt, left, top + i * lineHeight);
    }
}
UtilElement._drawError = function (context, element, message) {
    context.font = "12px sans-serif";
    context.fillStyle = "red";
    context.textAlign = "left";
    context.textBaseline = "top";

    if (element.position.height > 12) {
        context.fillText(message, 0, (element.position.height - 12) / 2);
    }
    else {
        context.fillText(message, 0, 0);
    }
}

UtilElement._getContextFont = function (elementFont) {
    // -- 示例: font: "normal 12px '微软雅黑'" --
    // -- 必须是这个顺序，顺序错误无效，比较奇葩，具体顺序参考：https://blog.csdn.net/HuoYiHengYuan/article/details/101677114 --
    let arr = new Array();

    if (elementFont.bold) arr.push("bold");
    if (elementFont.italic) arr.push("italic");

    arr.push(elementFont.size + "px");
    arr.push("'" + elementFont.name + "'");

    return arr.join(" ");
}
UtilElement._getContextFillStyle = function (jsp) {
    let arr = new Array();

    if (jsp.color) {
        arr.push(jsp.color);
    }
    else {
        arr.push("black");
    }

    return arr.join(" ");
}
UtilElement._getContextLineHeight = function (font) {

    return font.size * 1;
}

// -- draw image --------------------------------------------------------------
UtilElement.draw_image = function (domCanvas, element) {
    let width = element.position.width, widthImg;
    let height = element.position.height, heightImg;
    let context = domCanvas.getContext("2d");
    let deformation = element.image.deformation || "";

    let img = new Image();
    // ----------------------------------------------------
    img.src = element.image.url;
    img.onload = function () {
        if (deformation.equals("stretch")) {    // -- 拉伸(变形) --
            widthImg = width;
            heightImg = height;
        }
        else if (deformation.equals("zoom")) {  // -- 缩放(同比缩放) --
            if (img.width / img.height > width / height) {
                widthImg = width;
                heightImg = width * img.height / img.width;
            }
            else {
                heightImg = height;
                widthImg = height * img.width / img.height;
            }
        }
        else {
            widthImg = img.width;
            heightImg = img.height;
        }

        context.drawImage(img, 0, 0, widthImg, heightImg);
    }
    img.onerror = function () {
        UtilElement._drawError(context, element, "picture failed to load");
    }
}

// -- draw barcode-1D ---------------------------------------------------------
UtilElement.draw_Code128 = function (domCanvas, element) {
    let context = domCanvas.getContext("2d");
    let barcodeHeight = element.position._barcodeHeight;

    context.font = "normal " + barcodeHeight + "px '微软雅黑'";
    context.fillStyle = "orange";
    context.textAlign = "center";
    context.textBaseline = "top";
    context.fillText("| ||    " + element.head._segmentsText + "    || |", element.position.width / 2, element.position.marginTop);

    if (!element.head.pureBarcode && element.head._sectionsText) {
        UtilElement._drawSingleLine(context, element);
    }
}
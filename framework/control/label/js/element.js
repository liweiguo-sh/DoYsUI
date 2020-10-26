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
    // ----------------------------------------------------
    if (element.elementType.equals("barcode") || element.elementType.equals("text")) {
        element.font._fontDraw = UtilElement._getContextFont(element.font);
        element.font._fillStyleDraw = UtilElement._getContextFillStyle({ color: element.font.color });
        element.font._lineHeightDraw = element.font.lineHeight || UtilElement._getContextLineHeight(element.font);

        element.position._topDraw = 0;
        element.position._leftDraw = 0;
        if (element.position.textAlign) {
            if (element.position.textAlign.equals("center")) {
                element.position._leftDraw = element.position.width / 2;
            }
            else if (element.position.textAlign.equals("right")) {
                element.position._leftDraw = element.position.width;
            }
        }
        if (element.position.verticalAlign) {
            if (element.position.verticalAlign.equals("middle")) {
                element.position._topDraw = element.position.height / 2;
            }
            else if (element.position.verticalAlign.equals("bottom")) {
                element.position._topDraw = element.position.height;
            }
        }
    }
    if (element.elementType.equals("barcode")) {
        element.position._topDraw = element.position.height - element.font._lineHeightDraw;
        if (element.position._topDraw < element.font._lineHeightDraw) {
            element.position._topDraw = element.font._lineHeightDraw;
        }
    }

    // -- 补全默认值 -------------------------------------------
    element.position.textAlign = element.position.textAlign || "left";
    element.position.verticalAlign = element.position.verticalAlign || "top";
}
UtilElement.computeValue = function (jsp) {
    let element = jsp.element;
    let fields = jsp.fields;
    let images = jsp.images;
    let segments = element.segments;
    let sections = element.sections;
    let values;
    // ----------------------------------------------------
    if (element.elementType.equals("barcode")) {
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
        element._segmentsText = values.join("");
    }
    // ----------------------------------------------------
    if (element.elementType.equals("barcode") || element.elementType.equals("text")) {
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
        element._sectionsText = values.join("");
    }
    // ----------------------------------------------------
    if (element.elementType.equals("image")) {
        let img = element.image.img || "";
        for (let i = 0; i < images.length; i++) {
            if (img.equals(images[i].k)) {
                element.image.url = images[i].v;
                break;
            }
        }
    }
}
UtilElement.draw = function (jsp) {
    let element = jsp.element;
    let elementType = element.elementType;
    let dom = element._dom;
    // -- position ----------------------------------------    
    dom.style.top = element.position.top + "px";
    dom.style.left = element.position.left + "px";
    dom.width = element.position.width;
    dom.height = element.position.height;

    // -- repaint -----------------------------------------
    if (elementType.equals("text")) {
        UtilElement.draw_text(dom, element);
    }
    else if (elementType.equals("image")) {
        UtilElement.draw_image(dom, element);
    }
    else if (elementType.equals("barcode")) {
        let barcodeType = element.barcodeType;
        if (barcodeType.equals("Code128")) {
            UtilElement.draw_Code128(dom, element);
        }
        else {
            dom.innerHTML = "不支持的条码类型：" + barcodeType;
        }
    }
    else {
        UtilElement.draw_text(dom, element);
    }
}

UtilElement.getFixedSegment = function (jsp) {
    let segment = {
        pos: -1,
        type: "fixed",
        value: "fixed string",
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
        value: "fixed string",
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

// -- draw text ---------------------------------------------------------------
UtilElement.draw_text = function (domCanvas, element) {
    let width = element.position.width;
    let height = element.position.height;
    let context = domCanvas.getContext("2d");

    domCanvas.width = width;
    domCanvas.height = height;

    if (!element._sectionsText) element._sectionsText = "Empty String Empty String";
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
    context.textBaseline = element.position.verticalAlign || "top";

    context.fillText(element._sectionsText, element.position._leftDraw, element.position._topDraw);
}
UtilElement._drawMultiLine = function (context, element) {
    let font = element.font;
    let position = element.position;

    let txts = new Array();
    let txtString = element._sectionsText;
    let chars = txtString.split("");
    let length = chars.length, pos = 0;

    let lineHeight = font._lineHeightDraw;
    let width = position.width;
    let top = 0, left;

    // -- 1. style ----------------------------------------
    context.font = font._fontDraw;
    context.fillStyle = font._fillStyleDraw;

    // -- 2. 先做简单拆分，将来优化为考虑中文，完整英文单词，标点符号以及空格等因素 --
    while (pos < length) {
        let txt = "";
        for (let i = pos; i < length; i++) {
            txt += chars[i];
            if (context.measureText(txt).width > width) {
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

    context.textBaseline = "top";   // -- 固定设置为top，通过计算实现垂直居中 --
    if (position.verticalAlign.equals("top")) {
    }
    else {
        if (position.height / txts.length > font._lineHeightDraw) {
            if (position.verticalAlign.equals("middle")) {
                top = (position.height - (txts.length * font._lineHeightDraw)) / 2;
            }
            else if (position.verticalAlign.equals("bottom")) {
                top = position.height - (txts.length * font._lineHeightDraw);
            }
        }
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
    domCanvas.width = width;
    domCanvas.height = height;

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
    let width = element.position.width;
    let height = element.position.height;
    let context = domCanvas.getContext("2d");

    domCanvas.width = width;
    domCanvas.height = height;

    context.font = "normal 20px '微软雅黑'";
    context.fillStyle = "orange";
    context.textAlign = "center";
    context.textBaseline = "top";
    context.fillText("| ||    " + element._segmentsText + "    || |", element.position.width / 2, 0.1 * element.position.height);

    if (element._sectionsText) {
        UtilElement._drawSingleLine(context, element);
    }
}
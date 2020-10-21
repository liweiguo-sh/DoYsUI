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

UtilElement.compute = function (jsp) {
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
        element.segmentsText = values.join("");
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
        element.sectionsText = values.join("");
    }
    // ----------------------------------------------------
    if (element.elementType.equals("image")) {
        let img = element.img || "";
        for (let i = 0; i < images.length; i++) {
            if (img.equals(images[i].k)) {
                element.image = images[i].v;
                break;
            }
        }
    }
}
UtilElement.draw = function (jsp) {
    let element = jsp.element;
    let elementType = element.elementType;
    let dom = element.dom;


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
    let width = element.width;
    let height = element.height;
    let context = domCanvas.getContext("2d");

    domCanvas.width = width;
    domCanvas.height = height;

    if (!element.sectionsText) element.sectionsText = "Empty String Empty String";
    UtilElement._drawString(context, {
        txtString: element.sectionsText,
        font: "normal 12pt '微软雅黑'",
        fillStyle: "Green",
        top: 20,
        left: 0,
        width: width
    });
}
UtilElement._drawString = function (context, jsp) {
    let txts = new Array();
    let txtString = jsp.txtString;
    let chars = txtString.split("");

    let length = chars.length, pos = 0;
    let lineHeight = 22;
    // -- 1. font -----------------------------------------
    context.font = jsp.font;
    context.fillStyle = jsp.fillStyle;

    // -- 先做简单拆分，将来优化为考虑中文，完整英文单词，标点符号以及空格等因素 --
    while (pos < length) {
        let txt = "";
        for (let i = pos; i < length; i++) {
            txt += chars[i];
            if (context.measureText(txt).width > jsp.width) {
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

    // -- 3. draw -----------------------------------------    
    for (let i = 0; i < txts.length; i++) {
        let line = txts[i];
        context.fillText(line, jsp.left, jsp.top + i * lineHeight);
    }
}
UtilElement._drawError = function (context, jsp) {
    let element = jsp.element;

    UtilElement._drawString(context, {
        txtString: jsp.message,
        font: "normal 12pt '微软雅黑'",
        fillStyle: "red",
        top: 0.5 * element.height,
        left: 0,
        width: element.width
    });
}

// -- draw image --------------------------------------------------------------
UtilElement.draw_image = function (domCanvas, element) {
    let width = element.width, widthImg;
    let height = element.height, heightImg;
    let context = domCanvas.getContext("2d");
    let deformation = element.imgDeformation || "";

    let img = new Image();
    // ----------------------------------------------------
    domCanvas.width = width;
    domCanvas.height = height;

    img.src = element.image;
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
        UtilElement._drawError(context, { element: element, message: "picture failed to load" });
    }
}

// -- draw barcode-1D ---------------------------------------------------------
UtilElement.draw_Code128 = function (domCanvas, element) {
    let width = element.width;
    let height = element.height;
    let context = domCanvas.getContext("2d");

    domCanvas.width = width;
    domCanvas.height = height;
    //context.clearRect(0, 0, width, height);

    context.font = "normal 10pt 'Arial'";
    context.fillStyle = "orange";
    context.fillText("    | ||    " + element.segmentsText + "    || |", 0, 0.4 * height);

    if (element.sectionsText) {
        UtilElement._drawString(context, {
            txtString: element.sectionsText,
            font: "normal 14pt '微软雅黑'",
            fillStyle: "Blue",
            top: 0.8 * height,
            left: 0,
            width: width
        });
    }
}
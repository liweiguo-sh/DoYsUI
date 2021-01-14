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
    let pxmm = element._this.pxmm;

    let head = element.head;
    let font = element.font;
    let frame = element.frame;
    let position = element.position;

    let w, h, x, y;
    // -- 补全默认值 ----------------------------------------
    font = element.font || {};
    font.lineHeight = parseFloat(font.lineHeight || 0);
    font.size = font.size || 12;

    frame.type = frame.type || "";
    frame.width = frame.type.equals("") ? 0 : parseFloat(frame.width || 0);

    position.angle = position.angle || 0;
    position.angleR = position.angle * Math.PI / 180;
    position.textAlign = position.textAlign || "left";
    position.verticalAlign = position.verticalAlign || "top";

    position.marginLeft = parseFloat(position.marginLeft || 0);
    position.marginRight = parseFloat(position.marginRight || 0);
    position.marginTop = parseFloat(position.marginTop || 0);
    position.marginBottom = parseFloat(position.marginBottom || 0);

    UtilElement.computePropAngle(element);
    // ----------------------------------------------------
    if (head.elementType.equals("text")) {
        font._fontDraw = UtilElement._getContextFont(font, pxmm);
        font._fillStyleDraw = UtilElement._getContextFillStyle({ color: font.color });
        font._fontHeight = UtilElement._getContextLineHeight(font);
        font._lineHeightDraw = element.font.lineHeight || font._fontHeight;

        position._topDraw = position.marginTop + frame.width;
        position._leftDraw = position.marginLeft + frame.width;
        // -- 水平位置 --
        if (position.textAlign.equals("center")) {
            position._leftDraw = position.width / 2;
        }
        else if (position.textAlign.equals("right")) {
            position._leftDraw = position.width - position.marginRight - frame.width;
        }
        // -- 垂直位置 --
        if (position.verticalAlign.equals("middle")) {
            position._topDraw = (position.height - element.font._lineHeightDraw) / 2;
        }
        else if (position.verticalAlign.equals("bottom")) {
            position._topDraw = position.height - position.marginBottom - font._fontHeight - frame.width;
        }
        position._topDraw = Math.max(position._topDraw, 0);

    }
    if (head.elementType.equals("barcode")) {
        font._fontDraw = UtilElement._getContextFont(font, pxmm);
        font._fillStyleDraw = UtilElement._getContextFillStyle({ color: font.color });
        font._fontHeight = UtilElement._getContextLineHeight(font);
        font._lineHeightDraw = element.font.lineHeight || font._fontHeight;

        // -- 文本水平位置 --
        position._leftDraw = frame.width + position.marginLeft;
        if (position.textAlign.equals("center")) {
            position._leftDraw = position.width / 2;
        }
        else if (position.textAlign.equals("right")) {
            position._leftDraw = position.width - frame.width - position.marginRight;
        }

        // -- 文本垂直位置 --
        position._topDraw = frame.width + position.marginTop;
        if (position.verticalAlign.equals("middle")) {
            position._topDraw = position.marginTop + (position.height - position.marginTop - position.marginBottom - element.font._fontHeight) / 2;
        }
        else if (position.verticalAlign.equals("bottom")) {
            position._topDraw = position.height - position.marginBottom - font._fontHeight;
        }
        position._topDraw = Math.max(position._topDraw, 0);

        // -- 条码位置(1D/2D) --
        if (UtilElement.Is1D(head.barcodeType)) {
            position._barcodeWidth = position.width - 2 * frame.width - position.marginLeft - position.marginRight;
            position._barcodeLeft = position.marginLeft + frame.width;

            if (head.pureBarcode || position.verticalAlign.equals("middle")) {
                position._barcodeHeight = position.height - position.marginTop - position.marginBottom - 2 * frame.width;
                position._barcodeTop = position.marginTop + frame.width;
            }
            else {
                position._barcodeHeight = position.height - position.marginTop - position.marginBottom - font._fontHeight - 2 * frame.width;
                if (position.verticalAlign.equals("bottom")) {
                    position._barcodeTop = position.marginTop + frame.width;
                }
                else {
                    position._barcodeTop = position.marginTop + font._fontHeight - frame.width;
                }
            }
            position._barcodeHeight = Math.max(position._barcodeHeight, 2);
        }
        else {
            x = frame.width + position.marginLeft;
            y = frame.width + position.marginTop;
            w = position.width - 2 * frame.width - position.marginLeft - position.marginRight;
            h = position.height - 2 * frame.width - position.marginTop - position.marginBottom;

            if (w > h) {
                x += (w - h) / 2;
                w = h;
            }
            else {
                if (position.verticalAlign.equals("top")) {         // -- 文字在上，条码在下 --
                    y += (h - w);
                }
                else if (position.verticalAlign.equals("middle")) { // -- 文字在中间，条码垂直居中 --
                    y += (h - w) / 2;
                }
                h = w;
            }

            position._barcodeLeft = x;
            position._barcodeTop = y;
            position._barcodeWidth = w;
            position._barcodeHeight = h;
        }
    }
}
UtilElement.computePropAngle = function (element) {
    let position = element.position;
    let w = position.width, h = position.height;
    let angle = position.angle, angleR = position.angleR;

    // -- 1. 计算canvas(dom对象)的宽高 --
    position.wC = h * Math.abs(Math.sin(angleR)) + w * Math.abs(Math.cos(angleR));
    position.hC = h * Math.abs(Math.cos(angleR)) + w * Math.abs(Math.sin(angleR));

    // -- 2. 计算offsetX、offsetY --
    position.P1 = {}; position.P2 = {}; position.P3 = {}; position.P4 = {};
    position.P15 = {}; position.P25 = {}; position.P35 = {}; position.P45 = {};

    if (angle <= 90) {
        position.P1.x = h * Math.abs(Math.sin(angleR));
        position.P1.y = 0;
        position.P2.x = h * Math.abs(Math.sin(angleR)) + w * Math.abs(Math.cos(angleR));
        position.P2.y = w * Math.abs(Math.sin(angleR));

        position.P3.x = w * Math.abs(Math.cos(angleR));
        position.P3.y = h * Math.abs(Math.cos(angleR)) + w * Math.abs(Math.sin(angleR));
        position.P4.x = 0;
        position.P4.y = h * Math.abs(Math.cos(angleR));
    }
    else if (angle <= 180) {
        position.P1.x = w * Math.abs(Math.cos(angleR)) + h * Math.abs(Math.sin(angleR));
        position.P1.y = h * Math.abs(Math.cos(angleR));
        position.P2.x = h * Math.abs(Math.sin(angleR));
        position.P2.y = w * Math.abs(Math.sin(angleR)) + h * Math.abs(Math.cos(angleR));

        position.P3.x = 0;
        position.P3.y = w * Math.abs(Math.sin(angleR));
        position.P4.x = w * Math.abs(Math.cos(angleR));
        position.P4.y = 0;
    }
    else if (angle <= 270) {
        position.P1.x = Math.abs(w * Math.cos(angleR));
        position.P1.y = Math.abs(h * Math.cos(angleR)) + w * Math.abs(Math.sin(angleR));
        position.P2.x = 0;
        position.P2.y = h * Math.abs(Math.cos(angleR));

        position.P3.x = h * Math.abs(Math.sin(angleR));
        position.P3.y = 0;
        position.P4.x = h * Math.abs(Math.sin(angleR)) + w * Math.abs(Math.cos(angleR));
        position.P4.y = w * Math.abs(Math.sin(angleR));
    }
    else {
        position.P1.x = 0;
        position.P1.y = w * Math.abs(Math.sin(angleR));
        position.P2.x = w * Math.abs(Math.cos(angleR));
        position.P2.y = 0;

        position.P3.x = w * Math.abs(Math.cos(angleR)) + h * Math.abs(Math.sin(angleR));
        position.P3.y = h * Math.abs(Math.cos(angleR));
        position.P4.x = h * Math.abs(Math.sin(angleR));
        position.P4.y = w * Math.abs(Math.sin(angleR)) + h * Math.abs(Math.cos(angleR));
    }

    position.offsetX = position.P1.x;
    position.offsetY = position.P1.y;

    // -- 3. 计算E15/E25/E35/E45 --
    position.P15.x = (position.P1.x + position.P2.x) / 2;
    position.P15.y = (position.P1.y + position.P2.y) / 2;
    position.P25.x = (position.P2.x + position.P3.x) / 2;
    position.P25.y = (position.P2.y + position.P3.y) / 2;

    position.P35.x = (position.P3.x + position.P4.x) / 2;
    position.P35.y = (position.P3.y + position.P4.y) / 2;
    position.P45.x = (position.P4.x + position.P1.x) / 2;
    position.P45.y = (position.P4.y + position.P1.y) / 2;
}
UtilElement.computeValue = function (jsp) {
    let element = jsp.element;
    let fields = jsp.fields;

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
                values.push(fields[value]);
            }
            else if (type.equals("symbol")) {
                if (value.equals("GS")) {
                    values.push(String.fromCharCode(29));
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
                values.push(fields[value]);
            }
            else if (type.equals("symbol")) {
                if (value.equals("GS")) {
                    values.push(String.fromCharCode(29));
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
        if (image.value) {
            image.url = fields[image.value];
        }
    }
}
UtilElement.draw = function (jsp) {
    let element = jsp.element;
    let pxmm = element._this.pxmm;
    let head = element.head;
    let position = element.position;
    let domCanvas = element._canvas;
    let context = domCanvas.getContext("2d");

    //if (element.position.hidden) return;
    // -- position ----------------------------------------
    domCanvas.style.zIndex = position.layer;
    domCanvas.style.top = (position.top * pxmm) + "px";
    domCanvas.style.left = (position.left * pxmm) + "px";
    domCanvas.width = position.wC * pxmm;
    domCanvas.height = position.hC * pxmm;

    // -- repaint -----------------------------------------
    context.translate(position.offsetX * pxmm, position.offsetY * pxmm);
    context.rotate(position.angleR);

    if (element.frame.type) {
        UtilElement.drawFrame(context, element);
    }
    else {
        if (position.angle % 90 != 0) {
            // -- 没有边框，又存在旋转角度，设计状态下绘制虚拟边框，预览及打印时不绘制 --
            context.strokeStyle = "#FF00FB";
            context.lineWidth = 1;
            context.setLineDash([12, 9]);
            //context.strokeRect(-1, -1, position.width * pxmm + 2, position.height * pxmm + 2);
        }
    }

    if (head.elementType.equals("text")) {
        UtilElement.draw_text(context, element);
    }
    else if (head.elementType.equals("image")) {
        UtilElement.draw_image(context, element);
    }
    else if (head.elementType.equals("barcode")) {
        if (UtilElement.Is1D(head.barcodeType)) {
            UtilElement.draw_barcode1D(context, element);
        }
        else {
            UtilElement.draw_barcode2D(context, element);
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
UtilElement.drawFrame = function (context, element) {
    let _this = element._this;
    let pxmm = _this.pxmm;
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
        context.lineWidth = frame.width * pxmm;
        if (frame.type.equals("ellipse")) {
            // -- context.strokeRect(x * pxmm, y * pxmm, w * pxmm, h * pxmm); --
        }
        else {
            context.strokeRect(x * pxmm, y * pxmm, w * pxmm, h * pxmm);
        }
    }
    if (frame.fillColor) {
        x = frame.width; y = x;
        w = width - 2 * frame.width;
        h = height - 2 * frame.width;

        context.fillStyle = frame.fillColor;
        context.fillRect(x * pxmm, y * pxmm, w * pxmm, h * pxmm);
    }
}

// -- draw text ---------------------------------------------------------------
UtilElement.draw_text = function (context, element) {
    if (element.font.wordWrap) {
        UtilElement._drawMultiLine(context, element);
    }
    else {
        UtilElement._drawSingleLine(context, element);
    }
}

UtilElement._drawSingleLine = function (context, element) {
    let pxmm = element._this.pxmm;
    let position = element.position;

    context.font = element.font._fontDraw;
    context.fillStyle = element.font._fillStyleDraw;
    context.textAlign = position.textAlign;
    context.textBaseline = "top";   // -- 固定设置为top，通过计算top位置实现垂直居中 --

    let patchTop = position.verticalAlign.equals("top") ? 4 : 0;    // -- 补4个像素，解决中文削顶问题，C#中没有这个问题 --
    let text = element.head._sectionsText || (element.env.equals("design") ? "<空>" : "");

    context.fillText(text, position._leftDraw * pxmm, position._topDraw * pxmm + patchTop);
}
UtilElement._drawMultiLine = function (context, element) {
    let font = element.font;
    let position = element.position;

    let txts = new Array();
    let txtString = element.head._sectionsText || (element.env.equals("design") ? "<空>" : "");
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

UtilElement._getContextFont = function (elementFont, pxmm) {
    // -- 示例: font: "normal 12px '微软雅黑'" --
    // -- 必须是这个顺序，顺序错误无效，比较奇葩，具体顺序参考：https://blog.csdn.net/HuoYiHengYuan/article/details/101677114 --
    let arr = new Array();
    let pxFontSize = (elementFont.size / 72) * 25.4 * pxmm;

    if (elementFont.bold) arr.push("bold");
    if (elementFont.italic) arr.push("italic");

    arr.push(pxFontSize + "px");
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
    return (font.size / 72) * 25.4;
}

// -- draw image --------------------------------------------------------------
UtilElement.draw_image = function (context, element) {
    let pxmm = element._this.pxmm;

    let width = element.position.width * pxmm, widthImg;
    let height = element.position.height * pxmm, heightImg;
    let deformation = element.image.deformation || "";

    let urlImg;
    let img = new Image();
    // ----------------------------------------------------
    urlImg = element.image.url || "";
    if (!urlImg.startWith("http:")) {
        if (!element.imageBaseUrl) {
            alert("配置标签参数 (imageBaseUrl) 未配置, 请检查。");
            return;
        }
        urlImg = element.imageBaseUrl + urlImg;
    }
    // ----------------------------------------------------
    img.src = urlImg;
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
        UtilElement._drawError(context, element, "404");
    }
}

// -- draw barcode-1D ---------------------------------------------------------
UtilElement.Is1D = function (barcodeType) {
    return !UtilElement.Is2D(barcodeType);
}
UtilElement.Is2D = function (barcodeType) {
    if (barcodeType.equals("QR_CODE") || barcodeType.equals("DATA_MATRIX") || barcodeType.equals("PDF_417")) {
        return true;
    }
    return false;
}

UtilElement.draw_barcode1D = async function (context, element) {
    // -- 1. 输出文本部分 --
    if (!element.head.pureBarcode) {
        UtilElement._drawSingleLine(context, element);
    }

    // -- 2. 通过weview获取条码图片(base64格式) --
    let srcImg = await UtilElement._getBarcodeBase64({
        env: element.env,
        barcodeType: element.head.barcodeType,
        barcodeValue: element.head._segmentsText,
        width: element.position.width,
        height: element.position.height,
        point: element.point,
        gs1: element.head.gs1
    });
    if (!srcImg) return;

    // -- 3. 输出条码部分 --
    let _this = element._this;
    let pxmm = _this.pxmm;
    let position = element.position;
    let x = position._barcodeLeft * pxmm;
    let y = position._barcodeTop * pxmm;
    let img = new Image();

    img.src = srcImg;
    img.onload = function () {
        let w = position._barcodeWidth * pxmm;
        let h = position._barcodeHeight * pxmm;

        context.drawImage(img, x, y, w, h);
    }
    img.onerror = function () {
        context.font = position._barcodeHeight * pxmm / 2 + "px Arial";
        context.fillStyle = element.font._fillStyleDraw;
        context.textAlign = "left";
        context.textBaseline = "top";

        context.fillText("| ||    XXXXXXXX    || |", x, y);
    }
}
UtilElement.draw_barcode2D = async function (context, element) {
    let _this = element._this;
    let pxmm = _this.pxmm;
    let head = element.head;
    let position = element.position;

    // -- 1. 输出文本部分 --
    if (!head.pureBarcode) {
        UtilElement._drawSingleLine(context, element);
    }

    // -- 2. 通过weview获取条码图片(base64格式) --
    let srcImg = await UtilElement._getBarcodeBase64({
        env: element.env,
        barcodeType: head.barcodeType,
        barcodeValue: head._segmentsText,
        width: position._barcodeWidth,
        height: position._barcodeHeight,
        point: element.point,
        gs1: head.gs1
    });
    if (!srcImg) return;

    // -- 3. 输出条码部分 --   
    let x = position._barcodeLeft * pxmm;
    let y = position._barcodeTop * pxmm;
    let img = new Image();

    img.src = srcImg;
    img.onload = function () {
        let w = position._barcodeWidth * pxmm;
        let h = position._barcodeHeight * pxmm;
        let m1 = 0.0, m2 = 1 - 2 * m1;          // -- 裁剪二维码图片，减少二维码留白 --
        context.drawImage(img, img.width * m1, img.height * m1, img.width * m2, img.height * m2, x, y, w, h);
    }
    img.onerror = function () {
        context.font = position._barcodeHeight * pxmm / 2 + "px Arial";
        context.fillStyle = element.font._fillStyleDraw;
        context.textAlign = "left";
        context.textBaseline = "top";

        context.fillText("| ||    XXXXXXXX    || |", x, y);
    }
}
UtilElement._getBarcodeBase64 = async function (jsp) {
    // -- 1. 特殊处理，条码没有内容 --
    if (!jsp.barcodeValue) {
        if (jsp.env.equals("design")) {
            // -- 1.1 显示条码占位图片(设计状态，但没有条码内容) --
            return g.path.framework + "/control/label/image/" + jsp.barcodeType + ".png";
        }
        else {
            // -- 1.2 非设计状态不显示条码占位图片 --
            return "";
        }
    }
    else {
        if (!top.chrome || !top.chrome.webview) {
            // -- 1.3 显示条码占位图片(设计状态，但不是在webview环境) --
            return g.path.framework + "/control/label/image/" + jsp.barcodeType + ".png";
        }
    }

    // -- 2. 通过webview外壳生成图片 --
    let para = {
        protocol: "2.0",
        action: "getBarcodeBase64",
        barcodeType: jsp.barcodeType,
        barcodeValue: jsp.barcodeValue,
        width: jsp.width,
        height: jsp.height,
        point: jsp.point,
        isGS1: jsp.gs1 ? true : false
    }
    let hashcode = JSON.getHashCode(para);
    let base64Key = "base64_" + hashcode;

    if (!top.EdgeJsSwapArea) top.EdgeJsSwapArea = {};
    if (!top.EdgeJsSwapArea.DLabel) top.EdgeJsSwapArea.DLabel = {};
    if (top.EdgeJsSwapArea.DLabel[base64Key]) {
        return top.EdgeJsSwapArea.DLabel[base64Key];
    }
    else {
        para["base64Key"] = base64Key;
        top.invokeEdge(para);
    }

    // -- 3. 延时获取weview外壳生成的图片 --
    let count = 0, maxCount = 10;
    while (count++ < maxCount) {
        await sleep(10);    // -- 测试结果: 平均 <= 5ms --
        if (top.EdgeJsSwapArea.DLabel[base64Key]) {
            return top.EdgeJsSwapArea.DLabel[base64Key];
        }
    }

    // -- 4. 超时显示错误图片 --
    return g.path.framework + "/control/label/image/error.png";
}
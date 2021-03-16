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
    let P = element.position;

    // -- 0. 补全默认值 -------------------------------------
    font = element.font || {};
    font.lineHeight = parseFloat(font.lineHeight || 0);
    font.size = font.size || 12;

    frame.type = frame.type || "";
    frame.width = frame.type.equals("") ? 0 : parseFloat(frame.width || 0);

    P.angle = P.angle || 0;
    P.angleR = P.angle * Math.PI / 180;
    P.textAlign = P.textAlign || "left";
    P.verticalAlign = P.verticalAlign || "top";

    P.marginLeft = parseFloat(P.marginLeft || 0);
    P.marginRight = parseFloat(P.marginRight || 0);
    P.marginTop = parseFloat(P.marginTop || 0);
    P.marginBottom = parseFloat(P.marginBottom || 0);

    UtilElement.computePropAngle(element);

    // -- 1. 通用属性 --
    P.offsetLeft = P.marginLeft; P.offsetRight = P.marginRight;
    P.offsetTop = P.marginTop; P.offsetBottom = P.marginBottom;
    if (frame.type) {
        P.offsetLeft += frame.width; P.offsetRight += frame.width;
        P.offsetTop += frame.width; P.offsetBottom += frame.width;
    }
    P.clientWidth = P.width - P.offsetLeft - P.offsetRight;
    P.clientHeight = P.height - P.offsetTop - P.offsetBottom;

    // -- 2. 文本(包括条码的文本部分) --
    if (head.elementType.equals("text") || head.elementType.equals("barcode")) {
        font._fontDraw = UtilElement._getContextFont(font, pxmm);
        font._fillStyleDraw = UtilElement._getContextFillStyle({ color: font.color });
        font._fontHeight = UtilElement._getContextLineHeight(font);
        font._lineHeightDraw = element.font.lineHeight || font._fontHeight;

        // -- 水平位置 --
        if (P.textAlign.equals("center")) {
            P.leftText = frame.width + P.marginLeft + (P.width - 2 * frame.width - P.marginLeft - P.marginRight) / 2;
        }
        else if (P.textAlign.equals("right")) {
            P.leftText = P.width - frame.width - P.marginRight;
        }
        else {
            P.leftText = frame.width + P.marginLeft;
        }
        P.leftText = Math.max(P.leftText, 0);

        // -- 垂直位置 --
        if (P.verticalAlign.equals("middle")) {
            P.topText = frame.width + P.marginTop + (P.height - 2 * frame.width - P.marginTop - P.marginBottom) / 2;
        }
        else if (P.verticalAlign.equals("bottom")) {
            P.topText = P.height - frame.width - P.marginBottom;
        }
        else {
            P.topText = frame.width + P.marginTop;
        }
        P.topText = Math.max(P.topText, 0);
    }

    // -- 3. 条码(条码的图片部分) --
    if (head.elementType.equals("barcode")) {
        if (head.pureBarcode || P.verticalAlign.equals("middle")) {
            font._fontHeight = 0;
        }
        P.heightBarcode = P.height - 2 * frame.width - P.marginTop - P.marginBottom - font._fontHeight;
        P.widthBarcode = P.width - 2 * frame.width - P.marginLeft - P.marginRight;
        P.leftBarcode = frame.width + P.marginLeft;

        // -- 垂直位置 --
        if (P.verticalAlign.equals("top")) {
            P.topBarcode = frame.width + P.marginTop + font._fontHeight;
        }
        else {
            P.topBarcode = frame.width + P.marginTop;
        }
        // -- 水平位置 --
        if (UtilElement.Is1D(head.barcodeType)) {
            // -- 一维码宽度是最大化填充，所以水平永远是居左的 --
        }
        else {
            P.widthBarcode = Math.min(P.widthBarcode, P.heightBarcode);
            P.heightBarcode = Math.min(P.widthBarcode, P.heightBarcode);

            if (P.textAlign.equals("right")) {
                P.leftBarcode = P.width - frame.width + P.marginRight - P.widthBarcode;
            }
            else if (P.textAlign.equals("center")) {
                P.leftBarcode = frame.width + P.marginLeft
                    + Math.max((P.width - 2 * frame.width - P.marginLeft - P.marginRight - P.widthBarcode) / 2, 0);
            }
            else {
                P.leftBarcode = frame.width + P.marginLeft;
            }
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

    // -- paint multiSelect -------------------------------
    UtilElement.drawMultiSelect(context, element);
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
UtilElement.drawMultiSelect = function (context, element) {
    if (!element.head._selected) return;

    let _this = element._this;
    let pxmm = _this.pxmm;
    let x = 5, y = x;
    let w = element.position.width * pxmm - 2 * x;
    let h = element.position.height * pxmm - 2 * y;
    // ----------------------------------------------------
    context.strokeStyle = "#FF1493";
    context.lineWidth = 2;
    context.setLineDash([]);
    context.strokeRect(x, y, w, h);

    context.strokeStyle = "#FFFFFF";
    context.lineWidth = 2;
    context.setLineDash([8, 8]);
    context.strokeRect(x, y, w, h);
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
    // -- 参考：https://www.w3school.com.cn/tags/canvas_textbaseline.asp --
    let pxmm = element._this.pxmm;
    let position = element.position;
    let x = position.leftText * pxmm;
    let y = position.topText * pxmm;
    let text = element.head._sectionsText || element.head._segmentsText || (element.env.equals("design") ? "<空>" : "");

    if (position.verticalAlign.equals("top")) {
        y += 4;     // -- 补4个像素，解决中文字体削顶问题，C#中没有这个问题 --
    }
    context.font = element.font._fontDraw;
    context.fillStyle = element.font._fillStyleDraw;
    context.textAlign = position.textAlign;
    context.textBaseline = position.verticalAlign;
    context.fillText(text, x, y);
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
    left = element.position.leftText;

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
    let urlImg = element.image.url || "";
    // ----------------------------------------------------
    if (!urlImg.equals("") && !urlImg.startsWith("http:") && !urlImg.startsWith("https:")) {
        if (!element._labelHead.imageBaseUrl) {
            alert("配置标签参数 (imageBaseUrl) 未配置, 请检查。");
            return;
        }
        urlImg = element._labelHead.imageBaseUrl + urlImg;
    }

    let img = new Image();
    // ----------------------------------------------------    
    img.src = urlImg;
    img.onload = function () {
        let pxmm = element._this.pxmm;
        let P = element.position;
        let deformation = element.image.deformation || "";
        let x, y, widthImg, heightImg;

        // -- 1. deformation --
        if (deformation.equals("stretch")) {    // -- 拉伸(变形) --
            widthImg = P.clientWidth;
            heightImg = P.clientHeight;
        }
        else if (deformation.equals("zoom")) {  // -- 缩放(同比缩放) --
            if (img.width / img.height > P.clientWidth / P.clientHeight) {
                widthImg = P.clientWidth;
                heightImg = P.clientWidth * img.height / img.width;
            }
            else {
                heightImg = P.clientHeight;
                widthImg = P.clientHeight * img.width / img.height;
            }
        }
        else {
            widthImg = img.width;
            heightImg = img.height;
        }

        // -- 2. textAlign and verticalAlign --
        if (P.textAlign.equals("right")) {
            x = P.width - P.offsetRight - widthImg;
        }
        else if (P.textAlign.equals("center")) {
            x = P.offsetLeft + (P.clientWidth - widthImg) / 2;
        }
        else {
            x = P.offsetLeft;
        }

        if (P.verticalAlign.equals("bottom")) {
            y = P.height - P.offsetBottom - heightImg;
        }
        else if (P.verticalAlign.equals("middle")) {
            y = P.offsetTop + (P.clientHeight - heightImg) / 2;
        }
        else {
            y = P.offsetTop;
        }

        // -- 3. draw --
        context.drawImage(img, x * pxmm, y * pxmm, widthImg * pxmm, heightImg * pxmm);

        UtilElement.drawMultiSelect(context, element);
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
        width: position.width,
        height: position.height,
        point: element._labelHead.point,
        gs1: head.gs1
    });
    if (!srcImg) return;

    // -- 3. 输出条码部分 --
    let x = position.leftBarcode * pxmm;
    let y = position.topBarcode * pxmm;
    let img = new Image();

    img.src = srcImg;
    img.onload = function () {
        let w = position.widthBarcode * pxmm;
        let h = position.heightBarcode * pxmm;

        context.drawImage(img, x, y, w, h);

        UtilElement.drawMultiSelect(context, element);
    }
    img.onerror = function () {
        context.font = position.heightBarcode * pxmm / 2 + "px Arial";
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
        width: position.widthBarcode,
        height: position.heightBarcode,
        point: element._labelHead.point,
        gs1: head.gs1
    });
    if (!srcImg) return;

    // -- 3. 输出条码部分 --   
    let x = position.leftBarcode * pxmm;
    let y = position.topBarcode * pxmm;
    let img = new Image();

    img.src = srcImg;
    img.onload = function () {
        let w = position.widthBarcode * pxmm;
        let h = position.heightBarcode * pxmm;
        let m1 = 0.0, m2 = 1 - 2 * m1;          // -- 裁剪二维码图片，减少二维码留白 --

        context.drawImage(img, img.width * m1, img.height * m1, img.width * m2, img.height * m2, x, y, w, h);

        UtilElement.drawMultiSelect(context, element);
    }
    img.onerror = function () {
        context.font = position.heightBarcode * pxmm / 2 + "px Arial";
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
            return "../image/" + jsp.barcodeType + ".png";
        }
        else {
            // -- 1.2 非设计状态不显示条码占位图片 --
            return "";
        }
    }
    else {
        if (!top.chrome || !top.chrome.webview) {
            // -- 1.3 显示条码占位图片(设计状态，但不是在webview环境) --
            return "../image/" + jsp.barcodeType + ".png";
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
        await sleep(50);    // -- 测试结果: 平均 <= 5ms --
        if (top.EdgeJsSwapArea.DLabel[base64Key]) {
            return top.EdgeJsSwapArea.DLabel[base64Key];
        }
    }

    // -- 4. 超时显示错误图片 --
    return "../image/error.png";
}
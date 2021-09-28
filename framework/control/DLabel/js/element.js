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
UtilElement.getJson = function (element) {
    try {
        return JSON.stringify(element,
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

UtilElement.computeProp = function (jsp) {
    let element = jsp.element;
    let pxmm = element._this.pxmm;

    let head = element.head;
    let font = element.font;
    let frame = element.frame;
    let P = element.position;

    // -- 0. 补全默认值 -------------------------------------
    if (head.elementType.equals("barcode")) {
        if (!head.barcodeType) {
            head.barcodeType = "CODE_128";
        }
        if (!element.segments) {
            element.segments = [
                UtilElement.getFixedSegment({ pos: 0 }),
                UtilElement.getBlankSegment({ pos: 1 })
            ];
        }
        if (!element.sections) {
            element.sections = [
                UtilElement.getFixedSection({ pos: 0 }),
                UtilElement.getBlankSection({ pos: 1 })
            ];
        }
    }
    font = element.font || {};
    font.name = font.name || "宋体";
    font.size = font.size || 10.5;
    font.fontHeight = UtilFont.getFontHeight(font);                 // -- 字体高度(实际高度，没有边距，C#中有边距) --
    font.lineHeight = parseFloat(font.lineHeight);                  // -- 行高(用户设定)
    font.textHeight = font.lineHeight || font.fontHeight;           // -- 运行时采用的行高 --

    frame.type = frame.type || "";
    frame.width = frame.type.equals("") ? 0 : parseFloat(frame.width || 0);
    frame.radius = parseFloat(frame.radius || 0);

    P.angle = P.angle || 0;
    P.angleR = P.angle * Math.PI / 180;
    P.textAlign = P.textAlign || "left";
    P.verticalAlign = P.verticalAlign || "top";

    P.marginLeft = parseFloat(P.marginLeft || 0);
    P.marginRight = parseFloat(P.marginRight || 0);
    P.marginTop = parseFloat(P.marginTop || 0);
    P.marginBottom = parseFloat(P.marginBottom || 0);
    P.width = Math.max(P.width, 1);                                 // -- 最小宽高 --
    P.height = Math.max(P.height, 0.2);                             // -- 最小高度 --

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
            font.textHeight = 0;
        }
        P.heightBarcode = P.height - 2 * frame.width - P.marginTop - P.marginBottom - font.textHeight;
        P.widthBarcode = P.width - 2 * frame.width - P.marginLeft - P.marginRight;
        P.leftBarcode = frame.width + P.marginLeft;

        // - EAN_13_D 特殊处理 --        
        if (head.barcodeType.equals("EAN_13_D")) {
            P.heightBarcode = P.height - 2 * frame.width - P.marginTop - P.marginBottom - font.textHeight * 0.6; // -- 此处的0.6须和C#端保持一致 --
            P.leftText = frame.width + P.marginLeft;
        }

        // -- 垂直位置 --
        if (P.verticalAlign.equals("top")) {
            P.topBarcode = frame.width + P.marginTop + font.textHeight;
        }
        else {
            P.topBarcode = frame.width + P.marginTop;
        }
        // -- 水平位置 --
        if (UtilElement.Is1D(head.barcodeType)) {
            // -- 一维码图片宽度是最大化填充，所以水平永远是居左的 --
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
    let values, valueString;
    // ----------------------------------------------------
    if (head.elementType.equals("barcode")) {
        values = new Array();
        for (let i = 0; i < segments.length - 1; i++) {
            let segment = segments[i];
            let value = segment.value || "";
            let type = segment.type;

            // -- 追加GS分组符 ----------
            if (i == 0) {
                if (head.barcodeType.equals("DATA_MATRIX") && head.gs1) {
                    values.push(g.c.GS);
                }
            }
            // ------------------------
            if (type.equals("fixed")) {
                values.push(value);
            }
            else if (type.equals("field")) {
                values.push(fields[value]);
            }
            else if (type.equals("symbol")) {
                if (value.equals("GS")) {
                    value = g.c.GS;
                }
                else if (value.equals("FNC1")) {
                    value = g.c.FNC1;
                }
                values.push(value);
            }
        }
        valueString = values.join("");

        if (head.barcodeType.startsWith("EAN_13")) {
            if (valueString.length < 12) {
                valueString = valueString.padEnd(12, "0");
            }
            else if (valueString.length > 12) {
                valueString = valueString.substring(0, 12);
            }
            valueString += Util.GetChecksumEAN13(valueString);
        }

        head._segmentsText = valueString;
    }
    // ----------------------------------------------------
    if (head.elementType.equals("barcode") || head.elementType.equals("text")) {
        if (head.elementType.equals("barcode") && head.barcodeType.startsWith("EAN_13")) {
            head._sectionsText = head._segmentsText;
        }
        else {
            values = new Array();
            for (let i = 0; i < sections.length - 1; i++) {
                let section = sections[i];
                let value = section.value;
                let type = section.type;

                if (type.equals("fixed")) {
                    value = UtilElement.replaceFieldValue(value, jsp.fields);
                    values.push(value);
                }
                else if (type.equals("field")) {
                    values.push(fields[value]);
                }
                else if (type.equals("symbol")) {
                    if (value.equals("GS")) {
                        values.push(g.c.GS);
                    }
                    else if (value.equals("FNC1")) {
                        values.push(g.c.FNC1);
                    }
                    else {
                        values.push(value);
                    }
                }
            }
            valueString = values.join("");
            if (valueString.equals("")) {
                valueString = head._segmentsText;
            }

            if (head.format) {
                valueString = Util.stringFormat(valueString.replaceAll(g.c.GS, "").replaceAll(g.c.FNC1, ""), head.format);
            }
            head._sectionsText = valueString;
        }
    }
    // ----------------------------------------------------
    if (head.elementType.equals("image")) {
        if (image.value) {
            image.url = fields[image.value];
        }
    }
}
UtilElement.replaceFieldValue = function (value, fields) {
    let left, right, fromIndex = 0;
    let fieldName, fieldValue;

    while (true) {
        left = value.indexOf("<%", fromIndex);
        if (left < 0) break;
        right = value.indexOf("%>", left + 2);
        if (right < 0) break;

        fieldName = value.substring(left + 2, right);
        fieldValue = fields[fieldName];
        if (fieldValue != undefined) {
            value = value.substring(0, left) + fieldValue + value.substring(right + 2);
            fromIndex = left + fieldValue.length;
        }
        else {
            fromIndex = right + 2;
        }
    }
    return value;
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
        value: "12345678"
    }
    segment = g.x.extendJSON(segment, jsp);
    return segment;
}
UtilElement.getBlankSegment = function (jsp) {
    let segment = {
        pos: -1,
        type: "",
        value: ""
    }
    segment = g.x.extendJSON(segment, jsp);
    return segment;
}
UtilElement.getFixedSection = function (jsp) {
    let section = {
        pos: -1,
        type: "fixed",
        value: ""       // -- 默认为空，以segment为准 --
    }
    section = g.x.extendJSON(section, jsp);
    return section;
}
UtilElement.getBlankSection = function (jsp) {
    let section = {
        pos: -1,
        type: "",
        value: ""
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
    let frame = element.frame;

    if (frame.width <= 0 && !frame.fillColor) return;   // -- 没有边框，也没有填充色，无需绘制 --
    if (frame.type.equals("rectangle")) {
        UtilElement.drawRectangle(context, element);
    }
}
UtilElement.drawRectangle = function (context, element) {
    let _this = element._this;
    let pxmm = _this.pxmm;
    let frame = element.frame;
    let width = element.position.width;
    let height = element.position.height;
    let r = frame.radius, x, y, w, h;
    // ----------------------------------------------------    
    if (r) {
        context.beginPath();

        // -- 1. 左上角圆弧，上边直线 --
        x = r + frame.width / 2;
        y = x;
        context.arc(x * pxmm, y * pxmm, r * pxmm, 1 * Math.PI, 1.5 * Math.PI);

        // -- 2. 右上角圆弧，右边直线 --
        x = width - r - frame.width / 2;
        y = r + frame.width / 2;
        context.arc(x * pxmm, y * pxmm, r * pxmm, 1.5 * Math.PI, 2 * Math.PI);

        // -- 3. 右下角圆弧，下边直线 --
        x = width - r - frame.width / 2;
        y = height - r - frame.width / 2;
        context.arc(x * pxmm, y * pxmm, r * pxmm, 2 * Math.PI, 0.5 * Math.PI);

        // -- 4. 坐下角圆弧，左边直线 --
        x = r + frame.width / 2;
        y = height - r - frame.width / 2;
        context.arc(x * pxmm, y * pxmm, r * pxmm, 0.5 * Math.PI, 1 * Math.PI);

        // -- 5. 内部填充、绘制边框。顺序不能颠倒 --
        context.closePath();
        if (frame.fillColor) {
            context.fillStyle = frame.fillColor;
            context.fill();
        }
        if (frame.width > 0) {
            context.lineWidth = frame.width * pxmm;
            context.strokeStyle = frame.color;
            context.stroke();
        }
    }
    else {
        if (frame.width > 0) {
            x = frame.width / 2;
            y = x;
            w = width - frame.width;
            h = height - frame.width;

            context.lineWidth = frame.width * pxmm;
            context.strokeStyle = frame.color;
            context.strokeRect(x * pxmm, y * pxmm, w * pxmm, h * pxmm);
        }
        if (frame.fillColor) {
            x = frame.width;
            y = x;
            w = width - 2 * frame.width;
            h = height - 2 * frame.width;

            context.fillStyle = frame.fillColor;
            context.fillRect(x * pxmm, y * pxmm, w * pxmm, h * pxmm);
        }
    }
}
UtilElement.drawMultiSelect = function (context, element) {
    if (element._this.selectedCount <= 1) return;
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
    let text = element.head._sectionsText || element.head._segmentsText || (element._designMode ? "<空>" : "");

    if (position.verticalAlign.equals("top")) {
        // y += 4;     // -- 补4个像素，解决中文字体(微软雅黑)削顶问题，C#中没有这个问题 --
    }

    context.font = element.font._fontDraw;
    context.fillStyle = element.font._fillStyleDraw;
    context.textAlign = position.textAlign;
    context.textBaseline = position.verticalAlign;

    if (position.textAlign.equals("justify")) {
        let wText = context.measureText(text).width;
        let wCanvas = position.clientWidth * pxmm;
        if (wText > wCanvas || text.length == 1) {
            context.fillText(text, x, y);
        }
        else {
            let left = x;
            let xLast = wCanvas + (position.marginLeft + element.frame.width) * pxmm;   // -- 最右端字符的x坐标 --
            let arrText = text.split("");
            let wWordGap = (wCanvas - wText) / (arrText.length - 1);                    // -- 字符间间距 --

            // -- 输出两端的两个文字 --
            context.textAlign = "right";
            context.fillText(arrText[arrText.length - 1], xLast, y);
            context.textAlign = "left";
            context.fillText(arrText[0], x, y);

            // -- 分散输出中间部分的文字 --                        
            for (let i = 1; i < arrText.length - 1; i++) {
                left += context.measureText(arrText[i - 1]).width + wWordGap;
                context.fillText(arrText[i], left, y);
            }
        }
    }
    else {
        context.fillText(text, x, y);
    }
}
UtilElement._drawMultiLine = function (context, element) {
    let pxmm = element._this.pxmm;
    let font = element.font;
    let frame = element.frame;
    let position = element.position;
    let x = position.leftText * pxmm;

    let txts = new Array();
    let txtString = element.head._sectionsText || (element._designMode ? "<空>" : "");
    let chars = txtString.split("");
    let length = chars.length, pos = 0;

    let top;    // -- top不能提前计算，和left不同，top对于垂直不是居上的情况，top的值与内容的多少相关，需要动态计算 --
    let left = position.leftText * pxmm;
    let textHeightPx = font.textHeight * pxmm;
    let maxWidth = (position.width - 2 * frame.width - position.marginLeft - position.marginRight) * pxmm;    // -- 单行文本可用区域宽度(单位：像素) --

    // -- 1. 字体样式 ---------------------------------------
    context.font = font._fontDraw;
    context.fillStyle = font._fillStyleDraw;
    context.textAlign = position.textAlign;
    context.textBaseline = position.verticalAlign;

    // -- 2. 多行拆分(简单拆分，将来优化为考虑中文，完整英文单词，标点符号以及空格等因素) --
    while (pos < length) {
        let txt = "", char;
        for (let i = pos; i < length; i++) {
            char = chars[i];
            txt += char;
            if (char == "\n") {
                txt = txt.substring(0, txt.length - 1);
                txts.push(txt);
                pos = i + 1;
                break;
            }
            else if (context.measureText(txt).width > maxWidth) {
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

    // -- 2. 计算top值 -------------------------------------
    if (position.verticalAlign.equals("bottom")) {
        top = position.height - (frame.width + position.marginBottom + (txts.length - 1) * font.textHeight);
    }
    else if (position.verticalAlign.equals("middle")) {
        top = frame.width + position.marginTop
            + (position.height - 2 * frame.width - position.marginTop - position.marginBottom - txts.length * font.textHeight) / 2
            + font.textHeight / 2;
    }
    else {
        top = frame.width + position.marginTop;
    }
    top = top * pxmm;

    // -- 3. draw -----------------------------------------
    for (let i = 0; i < txts.length; i++) {
        let text = txts[i];
        if (position.textAlign.equals("justify")) {
            let y = top + i * textHeightPx;
            let wText = context.measureText(text).width;
            let wCanvas = position.clientWidth * pxmm;
            if (wText > wCanvas || text.length == 1) {
                context.fillText(text, x, y);
            }
            else {
                let left = x;
                let xLast = wCanvas + (position.marginLeft + element.frame.width) * pxmm;   // -- 最右端字符的x坐标 --
                let arrText = text.split("");
                let wWordGap = (wCanvas - wText) / (arrText.length - 1);                    // -- 字符间间距 --

                // -- 输出两端的两个文字 --
                context.textAlign = "right";
                context.fillText(arrText[arrText.length - 1], xLast, y);
                context.textAlign = "left";
                context.fillText(arrText[0], x, y);

                // -- 分散输出中间部分的文字 --                        
                for (let i = 1; i < arrText.length - 1; i++) {
                    left += context.measureText(arrText[i - 1]).width + wWordGap;
                    context.fillText(arrText[i], left, y);
                }
            }
        }
        else {
            context.fillText(text, left, top + i * textHeightPx);
        }
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

// -- draw image --------------------------------------------------------------
UtilElement.draw_image = function (context, element) {
    let urlImg = element.image.url || "";
    // ----------------------------------------------------
    if (urlImg.equals("")) {
        if (!UtilElement.urlPlaceholderImage) {
            UtilElement.urlPlaceholderImage = g.x.getAbsolutePath("element.js", "DLabel") + "image/placeholder.png";
        }
        urlImg = UtilElement.urlPlaceholderImage;        
    }
    else {
        if (!urlImg.equals("") && !urlImg.startsWith("http:") && !urlImg.startsWith("https:")) {
            if (!element._labelHead.imageBaseUrl) {
                alert("配置标签参数 (imageBaseUrl) 未配置, 请检查。");
                return;
            }
            urlImg = element._labelHead.imageBaseUrl + urlImg;
        }
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
            widthImg = img.width / pxmm;
            heightImg = img.height / pxmm;
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
    img.onerror = function (a) {
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
        if (head.barcodeType.equals("EAN_13_D")) {
            UtilElement._drawEAN_13_D_TEXT(context, element);
        }
        else {
            UtilElement._drawSingleLine(context, element);
        }
    }

    // -- 2. 通过weview获取条码图片(base64格式) --
    await UtilElement._getBarcodeBase64({
        element: element,
        barcodeType: head.barcodeType,
        barcodeValue: head._segmentsText,
        width: position.width,
        height: position.height,
        point: element._labelHead.point,
        gs1: head.gs1,
        elementFont: JSON.stringify(element.font)
    });

    // -- 3. 输出条码部分 --
    let x = position.leftBarcode * pxmm;
    let y = position.topBarcode * pxmm;
    let img = new Image();

    img.src = element._base64Barcode;
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
    srcImg = await UtilElement._getBarcodeBase64({
        element: element,
        barcodeType: head.barcodeType,
        barcodeValue: head._segmentsText,
        width: position.widthBarcode,
        height: position.heightBarcode,
        point: element._labelHead.point,
        gs1: head.gs1
    });

    // -- 3. 输出条码部分 --   
    let x = position.leftBarcode * pxmm;
    let y = position.topBarcode * pxmm;
    let img = new Image();

    img.src = element._base64Barcode;
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
    let minChange = 1;              // -- 最小尺寸变化，小于该数值，条码图片不重取 --
    let element = jsp.element;
    let typeEquals = true, sizeEquals = true;

    // -- 1. 智能判断是否需要重新生成条码图片 --    
    if (!element._imgType) {
        element._imgType = {
            barcodeType: "",
            barcodeValue: "",
            point: 0,
            isGS1: false,
            elementFont: ""
        }
        element._imgSize = {
            width: 0,
            height: 0
        }
    }

    let imgType = {
        barcodeType: jsp.barcodeType,
        barcodeValue: jsp.barcodeValue,
        point: jsp.point,
        isGS1: jsp.gs1 ? true : false,
        elementFont: jsp.elementFont
    }
    let hashTypeOld = JSON.getHashCode(element._imgType);
    let hashTypeNew = JSON.getHashCode(imgType);
    if (hashTypeOld != hashTypeNew) {
        typeEquals = false;
        element._imgType = imgType;
    }
    if (Math.abs(element._imgSize.width - jsp.width) > minChange || Math.abs(element._imgSize.height - jsp.height) > minChange) {
        sizeEquals = false;
        element._imgSize.width = jsp.width;
        element._imgSize.height = jsp.height;
    }
    if (typeEquals && sizeEquals && element._base64Barcode) {
        return;
    }

    // -- 2. 获取条码图片 --
    try {
        let para = {
            barcodeType: jsp.barcodeType,
            barcodeValue: jsp.barcodeValue,
            width: jsp.width,
            height: jsp.height,
            point: jsp.point,
            isGS1: jsp.gs1 ? true : false,
            elementFont: jsp.elementFont
        }
        let res = await crossLocal.getBarcodeBase64(para);
        element._base64Barcode = res.base64;
    }
    catch (e) {
        // -- 返回样例条码图片 --       
        element._base64Barcode = "../image/" + jsp.barcodeType + ".png";
    }
}

// -- EAN_13_D ----------------------------------------------------------------
UtilElement._drawEAN_13_D_TEXT = function (context, element) {
    let pxmm = element._this.pxmm;
    let position = element.position;
    let dpiY = element._labelHead.point || 600;
    let w = parseInt(position.width / 25.4 * dpiY);     // -- 打印机像素宽度(取决于打印机点数) --
    let x, x0 = position.leftText * pxmm;
    let y = position.topText * pxmm;
    let text = element.head._sectionsText || element.head._segmentsText || (element._designMode ? "<空>" : "");
    let texts = text.split("");

    context.font = element.font._fontDraw;
    context.fillStyle = element.font._fillStyleDraw;
    context.textAlign = "center";                       // -- 强制左右居中 --
    context.textBaseline = position.verticalAlign;

    let len = 11 + (3 + 42 + 5 + 42 + 3);               // -- 此处11须与C#端保持一致 --
    let lineWidthPX = (w - w % len) / len;
    let lineWidthMM = lineWidthPX / dpiY * 25.4;        // -- 线宽(单位：mm，模拟打印机端的处理反算得到) --
    let lineWidth = lineWidthMM * pxmm;

    // ----------------------------------------------------
    x = x0 + (11 * lineWidth) / 2;
    context.fillText(texts[0], x, y);                   // -- 输出首字符 --

    x0 += (11 + 3) * lineWidth;                         // -- 调整至左侧警戒线右侧位置 --
    for (let i = 1; i < 13; i++) {
        if (i == 7) {
            x0 += 5 * lineWidth;                        // -- 调整至中间警戒线右侧位置 --
        }
        x = x0 + ((i - 1) * 7 + 3.5) * lineWidth;
        context.fillText(texts[i], x, y);
    }
}
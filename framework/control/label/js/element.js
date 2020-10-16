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
    let segments = element.segments;
    let sections = element.sections;
    let values;

    // ----------------------------------------------------
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
                values.push("<GS>");
            }
            else {
                values.push(value);
            }
        }
    }
    element.segmentsText = values.join("");

    // ----------------------------------------------------
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
                values.push("<GS>");
            }
            else {
                values.push(value);
            }
        }
    }
    element.sectionsText = values.join("");

}
UtilElement.draw = function (jsp) {
    let element = jsp.element;
    let dom = element.dom;

    dom.innerHTML = element.segmentsText;

}

UtilElement.getNewSegment = function (jsp) {
    let segment = {
        pos: -1,
        type: "",
        value: "",
        format: ""
    }
    segment = g.x.extendJSON(segment, jsp);
    return segment;
}
UtilElement.getNewSection = function (jsp) {
    let section = {
        pos: -1,
        type: "",
        value: "",
        format: ""
    }
    section = g.x.extendJSON(section, jsp);
    return section;
}
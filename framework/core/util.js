/**
 * DoYs JavaScript Library v1.0
 * Author: David.Li
 * Create Date: 2021-12-13
 * Modify Date: 2022-01-04
 * Copyright 2021, doys-next.com
 * util lib
 */

(function () {
    window.util = {};
})()

// ----------------------------------------------------------------------------
util.parseUDI = function (barcodeString) {
    let ais = {};
    let rules = [
        { ai: "01", width: 14 },        // -- GTIN --
        { ai: "10", width: 0 },         // -- 批次 --
        { ai: "11", width: 6 },         // -- 生产日期 --
        { ai: "13", width: 6 },         // -- 包装日期 --
        { ai: "17", width: 6 },         // -- 产品效期 --
        { ai: "21", width: 0 },         // -- 序列号 --
        { ai: "91", width: 0 }          // -- 企业内部编码 --
    ];

    let barcodes = barcodeString;
    let LF = String.fromCharCode(10);   // -- 换行符(\n) --
    let GS = String.fromCharCode(29);   // -- 分组符 --    
    let GSs = [LF, GS, "(GS)", "[GS]", "{GS}"];

    for (let i = 0; i < GSs.length; i++) {
        barcodes = barcodeString.replaceAll(GSs[i], GS);
    }
    barcodes = barcodes.split(GS);

    for (let i = 0; i < barcodes.length; i++) {
        let barcode = barcodes[i];
        while (barcode.length > 3) {
            let aiFind = "", start = 0, end = 0;
            for (let j = 0; j < rules.length; j++) {
                let ai = rules[j].ai;
                let width = rules[j].width;

                if (barcode.startsWith(ai) || barcode.startsWith("(" + ai + ")")) {
                    aiFind = ai;
                    start = ai.length + (barcode.startsWith("(" + ai + ")") ? 2 : 0);
                    if (width != 0) {
                        end = start + width;
                    }
                    if (end > 0) {
                        ais[aiFind] = barcode.substring(start, end);
                        barcode = barcode.substring(end);
                    }
                    else {
                        ais[aiFind] = barcode.substring(start);
                        barcode = "";
                    }
                    if (aiFind.equals("11") || aiFind.equals("13") || aiFind.equals("17")) {
                        if (ais[aiFind].length == 6) {
                            ais[aiFind] = ais[aiFind].toDateByFromat("yyMMdd").toString("yyyy-MM-dd");
                        }
                    }
                    break;
                }
            }

            if (aiFind.equals("")) break;
        }
    }
    return ais;
};
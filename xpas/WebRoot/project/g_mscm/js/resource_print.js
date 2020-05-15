var PrintService = {};
PrintService.printSN = function (printSource, preview) {
    /*
    *可以传入Datatable，或者DataRow数组，必须包含下列字段
    *pack_id,sn_count，sn_no，manufacturer_name，material_name，material_spec，remark,valid_date(有效期），valid_date2（灭菌有效期），sp_name,disinfection_date（灭菌日期）
    *定数包传入数量qty
    */
    var drs = new Array();
    if (printSource && printSource.rowCount) {
        for (var i = 0; i < printSource.rowCount; i++) {
            drs.push(printSource.rows[i]);
        }
    } else {
        drs = printSource;
    }
    if (drs.length < 1) return;
    openExcel("c:\\spd2\\sn.xls");
    // openExcel("c:\\spd2\\sn-nj.xls");
    ExcelApp.WindowState = -4140;   // -- 最小化 --

    var rowsPerPage = 8;
    var curPage = 0;
    for (var i = 0; i < drs.length; i++) {
        for (j = 0; j < drs[i]["sn_count"].value; j++) {
            if (curPage > 0) {
                addPageBreaks(curPage * rowsPerPage);
                oWorkSheet.Rows("1:" + (rowsPerPage)).Select();
                ExcelApp.Selection.Copy();
                oWorkSheet.Rows((curPage * rowsPerPage + 1) + ":" + (curPage * rowsPerPage + 1)).Select();
                oWorkbook.ActiveSheet.Paste();
            }
            var categoryCode = "";
            if (drs[i]["category_code"]) {
                categoryCode = drs[i]["category_code"].value;
                if (!categoryCode.equals("")) {
                    categoryCode += "-";
                }
            }
            out("A", 1 + curPage * rowsPerPage, getCode128(drs[i]["sn_no"].value));
            out("A", 2 + curPage * rowsPerPage, categoryCode + drs[i]["sn_no"].value + "    (" + drs[i]["sn_count"].value + "-" + (j + 1) + ")");

            out("B", 3 + curPage * rowsPerPage, drs[i]["manufacturer_name"].value);

            out("B", 4 + curPage * rowsPerPage, drs[i]["sp_name"].value);
            out("B", 5 + curPage * rowsPerPage, drs[i]["disinfection_date"].value.substring(0, 10) + " 效期 " + drs[i]["valid_date2"].value);
            out("B", 6 + curPage * rowsPerPage, drs[i]["material_name"].value);
            if (drs[i]["pack_id"].value == "0") {
                out("A", 6 + curPage * rowsPerPage, "耗材名称");
                out("A", 7 + curPage * rowsPerPage, "规格型号");
                out("B", 7 + curPage * rowsPerPage, drs[i]["material_spec"].value + " " + drs[i]["remark"].value);
            } else if (drs[i]["pack_id"].value == "-2") {
                out("A", 6 + curPage * rowsPerPage, "耗材名称");
                out("A", 7 + curPage * rowsPerPage, "品规数量");
                out("B", 7 + curPage * rowsPerPage, drs[i]["material_spec"].value + " " + drs[i]["qty"].value);
            } else {
                out("A", 6 + curPage * rowsPerPage, "手 术 包");
                out("A", 7 + curPage * rowsPerPage, "描    述");
                out("B", 7 + curPage * rowsPerPage, drs[i]["remark"].value);
            }
            //out("B", 5 + curPage * rowsPerPage, drs[i]["remark"].value);


            curPage++;
        }
    }

    PrintService.finishPrint(preview, "sn");
}
PrintService.printASN = function (asnId, preview) {
    /*
    *传入通知单单ID
    */
    if (g.a.send("processType=g_mscm.asn.ResourcePrint&actionType=getASN", { asnId: asnId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbASN = cReturn.dtbASN;
            var dtbASNDtl = cReturn.dtbASNDtl;
            // --------------------
            openExcel("c:\\spd2\\asn.xls", true);
            var rptTitle = "发货单";
            out("A", 1, rptTitle);
            out("H", 1, getCode128(dtbASN.rows[0]["asn_key"].value));
            out("H", 2, dtbASN.rows[0]["asn_key"].value);

            out("J", 3, dtbASN.rows[0]["asn_date"].value.substring(0, 10));

            // --------------------
            var nRowBegin = 5, nRowNo = 0, packId = 0, prePack = 0;
            var nRowCount = dtbASNDtl.rowCount;
            var drRow = null;
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                nRowNo = nRowBegin + iRow;
                drRow = dtbASNDtl.rows[iRow];

                if (nRowNo > 26) {
                    copyRow(nRowNo - 1);
                }

                out("A", nRowNo, (iRow + 1));
                out("B", nRowNo, drRow["matr_name"].value);
                out("C", nRowNo, drRow["matr_spec"].value);
                //out("D", nRowNo, drRow["manufacturer_name"].value);

                out("F", nRowNo, drRow["lot"].value);
                out("G", nRowNo, drRow["exp_date"].value.substring(0, 10));
                out("H", nRowNo, drRow["qty"].value);
                out("I", nRowNo, drRow["matr_unit"].value);
                //out("J", nRowNo, drRow["storage_fullname"].value);
            }
            // --------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);
        }
    }
}

var _colName = ["A", "H", "Q"];
function copyLastRow(nRow) {
    oWorkSheet.Rows(nRow + ":" + nRow).Select();
    ExcelApp.Selection.Copy();
    oWorkSheet.Rows((nRow + 1) + ":" + (nRow + 1)).Select();
    oWorkbook.ActiveSheet.Paste();
    ExcelApp.CutCopyMode = false;   //-- 清除剪贴板 --
}
//完成打印
PrintService.finishPrint = function (preview, printerType, canSave) {
    //ExcelApp.Visible = true;
    //return;
    setActivePrinter(printerType);
    if (preview) {
        ExcelApp.Visible = true;
        if (canSave) {
            return;
        }
        oWorkbook.PrintPreview();
    } else {
        oWorkbook.PrintOut();
    }
    oWorkbook.Close();
    ExcelApp.Quit();
    ExcelApp = null;
    setTimeout(CollectGarbage, 1000);
}
function setActivePrinter(printerType) {
    var snPrinter = getLocalItem("SPD2_SNPrinter");
    var rptPrinter = getLocalItem("SPD2_RptPrinter");
    var targetPrinter = "";
    if (printerType && printerType.equals("sn")) {
        targetPrinter = snPrinter;
    } else {
        targetPrinter = rptPrinter;
    }
    if (targetPrinter.length > 0) {
        try {
            ExcelApp.ActivePrinter = targetPrinter;
        } catch (e) {
            showErr("设置的打印机不存在，请重新在“工位设置”里设置！");
        }
    }
}
PrintService.cashUpper = function (num) {
    var strOutput = "";
    var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    num += "00";
    var intPos = num.indexOf('.');
    if (intPos >= 0)
        num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
    strUnit = strUnit.substr(strUnit.length - num.length);
    for (var i = 0; i < num.length; i++)
        strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
}


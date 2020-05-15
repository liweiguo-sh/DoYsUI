var ExcelApp, oWorkbook, oWorkSheet;
//-------------------------------------------------------------------------
function openExcel(urlFile, visibleFalse) {
    try {
        ExcelApp = new ActiveXObject("Excel.Application");
        ExcelApp.DisplayAlerts = false;
        if (visibleFalse) {

        }
        else {
            ExcelApp.Visible = true;
        }
        // ExcelApp.WindowState = -4140;   // -- 最小化 --

        oWorkbook = ExcelApp.Workbooks.Open(urlFile);
        oWorkSheet = oWorkbook.Sheets(1);
        oWorkSheet.Activate();
        // -- oWorkSheet.Select();
    }
    catch (e) {
        alert("调用Excel应用程序失败。请检查：\n1、是否IE浏览器(Excel功能只支持IE浏览器)；\n2、是否做过IE初始化工作(系统登录界面下载IE初始化文件)；\n3、地址栏中的服务器地址是否已加入到浏览器的信任站点中；\n4、客户端是否已安装 MS Office Excel 2003 或以上的任意版本。\n\n" + e.toString());
        try {
            if (oWorkbook != null) {
                oWorkbook.Close();
                oWorkbook = null;
            }
        }
        catch (e1) {
        }

        try {
            if (ExcelApp != null) {
                ExcelApp.Quit();
                ExcelApp = null;
            }
        }
        catch (e1) {
        }
    }
}
function closeExcel() {
    try {
        if (oWorkSheet != null) {
            oWorkSheet = null;
        }

        if (oWorkbook != null) {
            oWorkbook.Close();
            oWorkbook = null;
        }

        if (ExcelApp != null) {
            ExcelApp.Quit();
            ExcelApp = null;
        }
    }
    catch (e) {
        alert("关闭Excel过程出现意外错误，必要时请关闭浏览器。\n\n" + e.toString());
    }
}

function out(ColKey, nRow, Value) {
    var nCol = getColIndex(ColKey);
    oWorkSheet.Cells(nRow, nCol) = Value;
}
function getColIndex(ColKey) {
    var nCol = 0;

    ColKey = ColKey.toUpperCase();
    if (ColKey.length == 1) {
        nCol = ColKey.charCodeAt() - 64;
    }
    else if (ColKey.length == 2) {
        nCol = 65 * ColKey.substring(0, 1).charCodeAt() + ColKey.substring(1, 2).charCodeAt() - 64;
    }
    else {
        alert("列参数错误。");
        return 0;
    }
    return nCol;
}
function getColKey(nCol) {
    var colKey = "";
    colKey = String.fromCharCode(64 + nCol);
    return colKey;
}

function copyRow(rowCopy, rowPaste) {
    // -- rowCopy：被拷贝行(原数据行) --
    // -- rowPaste：插入行行号(粘贴后的新数据行行号)，默认为被拷贝行的下一行 --
    rowPaste = rowPaste || rowCopy + 1;
    oWorkSheet.Rows(rowCopy + ":" + rowCopy).Select();
    ExcelApp.Selection.Copy();

    oWorkSheet.Rows(rowPaste + ":" + rowPaste).Select();
    ExcelApp.Selection.Insert();
    ExcelApp.CutCopyMode = false;   //-- 清除剪贴板 --
}
function copyRows(rowBegin, rowEnd, rowPaste) {
    // -- rowBegin：被拷贝的起始行(原数据起始行) --
    // -- rowEnd：  被拷贝的结束行(原数据结束行) --
    // -- rowPaste：插入行行号(粘贴后的新数据行行号)，默认为被拷贝结束行的下一行 --
    rowPaste = rowPaste || rowEnd + 1;
    oWorkSheet.Rows(rowBegin + ":" + rowEnd).Select();
    ExcelApp.Selection.Copy();

    oWorkSheet.Rows(rowPaste + ":" + rowPaste).Select();
    ExcelApp.Selection.Insert();

    ExcelApp.CutCopyMode = false;   //-- 清除剪贴板 --
}
function copyPage(rowFrom, rowTo, rowNew) {
    // -- 拷贝整页，自动插入分页符 --
    oWorkSheet.Rows(rowFrom + ":" + rowTo).Select();
    ExcelApp.Selection.Copy();

    oWorkSheet.Rows((rowNew) + ":" + (rowNew)).Select();
    oWorkSheet.HPageBreaks.Add(ExcelApp.ActiveCell)
    ExcelApp.Selection.Insert();
    ExcelApp.CutCopyMode = false;   //-- 清除剪贴板 --
}
function mergeCell(ColBegin, nRowBegin, ColEnd, nRowEnd, horizontalAlignment) {
    oWorkSheet.Range(ColBegin + nRowBegin + ":" + ColEnd + nRowEnd).Select();
    if (horizontalAlignment) ExcelApp.Selection.HorizontalAlignment = horizontalAlignment;
    ExcelApp.Selection.Merge();
}

function WriteTable(C1, R1, C2, R2, bAutoFit) {
    var oRange;
    //-- 1、Step, 选中表格区域,设置表格属性:字体/行号/换行/居中 --
    oRange = oWorkSheet.Range(C1 + R1 + ":" + C2 + R2);
    oRange.Select
    //-- 2、Step, 画表格线 ----------------------------
    //-- xlEdgeTop ------------------------------------
    oRange.Borders(8).LineStyle = 1       //-- xlContinuous --
    oRange.Borders(8).Weight = 2          //-- xlThin --
    oRange.Borders(8).ColorIndex = -4105  //-- xlAutomatic --

    //-- xlEdgeLeft -----------------------------------
    oRange.Borders(7).LineStyle = 1
    oRange.Borders(7).Weight = 2
    oRange.Borders(7).ColorIndex = -4105

    //-- xlEdgeRight ----------------------------------
    oRange.Borders(10).LineStyle = 1
    oRange.Borders(10).Weight = 2
    oRange.Borders(10).ColorIndex = -4105

    //-- xlEdgeBottom ---------------------------------
    oRange.Borders(9).LineStyle = 1
    oRange.Borders(9).Weight = 2
    oRange.Borders(9).ColorIndex = -4105

    //-- xlInsideVertical -----------------------------
    oRange.Borders(11).LineStyle = 1
    oRange.Borders(11).Weight = 2
    oRange.Borders(11).ColorIndex = -4105

    //-- xlInsideHorizontal ---------------------------
    if (oRange.Rows.Count > 1) {
        oRange.Borders(12).LineStyle = 1
        oRange.Borders(12).Weight = 2
        oRange.Borders(12).ColorIndex = -4105
    }
    //-- 3、Step, 全选处理 ----------------------------
    if (bAutoFit) {
        oWorkSheet.Cells.Select;
        oWorkSheet.Cells.EntireColumn.AutoFit;
    }
    oWorkSheet.Range("A1:A1").Select;
}
function addPageBreaks(nRow) {
    // -- 插入到nRow行后面(即nRow行在当前页，nRow行以后的行在新一页) --
    oWorkSheet.Rows((nRow + 1) + ":" + (nRow + 1)).Select();
    oWorkSheet.HPageBreaks.Add(ExcelApp.ActiveCell);
}
function ProtectWorksheet(para) {
    var paraProtect = {
        password: Math.random()
    };
    paraProtect = g.x.extendJSON(paraProtect, para);
    oWorkSheet.Protect(paraProtect.password, false, true, false, false, true, true, true, false, false, false, false, false, true, true, true);
}
// -- WorkSheet数据转换为数组 -------------------------------------------------
function workSheetToArray() {
    var nColCount = 0;
    var fieldValue = "", rowValue = "";

    var arrRow = new Array();
    var arrSheet = new Array();
    var cn = null, rs = null;
    // ------------------------------------------------------------------------
    try {
        cn = new ActiveXObject("ADODB.Connection");
        cn.Open("DSN=Excel Files;DBQ=" + oWorkbook.FullName);
        // -- cn.Open("Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};DBQ=" + oWorkbook.FullName); --

        rs = new ActiveXObject("ADODB.RecordSet");
        rs.Open("SELECT * FROM [" + oWorkSheet.Name + "$]", cn, 3, 3, 1);

        nColCount = rs.Fields.Count;
        while (!rs.EOF) {
            for (var i = 0; i < nColCount; i++) {
                fieldValue = rs.Fields(i).Value;
                if ((typeof (fieldValue)).equals("date")) {
                    fieldValue = new Date(fieldValue).toString("yyyy-MM-dd HH:mm:ss");
                }
                else if ((typeof (fieldValue)).equals("string")) {
                    fieldValue = fieldValue.trim();
                }
                arrRow[i] = fieldValue;
            }

            rowValue = arrRow.join(g.c.CHAR2);
            arrSheet.push(rowValue);
            rs.MoveNext();
        }
    }
    catch (e) {
        alert("WorkSheet转换为数组过程出现意外错误。\n\n" + e.toString());
        return null;
    }
    finally {
        if (rs) {
            rs.Close();
        }
        if (cn) {
            cn.Close();
        }
    }
    return arrSheet;
}
function workSheetToDatatable(para) {
    var nColCount = 0, iRowIndex = 0;
    var fieldValue = "";

    var cn = null, rs = null;
    var dtb = new xwf_datatable();
    // ------------------------------------------------------------------------
    try {
        cn = new ActiveXObject("ADODB.Connection");
        if (para && para.fileName) {
            cn.Open("DSN=Excel Files;DBQ=" + para.fileName);
        }
        else {
            cn.Open("DSN=Excel Files;DBQ=" + oWorkbook.FullName);
        }
        // -- cn.Open("Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};DBQ=" + oWorkbook.FullName); --

        rs = new ActiveXObject("ADODB.RecordSet");
        if (para && para.sheetName) {
            rs.Open("SELECT * FROM [" + para.sheetName + "$]", cn, 3, 3, 1);
        }
        else {
            rs.Open("SELECT * FROM [" + oWorkSheet.Name + "$]", cn, 3, 3, 1);
        }

        nColCount = rs.Fields.Count;
        for (var iCol = 0; iCol < nColCount; iCol++) {
            var dataType = "varchar";
            var columnType = "string";
            if (rs.Fields(iCol).Type == 5) {
                dataType = "number";
                columnType = "number";
            }
            else if (rs.Fields(iCol).Type == 135) {
                dataType = "datetime";
                columnType = "datetime";
            }
            dtb.addColumn({ name: rs.Fields(iCol).Name, dataType: dataType, columnType: columnType });
        }
        while (!rs.EOF) {
            dtb.addRow();
            for (var i = 0; i < nColCount; i++) {
                fieldValue = rs.Fields(i).Value;
                if ((typeof (fieldValue)).equals("date")) {
                    fieldValue = new Date(fieldValue).toString("yyyy-MM-dd HH:mm:ss");
                }
                else if ((typeof (fieldValue)).equals("string")) {
                    fieldValue = fieldValue.trim();
                }
                dtb.rows[iRowIndex][i].value = fieldValue;
            }
            iRowIndex++;
            rs.MoveNext();
        }
    }
    catch (e) {
        alert("WorkSheet转换为Datatable过程出现意外错误。\n\n" + e.toString());
        return null;
    }
    finally {
        if (rs) {
            rs.Close();
        }
        if (cn) {
            cn.Close();
        }
    }
    return dtb;
}

function csvToDataTable(jsonParameter) {
    var jsonPara = {
        fileName: "",       // -- Fullname(csvFile Path and Name) --
        hasHeadRow: true,   // -- 是否有标题行 --
        separator: ","      // -- 分隔符 --
    };
    jsonPara = g.x.extendJSON(jsonPara, jsonParameter);

    var nRowIndex = 0, nColCount = 0, nCol = 0;
    var strLine = "";
    var arrRow = new Array();
    var fso = null, file = null;
    var dtb = new xwf_datatable();
    // ----------------------------------------------------
    try {
        fso = new ActiveXObject("Scripting.FileSystemObject");
        file = fso.OpenTextFile(jsonPara.fileName, 1);
        if (file.AtEndOfStream) return null;   // -- 空文件 --
    }
    catch (e) {
        alert("读取csv文件失败。请检查：\n1、地址栏中的服务器地址是否已加入到浏览器的信任站点中；\n\n" + e.toString());
        return;
    }
    // ----------------------------------------------------
    strLine = file.ReadLine();
    arrRow = strLine.split(jsonPara.separator);
    for (nCol = 0; nCol < arrRow.length; nCol++) {
        if (jsonPara.hasHeadRow) {
            dtb.addColumn({ name: arrRow[nCol] });
        }
        else {
            dtb.addColumn({ name: getColKey(nCol + 1) });
        }
    }
    // ----------------------------------------------------
    while (!file.AtEndOfStream) {
        if (nRowIndex == 0) {
            if (jsonPara.hasHeadRow) {
                strLine = file.ReadLine();
            }
        }
        else {
            strLine = file.ReadLine();
        }
        arrRow = strLine.split(jsonPara.separator);

        dtb.addRow();
        nRowIndex = dtb.rowCount - 1;
        for (nCol = 0; nCol < dtb.columnCount && nCol < arrRow.length; nCol++) {
            dtb.rows[nRowIndex][nCol].value = arrRow[nCol];
        }
    }
    // ----------------------------------------------------
    file.close();
    file = null;
    fso = null;

    return dtb;
}

// -- Code128字体函数 ---------------------------------------------------------
function getCode128(str128, ABC) {
    var Start = 0, StartA = 103, StartB = 104, StartC = 105, Stop = 106;
    var id = 0, checksum = 0, checkbit = 0;

    var code128B = "", char1 = "";
    // -- 1. 预处理 ---------------------------------------
    if (!ABC) ABC = "A";    // -- B验证过，A没验证过，应该没问题，C尚未实现，暂不能用 --
    if (ABC.equals("A")) str128 = str128.toUpperCase();
    Start = ABC.equals("A") ? StartA : (ABC.equals("B") ? StartB : StartC);
    checksum = Start;

    // -- 2. 计算校验位------------------------------------
    if (!ABC.equals("C")) {
        for (var i = 1; i <= str128.length; i++) {
            char1 = str128.substring(i - 1, i);
            id = (char1.charCodeAt() - 32);
            checksum += i * id;
        }
    }
    else {
        return str128;
    }
    checkbit = checksum % 103;
    if (checkbit <= 94) {
        checkbit = checkbit + 32;
    }
    else {  // -- 校验位 >= 127(95 + 32 = 127)时，系统会"吃"掉它们(连带休止符) 。字体设置时,个别字模被定义了2个值。观察字体文件时能发现??? --
        checkbit = checkbit + 100;
    }

    // -- 3. 拼接128码起始位 ------------------------------
    code128 = String.fromCharCode(Start + 100) + str128 + String.fromCharCode(checkbit) + String.fromCharCode(Stop + 100);
    return code128;
}
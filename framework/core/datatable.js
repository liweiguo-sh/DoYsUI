/*
* xwf.datatable JavaScript Library v1.0
* Author: Volant Lee
* Create Date: 2012-12-21
* Modify Date: 2015-08-13
* Copyright 2012, http://www.xznext.com/
* Description: DataTable 
* 特别说明：js排序是按照拼音排序，结果和SQL Server有可能不一致，使用时要慎重。
*           例如多音字“瞿qu,ju”，js认为念“qu”，SQL Server认为念“ju”。
*           类似问题java版datatable尚未测试。
*/

// -- 类定义 ------------------------------------------------------------------
window.datatable = function () {
    ///<summary>JavaScript版DataTable, 用法参考.net版DataTable。
    ///主要功能：sort、find、filter、addnew、update、delete。
    ///取值：= dtb.rows[i]["字段名"].value；赋值：dtb.rows[i]["字段名"].value = VALUE。
    ///</summary>
    this.rows = new Array();
    this.columns = new Array();
    this.sortColumns = new Array();
};
window.datatable.prototype = {
    rows: new Array(),                  // -- 记录集数组 --
    unFilterRows: new Array(),          // -- rows集合副本，全部记录集数组(rows可能因为filter改变) --
    columns: new Array(),               // -- 字段集数组 --
    rowCount: 0,                        // -- 记录集记录条数 --
    columnCount: 0,                     // -- 记录集字段个数 --
    sortColumns: new Array(),           // -- 排序列数组集合 --
    firstPos: -1,                       // -- Find方法返回的  第一个元素下标 --
    lastPos: -1,                        // -- Find方法返回的最后一个元素下标 --
    // ----------------------------------------------------
    summary: function () {
        var strSummary = "JavaScript实现datatable, 用法参考.net DataTable.";
        return strSummary;
    }
};

//-- 初始化数据，基础方法 -----------------------------------------------------
window.datatable.prototype.addColumn = function (jsonColumn) {
    var jsonCol = {
        colIndex: this.columnCount,
        name: "column_" + (1 + this.columnCount),
        dataType: "varchar",
        columnType: "string"
    };

    for (var key in jsonColumn) {
        jsonCol[key] = jsonColumn[key];
    }
    this.columns.push(jsonCol);
    this.columns[jsonCol.name] = this.columns[this.columns.length - 1];
    this.columnCount = this.columns.length;

    // -- 将字段扩展到所有行 ------------------------------
    for (var iRow = 0; iRow < this.rowCount; iRow++) {
        if (jsonCol.columnType.equals("number")) {
            this.rows[iRow][jsonCol.colIndex] = { value: null };
        }
        else if (jsonCol.columnType.equals("datetime")) {
            this.rows[iRow][jsonCol.colIndex] = { value: new Date() };
        }
        else {
            this.rows[iRow][jsonCol.colIndex] = { value: "" };
        }
        this.rows[iRow][jsonCol.name] = this.rows[iRow][jsonCol.colIndex];
    }
};

window.datatable.prototype.readFromData = function (fieldString, dataString) {
    ///<summary>初始化datatable数据</summary>
    ///<param name="dataString"> datatable数据集字符串</param>
    ///<param name="fieldString">datatable字段集字符串</param>
    // -- 初始化字段集 ----------------
    this.columns = fieldString.split(g.c.CHAR1);
    this.columnCount = this.columns.length;
    for (var iCol = 0; iCol < this.columnCount; iCol++) {
        var objCol = { colIndex: iCol };
        var arrProps = this.columns[iCol].split(g.c.CHAR2);
        for (var iProp = 0; iProp < arrProps.length; iProp++) {
            var arrProp = arrProps[iProp].split(g.c.CHAR3);
            objCol[arrProp[0]] = arrProp[1];
        }
        this.columns[iCol] = objCol;
        this.columns[objCol.name] = this.columns[iCol];
    }
    //-- 初始化数据集 -----------------
    this.rows = dataString.split(g.c.CHAR1);
    this.rowCount = (dataString == "" ? 0 : this.rows.length);
    for (var iRow = 0; iRow < this.rowCount; iRow++) {
        var arrRows = this.rows[iRow].split(g.c.CHAR2);
        var objRow = { $: "" };     // -- N: 添加, U:修改, D:删除 --
        var columnType = "", dataValue = null;
        for (var iCol = 0; iCol < this.columnCount; iCol++) {
            if (this.columns[iCol].name.equals("cdate")) {
                console.log("here");
            }
            columnType = this.columns[iCol].columnType;
            dataValue = arrRows[iCol];
            if (dataValue != "") {
                if (columnType.equals("number")) {
                    let dataType = this.columns[iCol].dataType;
                    if (dataType.equals("tinyint")) {
                        dataValue = (dataValue != null && dataValue.equals("1"));
                    }
                    else {
                        dataValue = isNaN(dataValue) ? null : parseFloat(dataValue);
                    }
                }
                else if (columnType.equals("datetime")) {
                    // -- dataValue = dataValue.substring(0, 10);
                    dataValue = dataValue.substring(0, 19);
                }
                else if (dataValue == "null") {
                    dataValue = "";
                }
            }

            objRow[iCol] = { value: dataValue };
            objRow[this.columns[iCol].name] = objRow[iCol];
        }
        this.rows[iRow] = objRow;
    }
    //-- 5、End -------------------------------------------
    return true;
};
window.datatable.prototype.readFromString = function (strDataSource) {
    ///<summary>通过特定字符串初始化记录集</summary>
    ///<param name="strDataSource">strDataSource数据集字符串，样例：[['gender_code','gender_name'], ['M','男'], ['F','女']]</param>    
    var arrTemp = new Array();
    var arrRows = eval(strDataSource);

    // -- 1. 初始化列 -------------------------------------
    if (arrRows.length < 1) return;
    if (arrRows[0].length == 0) {
        if (arrRows.length < 2) {
            // -- 没有提供列名，并且没有提供数据 --
            return;
        }
        for (var i = 0; i < arrRows[1].length; i++) {
            this.addColumn({ name: "column_" + (i + 1) });
        }
    }
    else {
        for (var i = 0; i < arrRows[0].length; i++) {
            this.addColumn({ name: arrRows[0][i] });
        }
    }

    // -- 2. 初始化数据 -----------------------------------
    for (var iRow = 1; iRow < arrRows.length; iRow++) {
        var arrRowData = eval(arrRows[iRow]);
        this.addRow();
        for (var iCol = 0; iCol < this.columnCount; iCol++) {
            this.rows[iRow - 1][iCol].value = arrRowData[iCol];
        }
    }
};
window.datatable.prototype.getColIndex = function (columnName) {
    ///<summary>得到字段列下标。</summary>
    ///<param name="columnName">字段名称</param>
    ///<returns type="int" />
    for (var i = 0; i < this.columns.length; i++) {
        var _columnName = this.columns[i].name;
        if (_columnName.equals(columnName)) {
            return i;
        }
    }
    return -1;
};
window.datatable.prototype.getColName = function (columnIndexOrName) {
    ///<summary>得到字段列名。常规用法：参数为数字下标，从0开始；非常规用法：参数为大小写可能不同的字段名称。</summary>
    ///<param name="columnNameOrIndex">字段下标或字段名称</param>
    ///<returns type="string" />
    if (isNaN(columnIndexOrName)) {
        for (var i = 0; i < this.columns.length; i++) {
            var _columnName = this.columns[i].name;
            if (_columnName.equals(columnIndexOrName)) {
                return _columnName;
            }
        }
        return "";
    }
    else {
        return this.columns[columnIndexOrName].name;
    }
};

window.datatable.prototype.close = function () {
    ///<summary>关闭datatable数据</summary>
    this.rows = null;
    this.columns = null;
    this.sortColumns = null;
};
//-- 排序 ---------------------------------------------------------------------
window.datatable.prototype.sort = function (strColumns) {
    ///<summary>排序，支持多字段排序，参数示例：字段1,  字段2 ASC ,字段3 desc，语法同 SQL 的 ORDER BY，但中文结果有可能不一致。</summary>
    var iIndex = 0;
    var arrColumn = strColumns.trim().split(",");
    for (var i = 0; i < arrColumn.length; i++) {
        arrColumn[i] = arrColumn[i].trim();
        iIndex = arrColumn[i].indexOf(" ");
        if (iIndex > 0) {
            arrColumn[i] = { name: arrColumn[i].substring(0, iIndex), direction: arrColumn[i].substring(iIndex + 1).trim().toUpperCase() };
        }
        else {
            arrColumn[i] = { name: arrColumn[i], direction: "ASC" };
        }

        var colIndex = this.getColIndex(arrColumn[i].name);
        if (colIndex >= 0) {
            arrColumn[i] = g.x.extendJSON(arrColumn[i], this.columns[colIndex]);
        }
        else {
            alert("排序字段[" + arrColumn[i] + "]不存在，请检查。");
            return;
        }
    }
    this.sortColumns = arrColumn;
    this.rows.sort(this._sortFunction(this.sortColumns, this));
};
window.datatable.prototype._sortFunction = function (sortColumns, _this) {
    return function (arr1, arr2) {
        for (var i = 0; i < sortColumns.length; i++) {
            var index = sortColumns[i].colIndex;
            var value1 = arr1[index].value;
            var value2 = arr2[index].value;
            //---------------------------------------------
            var nCompare = _this._sortCompare(value1, value2, sortColumns[i]);
            if (nCompare == 0) {
                continue;
            }
            else {
                return nCompare;
            }
        }
        return 0;
    }
};
window.datatable.prototype._sortCompare = function (value1, value2, objColumn) {
    var nCompare = 0;
    if (objColumn.columnType.equals("number")) {
        if (objColumn.dataType.equals("int")) {
            value1 = parseInt(value1);
            value2 = parseInt(value2);
            nCompare = value1 - value2;
        }
        else {
            value1 = parseFloat(value1);
            value2 = parseFloat(value2);
            nCompare = value1 - value2;
        }
    }
    else if (objColumn.columnType.equals("datetime")) {
        nCompare = value1.compare(value2);
    }
    else if (objColumn.columnType.equals("string")) {
        nCompare = value1.toUpperCase().compare(value2.toUpperCase());
    }
    else {
        alert("不支持排序的字段类型[" + datatype + ", " + objColumn.datatypeDB + "]，请检查。");
    }

    return objColumn.direction.equals("ASC") ? nCompare : -nCompare;
};

//-- 查找、过滤、搜索 ---------------------------------------------------------
window.datatable.prototype.find = function (arrFind) {
    ///<summary>查找，支持多字段查找，基于sort基础之上，未sort的记录集不适用此方法。
    ///如果不是唯一值，返回第一条记录下标，最后一条记录下标通过属性lastPos获得。</summary>
    ///<param name="arrFind">要查找的数据数组，字段顺序与sort方法一致</param>
    ///<returns type="int" />
    if (this.sortColumns.length == 0) {
        alert("记录集未排序，请先调用sort方法。");
        return -1;
    }
    this.firstPos = -1; this.lastPos = -1;

    var left = 0, right = this.rowCount - 1, middle = 0;
    var vFind = null, vData = null, nCompare = 0;
    //-----------------------------------------------------    
    for (var i = 0; i < this.sortColumns.length; i++) {
        var bFirst = false, bLast = false;
        var first = -1, last = -1;          //-- 符合条件的第一个元素位置，符合条件的最后一个元素位置 --
        var one = -1;                       //-- 第一个被找到的符合条件的元素位置(位于符合条件的元素集合区间内) --

        vFind = arrFind[i];
        while (left <= right) {
            if (one == -1) {
                middle = parseInt((left + right) / 2);
            }
            else if (!bFirst) {
                middle = parseInt((left + first) / 2);
                if (middle == first) {
                    bFirst = true;
                    continue;
                }
            }
            else if (!bLast) {
                if (right - last == 1) {
                    middle = right;
                }
                else {
                    middle = parseInt((last + right) / 2);
                }
                if (middle == last) {
                    bLast = true;
                    continue;
                }
            }
            else {
                if (i == this.sortColumns.length - 1) {
                    this.firstPos = first;
                    this.lastPos = last;
                    return first;       //-- ok，找到符合条件的元素集合区间[first-last]，返回区间第一个元素下标 --
                }
                else {
                    break;
                }
            }
            //-------------------------
            vData = this.rows[middle][this.sortColumns[i].colIndex].value;
            var nCompare = this._sortCompare(vFind, vData, this.sortColumns[i]);
            if (one == -1) {
                if (nCompare == 0) {
                    one = middle;
                    first = one;
                    last = one;
                }
                else if (nCompare > 0) {
                    left = middle + 1;
                }
                else {
                    right = middle - 1;
                }
            }
            else if (!bFirst) {
                if (nCompare == 0) {
                    first = middle;
                }
                else {
                    left = middle + 1;
                }
            }
            else {
                if (nCompare == 0) {
                    last = middle;
                }
                else {
                    right = middle - 1;
                }
            }
        }
        //-----------------------------
        if (left <= right) continue;
        return -1;
    }
    return -1;
};
window.datatable.prototype.filter = function (arrFind) {
    ///<summary>通过遍历记录集实现数据过滤，参数形式示例：[[field1,value1], [field2,value2]]。不适合大数据量操作。</summary>
    ///<param name="arrFind">要查找的数据数组</param>
    ///<returns type="Array" />

    var blFind = false;
    var arrResult = new Array();
    // ----------------------------------------------------
    if (this.unFilterRows.length > 0) {    // -- 还原原始记录集 --
        this.rows = this.unFilterRows;
        this.rowCount = this.rows.length;
        if (arrFind == null) {
            this.unFilterRows = new Array();
        }
    }
    else {
        if (arrFind != null && this.rowCount > 0) {
            this.unFilterRows = this.rows;
        }
    }
    if (arrFind == null) return;
    //-- 预处理，字段名称转换为下标 -----------------------
    for (var i = 0; i < arrFind.length; i++) {
        arrFind[i][0] = this.getColIndex(arrFind[i][0]);
    }
    //-----------------------------------------------------
    for (var i = 0; i < this.rowCount; i++) {
        blFind = true;
        for (var j = 0; j < arrFind.length; j++) {
            if (this.rows[i][arrFind[j][0]].value != (arrFind[j][1])) {
                blFind = false;
                break;
            }
        }
        if (blFind) arrResult.push(this.rows[i]);
    }
    //-----------------------------------------------------
    this.rows = arrResult;
    this.rowCount = this.rows.length;

    return arrResult;
};
window.datatable.prototype.search = function (arrSearch, strSearch) {
    ///<summary>模糊查找(相当 like '%%'), 精确查找请用 find 方法, 精确过滤请用 filter 方法。</summary>
    ///<param name="arrSearch">要查找的数据字段列数组</param>
    ///<param name="arrSearch">要查找的数据值</param>
    ///<returns type="Array" />
    strSearch = strSearch.replaceAll("\\|", "\\|").replaceAll("\\\\", "\\\\").replaceAll("\\*", "\\*");

    var strData = "";
    var arrResult = new Array();
    var pattern = new RegExp(strSearch, "i");
    var d1 = new Date();
    for (var iRow = 0; iRow < this.rowCount; iRow++) {
        for (iCol = 0; iCol < arrSearch.length; iCol++) {
            var strData = this.rows[iRow][arrSearch[iCol]].value;
            if (pattern.test(strData)) {
                arrResult.push(iRow);
                break;
            }
        }
    }
    //debug("找到 " + arrResult.length + " 条符合条件的记录。", true);
    //debug("search耗时：" + g.x.timeInterval(d1, new Date()), true);
    return arrResult;
};
window.datatable.prototype.getSelectedRows = function () {
    var arrSelectedRows = new Array();
    for (var i = 0; i < this.rowCount; i++) {
        if (this.rows[i].checked) {
            arrSelectedRows.push(this.rows[i]);
        }
    }
    return arrSelectedRows;
};

//-- 添加、删除记录 -----------------------------------------------------------
window.datatable.prototype.addRow = function (rowIndex) {
    ///<summary>添加新记录行</summary>
    ///<param name="rowIndex">新记录插入位置，默认为尾部</param>
    ///<returns type="dataRow" />
    if (rowIndex == null) {
        rowIndex = this.rowCount;
    }

    var newRow = {};
    for (var i = 0; i < this.columnCount; i++) {
        if (this.columns[i].columnType.equals("number")) {
            newRow[i] = { value: null };
        }
        if (this.columns[i].columnType.equals("datetime")) {
            newRow[i] = { value: new Date() };
        }
        else {
            newRow[i] = { value: "" };
        }
        newRow[this.columns[i].name] = newRow[i];
    }
    this.rows.splice(rowIndex, 0, newRow);
    this.rows[rowIndex].$ = "N";
    this.rowCount++;
    return newRow;
};
window.datatable.prototype.setDataCell = function (rowIndex, colIndex, newValue) {
    ///<summary>修改记录</summary>
    ///<param name="rowIndex">修改记录的位置</param>
    ///<param name="colIndex">修改记录的列下标, 或者字段名</param>
    ///<param name="rowIndex">新值</param>
    ///<returns type="bool" />
    this.rows[rowIndex][colIndex].value = newValue;
    this.rows[rowIndex].$ = "U";
    return true;
};
window.datatable.prototype.removeAt = function (rowIndex) {
    ///<summary>删除指定行下标记录。</summary>
    if (rowIndex < 0 || rowIndex >= this.rowCount) {
        alert("下标越界。");
    }
    this.rows.splice(rowIndex, 1);
    this.rowCount--;
};

// -- 扩展功能：merge/toString etc. -------------------------------------------
window.datatable.prototype.mergeDatatable = function (dtbNew) {
    if (this.columnCount != dtbNew.columnCount) {
        showErr("记录集结构不一致，不能合并。");
        return;
    }
    this.rowCount = Array.prototype.push.apply(this.rows, dtbNew.rows);
};

window.datatable.prototype.toString = function (strBaseFields) {
    ///<summary>类序列化。将记录集转换为字符串, 供服务端使用。</summary>
    var strReturn = "";
    var jsonColumn = {};
    var arrRows = new Array(), arrRow = new Array();
    var arrColumns = new Array(), arrColumn = new Array();
    var arrBaseColumns = new Array();

    for (var iCol = 0; iCol < this.columnCount; iCol++) {
        arrColumn = new Array();
        jsonColumn = this.columns[iCol];
        if (("," + strBaseFields).indexOf("," + jsonColumn.name) >= 0) {
            for (var key in jsonColumn) {
                arrColumn.push(key + g.c.CHAR3 + jsonColumn[key]);
            }
            arrColumns[arrColumns.length] = arrColumn.join(g.c.CHAR2);
            arrBaseColumns.push(jsonColumn.name);
        }
    }

    var nBaseColCount = arrBaseColumns.length;
    for (var i = 0; i < this.rowCount; i++) {
        arrRow = new Array();
        for (var j = 0; j < nBaseColCount; j++) {
            arrRow[j] = this.rows[i][arrBaseColumns[j]].value;
        }
        arrRows[i] = this.rows[i].$ + g.c.CHAR2 + arrRow.join(g.c.CHAR2);
    }
    strReturn = arrColumns.join(g.c.CHAR1) + g.c.CHAR7 + arrRows.join(g.c.CHAR1);
    return strReturn;
};
window.datatable.prototype.toHtmlTable = function (jsonPara) {
    ///<summary>生成HTML表格。</summary>
    var json = g.x.extendJSON({
        tableId: "tbDataTable",
        cssName: "xwf_dtb_table"
    }, jsonPara);

    var arrHtml = new Array();
    // ----------------------------------------------------
    arrHtml.push("<table id='" + json.tableId + "' class='" + json.cssName + "'>");
    arrHtml.push("\t<tr>");
    for (var iCol = 0; iCol < this.columnCount; iCol++) {
        arrHtml.push("\t\t<th>" + this.columns[iCol].name + "</th>");
    }
    arrHtml.push("\t</tr>");
    // ----------------------------------------------------
    for (var iRow = 0; iRow < this.rowCount; iRow++) {
        arrHtml.push("\t<tr class='" + json.cssName + "_trBgColor" + (iRow % 2 == 0 ? "A" : "B") + "'>");
        for (var iCol = 0; iCol < this.columnCount; iCol++) {
            arrHtml.push("\t\t<td>" + this.rows[iRow][iCol].value + "</td>");
        }
        arrHtml.push("\t</tr>");
    }
    arrHtml.push("</table>");
    // ----------------------------------------------------
    return arrHtml.join("\n");
};
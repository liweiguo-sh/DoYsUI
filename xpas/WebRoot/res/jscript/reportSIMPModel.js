/**简单报表 工具类
 * 使用闭包
 */

window.reportSIMPModel = function(prop) {
    if (prop == null) return;
    for (var key in prop) {
        this[key] = prop[key];
    }
    // -- 重新初始化类成员变量，避免类实例间共享 ----------
    this.prefix += this.instanceIndex.index++ + "_";

    return this;
}

window.reportSIMPModel.prototype = {
    prefix: "echart",
    isInit: false, //是否已经初始化,true:是
    isInitData: false, //是否加载过数据
    havePager: false, //是否分页
    tableBox: "", //盒子id
    tableId: "", //表格Id
    leftTree: null, //左侧树
    data: [], //表格数据
    tablecolumns: "", //表格列
    title: null,
    　 //主标题
    titleSub: null,
    　 //副标题
    formId: null, //对应查询表单ｉｄ
    formFields: null, //表单字段列表
    filterSql: null, //sql 过滤条件，需要在ｓｑｌ数据源中提供好％filterSql％　占位符
    treeFilterSql: null, //树过滤条件，如果存在的话会追加到 filterSql
    funGetThs: null, //打印时，追加表头字段的方法,[可无]
    funGetTfooters: null, //打印时，追加表尾字段的方法,[可无]
    funSumTableFun: null, //打印时，汇总函数
    instanceIndex: { index: 0 }, // -- 类实例下标 --
}


//根据formId　控件列表设置查询条件
window.reportSIMPModel.prototype.setFilter = function(expIds) {
    var filterSqlArr = [];
    // filterName="t1.cdate" filterType=">="
    if (this.formId && $("#" + this.formId).length > 0) {
        $("#" + this.formId + " [filter=1]").each(function() {
            var inp = $(this);
            var inpVal = $.trim(inp.val());
            var filterName = inp.attr("filterName");
            var filterOp = inp.attr("filterOp");
            var id = inp.attr("id");
            if (expIds && id.indexOf(expIds) >= 0) return true;
            if (!inpVal || inpVal == "" || !filterName || !filterOp) return true;
            if (filterOp == 'IN' || filterOp == 'in') {
                filterSqlArr.push(filterName + " " + filterOp + " " + "(" + inpVal + ")");
            }else  if (filterOp == 'like') {
                filterSqlArr.push(filterName + " " + filterOp + " '%" + inpVal + "%'");
            } else {
                filterSqlArr.push(filterName + " " + filterOp + " " + "'" + inpVal + "'");
            }
        });
    }
    this.filterSql = null;
    if (filterSqlArr.length > 0) {
        this.filterSql = " (" + filterSqlArr.join(" and ") + " )";
    }
}

//初始化操作，只进行一次
window.reportSIMPModel.prototype.init = function() {
    if (this.isInit) return;
    this.isInit = true;

    //副标题
    if (this.titleSub && $.trim(this.titleSub).length > 0) {
        $("#" + this.tableBox).prepend('<div class="col-md-12 with-padding table-title" style="    font-size: 13px;text-align: center;font-weight: 600;">' + this.titleSub + '</div>');

    };

    //追加主标题，如果存在的话
    if (this.title && $.trim(this.title).length > 0) {
        $("#" + this.tableBox).prepend('<div class="col-md-12 with-padding table-title" style="    font-size: 16px;text-align: center;font-weight: 700;">' + this.title + '</div>');

    };
    //追加表单，如果存在的话
    if (!this.formId || $("#" + this.formId).length < 1) return;

    if (!this.formFields || this.formFields.length < 1) return;
    var ob, filterText, formHtml = [],
        attr = "",
        optionDatas = [],
        optionData, selected, id = "",
        idPre = "filterId",
        isReq = "",
        selectWidth = "150px";
    for (var i = 0; i < this.formFields.length; i++) {
        formHtml.push('<div class="form-group with-padding">');
        ob = this.formFields[i];
        filterText = ob.filterText;
        id = idPre + i;
        if (ob.filterId) id = ob.filterId;
        isReq = "";
        if (ob.isReq && 　ob.isReq　 == true) isReq = "<span style='color:red;'>*</span>";
        selectWidth = "150px";
        if (ob.selectWidth) selectWidth = ob.selectWidth;
        this.formFields[i].id = id;


        attr = ' id="' + id + '" autocomplete="off" data-placeholder="' + filterText + '" filter=1  filterName="' + ob.filterName + '" dateFormat="' + ob.dateFormat + '"  filterOp="' + ob.filterOp + '" filterType="' + ob.filterType + '"   placeholder="' + filterText + '" '

        if (ob.filterType == "select") { //静态下拉框
            formHtml.push('<label  class=" with-padding" >' + filterText + '</label>');
            formHtml.push(' <select ' + attr + ' class="chosen-select-filter chosen-select form-control"  style="width:' + selectWidth + ';">  ');
            optionDatas = ob.optionDatas;
            if (optionDatas && optionDatas.length > 0) {
                for (var j = 0; j < optionDatas.length; j++) {
                    optionData = optionDatas[j];
                    selected = "";
                    if (optionData.selected) {
                        //selected="selected";
                        formHtml.push('<option value="' + optionData.value + '" selected="selected">' + optionData.text + isReq + '</option> ');
                    } else {
                        formHtml.push('<option value="' + optionData.value + '">' + optionData.text + isReq + '</option> ');
                    }
                }

            }
            formHtml.push(' </select> ');
        } else if (ob.filterType == "selectAjax") { //动态下拉框
        	formHtml.push('<label  class=" with-padding" >' + filterText + isReq + '</label>');
            formHtml.push(' <select ' + attr + ' class="chosen-select-filter chosen-select form-control"  style="width:' + selectWidth + ';">  ');
            optionDatas = ob.optionDatas;
            if (optionDatas && optionDatas.length > 0) {
                for (var j = 0; j < optionDatas.length; j++) {
                    optionData = optionDatas[j];
                    selected = "";
                    if (optionData.selected) selected = "selected";
                    formHtml.push('<option value="' + optionData.value + '" selected="' + selected + '">' + optionData.text + '</option> ');
                }
            }
            if (g.a.send("processType=com.xznext.report.EchartModelView&actionType=getSelectAjax", { viewKey: "wi_by_asn", selectAjaxSql: ob.selectAjaxSql }, true)) {
                if (g.a.OK) {
                    var jsonarrstr = g.a.cReturn.jsonarr,
                        arr = [];
                    if (jsonarrstr) arr = eval(jsonarrstr);
                    if (arr && arr.length > 0) {
                        var arrOb;
                        for (var j = 0; j < arr.length; j++) {
                            optionData = arr[j];
                            if (!optionData.key || !optionData.value) continue;
                            selected = "";
                            formHtml.push('<option value="' + optionData.key + '" >' + optionData.value + '</option> ');
                        }
                    }
                    
                }
            }
            formHtml.push(' </select> ');
        } else { //input
            var defaultValue = ob.defaultValue ? ob.defaultValue : "";
            attr += ' value="' + defaultValue + '"';
            formHtml.push('<label  class=" with-padding" >' + filterText + isReq + '</label>');
            formHtml.push('<input   type="text" class="form-control" ' + attr + ' />');
        }

        formHtml.push('</div>');
    }
    $("#" + this.formId).prepend(formHtml.join(""));
    $("#" + this.formId).show();
    //选年份
    $("#" + this.formId + " [dateFormat='yyyy']").datetimepicker({
        format: 'yyyy',
        weekStart: 1,
        autoclose: true,
        startView: 4,
        minView: 4,
        forceParse: false,
        language: 'zh-CN'
    });

    //选年月
    $("#" + this.formId + " [dateFormat='yyyy-mm']").datetimepicker({
        format: 'yyyy-mm',
        weekStart: 1,
        autoclose: true,
        startView: 3,
        minView: 3,
        forceParse: false,
        language: 'zh-CN'
    });

    //选年月日
    $("#" + this.formId + " [dateFormat='yyyy-mm-dd']").datetimepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        todayBtn: true,
        todayHighlight: true,
        startView: 2,
        minView: 2,
        forceParse: false,
        language: 'zh-CN'
    });

    //选年月日 时分秒
    $("#" + this.formId + " [dateFormat='nomarl']").datetimepicker({
        weekStart: 1,
        autoclose: true,
        startView: 2,
        minView: 2,
        forceParse: false,
        language: 'zh-CN'
    });

    $("#" + this.formId + " [dateFormat='yyyy']").prop("readonly", true).css({ "background-color": "#fff", "cursor": "pointer" });
    $("#" + this.formId + " [dateFormat='yyyy-mm']").prop("readonly", true).css({ "background-color": "#fff", "cursor": "pointer" });
    $("#" + this.formId + " [dateFormat='yyyy-mm-dd']").prop("readonly", true).css({ "background-color": "#fff", "cursor": "pointer" });
    $("#" + this.formId + " [dateFormat='nomarl']").prop("readonly", true).css({ "background-color": "#fff", "cursor": "pointer" });


    //下拉框
    $('select.chosen-select-filter').chosen({search_contains: true});


    //左侧树
    if (this.leftTree) {
        $("#leftTreeBox").show();
        $("#tableBox").attr("class", "col-md-10 with-padding");
        this.initLeftTree();
    }


}

//加载左侧树
window.reportSIMPModel.prototype.initLeftTree = function() {
    var rootNodeKey = "";
    var loadTreeNodes = this.leftTree.loadTreeNodes;
    var nodeClick = this.leftTree.nodeClick;
    if (this.leftTree.filterName && this.leftTree.filterOp) {
        var id = "leftTreeBoxFilter";
        if (this.leftTree.filterId) id = this.leftTree.filterId;

        var attr = ' id="' + this.leftTree.filterId + '" autocomplete="off" data-placeholder="' + this.leftTree.filterText;

        attr += '" filter=1  filterName="' + this.leftTree.filterName + '" dateFormat="' + this.leftTree.dateFormat + '"  filterOp="' + this.leftTree.filterOp + '"';
        attr += 'filterType="' + this.leftTree.filterType + '"   placeholder="' + this.leftTree.filterText + '" ';
        //$("#"+this.formId).prepend('<input   type="text" class="form-control" '+attr+' />');
    }

    var tree;
    var jsonPara = {
        divContainer: gId("leftTreeBox"),
        imgPath: "../../../../res/control/tree/" + top.cssStyle + "/",
        title: "",
        beforeExpand: function(node, firstExpand) {
            if (!firstExpand) return;
            this.removeNode(node.key + tree.sd + "loading");
            loadTreeNodes(tree, node);
        },
        nodeClick: nodeClick
    };
    tree = new window.xwf_tree(jsonPara);
    var tableH = window.innerHeight;
    if ($("#" + this.formId).length > 0) tableH = tableH - $("#" + this.formId).outerHeight();

    tableH = tableH - $("#leftTreeBox .treeSearchBox:first").outerHeight() - 20;

    var paddingTop = 0;
    $(".table-title").each(function() {
        paddingTop += $(this).outerHeight();
    })

    $("#leftTreeBox .xwf_tree_divNodes:first").css({ "height": tableH + "px", "overflow": "auto" });
    $("#leftTreeBox").css({ "padding-top": paddingTop + "px" });

    rootNodeKey = "0" + tree.sd + "0";
    var treeRootText = "根节点";
    if (this.leftTree.treeRootText) treeRootText = this.leftTree.treeRootText;

    tree.addNode({ key: rootNodeKey, text: treeRootText, nodeKey: "000" });

    tree.expand(rootNodeKey);

    if (this.leftTree.treeExpandAll) tree.expandAll(rootNodeKey);

}

//加载动态数据源数据
window.reportSIMPModel.prototype.loadElementsByAjax = function() {
    if (!this.formFields || this.formFields.length < 1) return;
    if (!this.check()) return;
    var ob, eleOb, optionDatas = [],
        optionData, selected;
    for (var i = 0; i < this.formFields.length; i++) {
        ob = this.formFields[i];
        if (ob.filterType == "selectAjax") { //动态下拉框
            var filterSql = this.filterSql;
            if (g.a.send("processType=com.xznext.report.EchartModelView&actionType=getSelectAjax", { viewKey: "wi_by_asn", selectAjaxSql: ob.selectAjaxSql, filterSql: filterSql }, true)) {
                if (g.a.OK) {
                    var jsonarrstr = g.a.cReturn.jsonarr,
                        arr = [];
                    if (jsonarrstr) arr = eval(jsonarrstr);
                    var selectHtml = [],
                        eleOb = $("#" + ob.id);
                    optionDatas = ob.optionDatas;
                    if (optionDatas && optionDatas.length > 0) {
                        for (var j = 0; j < optionDatas.length; j++) {
                            optionData = optionDatas[j];
                            selected = "";
                            if (optionData.selected) selected = "selected";
                            selectHtml.push('<option value="' + optionData.value + '" >' + optionData.text + '</option> ');
                        }

                    }
                    if (arr && arr.length > 0) {
                        var arrOb;
                        for (var j = 0; j < arr.length; j++) {
                            optionData = arr[j];
                            if (!optionData.key || !optionData.value) continue;
                            selectHtml.push('<option value="' + optionData.key + '" >' + optionData.value + '</option> ');
                        }
                    }

                    //旧的选中项
                    var selOption = eleOb.children("option:selected"),
                        selVal;
                    if (selOption.length > 0) selVal = selOption.val();

                    eleOb.children("option").remove();
                    eleOb.append(selectHtml.join(""));

                    //重新选中之前的选中项，如果之前的选中项重新加载后存在的话
                    if (selVal && eleOb.children("option[value='" + selVal + "']").length > 0) {
                        eleOb.children("option").removeAttr("selected");
                        eleOb.children("option[value='" + selVal + "']").attr("selected", "selected");
                    }


                    eleOb.trigger("chosen:updated");
                }
            }
        }
    }
}



//检查必须筛选字段是否填过了，true:验证通过
window.reportSIMPModel.prototype.check = function(expIds) {
    var checkRet = true,
        ob, element;
    if(!this.formFields) return true;
    for (var i = 0; i < this.formFields.length; i++) {
        ob = this.formFields[i];
        if (!(ob.isReq && 　ob.isReq　 == true)) continue;
        element = $("#" + ob.id);
        if ($.trim(element.val()) == "") {
            checkRet = false;
            zuiExt.msg({ msg: ob.filterText + "为查询必填项", type: "warning" });
            element.focus();
            window.document.getElementById(ob.id).click()
            break;

        }

    }
    return checkRet;
}

//加载数据
window.reportSIMPModel.prototype.loadData = function() {
    this.init();
    if (!this.check()) {
        if (!this.isInitData) {
            var tableH = window.innerHeight;
            if ($("#" + this.formId).length > 0) tableH = tableH - $("#" + this.formId).outerHeight();
            var param = {
                classes: 'table table-hover',
                height: tableH,
                striped: false,
                columns: this.tablecolumns,
                data: [],
                sortable: true,
                sortOrder: "asc",
                pagination: this.havePager,
                paginationLoop: true,
                onlyInfoPagination: false,
                sidePagination: 'client',
                pageNumber: 1,
                pageSize: 10,
                pageList: [10, 25, 50, 100],
                escape: false, // 转义HTML字符串，替换 &, <,>, ", \`, 和 ' 字符。
                search: false, // 是否启用搜索框
                searchOnEnterKey: false, // 设置为 true时，按回车触发搜索方法，否则自动触发搜索方法。
                strictSearch: false, // 设置为 true启用全匹配搜索，否则为模糊搜索
                searchText: '', // 初始化搜索文字
                showHeader: true, // 是否显示列头
                showFooter: true, // 是否显示列脚
                buttonsAlign: 'auto',
                showExport: false,
                exportDataType: "all",
                exportTypes: ['doc', 'excel']
            };
            $("#" + this.tableId).bootstrapTable(param);
            this.isInitData = true;

        }
        return;
    };
    this.setFilter();

    var filterSqlQuery = this.filterSql;
    if (this.treeFilterSql && this.treeFilterSql.length > 0) {
        if (!filterSqlQuery) filterSqlQuery = "";
        filterSqlQuery += " and (" + this.treeFilterSql + " )";
    }
    console.log("filterSqlQuery")
    console.log(filterSqlQuery)

    var param = {};
    param.viewKey = "wi_by_asn";
    param.reportKey = this.reportKey;
    param.filterSql = filterSqlQuery;
    if (g.a.send("processType=com.xznext.report.EchartModelView&actionType=getDataReportSIMPModel", param, false)) {
        var ret = g.a.cReturn;

        if (g.a.OK) {
            var data = g.a.cReturn.data,
                dataArr = [];
            this.data = data;
            if (data.rowCount) {
                dataArr = this.toarrFromRS(data.rows);
            } else {
                dataArr = [];
            }

            var tableH = window.innerHeight;
            if ($("#" + this.formId).length > 0) tableH = tableH - $("#" + this.formId).outerHeight();
            if ($("#reportNav").length > 0) tableH = tableH - $("#reportNav").outerHeight();

            if (this.isInitData) {
                $("#" + this.tableId).bootstrapTable("load", dataArr);
            } else {
                var param = {
                    classes: 'table table-hover',
                    height: tableH,
                    striped: false,
                    columns: this.tablecolumns,
                    data: dataArr,
                    sortable: true,
                    sortOrder: "asc",
                    pagination: this.havePager,
                    paginationLoop: true,
                    onlyInfoPagination: false,
                    sidePagination: 'client',
                    pageNumber: 1,
                    pageSize: 10,
                    pageList: [10, 25, 50, 100],
                    escape: false, // 转义HTML字符串，替换 &, <,>, ", \`, 和 ' 字符。
                    search: false, // 是否启用搜索框
                    searchOnEnterKey: false, // 设置为 true时，按回车触发搜索方法，否则自动触发搜索方法。
                    strictSearch: false, // 设置为 true启用全匹配搜索，否则为模糊搜索
                    searchText: '', // 初始化搜索文字
                    showHeader: true, // 是否显示列头
                    showFooter: true, // 是否显示列脚
                    buttonsAlign: 'auto',
                    showExport: false,
                    exportDataType: "all",
                    exportTypes: ['doc', 'excel']
                };
                $("#" + this.tableId).bootstrapTable(param);
                this.isInitData = true;

            }
            zuiExt.msg({ msg: "查询成功", type: "success" });
        } else {
            zuiExt.msg({ msg: "报表数据加载失败,原因：" + ret.ErrMessage, type: "danger" });

            return false;
        }
    }
    //this.loadElementsByAjax();
    return true;
}


//加载数据
window.reportSIMPModel.prototype.toarrFromRS = function(arr) {
    var array = [],
        len = arr.length;
    for (var i = 0; i < len; i++) {
        var obj = {};
        Object.keys(arr[i]).forEach(function(key) {
            if (isNaN(key) && key !== '$') {
                obj[key] = arr[i][key].value;
            }
        });
        array.push(obj);
    }
    return array;
}

/**
 * 合并单元格
 * @param data  原始数据（在服务端完成排序）
 * @param fieldName 合并属性名称
 * @param colspan   合并列
 */
window.reportSIMPModel.prototype.mergeCells = function(data, fieldName, colspan) {
    //声明一个map计算相同属性值在data对象出现的次数和
    var sortMap = {};
    for (var i = 0; i < data.length; i++) {
        for (var prop in data[i]) {
            if (prop == fieldName) {
                var key = data[i][prop];
                if (sortMap.hasOwnProperty(key)) {
                    sortMap[key] = sortMap[key] * 1 + 1;
                } else {
                    sortMap[key] = 1;
                }
                break;
            }
        }
    }
    var index = 0;
    for (var prop in sortMap) {
        var count = sortMap[prop] * 1;
        $("#" + this.tableId).bootstrapTable('mergeCells', { index: index, field: fieldName, colspan: colspan, rowspan: count });
        index += count;
    }
}
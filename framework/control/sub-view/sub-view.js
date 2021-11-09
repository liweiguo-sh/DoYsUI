Vue.component('sub-view', {
    data: function () {
        return {
            initialized: false,
            loading: false,                 // -- 正在请求后台数据 --
            elTableHeight: "100%",          // -- el-table高度 --

            viewPk: "",
            flowPks: "",
            controller: "/core/base_view",  // -- 视图后台控制类 --
            dtbView: null,                  // -- sys_view --
            dtbViewField: null,             // -- sys_view_field --            
            dtbViewData: null,              // -- 视图数据记录集 --
            viewBarProps: {
                leftButtons: [],
                rightButtons: [],
                showrefresh: false,
                showSearch: false,
                searchPlaceholder: "quick search ...",
                size: "small",
                type: "primary"
            },
            filterExternal: "",             // -- 外部条件 --
            extUserDef: {},                 // -- 用户自定义参数 --
            allowAddnew: false,             // -- 视图允许添加 --
            detailAlise: "查看",             // -- 查看 --

            showViewBar: false,             // -- ## 顶部工具条 ## --

            dtbFlowNode: null,              // -- ## 导航树 ##--
            showNavArea: false,             // -- 显示导航区 --
            dataFlowNode: [],               // -- 导航树data --
            navAllowAddnew: true,           // -- 当前导航节点允添加新纪录 --

            columnsButton: [],              // -- 扩展按钮列 --
            columnsL: [],                   // -- 左侧固定列 --
            columns: [],                    // -- 中间浮动列 --
            columnsR: [],                   // -- 右侧固定列（element-ui实现上有Bug，暂不支持） --
            viewData: [],
            selectedData: [],               // -- 选中行数据 --
            showSelectColumn: false,
            showDetailColumn: false,
            showDeleteColumn: false,
            showSingleColumn: false,
            totalRows: 0,                   // -- 总记录数 --
            pageRows: 0,                    // -- 当前页记录数 --
            pageNum: 0,                     // -- 当前页号 --
            currentRowIdx: -1,              // -- 当前行下标 --
            quickFields: "",                // -- 快速搜索字段 --            
            filterTreeeFlow: "",            // -- 流程树导航条件 --
            filterQuick: "",                // -- 快速查询条件 --

            vfUrl: "",                      // -- vf窗口URL --
            vfWindowState: "",              // -- vf窗口状态 --
            // -- TODO：此处不可以定义winViewForm，会造成内存泄漏，有待进一步分析原因。后面直接使用没有泄漏问题，很是奇怪 --
            // -- winViewForm: null,        // -- vf编辑窗口 --
            remark: ""
        }
    },
    methods: {
        async init(para) {
            this.initialized = false;
            this.viewPk = para.viewPk;
            this.controller = para.controller || this.controller;
            this.flowPks = para.flowPks || this.flowPks;
            this.filterExternal = para.filter || this.filterExternal;
            this.extUserDef = para.extUserDef || this.extUserDef;
            this.showViewBar = para.showViewBar || this.showViewBar;
            this.viewBarProps = g.x.extendJSON(this.viewBarProps, para.viewBarProps);

            this.vfUrl = para.vfUrl;
            this.vfWindowState = para.vfWindowState || this.vfWindowState;

            let postData = { viewPk: this.viewPk, flowPks: this.flowPks };
            postData = g.x.extendJSON(postData, this.extUserDef);
            await ajax.send(this.controller + "/getViewSchema", postData).then(res => {
                if (res.ok) {
                    this.dtbView = res.dtbView;
                    this.controller = this.dtbView.rows[0]["controller"].value || this.controller;
                    this.allowAddnew = (this.dtbView.rows[0]["allow_addnew"].value == 1);
                    this.detailAlise = this.dtbView.rows[0]["detail_alise"].value || this.detailAlise;

                    this.dtbViewField = res.dtbViewField;
                    this.dtbFlowNode = res.dtbFlowNode;
                    if (this.dtbFlowNode && this.dtbFlowNode.rowCount == 0) {
                        this.dtbFlowNode = null;
                    }
                    this.quickFields = res.dtbView.rows[0]["quick_fields"].value;
                    this.searchPlaceholder = res.dtbView.rows[0]["quick_text"].value;

                    let columnsButton = res.dtbView.rows[0]["button_columns"].value;
                    if (columnsButton && !this.hideButtonColumns) {     // -- hideButtonColumns(true:隐藏扩展按钮列) --
                        this.columnsButton = JSON.parse(columnsButton);
                    }
                    else {
                        this.columnsButton = [];
                    }


                    this.initNavTree();
                    this.initGrid();

                    this.getViewData(0);
                    this.initToolbar();
                    this.resize();
                }
                else {
                    this.$alert(res.error, { type: "error", title: "系统消息 ..." });
                }
                this.initialized = true;
            });

            // -- 后期处理 --
            if (para.showDeleteColumn != undefined) this.showDeleteColumn = para.showDeleteColumn;
        },
        initToolbar() {
            this.showViewBar = this.showViewBar || (this.allowAddnew && this.navAllowAddnew);
            this.viewBarProps.searchPlaceholder = this.searchPlaceholder || "";

            let leftButtons = [];
            if (this.viewBarProps.showRefresh) {
                leftButtons.push({ name: "refresh", text: "刷新", type: this.viewBarProps.type, size: this.viewBarProps.size, icon: "el-icon-refresh" });
            }
            if (this.allowAddnew && this.navAllowAddnew) {
                leftButtons.push({ name: "addnew", text: "添加", type: this.viewBarProps.type, size: this.viewBarProps.size, icon: "el-icon-plus" });
            }

            let rightButtons = [
                { name: "config", text: "配置", type: "danger", icon: "el-icon-share" },
                { name: "export", text: "数据导出", type: "success", icon: "el-icon-download" }
            ]
            this.viewBarProps.leftButtons = leftButtons;
            this.viewBarProps.rightButtons = [];
        },
        initNavTree() {
            if (this.dtbFlowNode == null) return;
            this.showNavArea = true;

            let data = [], nodes = [];
            for (let i = 1; i < this.dtbFlowNode.rowCount; i++) {
                let dataRow = this.dtbFlowNode.rows[i];
                nodes.push({ id: dataRow["node_pk"].value + i, label: dataRow["node_name"].value, dataRow: dataRow });
            }

            let dataRow = this.dtbFlowNode.rows[0];
            this.filterTreeeFlow = dataRow["filter"].value;
            this.navAllowAddnew = (dataRow["allow_addnew"].value == 1);
            data.push({ id: dataRow["flow_pk"].value, label: dataRow["flow_name"].value, dataRow: dataRow, children: nodes });
            this.dataFlowNode = data;

            try {
                // -- TODO: 不生效??? --
                this.$refs.eltree.setCurrentKey(this.dataFlowNode[0].children[0].id);
            }
            catch (e) {
                console.log(e);
            }
        },
        initGrid() {
            let columnsL = [], columns = [];
            this.showSelectColumn = (this.dtbView.rows[0]["show_select"].value == 1);
            this.showDetailColumn = (this.dtbView.rows[0]["show_detail"].value == 1);
            this.showDeleteColumn = (this.dtbView.rows[0]["show_delete"].value == 1);
            this.showSingleColumn = (this.dtbView.rows[0]["show_single"].value == 1);

            for (let i = 0; i < this.dtbViewField.rowCount; i++) {
                let dataRow = this.dtbViewField.rows[i];
                if (dataRow["sequence"].value > 0) {
                    let column = {
                        name: dataRow["name"].value,
                        text: dataRow["text"].value,
                        align: dataRow["align"].value,
                        width: dataRow["width"].value,
                        datatype: dataRow["datatype"].value
                    }

                    if (dataRow["fixed"].value.equals("left")) {
                        columnsL.push(column);
                    }
                    else {
                        columns.push(column);
                    }
                }
            }
            this.columnsL = columnsL;
            this.columns = columns;
        },
        setFilter(filterExternal, jsp = {}) {
            this.filterExternal = filterExternal;
            this.getViewData();

            if (jsp.showDeleteColumn != undefined) this.showDeleteColumn = jsp.showDeleteColumn;
        },

        getViewData(pageNum = 0) {
            this.loading = true;
            if (this.winViewForm) this.winViewForm.close();
            if (pageNum == 0) this.totalRows = 0;

            let postData = { viewPk: this.viewPk, pageNum: pageNum, filter: this.getFilter() };
            postData = g.x.extendJSON(postData, this.extUserDef);
            ajax.send(this.controller + "/getViewData", postData).then(res => {
                if (res.ok) {
                    this.dtbViewData = res.dtbViewData;
                    this.pageRows = this.dtbViewData.rowCount;
                    if (pageNum == 0) {
                        this.pageNum = 1;
                        this.totalRows = res.totalRows;
                    }
                    this.viewData = this.getTableData();
                }
                else {
                    this.$alert(res.error, { type: "error", title: "系统消息 ..." });
                    this.viewData = [];
                }
                this.loading = false;

                if (this.pageRows == 0) {
                    this.currentRowIdx = 0;
                    this.setCurrentRow(-1);
                }
                else {
                    this.currentRowIdx = -1;
                    this.setCurrentRow(0);
                }
                this.emitAfterLoadData();
            });
        },
        getFilter() {
            let arrFilter = new Array();
            // --------------------------------------------
            if (!this.filterExternal.equals("")) {
                arrFilter.push("(" + this.filterExternal + ")");
            }

            if (!this.filterTreeeFlow.equals("")) {
                arrFilter.push("(" + this.filterTreeeFlow + ")");
            }
            if (!this.filterQuick.equals("")) {
                arrFilter.push("(" + this.filterQuick + ")");
            }

            // --------------------------------------------
            if (arrFilter.length > 0) {
                return arrFilter.join(" AND ");
            }
            return "";
        },
        getTableData() {
            let tableData = [];
            let columns = this.dtbViewData.columns;
            let rowCount = this.dtbViewData.rowCount;
            let columnCount = this.dtbViewData.columnCount;

            for (let i = 0; i < rowCount; i++) {
                let dataRow = this.dtbViewData.rows[i];
                let data = [];
                for (let j = 0; j < columnCount; j++) {
                    data[columns[j].name] = dataRow[j].value;
                }
                //data["$dataRow"] = dataRow;
                data["$idx"] = i;

                tableData.push(data);
            }
            return tableData;
        },
        setCurrentRow(rowIdxNew) {
            if (this.currentRowIdx == rowIdxNew) return;

            this.currentRowIdx = rowIdxNew;
            if (rowIdxNew >= 0) {
                this.$refs.eltable.setCurrentRow(this.viewData[rowIdxNew]);
            }
        },

        getNextId() {
            let nextRowIdx = this.currentRowIdx;
            if (this.currentRowIdx < this.dtbViewData.rowCount - 1) {
                nextRowIdx = this.currentRowIdx + 1;
            }
            else if (this.currentRowIdx == 0) {
                return -1;
            }
            else {
                nextRowIdx = this.currentRowIdx - 1;
            }
            return this.dtbViewData.rows[nextRowIdx]["id"].value;
        },

        onBarClick(button) {
            if (button.name.equals("refresh")) {
                this.$refs.viewbar.clearSearch();
                this.filterQuick = "";
                this.getViewData();
            }
            else if (button.name.equals("addnew")) {
                let cancel = false;
                this.$emit("onaddnew", (val) => { cancel = val; });

                if (!cancel) {
                    this.openEditForm("addnew");
                }
            }
            else if (button.name.equals("close")) {
                win.close();
            }
            else {
                this.$message(button.name + ", " + button.text);
            }
        },
        onBarSearch(searchText) {
            if (this.quickFields.equals("")) {
                this.$message("尚未配置快速搜索字段，请检查。");
                return;
            }

            let arrSql = new Array();
            let arrField = this.quickFields.split(",");
            arrField.forEach(value => {
                arrSql.push(value + " LIKE '%" + searchText + "%'");
            });
            this.filterQuick = arrSql.join(" OR ");
            this.getViewData();
        },
        onBarUnsearch() {
            this.filterQuick = "";
            this.getViewData();
        },

        onFlowNodeClick(a, b, c) {
            //console.log(a, b, c);
            this.filterTreeeFlow = a.dataRow["filter"].value;
            this.navAllowAddnew = (a.dataRow["allow_addnew"].value == 1);

            this.getViewData(0);
            this.initToolbar();
        },
        onPageChange(pageNum) {
            this.currentRowIdx = -1;
            this.pageNum = pageNum;
            this.getViewData(pageNum);
        },

        onCellButtonClick(scope, columnType) {
            if (columnType.equals("edit")) {
                this.setCurrentRow(scope.$index);
                this.openEditForm("view");
            }
            else if (columnType.equals("single")) {
                let rowData = this.viewData[scope.$index];
                this.$emit('onsingle', rowData);
            }
            else if (columnType.equals("delete")) {
                this.$confirm("记录删除后不能恢复，确定要执行删除操作吗？", g.c.titleConfirm, {
                    confirmButtonText: "确定", cancelButtonText: "取消", type: "warning"
                }).then(() => {
                    this.deleteRow();
                }).catch(() => {
                    // console.log("取消删除操作");
                })
            }
            else {
                let rowData = this.viewData[scope.$index];
                this.$emit("oncolclick", {
                    name: columnType,
                    rowData: rowData
                });
            }
        },
        openEditForm(firstAction) {
            if (!this.vfUrl) {
                topWin.message("缺少窗口url参数，请检查。");
                return;
            }

            if (this.winViewForm) {
                let para = {
                    dataRowView: this.dtbViewData.rows[this.currentRowIdx]
                };
                this.vf.onViewMove(para);
                return;
            }
            // --------------------------------------------
            var prop = {
                title: this.dtbView.rows[0]["name"].value + " 编辑窗口",
                url: this.vfUrl,
                modal: false,
                parent: win
            };
            if (this.vfWindowState.equals("maximized")) {
                prop.windowState = "maximized";
                prop.noTitle = true;
            }
            let para = {
                viewPk: this.viewPk,
                flowPks: this.flowPks,
                controller: this.controller,
                firstAction: firstAction,
                dtbView: this.dtbView,
                dtbViewField: this.dtbViewField,
                dtbViewData: this.dtbViewData,
                dataRowView: this.dtbViewData.rows[this.currentRowIdx],
                //foreignKey: this.jsonFKey,

                allowAddnew: this.allowAddnew && this.navAllowAddnew,
                view: this
            };

            this.winViewForm = topWin.openWindow(prop, para);
            this.winViewForm.addEventListener("afterClose", () => {
                this.winViewForm = null;
            });
        },
        async deleteRow() {
            // -- before delete --
            let ret = {};
            let para = {};
            this.$emit("before-delete", para, (retJson) => {
                ret = g.x.extendJSON({ cancel: false }, retJson);
            });
            if (ret.cancel) return;

            // -- do delete --
            let form = {};
            for (let i = 0; i < this.dtbViewData.columnCount; i++) {
                let k = this.dtbViewData.columns[i].name;
                let v = this.dtbViewData.rows[this.currentRowIdx][k].value;
                form[k] = v;
            }
            let postData = { viewPk: this.viewPk, id: form.id, idNext: -1, form: form };
            let response = await ajax.send(this.controller + "/delete", postData);
            if (!response.ok) return;

            // -- after delete --
            this.$emit("after-delete", response, (retJson) => {
                ret = g.x.extendJSON({}, retJson);
            });

            this.afterVfDelete();
        },

        emitAfterLoadData() {
            if (this.pageRows > 0) {
                this.$emit("afterloaddata", {
                    pageRows: this.pageRows,
                    rowIndex: 0,
                    rowData: this.getViewData[0],
                    dataRow: this.dtbViewData.rows[0]
                });
            }
            else {
                this.$emit("afterloaddata", {
                    pageRows: 0,
                    rowIndex: -1,
                    rowData: [],
                    dataRow: null
                });
            }
        },
        emitOnRowChange() {
            if (this.pageRows > 0 && this.currentRowIdx >= 0) {
                this.$emit("onrowchange", {
                    pageRows: this.pageRows,
                    rowIndex: this.currentRowIdx,
                    rowData: this.viewData[this.currentRowIdx],
                    dataRow: this.dtbViewData.rows[this.currentRowIdx]
                });
            }
            else {
                this.$emit("onrowchange", {
                    pageRows: 0,
                    rowIndex: -1,
                    rowData: null,
                    dataRow: null
                });
            }
        },

        onCurrentChange(currentRow, oldCurrentRow) {
            if (currentRow == null) {
                if (this.pageRows > 0) {
                    this.setCurrentRow(0);
                    return;
                }
            }

            if (currentRow == null) {
                this.currentRowIdx = -1;
            }
            else {
                this.currentRowIdx = currentRow.$idx;
            }

            this.emitOnRowChange();
        },
        onSelectionChange(val) {
            this.selectedData = val;
        },
        onRowClick(row, col, event) {
            this.$emit("onrowclick", {
                pageRows: this.pageRows,
                rowIndex: this.currentRowIdx,
                rowData: this.viewData[this.currentRowIdx],
                dataRow: this.dtbViewData.rows[this.currentRowIdx]
            });
        },

        onVfMove(moveAction) {
            let rowIdxNew = this.currentRowIdx;
            if (moveAction.equals("first")) {
                rowIdxNew = 0;
            }
            else if (moveAction.equals("previous")) {
                if (this.currentRowIdx > 0) {
                    rowIdxNew = this.currentRowIdx - 1;
                }
            }
            else if (moveAction.equals("next")) {
                if (this.currentRowIdx < this.dtbViewData.rowCount - 1) {
                    rowIdxNew = this.currentRowIdx + 1;
                }
            }
            else {
                rowIdxNew = this.dtbViewData.rowCount - 1;
            }
            this.setCurrentRow(rowIdxNew);

            return this.dtbViewData.rows[this.currentRowIdx];
        },
        afterVfInsert(dataRowView) {
            this.dtbViewData.addRow(0);
            this.dtbViewData.rows[0] = dataRowView;
            for (let i = 0; i < this.dtbViewData.columnCount; i++) {
                //let columnName = this.dtbViewData.columns[i].name;
                //this.dtbViewData.rows[0][columnName] = dataRowView[columnName];
            }

            this.viewData = this.getTableData();
            this.setCurrentRow(0);
        },
        afterVfUpdate(dataRowView) {
            for (let i = 0; i < this.dtbViewData.columnCount; i++) {
                this.dtbViewData.rows[this.currentRowIdx][i].value = dataRowView[i].value;
            }

            this.viewData = this.getTableData();
            this.setCurrentRow(this.currentRowIdx);
        },
        afterVfDelete() {
            let rowIdxNew = this.currentRowIdx;
            if (this.currentRowIdx == this.dtbViewData.rowCount - 1) {
                rowIdxNew = this.currentRowIdx - 1;
            }

            this.dtbViewData.removeAt(this.currentRowIdx);
            this.viewData = this.getTableData();

            if (rowIdxNew >= 0) {
                this.setCurrentRow(rowIdxNew);
                return this.dtbViewData.rows[this.currentRowIdx];
            }
            else {
                return null;
            }
        },

        resize(para) {
            if (para && para.viewHeight) {
                this.viewHeight = para.viewHeight;
            }

            if (this.viewHeight) {
                let height = this.viewHeight;
                if (this.showViewBar) {
                    height = height - 35;       // -- 工具栏 --
                }
                height = height - 50;           // -- 分页栏 --

                this.elTableHeight = height;
            }

            //this.$refs.eltable.doLayout();
            //this.$refs.eltable.debouncedUpdateLayout();
        }
    },

    props: ['viewHeight', 'hideButtonColumns'],
    template: `<el-container>
        <el-header v-show="showViewBar" style="height:45px;padding-left:0px;">
            <sub-view-bar ref="viewbar" @onclick="onBarClick" @onsearch="onBarSearch" @onclear="onBarUnsearch" :attrs="viewBarProps"></sub-view-bar>
        </el-header>
        <el-container>
            <el-aside v-show="showNavArea" width="250px" style="margin:0;padding:0;border-left:solid 2px #ebeef5;border-bottom:solid 2px #ebeef5;border-top:solid 1px #ebeef5;border-right:solid 1px #ebeef5;">
                <el-tree ref="eltree" @node-click="onFlowNodeClick" :data="dataFlowNode" node-key="id" :expand-on-click-node="false" default-expand-all highlight-current></el-tree>
            </el-aside>
            <el-container>
                <el-main style="margin1:0;padding:0;">
                    <el-table ref="eltable" v-loading="loading" @current-change="onCurrentChange" @row-click="onRowClick" @selection-change="onSelectionChange" :data="viewData" :height="elTableHeight" size="small" border stripe highlight-current-row>
                        <el-table-column type="index" label="序" align="center" fixed=""></el-table-column>
                        <el-table-column v-if="showSelectColumn" type="selection" width="45" align="center" fixed="left"></el-table-column>
                        <el-table-column v-if="showDetailColumn" width="60" align="center" label="操作" fixed="left">
                            <template slot-scope="scope">
                                <el-button @click="onCellButtonClick(scope, 'edit')" type="text" size="small">{{detailAlise}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="showDeleteColumn" width="60" align="center" label="删除" fixed="left">
                            <template slot-scope="scope">
                                <el-button @click="onCellButtonClick(scope, 'delete')" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="showSingleColumn" width="60" align="center" label="单选" fixed="left">
                            <template slot-scope="scope" >
                                <el-button @click="onCellButtonClick(scope, 'single')" type="text" size="small">选择</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column v-for="button in columnsButton" :width="button.width" align="center" :label="button.text" fixed="left">
                            <template slot-scope="scope" >
                                <el-button @click="onCellButtonClick(scope, button.name)" type="text" size="small">{{button.text}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column v-for="column in columnsL" :key="column.name" :prop="column.name" :label="column.text" :align="column.align" :width="column.width" fixed="left"></el-table-column>
                        <el-table-column v-for="column in columns"  :key="column.name" :prop="column.name" :label="column.text" :align="column.align" :width="column.width">                             
                            <template slot-scope="scope" >
                                <i v-if="column.datatype=='tinyint' && scope.row[column.name]" class="el-icon-check"></i>
                                <span v-else-if="column.datatype=='tinyint' && !scope.row[column.name]"></span>
                                <span v-else>{{scope.row[column.name]}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
                <el-footer height="50px" style="padding-left:0px;border-bottom:solid 2px #ebeef5;border-left:solid 1px #ebeef5;border-right:solid 1px #ebeef5;">
                    <el-pagination style="margin-left:0px;margin-top:8px;" @current-change="onPageChange" background layout="prev, pager, next" :page-size="100" :total="totalRows"></el-pagination>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>`
})
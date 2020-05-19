﻿Vue.component('main-view', {
    data: function () {
        return {
            temp: [],
            viewPk: "",
            flowPk: "",
            controller: "",
            dtbView: null,                  // -- sys_view --
            dtbViewField: null,             // -- sys_view_field --
            dtbFlowNode: null,              // -- sys_flow_node --
            dtbViewData: null,              // -- 视图数据记录集 --
            viewBarProps: {
                leftButtons: [],
                rightButtons: [],
                showSearch: true,
                searchPlaceholder: "quick search ..."
            },
            showFlowNode: false,
            dataFlowNode: [],
            columnsL: [],                   // -- 左侧固定列 --
            columns: [],                    // -- 中间浮动列 --
            columnsR: [],                   // -- 右侧固定列（element-ui实现上有Bug，暂不支持） --
            viewData: [],
            showSelectColumn: false,
            showDetailColumn: false,
            totalRows: 0,                   // -- 总记录数 --
            pageNum: 0,                     // -- 当前页号 --
            currentRowIdx: 0,               // -- 当前行下标 --
            quickFields: "",                // -- 快速搜索字段 --
            filterTreeeFlow: "",            // -- 流程树导航条件 --
            filterQuick: "",                // -- 快速查询条件 --
            loading: false,

            vfUrl: "",                      // -- vf窗口URL --
            vfWindowState: "",              // -- vf窗口状态 --
            winViewForm: null,              // -- vf编辑窗口 --
            remark: ""
        }
    },
    mounted() {
    },
    methods: {
        init(para) {
            this.viewPk = para.viewPk;
            this.flowPk = para.flowPk;
            this.controller = para.controller;
            if (this.controller.equals("")) {
                this.controller = "/core/base_view";
            }

            this.vfUrl = para.vfUrl;
            this.vfWindowState = para.vfWindowState;

            let postData = { viewPk: this.viewPk, flowPk: this.flowPk };
            ajax.send(this.controller + "/getViewSchema", postData).then(res => {
                if (res.ok) {
                    this.dtbView = res.dtbView;
                    this.dtbViewField = res.dtbViewField;
                    this.dtbFlowNode = res.dtbFlowNode;
                    this.quickFields = res.dtbView.rows[0]["quick_fields"].value;
                    this.viewBarProps.searchPlaceholder = res.dtbView.rows[0]["quick_text"].value;

                    this.initNavTree();
                    this.initGrid();

                    this.getViewData(0);
                }
                else {
                    this.$alert(res.error, { type: "error", title: "系统消息 ..." });
                }
            })

            this.initToolbar();
        },
        initToolbar() {
            this.viewBarProps = {
                leftButtons: [
                    { name: "refresh", text: "刷新", icon: "el-icon-refresh" },
                    { name: "addnew", text: "添加", icon: "el-icon-plus" }
                ],
                rightButtons: [
                    { name: "config", text: "配置", type: "danger", icon: "el-icon-share" },
                    { name: "filter", text: "更多筛选", type: "success", icon: "el-icon-star-off" },
                    { name: "export", text: "数据导出", type: "success", icon: "el-icon-download" },
                    { name: "close", text: "关闭", type: "info", icon: "el-icon-close" }
                ],
                showSearch: true,
                searchPlaceholder: "quick search ..."
            }
        },
        initNavTree() {
            if (this.dtbFlowNode == null) return;
            this.showFlowNode = true;

            let data = [], nodes = [];
            for (let i = 1; i < this.dtbFlowNode.rowCount; i++) {
                let dataRow = this.dtbFlowNode.rows[i];
                nodes.push({ id: i, label: dataRow["node_name"].value, dataRow: dataRow });
            }

            let dataRow = this.dtbFlowNode.rows[0];
            this.filterTreeeFlow = dataRow["filter"].value;
            data.push({ label: dataRow["flow_name"].value, dataRow: dataRow, children: nodes });
            this.dataFlowNode = data;

        },
        initGrid() {
            this.showSelectColumn = (this.dtbView.rows[0]["show_select"].value == 1);
            this.showDetailColumn = (this.dtbView.rows[0]["show_detail"].value == 1);

            for (let i = 0; i < this.dtbViewField.rowCount; i++) {
                let dataRow = this.dtbViewField.rows[i];
                let column = {
                    name: dataRow["name"].value,
                    text: dataRow["text"].value,
                    align: dataRow["align"].value,
                    width: dataRow["width"].value
                }
                if (dataRow["fixed"].value.equals("left")) {
                    this.columnsL.push(column);
                }
                else {
                    this.columns.push(column);
                }
            }
        },

        getViewData(pageNum = 0) {
            this.loading = true;
            if (pageNum == 0) this.totalRows = 0;

            let postData = { viewPk: this.viewPk, pageNum: pageNum, filter: this.getFilter() };
            ajax.send(this.controller + "/getViewData", postData).then(res => {
                if (res.ok) {
                    this.dtbViewData = res.dtbViewData;
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
            })
        },
        getFilter() {
            let arrFilter = new Array();
            if (!this.filterTreeeFlow.equals("")) {
                arrFilter.push("(" + this.filterTreeeFlow + ")");
            }
            if (!this.filterQuick.equals("")) {
                arrFilter.push("(" + this.filterQuick + ")");
            }
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
            this.currentRowIdx = rowIdxNew;
            this.$refs.eltable.setCurrentRow(this.viewData[rowIdxNew]);
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
                // -- TODO: --
                this.$refs.eltable.setCurrentRow(5);
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
            console.log(a, b, c);

            this.filterTreeeFlow = a.dataRow["filter"].value;
            this.getViewData(0);
        },
        onPageChange(pageNum) {
            this.pageNum = pageNum;
            this.getViewData(pageNum);
        },

        onViewClick(scope) {
            this.setCurrentRow(scope.$index);
            this.openEditForm();
        },
        openEditForm() {
            if (this.winViewForm) {
                this.$message("窗口已打开");
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
            var para = {
                viewPk: this.viewPk,
                flowPk: this.flowPk,
                controller: this.controller,
                //primaryKey: this.getPrimaryKey(),

                dtbView: this.dtbView,
                dtbViewField: this.dtbViewField,
                dtbViewData: this.dtbViewData,
                dataRowView: this.dtbViewData.rows[this.currentRowIdx],
                //foreignKey: this.jsonFKey,

                //allowAddnew: this.vfAllowAddnew,
                //allowModify: this.vfAllowModify,
                //allowDelete: this.vfAllowDelete,
                //allowCopy: this.vfAllowCopy,
                //allowMove: this.vfAllowMove,
                view: this
            };

            topWin.openWindow(prop, para);
            //this.winViewForm = topWin.openWindow(prop, para);
            //this.winViewForm.addEventListener("beforeClose", () => {
            //this.winViewForm = null;
            //});
        },

        onCurrentChange(val) {
            this.currentRowIdx = val.$idx;
        },
        onVfMove(moveAction) {
            let rowIdxNew;
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
                this.dtbViewData.rows[this.currentRowIdx][i] = dataRowView[i];
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
        }
    },
    props: ['attrs'],
    template: `<el-container>
        <el-header style="padding:0">
            <view-bar ref="viewbar" @onclick="onBarClick" @onsearch="onBarSearch" @onclear="onBarUnsearch" :attrs="viewBarProps"></view-bar>
        </el-header>
        <el-container>
            <el-aside width="250px" style="margin:0;padding:0;border-left:solid 2px #ebeef5;border-bottom:solid 2px #ebeef5;border-top:solid 1px #ebeef5;border-right:solid 1px #ebeef5;">
                <el-tree @node-click="onFlowNodeClick" :data="dataFlowNode" v-if="showFlowNode" default-expand-all highlight-current></el-tree>
            </el-aside>
            <el-container>
                <el-main style="margin1:0;padding:0;">
                    <el-table ref="eltable" v-loading="loading"  @current-change="onCurrentChange" :data="viewData" height="100%" size="small" border stripe highlight-current-row>
                        <el-table-column type="index" label="序" align="center" fixed=""></el-table-column>
                        <el-table-column v-if="showSelectColumn" type="selection" width="45" align="center" fixed="left"></el-table-column>
                        <el-table-column v-if="showDetailColumn" width="60" align="center" label="操作" fixed="left">
                            <template slot-scope="scope">
                                <el-button @click="onViewClick(scope)" type="text" size="small">查看</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column v-for="column in columnsL" :key="column.name" :prop="column.name" :label="column.text" :align="column.align" :width="column.width" fixed="left"></el-table-column>
                        <el-table-column v-for="column in columns"  :key="column.name" :prop="column.name" :label="column.text" :align="column.align" :width="column.width"></el-table-column>
                    </el-table>
                </el-main>
                <el-footer height="50px" style="border-bottom:solid 2px #ebeef5;border-right:solid 1px #ebeef5;">
                    <el-pagination style="margin-top:8px;" @current-change="onPageChange" background layout="prev, pager, next" :page-size="100" :total="totalRows"></el-pagination>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>`
})
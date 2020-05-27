Vue.component('main-view', {
    data: function () {
        return {
            viewPk: "",
            flowPks: "",
            controller: "/core/base_view",  // -- 视图后台控制类 --
            dtbView: null,                  // -- sys_view --
            dtbViewField: null,             // -- sys_view_field --            
            dtbViewData: null,              // -- 视图数据记录集 --
            viewBarProps: {
                leftButtons: [],
                rightButtons: [],
                showSearch: true,
                searchPlaceholder: "quick search ..."
            },
            allowAddnew: false,             // -- 视图允许添加 --


            dtbFlowNode: null,              // -- ## 导航树 ##--
            showNavArea: false,             // -- 显示导航区 --
            dataFlowNode: [],               // -- 导航树data --
            navAllowAddnew: true,           // -- 当前导航节点允添加新纪录 --

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
            // -- TODO：此处不可以定义winViewForm，回造成内存泄漏，有待进一步分析原因。后面直接使用没有泄漏问题，很是奇怪 --
            // -- winViewForm: null,        // -- vf编辑窗口 --
            remark: ""
        }
    },
    mounted() {
    },
    methods: {
        init(para) {
            this.viewPk = para.viewPk;
            this.flowPks = para.flowPks;
            this.vfUrl = para.vfUrl;
            this.vfWindowState = para.vfWindowState;

            let postData = { viewPk: this.viewPk, flowPks: this.flowPks };
            ajax.send(this.controller + "/getViewSchema", postData).then(res => {
                if (res.ok) {
                    this.dtbView = res.dtbView;
                    this.controller = this.dtbView.rows[0]["controller"].value || this.controller;
                    this.allowAddnew = (this.dtbView.rows[0]["allow_addnew"].value == 1);

                    this.dtbViewField = res.dtbViewField;
                    this.dtbFlowNode = res.dtbFlowNode;
                    if (this.dtbFlowNode && this.dtbFlowNode.rowCount == 0) {
                        this.dtbFlowNode = null;
                    }
                    this.quickFields = res.dtbView.rows[0]["quick_fields"].value;
                    this.searchPlaceholder = res.dtbView.rows[0]["quick_text"].value;

                    this.initNavTree();
                    this.initGrid();

                    this.getViewData(0);
                    this.initToolbar();
                }
                else {
                    this.$alert(res.error, { type: "error", title: "系统消息 ..." });
                }
            })
        },
        initToolbar() {
            let leftButtons = [
                { name: "refresh", text: "刷新", icon: "el-icon-refresh" }
            ]
            if (this.allowAddnew && this.navAllowAddnew) {
                leftButtons.push({ name: "addnew", text: "添加", icon: "el-icon-plus" });
            }

            let rightButtons = [
                { name: "config", text: "配置", type: "danger", icon: "el-icon-share" },
                { name: "filter", text: "更多筛选", type: "success", icon: "el-icon-star-off" },
                { name: "export", text: "数据导出", type: "success", icon: "el-icon-download" },
                { name: "close", text: "关闭", type: "info", icon: "el-icon-close" }
            ]

            this.viewBarProps = {
                leftButtons: leftButtons,
                rightButtons: rightButtons,
                showSearch: true,
                searchPlaceholder: this.searchPlaceholder
            }
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
                if (dataRow["sequence"].value > 0) {
                    if (dataRow["fixed"].value.equals("left")) {
                        this.columnsL.push(column);
                    }
                    else {
                        this.columns.push(column);
                    }
                }
            }
        },

        getViewData(pageNum = 0) {
            this.loading = true;

            if (this.winViewForm) this.winViewForm.close();
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
            }
            else if (button.name.equals("addnew")) {
                this.openEditForm("addnew");
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
            this.pageNum = pageNum;
            this.getViewData(pageNum);
        },

        onViewClick(scope) {
            this.setCurrentRow(scope.$index);
            this.openEditForm("view");
        },
        openEditForm(firstAction) {
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

        onCurrentChange(val) {
            if (val == null) {
                this.currentRowIdx = -1;
            }
            else {
                this.currentRowIdx = val.$idx;
            }
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
            <main-view-bar ref="viewbar" @onclick="onBarClick" @onsearch="onBarSearch" @onclear="onBarUnsearch" :attrs="viewBarProps"></main-view-bar>
        </el-header>
        <el-container>
            <el-aside v-show="showNavArea" width="250px" style="margin:0;padding:0;border-left:solid 2px #ebeef5;border-bottom:solid 2px #ebeef5;border-top:solid 1px #ebeef5;border-right:solid 1px #ebeef5;">
                <el-tree ref="eltree" @node-click="onFlowNodeClick" :data="dataFlowNode" node-key="id" :expand-on-click-node="false" default-expand-all highlight-current></el-tree>
            </el-aside>
            <el-container>
                <el-main style="margin1:0;padding:0;">
                    <el-table ref="eltable" v-loading="loading" @current-change="onCurrentChange" :data="viewData" height="100%" size="small" border stripe highlight-current-row>
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
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
            extUserDef: {},                 // -- 用户自定义参数 --
            allowAddnew: false,             // -- 视图允许添加 --
            detailAlise: "查看",             // -- 查看 --

            showAside: false,               // -- ## 左侧区域 --
            showNavTree: false,             // -- ## 流程树 --
            dtbFlowNode: null,              // -- 流程树记录集 --            
            dataFlowNode: [],               // -- 流程树data --
            flowAllowAddnew: true,          // -- 当前导航节点允添加新纪录 --
            filterFlowTree: "",             // -- 流程树导航条件 --

            showFlowTree: false,            // -- ## 导航树 --
            navTreeProps: {                 // -- 导航树属性 --
                label: "label",
                children: "children",
                isLeaf: "isLeaf"
            },
            dtbTree: null,                  // -- 导航树记录集 --
            dtbTreeLevel: null,             // -- 导航树层级记录集 --
            dataNavNode: [],                // -- 导航树根节点数据 --
            filterNavTree: "",              // -- 导航树导航条件 --
            navNodeValue: "",               // -- 导航节点值 --

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
            filterQuick: "",                // -- 快速查询条件 --
            loading: false,

            vfUrl: "",                      // -- ## viewForm --
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
            this.controller = para.controller || this.controller;
            this.flowPks = para.flowPks || this.flowPks;
            this.extUserDef = para.extUserDef || this.extUserDef;
            this.vfUrl = para.vfUrl;
            this.vfWindowState = para.vfWindowState;

            let postData = { viewPk: this.viewPk, flowPks: this.flowPks };
            postData = g.x.extendJSON(postData, this.extUserDef);
            ajax.send(this.controller + "/getViewSchema", postData).then(res => {
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
                    this.dtbTree = res.dtbTree;
                    this.dtbTreeLevel = res.dtbTreeLevel;

                    this.quickFields = res.dtbView.rows[0]["quick_fields"].value;
                    this.searchPlaceholder = res.dtbView.rows[0]["quick_text"].value;

                    this.initFlowTree();
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
            if (this.allowAddnew && this.flowAllowAddnew) {
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
        initFlowTree() {
            if (this.dtbFlowNode == null) return;
            this.showAside = true;
            this.showFlowTree = true;

            let firstId;
            let data = [], nodes = [];
            for (let i = 1; i < this.dtbFlowNode.rowCount; i++) {
                let dataRow = this.dtbFlowNode.rows[i];
                nodes.push({
                    id: "" + dataRow["node_pk"].value,
                    label: dataRow["node_name"].value,
                    dataRow: dataRow
                });
                if (i == 1) {
                    firstId = dataRow["node_pk"].value;
                    this.filterFlowTree = dataRow["filter"].value;  // -- 默认流程第一个节点为初始流程筛选条件 --
                }
            }

            let dataRow = this.dtbFlowNode.rows[0];
            this.flowAllowAddnew = (dataRow["allow_addnew"].value == 1);

            data.push({ id: dataRow["flow_pk"].value, label: dataRow["flow_name"].value, dataRow: dataRow, children: nodes });
            this.dataFlowNode = data;

            setTimeout(() => {
                // -- 延时触发，自动选中流程第一个节点 --
                this.$refs.treeFlow.setCurrentKey(firstId);
            }, 500);
        },
        initNavTree() {
            if (!this.dtbTree) return;

            this.showAside = true;
            this.showNavTree = true;

            let data = [];
            // --------------------------------------------
            data.push({
                key: "_root_",
                value: this.dtbTree.rows[0]["node_value"].value,
                label: this.dtbTree.rows[0]["name"].value
            });
            this.dataNavNode = data;

            this.filterNavTree = this.dtbTreeLevel.rows[0]["sql_nav"].value;    // -- 根节点导航条件 --

            if (this.dtbTree.rows[0]["auto_expand"].value == 1) {
                setTimeout(() => {
                    // -- 延时触发，自动展开根节点 --
                    this.$refs.treeNav.store["root"].childNodes[0].expand();
                }, 200);
            }
        },
        initGrid() {
            let columnsL = [], columns = [];
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

        getTreeNode(node, resolve) {
            if (!this.dtbTree) return;

            let treePk = this.dtbTree.rows[0]["pk"].value;
            let postData = { treePk: treePk, nodeLevel: node.level, nodeValue: "" + node.data.value };
            ajax.send(this.controller + "/getTreeNode", postData).then(res => {
                if (res.ok) {
                    let data = [];
                    for (let i = 0; i < res.dtbTreeNode.rowCount; i++) {
                        let dataRow = res.dtbTreeNode.rows[i];
                        data.push({
                            value: dataRow["node_value"].value,
                            label: dataRow["node_name"].value,
                            isLeaf: (dataRow["is_leaf"].value == 1),
                            dataRow: dataRow
                        });
                    }
                    resolve(data);
                }
                else {
                    this.$alert(res.error, { type: "error", title: "系统消息 ..." });
                }
            });
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
            if (!this.filterFlowTree.equals("")) {
                arrFilter.push("(" + this.filterFlowTree + ")");
            }
            if (!this.filterNavTree.equals("")) {
                arrFilter.push("(" + this.filterNavTree + ")");
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
            else if (button.name.equals("export")) {
                this.exportData();
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

        onFlowNodeClick(data, node, c) {
            this.filterFlowTree = data.dataRow["filter"].value;
            this.flowAllowAddnew = (data.dataRow["allow_addnew"].value == 1);

            this.getViewData(0);
            this.initToolbar();
        },
        onNavNodeClick(data, node, c) {
            let level = node.level - 1;
            let sqlNav = this.dtbTreeLevel.rows[level]["sql_nav"].value;

            let dataRow = data.dataRow;
            for (let key in dataRow) {
                if (dataRow[key] && dataRow[key].value != null) {
                    sqlNav = sqlNav.replace("{" + key + "}", dataRow[key].value);
                }
            }
            this.filterNavTree = sqlNav;
            this.getViewData(0);

            this.$refs.treeNav.selectedNode = node;
            this.navNodeValue = data.value;
        },
        onPageChange(pageNum) {
            this.pageNum = pageNum;
            this.getViewData(pageNum);
        },

        exportData() {
            console.log();
            this.$message("数据导出");
        },

        onCellButtonClick(scope) {
            this.setCurrentRow(scope.$index);

            let cancel = false;
            this.$emit("ondetailclick", this.dtbViewData.rows[this.currentRowIdx], (val) => {
                cancel = val;
            });
            if (!cancel) {
                this.openEditForm("view");
            }
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
                menuPk: win.para.menuPk,
                viewPk: this.viewPk,
                flowPks: this.flowPks,
                controller: this.controller,
                firstAction: firstAction,
                dtbView: this.dtbView,
                dtbViewField: this.dtbViewField,
                dtbViewData: this.dtbViewData,
                dataRowView: this.dtbViewData.rows[this.currentRowIdx],

                allowAddnew: this.allowAddnew && this.flowAllowAddnew,
                view: this
            };
            if (this.$refs.treeNav && this.$refs.treeNav.selectedNode) {
                let treeNode = this.$refs.treeNav.selectedNode;
                para[this.dtbTreeLevel.rows[treeNode.level - 1]["foreign_key"].value] = treeNode.data.value;
            }

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
        }
    },
    props: ['attrs'],
    template: `<el-container>
        <el-header style="padding:0">
            <main-view-bar ref="viewbar" @onclick="onBarClick" @onsearch="onBarSearch" @onclear="onBarUnsearch" :attrs="viewBarProps"></main-view-bar>
        </el-header>
        <el-container>
            <el-aside v-show="showAside" width="250px" style="margin:0;padding:0;border-left:solid 2px #ebeef5;border-bottom:solid 2px #ebeef5;border-top:solid 1px #ebeef5;border-right:solid 1px #ebeef5;">
                <el-tree v-show="showFlowTree" ref="treeFlow" @node-click="onFlowNodeClick" :data="dataFlowNode" node-key="id" :expand-on-click-node="false" default-expand-all highlight-current></el-tree>
                <el-tree v-show="showNavTree" ref="treeNav" :props="navTreeProps" @node-click="onNavNodeClick" :data="dataNavNode" :load="getTreeNode" lazy :expand-on-click-node="false" highlight-current></el-tree>
            </el-aside>
            <el-container>
                <el-main style="margin1:0;padding:0;">
                    <el-table ref="eltable" v-loading="loading" @current-change="onCurrentChange" :data="viewData" height="100%" size="small" border stripe highlight-current-row>
                        <el-table-column type="index" label="序" align="center" fixed=""></el-table-column>
                        <el-table-column v-if="showSelectColumn" type="selection" width="45" align="center" fixed="left"></el-table-column>
                        <el-table-column v-if="showDetailColumn" width="60" align="center" label="操作" fixed="left">
                            <template slot-scope="scope">
                                <el-button @click="onCellButtonClick(scope)" type="text" size="small">{{detailAlise}}</el-button>
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
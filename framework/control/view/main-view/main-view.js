Vue.component('main-view', {
    data: function () {
        return {
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
            loading: false
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

            let postData = { viewPk: this.viewPk, flowPk: this.flowPk };
            ajax.send(this.controller + "/getViewSchema", postData).then(res => {
                if (res.ok) {
                    this.dtbView = res.dtbView;
                    this.dtbViewField = res.dtbViewField;
                    this.dtbFlowNode = res.dtbFlowNode;

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
                    { name: "addnew", text: "添加", icon: "el-icon-edit" }
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

            let data = [], nodes = [], dataRow;
            for (let i = 1; i < this.dtbFlowNode.rowCount; i++) {
                dataRow = this.dtbFlowNode.rows[i];
                nodes.push({ id: i, label: dataRow["node_name"].value, dataRow: dataRow });
            }

            dataRow = this.dtbFlowNode.rows[0];
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
        getViewData(pageNum) {
            this.loading = true;
            if (pageNum == 0) this.totalRows = 0;

            let postData = { viewPk: this.viewPk, pageNum: pageNum };
            ajax.send(this.controller + "/getViewData", postData).then(res => {
                if (res.ok) {
                    this.dtbViewData = res.dtbViewData;
                    if (pageNum == 0) {
                        this.pageNum = 1;
                        this.totalRows = res.totalRows;
                    }

                    let viewData = [], data = [], dataRow;
                    let columns = this.dtbViewData.columns;
                    let rowCount = this.dtbViewData.rowCount;
                    let columnCount = this.dtbViewData.columnCount;


                    for (let i = 0; i < rowCount; i++) {
                        dataRow = this.dtbViewData.rows[i];
                        for (let j = 0; j < columnCount; j++) {
                            data[columns[j].name] = dataRow[j].value;
                        }
                        viewData.push(data);
                    }

                    this.viewData = viewData;
                    this.loading = false;
                }
                else {
                    this.$alert(res.error, { type: "error", title: "系统消息 ..." });
                }
            })
        },

        onBarClick(button) {
            if (button.name.equals("refresh")) {
                this.getViewData(0);
            }
            else if (button.name.equals("close")) {
                win.close();
            }
            else {
                this.$message(button.name + ", " + button.text);
            }
        },
        onBarSearch(searchText) {
            this.$message(searchText);
        },

        onFlowNodeClick(a, b, c) {
            console.log(a, b, c);
            this.$message(a.dataRow["filter"].value);
        },
        onPageChange(pageNum) {
            this.pageNum = pageNum;
            this.getViewData(pageNum);
        }
    },
    props: ['attrs'],
    template: `<el-container>
        <el-header style="padding:0">
            <view-bar @onclick="onBarClick" @onsearch="onBarSearch" :attrs="viewBarProps"></view-bar>
        </el-header>
        <el-container>
            <el-aside width="250px" style="margin:0;padding:0;border-left:solid 2px #ebeef5;border-bottom:solid 2px #ebeef5;border-top:solid 1px #ebeef5;border-right:solid 1px #ebeef5;">
                <el-tree @node-click="onFlowNodeClick" :data="dataFlowNode" v-if="showFlowNode" default-expand-all highlight-current></el-tree>
            </el-aside>
            <el-container>
                <el-main style="margin1:0;padding:0;">
                    <el-table v-loading="loading" :data="viewData" height="100%" size="small" border stripe highlight-current-row>
                        <el-table-column type="index" label="序" align="center" fixed=""></el-table-column>
                        <el-table-column v-if="showSelectColumn" type="selection" width="45" align="center" fixed="left"></el-table-column>
                        <el-table-column v-if="showDetailColumn" width="60" align="center" label="操作" fixed="left">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
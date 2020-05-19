Vue.component('view-form-bar', {
    data: function () {
        return {
            controller: "",             // -- 视图controller --
            view: null,                 // -- 视图对象 --
            viewPk: "",                 // -- viewPk --
            flowPk: "",                 // -- flowPk --
            dtbView: null,              // -- dtbView --
            dtbViewField: null,         // -- dtbViewField --
            dtbViewData: null,          // -- 视图数据记录集 --
            dataRowView: null,          // -- 视图行数据 --

            moveButtons: [],
            vfButtons: [],
            dtbFormData: null,          // -- 基础表记录集 --
            status: "none",             // -- 状态 --
            remark: ""
        }
    },
    mounted() {
        // -- 占位  --
        this.vfButtons.push({ name: "placeholder", text: "loading", type: "", icon: "el-icon-loading" });

        window.addEventListener('load', () => {
            // -- TODO: 时机不对，取不到win对象，this也不对，另外第三个参数true也研究一下 --
            // -- 暂时采用setTimeout的方式实现 --
            // -- this.init();
            // -- console.log(win.para); 
            setTimeout(() => { this.init() }, 10);
        }, true);
    },
    methods: {
        init() {
            this.controller = win.para.controller;
            this.view = win.para.view;
            this.viewPk = win.para.viewPk;
            this.flowPk = win.para.flowPk;
            this.dtbView = win.para.dtbView;
            this.dtbViewField = win.para.dtbViewField;
            this.dtbViewData = win.para.dtbViewData;
            this.dataRowView = win.para.dataRowView;

            this.setStatus("view");
            this.getFormData();
        },
        getFormData() {
            let id = this.dataRowView["id"].value;
            let postData = { viewPk: this.viewPk, id: id };
            ajax.send(this.controller + "/getFormData", postData).then(res => {
                if (res.ok) {
                    this.dtbFormData = res.dtbFormData;

                    this.fillFormData();
                }
                else {
                    this.$alert(res.error, { type: "error", title: "系统消息 ..." });
                }
            });
        },
        fillFormData() {
            let form = {};
            for (let i = 0; i < this.dtbViewData.columnCount; i++) {
                let columnName = this.dtbViewData.columns[i].name;
                form[columnName] = this.dataRowView[columnName].value;
            }
            for (let i = 0; i < this.dtbFormData.columnCount; i++) {
                let columnName = this.dtbFormData.columns[i].name;
                form[columnName] = this.dtbFormData.rows[0][columnName].value;
            }
            this.$parent.form = form;
        },
        setStatus(status) {
            this.status = status;

            let moveButtons = [];
            let vfButtons = [];
            // --------------------------------------------
            if (this.status.equals("addnew")) {
                vfButtons.push({ name: "save", text: "保存", icon: "el-icon-check", group: "crud" });
                vfButtons.push({ name: "cancel", text: "取消", icon: "el-icon-back", group: "crud" });
            }
            else if (this.status.equals("view")) {
                moveButtons.push({ name: "first", icon: "el-icon-d-arrow-left", group: "move" });
                moveButtons.push({ name: "previous", icon: "el-icon-arrow-left", group: "move" });
                moveButtons.push({ name: "next", icon: "el-icon-arrow-right", group: "move" });
                moveButtons.push({ name: "last", icon: "el-icon-d-arrow-right", group: "move" });


                vfButtons.push({ name: "save", text: "保存", icon: "el-icon-check", group: "crud" });
                vfButtons.push({ name: "addnew", text: "添加", icon: "el-icon-plus", group: "crud" });
                vfButtons.push({ name: "delete", text: "删除", icon: "el-icon-minus", group: "crud" });
                vfButtons.push({ name: "close", text: "关闭", type: "", icon: "el-icon-close" });
            }
            // --------------------------------------------
            this.moveButtons = moveButtons;
            this.vfButtons = vfButtons;
        },

        onClick(button) {
            if (button.name.equals("close")) {
                win.close();
            }
            else if (button.group.equals("move")) {
                this.dataRowView = this.view.onVfMove(button.name);
                this.getFormData();
            }
            else if (button.group.equals("crud")) {
                this.onCrud(button);
            }
            else if (button.name.equals("close")) {
                win.close();
            }
            else if (button.name.equals("close")) {
                win.close();
            }
            else {
                this.$message(button.name);
            }
        },
        onCrud(button) {
            if (button.name.equals("save")) {
                if (!this.beforeSave()) return;
                if (this.save()) {
                    this.afterSave();
                }
            }
            else if (button.name.equals("addnew")) {
                if (!this.beforeAddnew()) return;
                if (this.addnew()) {
                    this.afterAddnew();
                }
            }
            else if (button.name.equals("delete")) {
                if (!this.beforeDelete()) return;
                if (this.delete()) {
                    this.afterDelete();
                }
            }
            else if (button.name.equals("cancel")) {
                this.setStatus("view");
                this.getFormData();
            }
        },

        save() {
            let id = this.status.equals("addnew") ? 0 : this.dataRowView["id"].value;
            let postData = { viewPk: this.viewPk, id: id, form: this.$parent.form };
            ajax.send(this.controller + "/save", postData).then(res => {
                if (res.ok) {
                    let dtbViewData = res.dtbViewData;

                    this.dataRowView = dtbViewData.rows[0];
                    this.dtbFormData = res.dtbFormData;

                    this.fillFormData();
                    this.setStatus("view");
                    win.flashTitle("数据保存成功  " + (new Date).toTimeString());

                    if (id == 0) {
                        this.view.afterVfInsert(this.dataRowView);
                    }
                    else {
                        this.view.afterVfUpdate(this.dataRowView);
                    }
                }
                else {
                    this.$alert(res.error, { type: "error", title: "系统消息 ..." });
                }
            });
        },
        addnew() {
            this.$parent.form = {};
            this.setStatus("addnew");
        },
        delete() {
            let id = this.dataRowView["id"].value;
            let idNext = this.view.getNextId();
            let postData = { viewPk: this.viewPk, id: id, idNext, idNext };
            ajax.send(this.controller + "/delete", postData).then(res => {
                if (res.ok) {
                    this.dataRowView = this.view.afterVfDelete();

                    if (this.dataRowView == null) {
                        win.close();
                        return;
                    }

                    this.dtbFormData = res.dtbFormData;
                    this.fillFormData();
                    win.flashTitle("数据删除成功  " + (new Date).toTimeString());
                }
                else {
                    this.$alert(res.error, { type: "error", title: "系统消息 ..." });
                }
            });
        },

        beforeSave() { return true; },
        afterSave() { },
        beforeAddnew() { return true; },
        afterAddnew() { },
        beforeDelete() { return true; },
        afterDelete() { },
        doSomething() {
            // -- do nothing --
        }
    },
    template: `<el-row>        
        <el-button-group>
            <el-button v-for="button in moveButtons" @click="onClick(button)" :key="button.name" :icon="button.icon" size="medium" style='width:36px;padding-left:0px;padding-right:0px;'></el-button>
        </el-button-group>
        <el-button-group>
            <el-button v-for="button in vfButtons" size="medium" @click="onClick(button)" :key="button.name" :icon= "button.icon" :type="button.type" plain >
                {{ button.text }}
            </el-button>
        </el-button-group>
        <div style="height:5px;border-top:1px solid #e0e0e0;margin-top:8px;margin-bottom:8px;"></div>
    </el-row>`
})
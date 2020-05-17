Vue.component('view-form-bar', {
    data: function () {
        return {
            controller: "",             // -- 视图controller --
            viewPk: "",                 // -- viewPk --
            flowPk: "",                 // -- flowPk --
            dtbView: null,              // -- dtbView --
            dtbViewField: null,         // -- dtbViewField --
            dtbViewData: null,          // -- 视图数据记录集 --
            dataRowView: null,          // -- 视图行数据 --

            moveButtons: [],
            vfButtons: [],    
            dtbFormData: null,          // -- 基础表记录集 --
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
            this.viewPk = win.para.viewPk;
            this.flowPk = win.para.flowPk;
            this.dtbView = win.para.dtbView;
            this.dtbViewField = win.para.dtbViewField;
            this.dtbViewData = win.para.dtbViewData;
            this.dataRowView = win.para.dataRowView;

            this.setButtons();

            let id = this.dataRowView["id"].value;
            let postData = { viewPk: this.viewPk, id: id };
            ajax.send(this.controller + "/getFormData", postData).then(res => {
                if (res.ok) {
                    this.dtbFormData = res.dtbFormData;

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
                }
                else {
                    this.$alert(res.error, { type: "error", title: "系统消息 ..." });
                }
            });
        },
        setButtons() {
            let moveButtons = [];
            moveButtons.push({ name: "first", icon: "el-icon-d-arrow-left" });
            moveButtons.push({ name: "previous", icon: "el-icon-arrow-left" });
            moveButtons.push({ name: "next", icon: "el-icon-arrow-right" });
            moveButtons.push({ name: "last", icon: "el-icon-d-arrow-right" });
            this.moveButtons = moveButtons;

            let vfButtons = [];
            vfButtons.push({ name: "save", text: "保存", icon: "el-icon-check" });
            vfButtons.push({ name: "addnew", text: "添加", icon: "el-icon-plus" });
            vfButtons.push({ name: "delete", text: "删除", icon: "el-icon-minus" });
            vfButtons.push({ name: "close", text: "关闭", type: "", icon: "el-icon-close" });
            this.vfButtons = vfButtons;
        },

        onClick(button) {
            this.$emit('onclick', button);
            if (button.name.equals("save")) {
                this.$parent.form = {};
                this.$parent.form.code = (new Date()).toTimeString();
                this.$parent.form.name = (new Date()).toTimeString();
            }
            else if (button.name.equals("close")) {
                win.close();
            }
            else {
                this.$message(button.name);
            }
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
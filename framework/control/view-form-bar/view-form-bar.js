﻿Vue.component('view-form-bar', {
    data: function () {
        return {
            controller: "",             // -- 视图controller --
            view: null,                 // -- 视图对象 --
            viewPk: "",                 // -- viewPk --
            flowPks: "",                // -- flowPks --
            dtbView: null,              // -- dtbView --
            dtbViewField: null,         // -- dtbViewField --
            dtbViewData: null,          // -- 视图数据记录集 --
            dataRowView: null,          // -- 视图行数据 --
            id: 0,                      // -- 主键ID --

            moveButtons: [],
            vfButtons: [],
            dtbFormData: null,          // -- 基础表记录集 --
            firstAction: "view",        // -- 首次进入动作，addnew 或 view --
            status: "none",             // -- 状态 --
            idCopy: 0,                  // -- 被拷贝的记录ID --
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

        // -- 输出css --
        let css = g.path.framework + "/control/view-form-bar/view-form-bar.css?v=" + g.cfg.jsVer;
        document.write("<link href='" + css + "' rel='stylesheet' />");
    },
    methods: {
        init() {
            this.controller = win.para.controller;
            this.view = win.para.view;
            this.viewPk = win.para.viewPk;
            this.flowPks = win.para.flowPks;
            this.dtbView = win.para.dtbView;
            this.dtbViewField = win.para.dtbViewField;
            this.dtbViewData = win.para.dtbViewData;
            this.dataRowView = win.para.dataRowView;
            this.id = win.para.id;

            this.firstAction = win.para.firstAction;
            if (this.view) {
                this.view.vf = this;
                this.allowAddnew = win.para.allowAddnew && (win.para.dtbView.rows[0]["allow_addnew"].value == 1);
                this.allowDelete = (win.para.dtbView.rows[0]["allow_delete"].value == 1);   // -- 视图允许删除 --
                this.allowUpdate = (win.para.dtbView.rows[0]["allow_update"].value == 1);   // -- 视图允许修改 --   
            }
            else {
                this.allowUpdate = win.para.allowUpdate;
                this.allowDelete = win.para.allowDelete;
            }

            this.getFormSchema();
        },
        getFormSchema() {
            let postData = { viewPk: this.viewPk, flowPks: this.flowPks };
            ajax.send(this.controller + "/getFormSchema", postData).then(res => {
                if (res.ok) {
                    // -- 1. 流程按钮、视图按钮 --
                    if (res.dtbFlowButton) this.dtbFlowButton = res.dtbFlowButton;
                    if (res.dtbViewButton) this.dtbViewButton = res.dtbViewButton;
                    this.dtbViewField = res.dtbViewField;
                    this.dtbViewField.sort("name");

                    // -- 2. 初始化 form --
                    let form = {}, columnName;
                    for (let i = 0; i < this.dtbViewField.rowCount; i++) {
                        columnName = this.dtbViewField.rows[i]["name"].value;
                        if (this.dtbViewField.rows[i]["table_pk"].value.equals(this.dtbViewField.rows[0]["table_pk"].value)) {
                            form[columnName] = "";
                        }
                        else {
                            form[columnName] = "";
                        }
                    }
                    for (let key in this.$parent.form) {
                        // -- 强制保持页面原有的 this.$parent.form 原有的定义 --
                        form[key] = this.$parent.form[key];
                    }
                    this.$parent.form = form;

                    // -- 3. 解析并处理字段数据源 --
                    for (let key in res) {
                        if (key.startsWith("dtbCDS_")) {
                            let fieldName = key.substring(7);
                            let arrRow = new Array();
                            let dtbDS = res[key];
                            for (let i = 0; i < dtbDS.rowCount; i++) {
                                let jsonRow = {};
                                for (let j = 0; j < dtbDS.columnCount; j++) {
                                    let colName = dtbDS.columns[j].name;
                                    jsonRow[colName] = "" + dtbDS.rows[i][j].value;
                                }
                                arrRow.push(jsonRow);
                            }
                            this.$parent.ds[fieldName] = arrRow;
                        }
                    }

                    // -- 3. 加载form数据 --
                    if (this.firstAction.equals("addnew")) {
                        this.addnew();
                    }
                    else {
                        //this.setStatus("view");
                        this.getFormData();
                    }
                }
                else {
                    this.$alert(res.error, { type: "error", title: "系统消息 ..." });
                }
            })
        },
        getFormData() {
            let id = this.view ? this.dataRowView["id"].value : win.para.id;
            let postData = { viewPk: this.viewPk, id: id };
            ajax.send(this.controller + "/getFormData", postData).then(res => {
                if (res.ok) {
                    this.dtbFormData = res.dtbFormData;
                    if (res.dtbFormData.rowCount == 0) {
                        topWin.alert("当前记录已不存在，请刷新视图页面。", "error");
                        return;
                    }
                    this.fillFormData();
                }
                else {
                    this.$alert(res.error, { type: "error", title: "系统消息 ..." });
                }
            });
        },
        fillFormData() {
            let form = {};
            if (this.dataRowView) {
                for (let i = 0; i < this.dtbViewData.columnCount; i++) {
                    let columnName = this.dtbViewData.columns[i].name;
                    form[columnName] = "" + this.dataRowView[columnName].value;
                }
            }
            for (let i = 0; i < this.dtbFormData.columnCount; i++) {
                let columnName = this.dtbFormData.columns[i].name;
                let dataType = this.dtbFormData.columns[i].dataType;
                if (dataType.equals("tinyint")) {
                    form[columnName] = this.dtbFormData.rows[0][columnName].value;
                }
                else {
                    form[columnName] = "" + this.dtbFormData.rows[0][columnName].value;
                }
            }
            this.$parent.form = form;

            this.setStatus("view");
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
                // -- 1. move group --
                moveButtons.push({ name: "first", icon: "el-icon-d-arrow-left", actionType: "move" });
                moveButtons.push({ name: "previous", icon: "el-icon-arrow-left", actionType: "move" });
                moveButtons.push({ name: "next", icon: "el-icon-arrow-right", actionType: "move" });
                moveButtons.push({ name: "last", icon: "el-icon-d-arrow-right", actionType: "move" });

                // -- 2. flow group --
                for (let t = 0; t < 2; t++) {
                    let dtbButton;
                    if (t == 0 && this.dtbFlowButton) dtbButton = this.dtbFlowButton;
                    if (t == 1 && this.dtbViewButton) dtbButton = this.dtbViewButton;
                    if (dtbButton) {
                        for (let i = 0; i < dtbButton.rowCount; i++) {
                            let dataRow = dtbButton.rows[i];
                            let buttonPk = dataRow["button_pk"].value;
                            let name = dataRow["name"].value;
                            let jsAssert = dataRow["assert_js"].value;
                            let icon = dataRow["icon"].value || "el-icon-magic-stick";
                            let actionType = dataRow["action_type"].value;

                            while (true) {
                                let idxStart = jsAssert.indexOf("{");
                                let idxEnd = jsAssert.indexOf("}");
                                if (idxStart < 0) break;
                                if (idxEnd <= idxStart) {
                                    alert("表达式错误，没有找到匹配的 \"}\":\n" + jsAssert);
                                    jsAssert = "false";
                                    break;
                                }
                                let columnName = jsAssert.substring(idxStart + 1, idxEnd);
                                jsAssert = jsAssert.replace("{" + columnName + "}", "" + this.dtbFormData.rows[0][columnName.trim()].value);
                            }
                            if (g.x.eval(jsAssert)) {
                                let button = { name: buttonPk, text: name, icon: icon, actionType: actionType, dataRow: dataRow };
                                if (buttonPk.equals("addnew")) {
                                    // -- 添加按钮特殊处理 --
                                    button.hide = !this.allowAddnew;
                                }
                                else if (buttonPk.equals("delete")) {
                                    button.hide = !this.allowDelete;
                                }
                                else if (buttonPk.equals("save")) {
                                    button.hide = !this.allowUpdate;
                                }
                                vfButtons.push(button);
                            }
                        }
                    }
                }

                // -- 9. close --
                vfButtons.push({ name: "close", text: "关闭", type: "", icon: "el-icon-close", actionType: "close" });
            }
            // --------------------------------------------
            this.moveButtons = moveButtons;
            this.vfButtons = vfButtons;

            // -- afterMove -------------------------------
            if (this.$parent.afterMove) {
                this.$parent.afterMove();
            }
        },
        getButtonStatus(btnKey) {
            // -- 判断按钮是否存在，可见并且可用 --
            let button;
            for (let i = 0; i < this.vfButtons.length; i++) {
                if (this.vfButtons[i].name.equals(btnKey)) {
                    button = this.vfButtons[i];
                    break;
                }
            }
            if (button) {
                if (!button.hide) {
                    // -- 按钮存在，并且可见 --
                    return true;
                }
            }
            return false;
        },

        onClick(button) {
            if (button.name.equals("close")) {
                win.close();
            }
            else if (button.name.equals("save") || button.name.equals("addnew") || button.name.equals("delete") || button.name.equals("cancel")) {
                this.doCRUD(button);
            }
            else if (button.name.equals("copy")) {
                this.idCopy = this.getId();
                this.copy();
            }
            else if (button.actionType.equals("move")) {
                this.dataRowView = this.view.onVfMove(button.name);
                this.getFormData();
            }
            else if (button.actionType.equals("sql")) {
                if (this.$parent.beforeFlowClick) {
                    if (!this.$parent.beforeFlowClick()) {
                        return false;
                    }
                }

                this.$confirm("确定要执行 [" + button.text + "] 操作吗？", g.c.titleConfirm, {
                    confirmButtonText: "确定", cancelButtonText: "取消", type: "warning",
                    button: button,
                    callback: (action, instance) => {
                        if (action.equals("confirm")) {
                            this.doFlow(instance.button);
                        }
                    }
                }).then((a, b, c) => {
                    // -- 用了callback，此处就不会再进来 --
                })
            }
            else if (button.actionType.equals("client")) {
                if (this.$parent.onClick) {
                    if (this.$parent.onClick(button)) {
                        this.doClick(button);
                    }
                }
                else {
                    this.doClick(button);
                }
            }
            else {
                this.$message("unsupport actionType = " + button.actionType + ", button.name = " + button.name);
            }

        },
        doCRUD(button) {
            if (button.name.equals("save")) {
                this.save();
            }
            else if (button.name.equals("addnew")) {
                this.addnew();
            }
            else if (button.name.equals("delete")) {
                if (this.$parent.beforeDelete) {
                    if (!this.$parent.beforeDelete()) {
                        return false;
                    }
                }

                this.$confirm("记录删除后不能恢复，确定要执行删除操作吗？", g.c.titleConfirm, {
                    confirmButtonText: "确定", cancelButtonText: "取消", type: "warning"
                }).then(() => {
                    this.delete();
                })
            }
            else if (button.name.equals("cancel")) {
                if (this.firstAction.equals("addnew")) {
                    win.close();
                }
                else {
                    this.getFormData();
                }
            }
        },
        async save() {
            if (this.$parent.beforeSave) {
                if (!this.$parent.beforeSave({ copy: this.idCopy > 0 })) {
                    return false;
                }
            }

            let blResult = false;
            let nFind, datatype, nullable, text, value;
            for (let key in this.$parent.form) {
                nFind = this.dtbViewField.find([key]);
                if (nFind >= 0) {
                    text = this.dtbViewField.rows[nFind]["text"].value;
                    datatype = this.dtbViewField.rows[nFind]["datatype"].value;
                    nullable = this.dtbViewField.rows[nFind]["flag_nullable"].value;

                    // -- 1. 根据d-validate校验 --
                    let vueFormItem = this.$parent.$refs[key];
                    if (vueFormItem) {
                        let validateRules = vueFormItem.$attrs["d-validate"];
                        if (validateRules) {
                            if (!this.validateFormValue(vueFormItem, key, text, validateRules)) {
                                return false;
                            }
                        }
                    }

                    // -- 2. 根据视图字段定义校验 --
                    if (datatype.equals("tinyint")) {
                        this.$parent.form[key] = this.$parent.form[key] ? true : false;
                    }
                    else {
                        if (g.x.isString(this.$parent.form[key])) {
                            this.$parent.form[key] = this.$parent.form[key].trim();
                        }
                        value = this.$parent.form[key];
                        if (!nullable && !value && this.$parent.$refs[key]) {
                            topWin.message("字段值 [" + text + "] 不允许为空，请检查。", "error");
                            this.$parent.$refs[key].focus();
                            return false;
                        }
                    }
                }
                else {
                    // -- 非视图字段 --
                }
            }

            let id = this.status.equals("addnew") ? 0 : (this.view ? this.dataRowView["id"].value : this.id);
            let postData = { viewPk: this.viewPk, id: id, idCopy: this.idCopy, form: this.$parent.form };
            await ajax.send(this.controller + "/save", postData, { autoShowErr: false }).then(res => {
                if (res.ok) {
                    let addnew = this.status.equals("addnew");
                    let dtbViewData = res.dtbViewData;

                    this.dtbFormData = res.dtbFormData;
                    this.id = this.dtbFormData.rows[0]["id"].value;
                    if (this.view) {
                        if (dtbViewData.rowCount == 0) {
                            this.dataRowView = null;
                            topWin.alert("数据已保存，但不符合网格显示条件，请刷新网格。", "warning");
                        }
                        else {
                            this.dataRowView = dtbViewData.rows[0];
                        }
                    }

                    this.fillFormData();
                    this.firstAction = "view";

                    if (this.view) {
                        if (id == 0) {
                            this.view.afterVfInsert(this.dataRowView);
                        }
                        else {
                            this.view.afterVfUpdate(this.dataRowView);
                        }
                    }

                    if (this.$parent.afterSave) {
                        this.$parent.afterSave({ addnew: addnew, copy: this.idCopy > 0 });
                    }
                    this.idCopy = 0;

                    if (win.p.windowState.equals("maximized")) {
                        topWin.message("数据保存成功。", "success");
                    }
                    else {
                        win.flashTitle("数据保存成功  " + (new Date).toTimeString());
                    }
                    blResult = true;
                }
                else {
                    topWin.alert(res.error, "error");
                }
            });
            return blResult;
        },
        validateFormValue(vueFormItem, key, text, validateRules) {
            let ret;
            let value = this.$parent.form[key];
            let rules = validateRules.split(";");
            // --------------------------------------------
            for (let i = 0; i < rules.length; i++) {
                let rule = rules[i];
                if (rule.equals("dbFieldName")) {
                    ret = validate.dbFieldName(value);
                }
                else {
                    topWin.alert("未实现的验证规则：" + rule + "，请检查。", "error");
                    continue;
                }

                if (ret != true) {
                    topWin.alert(text + " 的值不符合要求：" + ret, "warning", _ => {
                        vueFormItem.focus();
                    });
                    return false;
                }
            }
            return true;
        },
        addnew() {
            // -- beforeAddnew --
            if (this.$parent.beforeAddnew) {
                if (!this.$parent.beforeAddnew({ copy: false })) {
                    return false;
                }
            }

            // -- do addnew --
            this.clear();
            this.setStatus("addnew");

            // -- afterAddnew --
            if (this.$parent.afterAddnew) {
                this.$parent.afterAddnew({ copy: false });
            }
        },
        copy() {
            // -- beforeCopy & beforeAddnew --
            if (this.$parent.beforeCopy) {
                if (!this.$parent.beforeCopy()) {
                    return false;
                }
            }
            if (this.$parent.beforeAddnew) {
                if (!this.$parent.beforeAddnew({ copy: true })) {
                    return false;
                }
            }

            // -- do copy --
            for (let key in this.$parent.form) {
                if (key.equals("id") || key.equals("pk")
                    || key.equals("creator") || key.equals("cdate") || key.equals("modifier") || key.equals("mdate")
                    || key.equals("auditor") || key.equals("adate") || key.equals("astatus")) {
                    this.$parent.form[key] = "";
                }
            }
            this.setStatus("addnew");

            // -- afterCopy & afterAddnew --
            if (this.$parent.afterAddnew) {
                this.$parent.afterAddnew({ copy: true });
            }
            if (this.$parent.afterCopy) {
                this.$parent.afterCopy();
            }
        },
        delete() {
            let id = this.view ? this.dataRowView["id"].value : this.id;
            let idNext = this.view ? this.view.getNextId() : 0;
            let postData = { viewPk: this.viewPk, id: id, idNext: idNext, form: this.$parent.form };
            ajax.send(this.controller + "/delete", postData).then(res => {
                if (res.ok) {
                    if (this.view) {
                        this.dataRowView = this.view.afterVfDelete();
                    }

                    if (this.dataRowView) {
                        this.dtbFormData = res.dtbFormData;
                        this.fillFormData();
                    }

                    if (this.$parent.afterDelete) {
                        this.$parent.afterDelete();
                    }

                    if (this.dataRowView == null) {
                        win.close();
                        return;
                    }

                    if (win.p.windowState.equals("maximized")) {
                        topWin.message("数据删除成功。", "success");
                    }
                    else {
                        win.flashTitle("数据删除成功  " + (new Date).toTimeString());
                    }
                }
                else {
                    this.$alert(res.error, { type: "error", title: "系统消息 ..." });
                }
            });
        },
        remove() {

        },
        clear() {
            for (let key in this.$parent.form) {
                this.$parent.form[key] = "";
            }
        },
        doClick(button) {
            let id = this.status.equals("addnew") ? 0 : this.dataRowView["id"].value;
            let postData = { viewPk: this.viewPk, id: id, form: this.$parent.form, buttonName: button.name };
            ajax.send(this.controller + "/doClick", postData).then(res => {
                if (res.ok) {
                    win.flashTitle("当前操作成功  " + (new Date).toTimeString());
                }
                else {
                    topWin.alert(res.error, "error");
                }
            });
        },
        onViewMove(para) {
            this.dataRowView = para.dataRowView;
            this.getFormData();
        },
        doFlow(button) {
            let flowPk = button.dataRow["flow_pk"].value;
            let buttonPk = button.dataRow["button_pk"].value;
            let id = this.status.equals("addnew") ? 0 : this.dataRowView["id"].value;
            let remove = (button.dataRow["action_remove"].value == 1);
            let idNext = remove ? this.view.getNextId() : 0;
            let postData = { viewPk: this.viewPk, flowPk: flowPk, buttonPk: buttonPk, id: id, idNext: idNext, form: this.$parent.form };
            ajax.send(this.controller + "/doFlow", postData).then(res => {
                if (res.ok) {
                    // -- 移除当前记录 --
                    if (remove) {
                        this.dataRowView = this.view.afterVfDelete();
                        if (this.dataRowView == null) {
                            win.close();
                            return;
                        }
                        // -- 移除网格记录 --
                        if (this.$parent.afterDelete) {
                            this.$parent.afterDelete();
                        }
                    }

                    // -- 刷新界面 --
                    this.dtbFormData = res.dtbFormData;
                    this.fillFormData();

                    // -- afterFlowClick --
                    win.flashTitle("当前操作成功  " + (new Date).toTimeString());
                    if (this.$parent.afterFlowClick) {
                        this.$parent.afterFlowClick();
                    }
                }
                else {
                    this.$alert(res.error, { type: "error", title: "系统消息 ..." });
                }
            });
        },

        getId() {
            if (this.status.equals("view")) {
                return this.dtbFormData.rows[0]["id"].value;
            }
            return 0;
        },
        getValue(columnName) {
            if (this.status.equals("view")) {
                return this.dtbFormData.rows[0][columnName].value;
            }
            return null;
        },
        doSomething() {
            // -- do nothing --
        }
    },
    template: `<el-row>        
        <el-button-group>
            <el-button v-for="button in moveButtons" @click="onClick(button)" :key="button.name" :icon="button.icon" size="medium" style='width:36px;padding-left:0px;padding-right:0px;'></el-button>
        </el-button-group>
        <el-button-group>
            <el-button v-for="button in vfButtons" v-show="!button.hide" size="medium" @click="onClick(button)" :key="button.name" :icon= "button.icon" :type="button.type" plain >
                {{ button.text }}
            </el-button>
        </el-button-group>
        <div style="height:5px;border-top:1px solid #e0e0e0;margin-top:8px;margin-bottom:8px;"></div>
    </el-row>`
})
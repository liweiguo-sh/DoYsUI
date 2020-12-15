Vue.component('taskbar', {
    data: function () {
        return {
            nameSelected: "desktop"
        }
    },
    methods: {
        onBarClick(tab) {
            this.activeBar(tab.name);
        },
        onBarClose(barName) {
            this.closeBar(barName)
        },

        addBar(barAdd) {
            barAdd.closable = true;
            this.taskbars.push(barAdd);
            this.nameSelected = barAdd.name;

            barAdd.win.addEventListener("afterClose", () => {
                if (!barAdd.closing) {
                    this.closeBar(barAdd.name);
                }
            });
        },
        closeBar(barName) {
            let idxBarClose, idxBarNext;
            // -- 1. 查找要关闭的bar，并关闭窗口 --
            for (let i = 0; i < this.taskbars.length; i++) {
                let bar = this.taskbars[i];
                if (bar.name.equals(barName)) {
                    idxBarClose = i;

                    bar.closing = true;
                    bar.win.close();
                    break;
                }
            }
            // -- 2. 预先计算出将要激活的bar下标（关闭当前bar之后） --
            if (idxBarClose < this.taskbars.length - 1) {
                idxBarNext = idxBarClose;
            }
            else {
                if (idxBarClose > 0) {
                    idxBarNext = idxBarClose - 1;
                }
                else {
                    idxBarNext = -1;
                }
            }
            // -- 3. 删除要关闭的bar --
            this.taskbars.splice(idxBarClose, 1);

            // -- 4. 激活下一个bar --
            if (idxBarNext >= 0) {
                this.activeBar(this.taskbars[idxBarNext].key);
            }
            else {
                this.activeBar("desktop");
            }

        },
        findBarByMenuPk(menuPk) {
            for (let i = 0; i < this.taskbars.length; i++) {
                let bar = this.taskbars[i];
                if (bar.menuPk.equals(menuPk)) {
                    return bar;
                }
            }
            return null;
        },
        findBarByName(barName) {
            for (let i = 0; i < this.taskbars.length; i++) {
                let bar = this.taskbars[i];
                if (bar.name.equals(barName)) {
                    return bar;
                }
            }
            return null;
        },
        activeBar(barName) {
            this.nameSelected = barName;

            if (barName.equals("desktop")) {
                this.$emit('onclick', "desktop");
            }
            else {
                let bar = this.findBarByName(barName);
                bar.win.activeWin();
            }
        }
    },
    props: ['taskbars', 'deskbarText'],
    template: `
        <el-tabs type="card" v-model="nameSelected" @tab-remove="onBarClose" @tab-click="onBarClick">
            <el-tab-pane key="desktop" name="desktop"><span slot="label"><i class="el-icon-monitor"></i>{{deskbarText}}</span></el-tab-pane>
            <el-tab-pane v-for="tab in taskbars" :key="tab.key" :name="tab.name" :label="tab.title" :menuPk="tab.menuPk" :closable="tab.closable"></el-tab-pane>
        </el-tabs>`
})
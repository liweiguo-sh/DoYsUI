Vue.component('taskbar', {
    data: function () {
        return {
            nameSelected: ""
        }
    },
    methods: {
        onBarClick(tab) {
            this.$emit('onclick', {
                name: tab.name,
                menu: tab.$attrs["menu"]
            });
        },
        onBarClose(barName) {
            let barClose, barNext;

            for (let i = 0; i < this.taskbars.length; i++) {
                let bar = this.taskbars[i];
                if (bar.name.equals(barName)) {
                    barClose = bar;
                    barClose.index = i;
                    if (i < this.taskbars.length - 1) {
                        barNext = this.taskbars[i + 1];
                        barNext.index = i + 1;
                    }
                    else {
                        if (i > 0) {
                            barNext = this.taskbars[i - 1];
                            barNext.index = i - 1;
                        }
                        else {
                            // -- no tabs --
                            console.log("no tabs");
                        }
                    }
                    break;
                }
            }

            this.$emit("onclose", barClose, barNext);
        },

        addBar(barAdd) {
            barAdd.closable = true;
            this.taskbars.push(barAdd);
            this.nameSelected = barAdd.name;
        },
        closeBar(barClose, barNext) {
            if (barClose.win && !barClose.win.closed) {
                barClose.win.close();
            }
            this.taskbars.splice(barClose.index, 1);

            if (barNext) {
                this.nameSelected = barNext.name;
            }
        },
        findBar(barName) {
            for (let i = 0; i < this.taskbars.length; i++) {
                let bar = this.taskbars[i];
                if (bar.name.equals(barName)) {
                    return bar;
                }
            }
            return null;
        },
        activeBar(bar) {
            this.nameSelected = bar.name;
        }
    },
    props: ['taskbars', 'deskbarText'],
    template: `
        <el-tabs type="card" v-model="nameSelected" @tab-remove="onBarClose" @tab-click="onBarClick">
            <el-tab-pane name="desktop"><span slot="label"><i class="el-icon-monitor"></i>{{deskbarText}}</span></el-tab-pane>
            <el-tab-pane v-for="tab in taskbars" :key="tab.name" :name="tab.name" :label="tab.title" :menu="tab.menu" :closable="tab.closable"></el-tab-pane>
        </el-tabs>`
})
Vue.component('main-menu', {
    data: function () {
        return {}
    },
    methods: {
        onMenuClick(menu) {
            this.$emit('onmenuclick', menu);
        }
    },
    props: ['menus'],
    template: `
        <el-menu class="top-menu-L1" mode="horizontal" background-color="white" active-text-color1="blue" text-color1="#fff">
            <sub-menu v-on:menuclick="onMenuClick" class="top-menu-L1" v-for="menu in menus" :index="menu.key" :key="menu.key" :menu="menu" style="float:left;z-index:90000">{{menu.value}}</sub-menu>
        </el-menu>`
})

Vue.component('sub-menu', {
    data: function () {
        return {}
    },
    props: ['menu'],
    methods: {
        onMenuClick(menu) {
            this.$emit('menuclick', menu);
        }
    },
    template: `
        <div>
            <div v-if="menu.text=='-'"><div class='el-menu-item-cutting-line'></div></div>
            <el-menu-item v-else-if="menu.isLeaf" @click="onMenuClick(menu)" :index="menu.key" :key="menu.key">{{menu.text}}</el-menu-item>
            <el-submenu v-else :index="menu.key">
                <template slot="title">{{menu.text}}</template>
                <sub-menu v-for="menu in menu.menus" v-on:menuclick="onMenuClick" :index="menu.key" :key="menu.key" :menu="menu" style="z-index:90001">{{menu.text}}</sub-menu>
            </el-submenu>
        </div>`
})

/**
 * dtbMenu转换为JSON
 * @param {any} dtbMenu
 * @param {any} nodeKeyParent
 */
function dtbMenuToJson(dtbMenu, nodeKeyParent) {
    let lastIsLine = false;
    let menus = new Array();

    for (let i = 0; i < dtbMenu.rowCount; i++) {
        let dataRow = dtbMenu.rows[i];
        let pk = dataRow["pk"].value;
        let text = dataRow["text"].value;

        if (text.equals("-")) {
            if (lastIsLine) continue;
            lastIsLine = true;
        }
        else {
            lastIsLine = false;
        }

        if (pk.length - nodeKeyParent.length == 3 && pk.indexOf(nodeKeyParent) == 0) {
            let menu = {};
            for (let j = 0; j < dtbMenu.columnCount; j++) {
                let columnName = dtbMenu.columns[j].name;
                menu[columnName.toCamelCase()] = dataRow[columnName].value;
            }
            menu["key"] = menu["pk"];

            if (!menu.isLeaf) {
                menu["menus"] = dtbMenuToJson(dtbMenu, pk);
            }

            menus.push(menu);
        }
    }

    return menus;
}
﻿Vue.component('main-view-bar', {
    data: function () {
        return {
            searchText: ""
        }
    },
    methods: {
        clearSearch() {
            this.searchText = "";
        },
        onClick(button) {
            this.$emit('onclick', button);
        },
        onSearch() {
            this.searchText = this.searchText.trim();
            this.$emit('onsearch', this.searchText);
        },
        onClear() {
            this.$emit('onclear');
        }
    },
    props: ['attrs'],
    template: `<el-row>
        <el-col :span="18">
            <el-button v-for="button in attrs.leftButtons" @click="onClick(button)" :key="button.name" :icon="button.icon" :type="button.type" plain>
                {{button.text}}
            </el-button>
            <el-input v-if="attrs.showSearch" v-model="searchText" @change="onSearch" @clear="onClear" :placeholder="attrs.searchPlaceholder" clearable style="width:250px;margin-left:15px;"></el-input>
        </el-col>
        <el-col :span="6" style="text-align:right">
            <el-button v-for="button in attrs.rightButtons" @click="onClick(button)" :key="button.name" :type="button.type" :icon="button.icon" :title="button.text" circle>
            </el-button>
        </el-col>
    </el-row>`
})
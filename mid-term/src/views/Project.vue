<template>
    <el-container>
        <el-header>
            <Header style="z-index:inherit"></Header>
        </el-header>
        <el-aside>
        </el-aside>
        <el-main>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="原型设计" name="first">
                    <DesignPage :freshFlag="freshFlag"></DesignPage>
                </el-tab-pane>
                <el-tab-pane label="项目文档" name="second">
                    <Document :freshFlag="freshFlag"></Document>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<script>
import Document from '@/components/Document.vue';
import DesignPage from '@/components/DesignPage.vue'
import Header from '@/components/HeaderComponent.vue'
export default {
    components: { Document, DesignPage, Header },
    data() {
        return {
            activeName: 'first',
            freshFlag: false
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
            this.freshFlag = !this.freshFlag;
        }
    },
    created() {
        let canvasStyle = { "width": "1200", "height": "700", "scale": 100, "color": "#000", "opacity": 1, "background": "#fff", "fontSize": 14 };
        localStorage.setItem('canvasStyle', JSON.stringify(canvasStyle));
    }
};
</script>
<template>
    <el-container>
        <el-header>
            <Header style="z-index:inherit"></Header>
        </el-header>
        <el-aside>
        </el-aside>
        <el-main>
            <div class="container">
                <div style="width: 100%; flex-wrap: wrap; display: flex;">
                    <div class="docment-container" v-for="document in documents">
                        <div class="document" @click="editDocument(document.prototypeID)">
                            <div class="layer layer2"></div>
                        </div>
                        <div class="message-container">
                            {{ document.title }}
                        </div>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import Header from '@/components/HeaderComponent.vue';
import axios from 'axios'
export default {
    components: { Header },
    data() {
        return {
            documents: [
            ],
        };
    },
    methods: {
        editDocument(a) {
            let { href } = this.$router.resolve('/test/' + a);
            window.open(href, `_blank`)
            this.$router.go(0);
        },
        getDocument() {
            axios.get('http://43.143.140.26/api/prototype/getallpreview', {
                params: {
                    projectId: this.$route.params.projectID
                }
            })
                .then(res => {
                    switch (res.data.errno) {
                        case 0: {
                            this.documents = res.data.prototypes;
                            break;
                        }
                        case 1003: {
                            this.$message.error("预览链接失效");
                            break;
                        }
                        default: {
                            this.$message.error("获取文档信息失败！");
                            break;
                        }

                    }
                })
                .catch(err => {
                    console.log(err);         /* 若出现异常则在终端输出相关信息 */
                })
        },
    },
    created() {
        this.projectId = this.$route.params.projectID;
        this.getDocument();
    }
};
</script>
  
<style>
.el-dialog__body {
    max-height: 500px;
    /* 设置最大高度 */
    overflow-y: auto;
    /* 添加垂直滚动条 */
}

.docment-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    /* 减小相邻元素之间的间距 */
    width: 100px;
    margin: 10px 20px 0px 20px;
}

.docment-container2 {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    /* 减小相邻元素之间的间距 */
    width: 100px;
    margin: 10px 20px 0px 20px;
}

.document {
    position: relative;
    width: 100px;
    height: 100px;
}

.layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.3s ease;
}

.layer1 {
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    z-index: 2;
    /* 设置较高的 z-index 值 */
}

.layer1 i {
    margin: 0 10px;
}

.layer2 {
    background-color: rgba(0, 0, 0, 0);
    opacity: 1;
    background-image: url('../assets/400.png');
    background-size: cover;
    /* 添加背景图片填充容器的样式 */
    background-position: center;
    /* 添加背景图片居中对齐的样式 */
}

.layer3 {
    background-color: rgba(0, 0, 0, 0);
    opacity: 1;
    background-image: url('../assets/1692969768431.png');
    background-size: cover;
    /* 添加背景图片填充容器的样式 */
    background-position: center;
    /* 添加背景图片居中对齐的样式 */
}

.hidden {
    visibility: hidden;
}

.document:hover .layer1 {
    visibility: visible;
}

.document:hover .layer2 {
    opacity: 0.3;
}

.document:hover .layer3 {
    opacity: 0.7;
}

.message-container {
    margin-top: 10px;
    /* 减小上方的垂直间距 */
    width: 100%;
    text-align: center;
}

.message {
    font-size: 20px;
    height: 50px;
}

.container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    overflow: auto;
    /* 添加滚动条，当内容溢出时 */

}

.bWewju .topHeader {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 13px 18px 13px 26px;
    border-bottom: 1px solid rgba(232, 232, 232, 0.7);
    height: 60px;
}

.template-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.template-title {
    font-size: 20px;
    font-weight: bold;
}

.search-box {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px;
}

.search-box input {
    border: none;
    outline: none;
    width: 200px;
    padding: 5px;
}

.search-box i {
    margin-left: 5px;
    cursor: pointer;
}

.block {
    margin-top: 10px;
    /* 添加间距来使下面的块下移一些 */
    width: 154px;
    height: 146px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    margin: 10px;
}

.block:hover {
    /* 蓝色边框样式 */
    border-color: blue;
}

.block.active {
    /* 蓝色边框样式 */
    border-color: blue;
}

.custom-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.custom-button:hover {
    color: rgb(26, 26, 192);
    /* 鼠标移入时文字变为蓝色 */
}

.text-arrow-gap {
    width: 2px;
    /* 文本和箭头的间距 */
    display: inline-block;
    vertical-align: middle;
    /* 确保文本和箭头垂直居中 */
}

.caret.rotate {
    transform: rotate(180deg);
    /* 三角箭头向上的旋转效果 */
}

.block {
    display: flex;
    align-items: center;
}

.customizeContent {
    margin-top: 5px;
}

.bottomTitle {
    font-size: 14px;
    font-weight: bold;
}

.customizeInput {
    display: flex;
    margin-top: 4px;
}

.inputGroup {
    display: flex;
    align-items: center;
    margin-right: 5px;
}

.title {
    margin-right: 3px;
    font-size: 14px;
    /* 调整字体大小 */
}

.inputField {
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 2px;
    width: 40px;
    font-size: 13px;
    margin-top: 2px;
    /* 调整顶部间距 */
}

.inputField.inputNumber input::placeholder {
    font-size: 13px;
    color: #aaa;
}

.dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 0;
    margin: 5px 0 0;
    max-height: 150px;
    /* 设置最大高度，根据需要进行调整 */
    overflow: auto;
    /* 添加滚动条 */
}

.option-item {
    /* 确保每个选项不超过容器的宽度 */
    max-width: 100%;
    white-space: nowrap;
    /* 防止文字换行 */
    overflow: hidden;
    text-overflow: ellipsis;
    /* 添加省略号 */
}

.dropdown li {
    padding: 8px;
    cursor: pointer;
}

.dropdown li:hover {
    background-color: #f2f2f2;
}

.label-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
</style>
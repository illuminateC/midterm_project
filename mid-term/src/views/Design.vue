<template>
    <div class="home">
        <div v-if="download === false">
            <Toolbar @width-change="handleWidthChange" @height-change="handleHeightChange" @exportHTML="exportHTML"
                @exportJavaScript="exportJavaScript" @exportCSS="exportCSS" />
        </div>
        <main>
            <!-- 左侧组件列表 -->
            <section class="left">
                <div v-if="download === false">
                    <ComponentList />
                    <RealTimeComponentList />
                </div>
            </section>
            <!-- 中间画布 -->
            <section class="center">
                <div class="content" @drop="handleDrop" @dragover="handleDragOver" @mousedown="handleMouseDown"
                    @mouseup="deselectCurComponent">
                    <Editor :download="download"/>
                </div>
            </section>
            <!-- 右侧属性列表 -->
            <section class="right">
                <div v-if="download === false">
                    <el-tabs v-if="curComponent" v-model="activeName">
                        <el-tab-pane label="属性" name="attr">
                            <component :is="curComponent.component + 'Attr'" />
                        </el-tab-pane>
                        <el-tab-pane label="动画" name="animation" style="padding-top: 20px;">
                            <AnimationList />
                        </el-tab-pane>
                        <el-tab-pane label="事件" name="events" style="padding-top: 20px;">
                            <EventList />
                        </el-tab-pane>
                    </el-tabs>
                    <CanvasAttr v-else></CanvasAttr>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import Editor from '@/components/Editor/index'
import ComponentList from '@/components/ComponentList' // 左侧列表组件
import AnimationList from '@/components/AnimationList' // 右侧动画列表
import EventList from '@/components/EventList' // 右侧事件列表
import componentList from '@/custom-component/component-list' // 左侧列表数据
import Toolbar from '@/components/Toolbar'
import { deepCopy } from '@/utils/utils'
import { mapState } from 'vuex'
import generateID from '@/utils/generateID'
import { listenGlobalKeyDown } from '@/utils/shortcutKey'
import RealTimeComponentList from '@/components/RealTimeComponentList'
import CanvasAttr from '@/components/CanvasAttr'
import { changeComponentSizeWithScale } from '@/utils/changeComponentsSizeWithScale'
import { setDefaultcomponentData } from '@/store/snapshot'
import axios from 'axios'
import qs from "qs"
export default {
    components: { Editor, ComponentList, AnimationList, EventList, Toolbar, RealTimeComponentList, CanvasAttr },
    data() {
        return {
            download: false,
            activeName: 'attr',
            reSelectAnimateIndex: undefined,
            ws: '',
            component: '',
            canvasStyle: '',
        }
    },
    computed: mapState([
        'componentData',
        'curComponent',
        'isClickComponent',
        'canvasStyleData',
        'editor',
    ]),
    created() {
        this.init()
        this.restore()
        this.component = localStorage.getItem('canvasData');
        this.canvasStyle = localStorage.getItem('canvasStyle');
        // 全局监听按键事件
        listenGlobalKeyDown()
    },
    methods: {
        // 导出页面内容为HTML文件
        exportHTML() {
            this.download = true;
            this.$nextTick(() => {
                const htmlContent = document.documentElement.outerHTML;
                this.downloadFile(htmlContent, 'exported_page.html', 'text/html');
                this.download = false; // 可以在下载完成后将其重置回 false
            });
        },

        // 导出页面的JavaScript代码为JS文件
        exportJavaScript() {
            this.download = true;
            this.$nextTick(() => {
                const scriptElements = document.querySelectorAll('script');
                let javascriptContent = '';

                scriptElements.forEach((script) => {
                    javascriptContent += script.textContent + '\n';
                });

                this.downloadFile(javascriptContent, 'exported_page.js', 'text/javascript');
                this.download = false;
            });
        },

        // 导出页面的CSS样式为CSS文件
        exportCSS() {
            this.download = true;
            this.$nextTick(() => {
                const styleElements = document.querySelectorAll('style');
                let cssContent = '';

                styleElements.forEach((style) => {
                    cssContent += style.textContent + '\n';
                });

                this.downloadFile(cssContent, 'exported_page.css', 'text/css');
                this.download = false;
            });
        },

        downloadFile(data, filename, type) {
            const blob = new Blob([data], { type: type });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        },
        handleWidthChange(newWidth) {
            this.canvasStyleData.width = newWidth;
            this.sendMsg();
        },
        handleHeightChange(newHeight) {
            this.canvasStyleData.height = newHeight;
            this.sendMsg();
        },
        init() {
            let id = sessionStorage.getItem("userId");
            let socketUrl = "ws://43.143.140.26:7002/ws/prototype/?prototypeId=" + this.$route.params.prototypeID + "&userId=" + id;
            this.ws = new WebSocket(socketUrl);
            this.ws.addEventListener("open", () => {
                console.log("websocket已打开");
            });
            this.ws.addEventListener("message", (e) => {
                const dataStr = e.data.split("$$$");
                const componentDataStr = dataStr[0];
                const canvasStyleDataStr = dataStr[1];
                console.log("canvasStyleDataStr" + canvasStyleDataStr)
                const data_1 = JSON.parse(componentDataStr);
                const data_2 = JSON.parse(canvasStyleDataStr);
                setDefaultcomponentData(data_1)
                this.$store.commit('setComponentData', data_1)
                this.$store.commit('setCanvasStyle', data_2)
                this.component = componentDataStr;
                this.canvasStyle = canvasStyleDataStr;
            });
        },
        sendMsg() {
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify(this.componentData) + "$$$" + JSON.stringify(this.canvasStyleData));
            }
        },
        restore() {
            axios.get('http://43.143.140.26/api/prototype/getprototype', {
                params: {
                    prototypeID: this.$route.params.prototypeID
                }
            })
                .then(res => {              /* res 是 response 的缩写 */
                    switch (res.data.errno) {
                        case 0: {
                            if (res.data.componentData) {
                                setDefaultcomponentData(JSON.parse(res.data.componentData))
                                this.$store.commit('setComponentData', JSON.parse(res.data.componentData))
                            }
                            if (res.data.canvasStyleData) {
                                this.$store.commit('setCanvasStyle', JSON.parse(res.data.canvasStyleData))
                            }
                            this.$message.success("打开原型图成功！");
                            break;
                        }
                        default: {
                            this.$message.warning("打开原型图失败！");
                            break;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);         /* 若出现异常则在终端输出相关信息 */
                })
        },

        handleDrop(e) {
            e.preventDefault()
            e.stopPropagation()

            const index = e.dataTransfer.getData('index')
            const rectInfo = this.editor.getBoundingClientRect()
            if (index) {
                const component = deepCopy(componentList[index])
                component.style.top = e.clientY - rectInfo.y
                component.style.left = e.clientX - rectInfo.x
                component.id = generateID()

                // 根据画面比例修改组件样式比例 https://github.com/woai3c/visual-drag-demo/issues/91
                changeComponentSizeWithScale(component)

                this.$store.commit('addComponent', { component })
                this.$store.commit('recordSnapshot')
            }
        },

        handleDragOver(e) {
            e.preventDefault()
            e.dataTransfer.dropEffect = 'copy'
        },

        handleMouseDown(e) {
            e.stopPropagation()
            this.$store.commit('setClickComponentStatus', false)
            this.$store.commit('setInEditorStatus', true)
        },

        deselectCurComponent(e) {
            if (!this.isClickComponent) {
                this.$store.commit('setCurComponent', { component: null, index: null })
            }

            // 0 左击 1 滚轮 2 右击
            if (e.button != 2) {
                this.$store.commit('hideContextMenu')
            }
        },
    },
    watch: {
        componentData(newVal, oldVal) {
            if (JSON.stringify(this.componentData) !== this.component) {
                this.sendMsg();
            }
            if (JSON.stringify(this.canvasStyleData) !== this.canvasStyle) {
                this.sendMsg();
            }
        },
        curComponent(newVal, oldVal) {
            if (JSON.stringify(this.componentData) !== this.component) {
                this.sendMsg();
            }
            if (JSON.stringify(this.canvasStyleData) !== this.canvasStyle) {
                this.sendMsg();
            }
        },
        isClickComponent(newVal, oldVal) {
            if (JSON.stringify(this.componentData) !== this.component) {
                this.sendMsg();
            }
            if (JSON.stringify(this.canvasStyleData) !== this.canvasStyle) {
                this.sendMsg();
            }
        },
        canvasStyleData(newVal, oldVal) {
            if (JSON.stringify(this.componentData) !== this.component) {
                this.sendMsg();
            }
            if (JSON.stringify(this.canvasStyleData) !== this.canvasStyle) {
                this.sendMsg();
            }
        },
        editor(newVal, oldVal) {
            if (JSON.stringify(this.componentData) !== this.component) {
                this.sendMsg();
            }
            if (JSON.stringify(this.canvasStyleData) !== this.canvasStyle) {
                this.sendMsg();
            }
        },
    },
    // mounted() {
    //     this.init();
    // }
}
</script>

<style lang="scss">
.home {
    height: 100vh;
    background: #fff;

    main {
        height: calc(100% - 64px);
        position: relative;

        .left {
            position: absolute;
            height: 100%;
            width: 200px;
            left: 0;
            top: 0;

            &>div {
                overflow: auto;

                &:first-child {
                    border-bottom: 1px solid #ddd;
                }
            }
        }

        .right {
            position: absolute;
            height: 100%;
            width: 288px;
            right: 0;
            top: 0;

            .el-select {
                width: 100%;
            }
        }

        .center {
            margin-left: 200px;
            margin-right: 288px;
            background: #f5f5f5;
            height: 100%;
            overflow: auto;
            padding: 20px;

            .content {
                width: 100%;
                height: 100%;
                overflow: auto;
            }
        }
    }

    .placeholder {
        text-align: center;
        color: #333;
    }

    .global-attr {
        padding: 10px;
    }
}
</style>

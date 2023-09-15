<template>
    <div ref="container" class="bg">
        <div class="canvas-container">
            <div class="canvas" :style="{
                ...getCanvasStyle(canvasStyleData),
                width: changeStyleWithScale(canvasStyleData.width) + 'px',
                height: changeStyleWithScale(canvasStyleData.height) + 'px',
            }">
                <ComponentWrapper v-for="(item, index) in copyData" :key="index" :config="item" />
            </div>
        </div>
    </div>
</template>

<script>
import { getStyle, getCanvasStyle } from '@/utils/style'
import { mapState } from 'vuex'
import ComponentWrapper from '@/components/Editor/ComponentWrapper'
import { changeStyleWithScale } from '@/utils/translate'
import { deepCopy } from '@/utils/utils'
import { setDefaultcomponentData } from '@/store/snapshot'
import axios from 'axios'

export default {
    components: { ComponentWrapper },
    data() {
        return {
            copyData: [],
        }
    },
    computed: mapState([
        'componentData',
        'canvasStyleData',
    ]),
    created() {
        this.restore()
    },
    methods: {
        getStyle,
        getCanvasStyle,
        changeStyleWithScale,
        restore() {
            axios.get('http://43.143.140.26/api/prototype/getpreview', {
                params: {
                    prototypeId: this.$route.params.prototypeID
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
                            this.$set(this, 'copyData', deepCopy(this.componentData))
                            this.$message.success("打开原型图成功！");
                            break;
                        }
                        case 1003: {
                            this.$message.error("预览链接失效");
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
    },
}
</script>

<style lang="scss" scoped>
.bg {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    background: rgb(0, 0, 0, .5);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    padding: 20px;

    .canvas-container {
        width: calc(100% - 40px);
        height: calc(100% - 120px);
        overflow: auto;

        .canvas {
            background: #fff;
            position: relative;
            margin: auto;
        }
    }

    .close {
        position: absolute;
        right: 20px;
        top: 20px;
    }

    .close2 {
        position: absolute;
        right: 18px;
        top: 70px;
    }

    .close3 {
        position: absolute;
        right: 60px;
        top: 120px;
    }
}
</style>

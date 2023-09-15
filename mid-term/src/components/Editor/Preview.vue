<template>
    <div ref="container" class="bg">
        <el-button v-if="!isScreenshot" class="close" @click="close">关闭</el-button>
        <div v-else>
            <el-button class="close" @click="htmlToImage">保存为.png格式图片</el-button>
            <el-button class="close2" @click="htmlToImageJpeg">保存为.jpeg格式图片</el-button>
            <el-button class="close3" @click="close">关闭</el-button>
        </div>
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
import ComponentWrapper from './ComponentWrapper'
import { changeStyleWithScale } from '@/utils/translate'
import { toPng, toJpeg } from 'html-to-image'
import { deepCopy } from '@/utils/utils'

export default {
    components: { ComponentWrapper },
    props: {
        isScreenshot: {
            type: Boolean,
            default: false,
        },
    },
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
        this.$set(this, 'copyData', deepCopy(this.componentData))
    },
    methods: {
        getStyle,
        getCanvasStyle,
        changeStyleWithScale,

        close() {
            this.$emit('close')
        },

        htmlToImage() {
            const containerElement = this.$refs.container.querySelector('.canvas');
            toPng(containerElement)
                .then(pngDataUrl => {
                    this.downloadImage(pngDataUrl, 'screenshot.png');
                })
                .catch(error => {
                    console.error('Oops, something went wrong!', error);
                })
                .finally(this.close);
        },
        htmlToImageJpeg() {
            const containerElement = this.$refs.container.querySelector('.canvas');
            toJpeg(containerElement, { quality: 0.8 })
                .then(jpegDataUrl => {
                    this.downloadImage(jpegDataUrl, 'screenshot.jpeg');
                })
                .catch(error => {
                    console.error('Oops, something went wrong!', error);
                })
                .finally(this.close);
        },
        downloadImage(dataUrl, fileName) {
            const a = document.createElement('a');
            a.setAttribute('download', fileName);
            a.href = dataUrl;
            a.click();
        }
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

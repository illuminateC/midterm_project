<template>
    <div>
        <div class="div1">
            <div class="home_header">
                <div class="home_icon">
                    <img src="../assets/logo.png" alt="" style=" object-fit: contain; width: 100%; height: 100%;">
                </div>
                <div class="home_button">
                    <button class="button1">
                        <p @click="routerToHelp">教程</p>
                    </button>
                    <button class="button2">
                        <p @click="routerToLogin">登录</p>
                    </button>
                    <button class="button3">
                        <p @click="routerToLogin">注册</p>
                    </button>
                    <div class="slider"></div>
                </div>
            </div>
            <div class="home_des">
                <div style="width: 120%; height: 10vh; margin-left: -10%;">
                    <h1>纵软云，让软工成为一种享受！</h1>
                </div>
                <div style="width: 100%; height: 10vh;">
                    <p>软工团队协作与管理平台</p>
                </div>
                <div style="width: 100%;"><button @click="routerTo">免费开始</button></div>
            </div>
        </div>
        <div class="div2">
            <div class="home_header2" style="width: 100%; height: 10vh;">
                <h1 style="font-size: 40px;">我的设计利器，团队的协作平台</h1>
            </div>
            <div class="home_des2"
                style="position: absolute; top: 135vh; display: flex; flex-wrap: wrap; margin-left: 5%; width: 100%;">
                <div style="width: 30%; height: 50vh;">
                    <img src="../assets/logo1.png" alt="" style=" object-fit: contain; width: 60%; height: 60%;">
                    <div style="width: 100%; height: 5vh;">
                        <h1>高效协同工作</h1>
                    </div>
                    <div style="width: 100%; height: 10vh;">
                        <p>全流程协作提升团队协作效能</p>
                    </div>
                </div>
                <div style="width: 30%; height: 50vh;">
                    <img src="../assets/logo2.png" alt="" style=" object-fit: contain; width: 60%; height: 60%;">
                    <div style="width: 100%; height: 5vh;">
                        <h1>专业UI设计</h1>
                    </div>
                    <div style="width: 100%; height: 10vh;">
                        <p>协同设计轻松搞定设计与创作</p>
                    </div>
                </div>
                <div style="width: 30%; height: 50vh;">
                    <img src="../assets/logo3.png" alt="" style=" object-fit: contain; width: 60%; height: 60%;">
                    <div style="width: 100%; height: 5vh;">
                        <h1>项目快速设计</h1>
                    </div>
                    <div style="width: 100%; height: 10vh;">
                        <p>提供模板快速设计原型与文档</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="div3">
            <div class="div3_left" style="width: 40%;">
                <div style="width: 100%; height: 5vh; margin-top: 20%;">
                    <h1 style="font-size: 42px;">高效协同工作</h1>
                </div>
                <div class="div3_1" @mouseover="flag1 = 1" style="margin-top: 15%;">
                    <div style="width: 100%; height: 5vh;">
                        <h1>快捷团队管理</h1>
                    </div>
                    <div style="width: 100%; height: 10vh; margin-top: 15px;">
                        <p>团队权限设置 | 实时聊天交流 | 快捷信息通知 | 设计任务管理</p>
                    </div>
                </div>
                <div class="div3_2" @mouseover="flag1 = 2">
                    <div style="width: 100%; height: 5vh;">
                        <h1>文档协作编辑</h1>
                    </div>
                    <div style="width: 100%; height: 10vh; margin-top: 15px;">
                        <p>文档版本回退 | 实时多光标协同 | 提供多个文档模板</p>
                    </div>
                </div>
                <div class="div3_3" @mouseover="flag1 = 3">
                    <div style="width: 100%; height: 5vh;">
                        <h1>原型页面设计</h1>
                    </div>
                    <div style="width: 100%; height: 10vh; margin-top: 15px;">
                        <p>简单高效的设计 | 提供丰富实用的设计模板 | 导出图片 | 生成预览</p>
                    </div>
                </div>
            </div>
            <div class="div3_right" style="width: 60%;">
                <transition name="fade" mode="out-in">
                    <div v-if="flag1 === 1" key="image1"
                        style=" margin-top: 20%; margin-left: 10%; width: 80%; height: 60%; background-color: pink; border-radius: 25px; box-shadow: 0 0 5px 2px rgb(163, 163, 163); transition: all ease 0.2s;">
                        <img src="../assets/div1_1.png" alt=""
                            style="object-fit: contain; width: 100%; height: 100%; border-radius: 25px;">
                    </div>
                    <div v-else-if="flag1 === 2" key="image2"
                        style=" margin-top: 20%; margin-left: 10%; width: 80%; height: 60%; background-color: pink; border-radius: 25px; box-shadow: 0 0 5px 2px rgb(163, 163, 163); transition: all ease 0.2s;">
                        <img src="../assets/div_2.png" alt=""
                            style="object-fit: contain; width: 100%; height: 100%; border-radius: 25px;">
                    </div>
                    <div v-else-if="flag1 === 3" key="image3"
                        style=" margin-top: 20%; margin-left: 10%; width: 80%; height: 60%; background-color: pink; border-radius: 25px; box-shadow: 0 0 5px 2px rgb(163, 163, 163); transition: all ease 0.2s;">
                        <img src="../assets/div_3.png" alt=""
                            style="object-fit: contain; width: 100%; height: 100%; border-radius: 25px;">
                    </div>
                </transition>
            </div>
        </div>
        <div class="div4">
            <div class="div4_left" style="width: 60%;">
                <transition name="fade" mode="out-in">
                    <div v-if="flag2 === 1" key="image1"
                        style=" margin-top: 20%; margin-left: 10%; width: 80%; height: 60%; background-color: pink; border-radius: 25px; box-shadow: 0 0 5px 2px rgb(163, 163, 163); transition: all ease 0.2s;">
                        <img src="../assets/div2_1.png" alt=""
                            style="object-fit: contain; width: 100%; height: 100%; border-radius: 25px;">
                    </div>
                    <div v-else-if="flag2 === 2" key="image2"
                        style=" margin-top: 20%; margin-left: 10%; width: 80%; height: 60%; background-color: pink; border-radius: 25px; box-shadow: 0 0 5px 2px rgb(163, 163, 163); transition: all ease 0.2s;">
                        <img src="../assets/div2_2.png" alt=""
                            style="object-fit: contain; width: 100%; height: 100%; border-radius: 25px;">
                    </div>
                    <div v-else-if="flag2 === 3" key="image3"
                        style=" margin-top: 20%; margin-left: 10%; width: 80%; height: 60%; background-color: pink; border-radius: 25px; box-shadow: 0 0 5px 2px rgb(163, 163, 163); transition: all ease 0.2s;">
                        <img src="../assets/div_1.png" alt=""
                            style="object-fit: contain; width: 100%; height: 100%; border-radius: 25px;">
                    </div>
                </transition>
            </div>
            <div class="div4_right" style="width: 40%; margin-right: 5%;">
                <div style="width: 100%; height: 5vh; margin-top: 20%;">
                    <h1 style="font-size: 42px;">纵软云，让团队成就团队</h1>
                </div>
                <div class="div4_1" @mouseover="flag2 = 1" style="margin-top: 15%;">
                    <div style="width: 100%; height: 5vh;">
                        <h1>实时通讯</h1>
                    </div>
                    <div style="width: 100%; height: 10vh; margin-top: 15px;">
                        <p>不要让哑巴项目继续长痛</p>
                    </div>
                </div>
                <div class="div4_2" @mouseover="flag2 = 2">
                    <div style="width: 100%; height: 5vh;">
                        <h1>项目管理</h1>
                    </div>
                    <div style="width: 100%; height: 10vh; margin-top: 15px;">
                        <p>做自己的CEO，一切都在你手中</p>
                    </div>
                </div>
                <div class="div4_3" @mouseover="flag2 = 3">
                    <div style="width: 100%; height: 5vh;">
                        <h1>在线协同</h1>
                    </div>
                    <div style="width: 100%; height: 10vh; margin-top: 15px;">
                        <p>线下到线上，无时无地不软工</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="div5">
            <div class="div5_left" style="width: 40%;">
                <div style="width: 100%; height: 5vh; margin-top: 20%;">
                    <h1 style="font-size: 42px;">想你所想，成你所成</h1>
                </div>
                <div class="div5_1" @mouseover="flag3 = 1" style="margin-top: 15%;">
                    <div style="width: 100%; height: 5vh;">
                        <h1>在线文档</h1>
                    </div>
                    <div style="width: 100%; height: 10vh; margin-top: 15px;">
                        <p>聊天式办公，用你的光标创造你的梦想</p>
                    </div>
                </div>
                <div class="div5_2" @mouseover="flag3 = 2">
                    <div style="width: 100%; height: 5vh;">
                        <h1>多样模板</h1>
                    </div>
                    <div style="width: 100%; height: 10vh; margin-top: 15px;">
                        <p>提供海量模板，丰富您的设计</p>
                    </div>
                </div>
                <div class="div5_3" @mouseover="flag3 = 3">
                    <div style="width: 100%; height: 5vh;">
                        <h1>便捷操作</h1>
                    </div>
                    <div style="width: 100%; height: 10vh; margin-top: 15px;">
                        <p>一指一点，成就您的梦想</p>
                    </div>
                </div>
            </div>
            <div class="div5_right" style="width: 60%;">
                <transition name="fade" mode="out-in">
                    <div v-if="flag3 === 1" key="image1"
                        style=" margin-top: 20%; margin-left: 10%; width: 80%; height: 60%; background-color: pink; border-radius: 25px; box-shadow: 0 0 5px 2px rgb(163, 163, 163); transition: all ease 0.2s;">
                        <img src="../assets/div3_1.png" alt=""
                            style="object-fit: contain; width: 100%; height: 100%; border-radius: 25px;">
                    </div>
                    <div v-else-if="flag3 === 2" key="image2"
                        style=" margin-top: 20%; margin-left: 10%; width: 80%; height: 60%; background-color: pink; border-radius: 25px; box-shadow: 0 0 5px 2px rgb(163, 163, 163); transition: all ease 0.2s;">
                        <img src="../assets/div3_2.png" alt=""
                            style="object-fit: contain; width: 100%; height: 100%; border-radius: 25px;">
                    </div>
                    <div v-else-if="flag3 === 3" key="image3"
                        style=" margin-top: 20%; margin-left: 10%; width: 80%; height: 60%; background-color: pink; border-radius: 25px; box-shadow: 0 0 5px 2px rgb(163, 163, 163); transition: all ease 0.2s;">
                        <img src="../assets/div3_3.png" alt=""
                            style="object-fit: contain; width: 100%; height: 100%; border-radius: 25px;">
                    </div>
                </transition>
            </div>
        </div>
        <div class="div6">
            <div class="home_des6">
                <div style="width: 100%; height: 10vh;">
                    <h1>纵软云，您的第一选择</h1>
                </div>
                <div style="width: 100%; height: 10vh;">
                    <p>您和您的团队也可以</p>
                </div>
                <div style="width: 100%;"><button @click="routerTo">免费开始</button></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flag1: 1,
            flag2: 1,
            flag3: 1
        }
    },
    methods: {
        routerToLogin() {
            this.$router.push("/login");
        },
        routerToHelp() {
            // this.$router.push("/help");
            let { href } = this.$router.resolve('/help');
            window.open(href, `_blank`);
        },
        routerTo() {
            this.$router.push("/login");
        },
    },
    mounted() {
        document.querySelector('body').setAttribute('style', 'overflow: auto;');
    }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.div1,
.div3,
.div4,
.div5 {
    display: flex;
    height: 100vh;
    border-radius: 20px;
    width: 100%;
}

.div2 {
    display: flex;
    height: 85vh;
    border-radius: 20px;
    width: 100%;
}

.div6 {
    background-color: lightskyblue;
    display: flex;
    height: 70vh;
    width: 100%;
}

.home_header {
    display: flex;
    width: 100%;
    height: 15%;
}

.home_icon {
    display: flex;
    width: 15%;
    height: 100%;
    margin-left: 5%;
}

.home_button {
    display: flex;
    flex-wrap: wrap;
    gap: 15%;
    width: 30%;
    height: 100%;
    justify-content: center;
    text-align: center;
    vertical-align: middle;
}

.button1,
.button2,
.button3 {
    width: 20%;
    height: 40%;
    border-radius: 20px;
    margin: 0;
    position: relative;
    top: 30%;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    transition: 0.3s;
}

.button3 {
    background-color: rgba(205, 239, 252, 0.6);
}

.button1:hover,
.button2:hover p {
    color: rgba(0, 0, 0, 0.7);
}

.button3:hover {
    background-color: rgb(205, 239, 252);
}

.home_button p {
    font-size: 20px;
    font-family: 'Helvetica Neue', Helvetica, Arial, "PingFang SC", 'Hiragino Sans GB', 'Microsoft Yahei', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
}

.div1 {
    background-image: url(../assets/background/BG16.webp);
    background-size: cover;
    /* 将背景图片缩放以覆盖整个 div */
    background-position: center;
    /* 可选，将背景图片在 div 中居中 */
}

.home_des {
    position: absolute;
    top: 35vh;
    left: 30vw;
    height: 40vh;
    width: 40vw;
}

.home_des h1 {
    font-size: 48px;
    font-family: 'Helvetica Neue', Helvetica, Arial, "PingFang SC", 'Hiragino Sans GB', 'Microsoft Yahei', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
}

.home_des p {
    font-size: 25px;
    font-family: 'Helvetica Neue', Helvetica, Arial, "PingFang SC", 'Hiragino Sans GB', 'Microsoft Yahei', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
}

.home_des2 h1 {
    font-size: 25px;
    font-family: 'Helvetica Neue', Helvetica, Arial, "PingFang SC", 'Hiragino Sans GB', 'Microsoft Yahei', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
}

.home_des2 p {
    font-size: 17px;
    color: #8c8889;
    font-family: 'Helvetica Neue', Helvetica, Arial, "PingFang SC", 'Hiragino Sans GB', 'Microsoft Yahei', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
}

.home_des button {
    margin-top: 40px;
    border: none;
    background-color: rgba(205, 239, 252, 0.8);
    border-radius: 20px;
    height: 60px;
    width: 200px;
    font-size: 18px;
    font-family: 'Helvetica Neue', Helvetica, Arial, "PingFang SC", 'Hiragino Sans GB', 'Microsoft Yahei', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
}

.home_des button:hover {
    background-color: rgb(205, 239, 252);
}

.home_header2 {
    position: absolute;
    top: 115vh;
}

.div3_1,
.div3_2,
.div3_3,
.div4_1,
.div4_2,
.div4_3,
.div5_1,
.div5_2,
.div5_3 {
    height: 16%;
}

.div3_1 h1,
.div3_2 h1,
.div3_3 h1,
.div4_1 h1,
.div4_2 h1,
.div4_3 h1,
.div5_1 h1,
.div5_2 h1,
.div5_3 h1 {
    color: black;
    font-size: 30px;
}

.div3_1 p,
.div3_2 p,
.div3_3 p,
.div4_1 p,
.div4_2 p,
.div4_3 p,
.div5_1 p,
.div5_2 p,
.div5_3 p {
    font-size: 15px;
}

.div3_1:hover,
.div4_1:hover,
.div5_1:hover {
    background-color: rgba(204, 204, 204, 0.5);
    border-radius: 25px;
}

.div3_2:hover,
.div4_2:hover,
.div5_2:hover {
    background-color: rgba(204, 204, 204, 0.5);
    border-radius: 25px;
}

.div3_3:hover,
.div4_3:hover,
.div5_3:hover {
    background-color: rgba(204, 204, 204, 0.5);
    border-radius: 25px;
}

.home_des6 {
    position: absolute;
    top: 500vh;
    left: 30vw;
    height: 40vh;
    width: 40vw;
}

.home_des6 h1 {
    font-size: 48px;
    font-family: 'Helvetica Neue', Helvetica, Arial, "PingFang SC", 'Hiragino Sans GB', 'Microsoft Yahei', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
}

.home_des6 p {
    font-size: 25px;
    font-family: 'Helvetica Neue', Helvetica, Arial, "PingFang SC", 'Hiragino Sans GB', 'Microsoft Yahei', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
}

.home_des6 button {
    margin-top: 40px;
    border: none;
    background-color: rgba(205, 239, 252, 0.6);
    border-radius: 20px;
    height: 60px;
    width: 200px;
    font-size: 18px;
    font-family: 'Helvetica Neue', Helvetica, Arial, "PingFang SC", 'Hiragino Sans GB', 'Microsoft Yahei', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
}

.home_des6 button:hover {
    background-color: rgba(205, 239, 252, 0.9);
}</style>
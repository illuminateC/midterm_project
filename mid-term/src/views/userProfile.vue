<template>
    <el-container class="container">
        <el-header>
            <HeaderComponentVue style="z-index:inherit"/>
        </el-header>
        <el-main >
            <div >
                <div class="center-container">
                <div class="center-box">
                    <div class="box1">
                        <div class="box2">
                            <div class="box3">
                                <input type="file" id="avatarInput" @change="uploadAvatar" hidden accept="image/*">
                                <img :src="avatar" @click="changeAvatar" class="avatar">
                            </div>
                        </div>
                        <div class="user-info">
                            <div v-if="!editingUsername" style="display: flex;">
                                <h2>{{ username }}</h2>
                                <i class="el-icon-edit" style="margin-top: 27px; margin-left: 12px;" @click="editingUsername=true"></i>
                            </div>
                            <div v-else>
                                <input type="text" v-model="username" class="username-input" @blur="saveUsername">     
                            </div>
                        <textarea placeholder="这个人很懒，什么也没留下~" v-model="sign" class="user-info-background" maxlength="16" ></textarea>
                        </div>
                    </div>
                    <div style="text-align: left; margin-left: 20px;">
                    <h2>真实姓名</h2>
                    <el-input
                        v-model="realName"
                        :disabled="true" style="width: 15%;">
                    </el-input>
                    <h2>邮箱</h2>
                    <el-input
                        placeholder="请输入内容"
                        v-model="email"
                        clearable maxlength="30" style="width: 30%;" :disabled="true">
                    </el-input>
                </div>
                </div>
            </div>
            </div>
            
        </el-main>
    </el-container>
    
</template>

<script>
import router from "@/router";
import axios from 'axios'
import HeaderComponentVue from '@/components/HeaderComponent.vue';
export default {
    components:{
      HeaderComponentVue,
    },
    data() {
        return {
            avatar: '',
            username: '未登录',
            sign:'',
            realName:'默认姓名',
            email:'默认邮箱',
            userId:'',
            editingUsername:false,
        }
    },
    methods:{
        changeAvatar() {
            document.getElementById('avatarInput').click();
        },
        uploadAvatar(event) {
            if (event.target.files && event.target.files[0]) {
                const reader = new FileReader();
                reader.onload = e => {
                    this.avatar = e.target.result;
                };
                reader.readAsDataURL(event.target.files[0]);
                const formData = new FormData();
                formData.append('avatar', event.target.files[0]);
                formData.append('id', this.userId);
                axios.post('http://43.143.140.26/api/user/uploadavatar',formData,{
                headers: { "content-type": "application/x-www-form-urlencoded" },
                })
                .then(res => {              /* res 是 response 的缩写 */
                switch (res.data.errno) {
                case 0:
                    this.$message.success("头像更新成功！");
                    this.$router.go(0);
                    break;
                case 401:
                    this.$message.error("上传失败！");
                    break;
                }
            })
            }
        },
        saveSign(){
            const formData = new FormData();
            formData.append('sign', this.sign);
            formData.append('userId', this.$route.params.userID);
            axios.post('http://43.143.140.26/api/user/sign',formData,{
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .then(res => {              /* res 是 response 的缩写 */
                switch (res.data.errno) {
                case 0:
                    break;
                case 401:
                    this.$message.error("保存签名失败！");
                    break;
                }
            })
        }, 
        saveEmail(){
            var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(this.email)) {
                alert("请输入有效的邮箱地址！");
                return;
            }
            const formData = new FormData();
            formData.append('mail', this.email);
            formData.append('userId', this.$route.params.userID);
            axios.post('http://43.143.140.26/api/user/sign',formData,{
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .then(res => {              /* res 是 response 的缩写 */
                switch (res.data.errno) {
                case 0:
                    break;
                case 401:
                    this.$message.error("保存邮箱失败！");
                    break;
                }
            })
        },
        getUserMessage(){
            axios.get('http://43.143.140.26/api/user/showinfo', {
                params: {
                    id: this.userId,
                }
            })
            .then((response) => {
                this.username=response.data.nickname;
                this.avatar=response.data.avatar_url;
                // this.sign=response.data.sign;
                this.realName=response.data.realname;
                this.email=response.data.email;
            })
            .catch((error) => {
                // 请求出错时的处理
                console.error('请求出错:', error);
            });
        },
        saveUsername(){
            const formData = new FormData();
            formData.append('id', this.userId);
            formData.append('nickname', this.username);
            axios.post('http://43.143.140.26/api/user/changenickname',formData,{
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
            .then(res => {              /* res 是 response 的缩写 */
                switch (res.data.errno) {
                case 0:
                    this.$message.success("修改用户名成功！");
                    this.getUserMessage();
                    this.editingUsername=false;
                    break;
                case 401:
                    
                    break;
                }
            })
        }
    },
    created(){
        this.userId=sessionStorage.getItem("userId");
        this.getUserMessage();
    }
}
</script>

<style scoped>
.container{
    height: 100vh;
  width: 100vw;
  background-image: url('../assets/background/BG16.webp'); /*68 12*/
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100%;
}
.center-container {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 85vh; 
    
    
}

.username-input{
    width: auto; /* 或者设置合适的宽度值 */
    margin: 10px 0px 20px 0px; /* 调整与用户名之间的间距 */
    background-color: transparent; /* 使输入框背景透明 */
    border: none; /* 移除边框 */
    outline: none; /* 移除聚焦时的外边框 */
    font-size: 25px; /* 保持与其他文本一致的字体大小 */
    font-family: 'Microsoft YaHei'; /* 保持与其他文本一致的字体样式 */
}

.user-info-background{
  /* background-color: rgba(255,255,255,0.33); */
  border: none;
  width: 300px;
  height: 50px;
  resize: none;
  font-family:"PingFang SC";
  background-color: rgba(255, 255, 255, 0.5);
}

.center-box {
    width: 700px; /* 设置盒子的宽度 */
    height: 400px; /* 设置盒子的高度 */
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 3%;
}
.box1{
    width: 100%;
    height: 35%;
    /* background-color: pink; */
    display: flex;
}
.box2{
    display: flex;
    height: 100%;
    width:20%;
    
    margin-left: 1%;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}
.user-info{
    display: flex;
    height: 100%;
    width:50%;
    margin-left: 5%;
    flex-direction: column;
    align-items: flex-start;
}

.box3{
    height: 80%;
    width: 80%;
    /* background-color: green; */
    border-radius: 50%;

}
.avatar{
    height: 100%;
    width: 100%;
    border-radius: 50%;
}
</style>
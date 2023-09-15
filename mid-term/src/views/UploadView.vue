<template>
    <div>
      <video autoplay loop muted class="videoContainer">
          <source src="../assets/background/upload-background.mp4" type="video/mp4">
      </video>
      <el-header class="my-header">
        <HeaderComponent/>
      </el-header>
      <el-main>
        <div class="upload-container">
            <div class="title-1">创建团队</div>
            <div class="box-1">
                <div class="box-left">
                    <div class="class-header">
                        <div style="font-weight: 600; font-size: 16px; line-height: 20px; color: #000;">团队名称</div>
                    </div>
                    <div class="editor-container">
                        <el-input type="textarea" show-word-limit maxlength="50" resize="none" v-model="teamName"
                            class="input-text" :autosize="{ minRows: 3, maxRows: 10 }"
                            placeholder="起一个合适的名称，展现团队特色"></el-input>
                    </div>
                    <div class="class-header">
                        <div
                            style="font-weight: 600; font-size: 16px; line-height: 20px; color: #000; margin-top: 24px;">
                            添加描述</div>
                    </div>
                    <div class="editor-container">
                        <el-input type="textarea" show-word-limit maxlength="500" resize="none" v-model="teamDescrition"
                            class="input-text" :autosize="{ minRows: 3, maxRows: 10 }"
                            placeholder="写一个贴切的简介，体现团队的特色"></el-input>
                    </div>
                    <div class="class-container">
                        <div class="class-header">
                            <div style="font-weight: 600; font-size: 16px; line-height: 20px; color: #000;">设置封面
                            </div>
                        </div>
                        <el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="1"
                          :file-list="uploadFiles" :on-change="loadJsonFromFile" ref="uploadImg" accept=".jpg,.png"
                        >
                          <i slot="default" class="el-icon-plus"></i>
                          <div slot="file" slot-scope="{ file }">
                              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                              <span class="el-upload-list__item-actions">
                                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                      <i class="el-icon-zoom-in"></i>
                                  </span>
                                  <span v-if="!disabled" class="el-upload-list__item-delete"
                                      @click="handleRemove(file)">
                                      <i class="el-icon-delete"></i>
                                  </span>
                              </span>
                          </div>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                    <el-button type="primary" round class="load" @click="createNewGroup">新建</el-button>
                </div>
            </div>
        </div>
      </el-main>
    </div>
</template>
<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import axios from 'axios';
export default {
    name: "upload",
    data() {
      return {
          haveCover: false,
          uploadFiles: [],
          dialogImageUrl: "",
          dialogVisible: false,
          disabled: false,
          teamName: "",
          teamDescrition: "",
          userInfo: null,
      };
    },
    components: { HeaderComponent },
    methods: {
        handleRemove(file) {
            // this.$refs.upload.clearFiles();
            let fileList = this.$refs.uploadImg.uploadFiles;

            let index = fileList.findIndex((fileItem) => {
                return fileItem.uid === file.uid;
            });
            fileList.splice(index, 1);
            //console.log('filelist_2'+filelist)
            console.log(file);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        loadJsonFromFile(file, fileList) {
            this.uploadFiles = fileList;
            this.haveCover = true;
        },
        createNewGroup() {
          console.log("Name:" + this.teamName);
          console.log("Description:" + this.teamDescrition);
          const formData = new FormData();
          formData.append("id", this.userInfo.id);
          formData.append("teamname", this.teamName);
          formData.append("description", this.teamDescrition);
          if(this.haveCover) {
            formData.append('avatar', this.uploadFiles[0].raw);
            formData.append('isavatar', 1);
            console.log("has_cover");
          } else {
            // formData.append('avatar', null);
            formData.append('isavatar', 0);
            console.log("without cover");
          }
          // formData.append('avatar', this.uploadFiles[0].raw);
          axios.post('http://43.143.140.26/api/team/createteam', formData, {
          }).then((response) => {
            console.log('成功响应:', response.data);
            this.$router.push("/homepage/3");
          }).catch(function (error) {
            console.error('请求出错:', error);
          });
        },
    },
    mounted() {
      // 获取用户信息userInfo
        const userId = sessionStorage.getItem('userId');
        console.log("userId is " + userId);
        if (userId != null) {
          axios.get('http://43.143.140.26/api/user/showinfo', {
            params: {
              id: userId
            }
          }).then((response) => {
            console.log('成功响应获取用户信息:', response.data);
            this.userInfo = response.data;
          }).catch(function (error) {
            console.error('请求出错:', error);
          });
        } else {
          console.log("has not login");
        }
        // this.userInfo = {
        //     "id": 1,
        //     "errno": 0,
        //     "msg": "成功获取信息",
        //     "username": "test2",
        //     "email": null,
        //     "nickname": "nick1",
        //     "realname": "王乐平",
        //     "avatar_url": "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        // };
        // 测试赋值
    }
}
</script>

<style scoped>
.my-header {
    position: fixed;
    margin-left: -10px;
    top: 0;
    /* height: 200vh; */
    /* left: 0; */
    width: 100%;
    /* height: 10vh; */
    background-color: transparent;
    /* background-color:bisque; */
    z-index: 999;
}

.upload-container {
    margin-top: 65px;
    z-index: 999;
}

.title-1 {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: #000;
    margin-bottom: 16px;
}

.box-1 {
    display: flex;
    justify-content: center;
}

.box-left {
    width: 552px;
    margin-right: 48px;
}

.box-right {
    margin-top: 70px;
    overflow: hidden;
    width: 700px;
    height: 700px;
}

.editor-container {
    border-radius: 4px;
    min-width: 100%;
    max-width: 100%;
    padding: 8px 12px 12px;
}

.el-textarea__inner {
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    outline: none;
    width: 552px;
    height: 70px;
    font-size: 14px;
    color: #000;
}

.el-input__count {
    background-color: rgba(255, 255, 255, 0);
    font-size: 12px;
    color: rgb(82, 80, 80);
}

.el-input__inner {
    background-color: rgba(255, 255, 255, 0.5);
}

.el-input__inner::placeholder {
    color: black;
    font-weight: 500;
}

.el-upload--picture-card {
    background-color: rgba(255, 255, 255, 0.5);
}

.phone-container {
    border-radius: 5px;
    background-color: black;
    position: relative;
    text-align: center;
    border-radius: 4px;
}

.player-video {
    max-height: 100%;
    margin: 0 auto;
    position: relative;
    top: 50%;
    width: 100%;
    height: 100%;
    transform: translateY(-50%);
}

.reload {
    cursor: pointer;
    width: 350px;
    text-align: center;
    margin-left: 120px;
    margin-top: 5px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
}

.load {
    width: 100%;
    text-align: center;
    margin-top: 50px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
}

.class-container {
    margin-top: 24px;
    width: 100%;
}

.class-header {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
}

.select-box {
    width: 100%;
    height: auto;
}

.el-select-dropdown {
    position: absolute !important;
    top: 30px !important;
    left: 0px !important;
}

.videoContainer {
    object-fit: cover;
    position: fixed;
    right: 0px;
    bottom: 0px;
    min-width: 100%;
    max-height: 100%;
    height: auto;
    width: auto;
    background-size: cover;
    /*加滤镜*/
    /* filter: blur(15px); //背景模糊设置 */
    /*-webkit-filter: grayscale(100%);*/
    /*filter:grayscale(100%); //背景灰度设置*/
    z-index: -11;
}
</style>
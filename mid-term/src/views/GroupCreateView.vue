<template>
  <el-container style="width: 100%; height: 100%;">
    <el-header class="my_header" height=48px>
      <HeaderComponent/>
    </el-header>
    <el-main>
      <div style="background-color:gray; height: 500px; width:1000px;">
        <div style="height: 50px; position: relative;">
          <div style="position: absolute; bottom: 0%; left: 0%;">填写团队信息</div>
          <div style="position: absolute; top: 0%; right: 0%;">×</div>
        </div>
        <div style="height: 100px; margin-top: 30px;">
          <div style="height: 100%; width: 100px; float:left; background-color: yellow;">团队封面</div>
          <div style="height: 100%; width: 300px; float:left; margin-left: 50px; position: relative; background-color: blue;">
            <el-upload
              :class="{ disabled: uploadDisabled }"
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :limit="1"
              :on-change="handleUploadChange"
              ref="uploadImg"
              accept=".jpg,.png"
              style="width: 100%; height: 100%;"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </div>
        </div>
        <div style="height: 50px; margin-top: 30px;">
          <div style="height: 100%; width: 100px; float:left; background-color: yellow;"> 团队名称</div>
          <div style="height: 100%; width: 100px; float:left; margin-left: 50px; background-color: blue;">
            <el-input v-model="teamName"></el-input>
          </div>
        </div>
        <div style="height: 150px; margin-top: 30px;">
          <div style="height: 100%; width: 100px; float:left; background-color: yellow;">团队描述</div>
          <div style="height: 100%; width: 100px; float:left; margin-left: 50px; background-color: blue;">
            <el-input v-model="teamDescrition"></el-input>
          </div>
        </div>
        <div style="height: 40px; margin-top: 30px; display: flex; justify-content: center;">
          <el-button type="primary" @click="createNewGroup">建立团队</el-button>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import axios from 'axios';
export default {
  components: {
    HeaderComponent
  },
  props: {},
  data() {
    return {
      teamName: "",
      teamDescrition: "",
      imageUrl: "",
      uploadDisabled: false,
      uploadedTeamCover: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    createNewGroup() {
      console.log("Name:" + this.teamName);
      console.log("Description:" + this.teamDescrition);
      const formData = new FormData();
      formData.append("id", sessionStorage.getItem('userId'));
      formData.append("teamname", this.teamName);
      formData.append("description", this.teamDescrition);
      axios.post('http://43.143.140.26/api/team/createteam', formData, {
      }).then((response) => {
        console.log('成功响应:', response.data);
        this.$router.push("/");
      }).catch(function (error) {
        console.error('请求出错:', error);
      });
    },
    handleUploadChange(file, fileList) {
      if (fileList.length >= 1) {
        this.uploadDisabled = true;
      }
      this.uploadedTeamCover = fileList;
    },
    handleRemove(file) {
      let fileList = this.$refs.uploadImg.uploadFiles;
      let index = fileList.findIndex((fileItem) => {
          return fileItem.uid === file.uid;
      });
      fileList.splice(index, 1);
      this.uploadDisabled = false;
    },
  },
  created() {},
  mounted() {}
};
</script>
<style>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  line-height: 100%;
  text-align: center;
  vertical-align: middle;
}
.disabled .el-upload--picture-card {
    display: none !important;
}
.el-upload--picture-card {
    height: 100px;
    width: 100px;
}
.el-upload-list--picture-card .el-upload-list__item-actions {
  height: 100px;
  width: 100px;
}
.el-upload-list--picture-card .el-upload-list__item {
  height: 100px;
  width: 100px;
}

</style>
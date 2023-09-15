
<template>
  
  <div class="container">
    <div class="menu">
      <el-button round icon="el-icon-arrow-left" style="margin-top: 5px; margin-bottom: 5px;" @click="getBack" v-if="!isDirectory">返回上级</el-button>
      <el-button round icon="el-icon-plus" style="margin-top: 5px; margin-bottom: 5px;" @click="folderCreateDocument" v-if="!isDirectory">新建文档</el-button>
      <el-input type="text" v-model="title" maxlength="30"  style="font-weight:bolder; margin-top: 8px; margin-left: 0px; " v-if="!isDirectory" @blur="saveTitle"></el-input>
      <el-button round icon="el-icon-plus" style="margin-top: 5px; margin-bottom: 5px;" @click="createDocument" v-if="isDirectory">新建文档</el-button>
      <el-button round icon="el-icon-plus" style="margin-top: 5px; margin-bottom: 5px;" @click="createFolder" v-if="isDirectory">新建文件夹</el-button>
      <div style="margin-top: 13px; margin-left: 73%;" v-if="isDirectory && value2">是否允许游客编辑:</div>
      <el-switch v-model="value1" style="margin-top:13px; margin-left:5px" v-if="isDirectory &&value2"></el-switch>
      <div style="margin-top: 13px;" v-if="!isDirectory && value2">是否允许游客编辑:</div>
      <el-switch v-model="value1" style="margin-top: 13px;" v-if="!isDirectory &&value2"></el-switch>
      
    </div>
      <div class="docment-container" v-for="folder in folders" v-if="isDirectory"> 
        <div class="document" @mouseover="folder.hover = true" @mouseleave="folder.hover = false">
          <div class="layer layer11" :class="{ hidden: !folder.hover }">
            <i class="el-icon-edit" @click="editFolder(folder.folder_id,folder.name)"></i>
            <i class="el-icon-delete" @click="deleteFolder(folder.folder_id)"></i>
          </div>
          <div class="layer layer5"></div>
        </div>
        <div class="message-container">
          <div class="message">{{ folder.name }}</div>
        </div>
      </div>
      <div class="docment-container" v-for="document in documents" v-if="isDirectory"> 
        <div class="document" @mouseover="document.hover = true" @mouseleave="document.hover = false">
          <div class="layer layer11" :class="{ hidden: !document.hover }">
            <i class="el-icon-edit" @click="editDocument(document.document_id)"></i>
            <i class="el-icon-share" @click="shareDocument(document.document_id)"></i>
            <i class="el-icon-delete" @click="deleteDocument(document.document_id)"></i>
          </div>
          <div class="layer layer22"></div>
        </div>
        <div class="message-container">
          <div class="message">{{document.name}}</div>
        </div>
      </div>
      <div class="docment-container" v-for="document in documents" v-if="!isDirectory"> 
        <div class="document" @mouseover="document.hover = true" @mouseleave="document.hover = false">
          <div class="layer layer11" :class="{ hidden: !document.hover }">
            <i class="el-icon-edit" @click="editDocument(document.document_id)"></i>
            <i class="el-icon-share" @click="shareDocument(document.document_id)"></i>
            <i class="el-icon-delete" @click="folderDeleteDocument(document.document_id)"></i>
          </div>
          <div class="layer layer22"></div>
        </div>
        <div class="message-container">
          <div class="message">{{document.name}}</div>
        </div>
      </div>
      
      
    </div>
    <!-- <div class="docment-container2" @click="createDocument()">
      <div class="document" >
        <div class="layer layer33"></div>
      </div>
      
    </div> -->
    
  
</template>

<script>
import axios from 'axios'

export default {
  
  data() {
    return {
      hover: false,
      documents:[],
      projectId:'',
      id:'',
      value1:false,
      value2:false,
      folders:[],
      isDirectory:true,
      folderId:'',
      title:'',
    };
  },
  methods: {
    saveTitle(){
      const formData= new FormData();
      formData.append('folder_id',this.folderId);
      formData.append('name',this.title);
      axios.post('http://43.143.140.26/api/document/rename',formData,{
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(res => {
        switch (res.data.errno){
          case 0:
            
            break;
          case 401:
            this.$message.error("未知错误！");
        }
      })
    },
    copyToClipboard(textToCopy) {
            // navigator clipboard 需要https等安全上下文
            if (navigator.clipboard && window.isSecureContext) {
                // navigator clipboard 向剪贴板写文本
                return navigator.clipboard.writeText(textToCopy);
            } else {
                // 创建text area
                let textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                // 使text area不在viewport，同时设置不可见
                textArea.style.position = "absolute";
                textArea.style.opacity = 0;
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                return new Promise((res, rej) => {
                    // 执行复制命令并移除文本框
                    document.execCommand('copy') ? res() : rej();
                    textArea.remove();
                });
            }
        },
    getBack(){
      this.isDirectory=true;
      this.folderId='';
      this.getDocument();
      this.getFolder();
    },
    editDocument(a) {
      // if(this.value1==true){
        this.$router.push('/project/'+this.projectId+'/document/1/'+a);
      // }else{
      //   this.$router.push('/project/'+this.projectId+'/document/0/'+a);
      // }
      
    },
    getDocument(){
      
      axios.get('http://43.143.140.26/api/document/list/', {
        
          params: {
            project_id: this.projectId,
          }
      })
      .then(res => {
          this.documents=res.data.document_list;
        })
        .catch(function (error) {
          // 请求出错时的处理
          console.error('请求出错:', error);
        });
    },
    editFolder(a,b){
      this.folderId=a;
      this.title=b;
      console.log(this.title);
      axios.get('http://43.143.140.26/api/document/list/', {
        
        params: {
          project_id: this.projectId,
          folder_id:a,
        }
      })
      .then(res => {
        this.isDirectory=false;
        this.documents=res.data.document_list;
        
      })
      .catch(function (error) {
        // 请求出错时的处理
        console.error('请求出错:', error);
      });
    },
    getFolder(){
      axios.get('http://43.143.140.26/api/document/list/', {
        
        params: {
          project_id: this.projectId,
        }
      })
      .then(res => {
          this.folders=res.data.folder_list;
      })
      .catch(function (error) {
        // 请求出错时的处理
        console.error('请求出错:', error);
      });
    },
    
    createFolder(){
      const formData= new FormData();
      // console.log(this.$route.params.projectID);
      formData.append('project_id',this.$route.params.projectID);
      // console.log(this.id);
      formData.append('id',this.id);
      axios.post('http://43.143.140.26/api/document/createfolder',formData,{
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(res => {
        switch (res.data.errno){
          case 0:
            this.$message.success("创建成功！");
            break;
          case 401:
            this.$message.error("未知错误！");
        }
      })
      setTimeout(() => {
        this.getFolder();
      }, 100); // 延迟 1 秒执行（可以根据需要调整延迟时间）
    },
    folderCreateDocument(){
      console.log(this.folderId);
      const formData= new FormData();
      // console.log(this.$route.params.projectID);
      formData.append('project_id',this.$route.params.projectID);
      // console.log(this.id);
      formData.append('id',this.id);
      formData.append('folder_id',this.folderId);
      axios.post('http://43.143.140.26/api/document/create',formData,{
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(res => {
        switch (res.data.errno){
          case 0:
            this.$message.success("创建成功！");
            break;
          case 401:
            this.$message.error("未知错误！");
        }
      })
      setTimeout(() => {
        this.editFolder(this.folderId,this.title);
      }, 100); // 延迟 1 秒执行（可以根据需要调整延迟时间）
    },
    createDocument(){
      const formData= new FormData();
      // console.log(this.$route.params.projectID);
      formData.append('project_id',this.$route.params.projectID);
      // console.log(this.id);
      formData.append('id',this.id);
      axios.post('http://43.143.140.26/api/document/create',formData,{
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(res => {
        switch (res.data.errno){
          case 0:
            this.$message.success("创建成功！");
            break;
          case 401:
            this.$message.error("未知错误！");
        }
      })
      setTimeout(() => {
        this.getDocument();
      }, 100); // 延迟 1 秒执行（可以根据需要调整延迟时间）
    },
    deleteFolder(a){
      const formData= new FormData();
      formData.append('folder_id',a);
      axios.post('http://43.143.140.26/api/document/deletefolder',formData,{
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(res => {
        switch (res.data.errno){
          case 0:
            this.$message.success("删除成功！");
          // case 401:
          //   this.$message.error("未知错误！");
        }
      })
      setTimeout(() => {
        this.getFolder();
      }, 500); // 延迟 1 秒执行（可以根据需要调整延迟时间）
    },
    folderDeleteDocument(a){
      const formData= new FormData();
      formData.append('document_id',a);
      axios.post('http://43.143.140.26/api/document/delete',formData,{
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(res => {
        switch (res.data.errno){
          case 0:
            this.$message.success("删除成功！");
          // case 401:
          //   this.$message.error("未知错误！");
        }
      })
      setTimeout(() => {
        this.editFolder(this.folderId,this.title);
      }, 100); // 延迟 1 秒执行（可以根据需要调整延迟时间）
    },
    deleteDocument(a){
      const formData= new FormData();
      formData.append('document_id',a);
      axios.post('http://43.143.140.26/api/document/delete',formData,{
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(res => {
        switch (res.data.errno){
          case 0:
            this.$message.success("删除成功！");
          // case 401:
          //   this.$message.error("未知错误！");
        }
      })
      setTimeout(() => {
        this.getDocument();
      }, 100); // 延迟 1 秒执行（可以根据需要调整延迟时间）
    },
    shareDocument(a) {
      // alert(this.value1);
      const baseUrl = window.location.href;
      if(this.value1==true){
        const documentUrl = baseUrl + '/document/1/' + a;
        this.copyToClipboard(documentUrl)
        .then(() => {
          this.$message.success('链接已复制到剪贴板');
        })
        .catch((err) => {
          this.$message.error('无法复制链接');
        });
      }else{
        const documentUrl = baseUrl + '/document/0/' + a;
        this.copyToClipboard(documentUrl)
        .then(() => {
          this.$message.success('链接已复制到剪贴板');
        })
        .catch((err) => {
          this.$message.error('无法复制链接');
        });
      }
      
    },
    isManager(){
      const formData= new FormData();
      formData.append('projectId',this.projectId);
      formData.append('userId',this.id);
      axios.post('http://43.143.140.26/api/user/isManager',formData,{
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(res => {
        switch (res.data.errno){
          case 0:
            this.value2=false;
          case 1:
            this.value2=true;
          // case 401:
          //   this.$message.error("未知错误！");
        }
      })
    },
  },
  created(){
    this.id=sessionStorage.getItem("userId");
    this.projectId=this.$route.params.projectID;
    this.getDocument();
    this.isManager();
    this.getFolder();
  }
};
</script>

<style>
.el-input .el-input__inner {
  width: 300px;
}

.menu{
  white-space: nowrap;
  width:100%;
  height: 50px;
  display: flex;
  border-bottom: 1px solid #ccc;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  overflow: auto;
}



.docment-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* 减小相邻元素之间的间距 */
  margin: 10px 20px 0px 20px;
  width:100px;
}

.docment-container2 {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* 减小相邻元素之间的间距 */
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

.layer11 {
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  z-index: 2; /* 设置较高的 z-index 值 */
}

.layer11 i {
  margin: 0 10px;
}

.layer22 {
  background-color: rgba(0, 0, 0, 0);
  opacity: 1;
  background-image: url('../assets/300.jpg');
  background-size: cover; /* 添加背景图片填充容器的样式 */
  background-position: center; /* 添加背景图片居中对齐的样式 */
}
.layer5 {
  background-color: rgba(0, 0, 0, 0);
  opacity: 1;
  background-image: url('../assets/500.png');
  background-size: cover; /* 添加背景图片填充容器的样式 */
  background-position: center; /* 添加背景图片居中对齐的样式 */
}

.hidden {
  visibility: hidden;
}

.document:hover .layer11 {
  visibility: visible;
}

.document:hover .layer22 {
  opacity: 0.3;
}

.document:hover .layer33 {
  opacity: 0.7;
}

.message-container {
  margin-top: 10px; /* 减小上方的垂直间距 */
  width: 100%;
}

.message {
  font-size: 20px;
  height: 50px;
}

.container{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  overflow: auto; /* 添加滚动条，当内容溢出时 */
  
}
</style>

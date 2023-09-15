<template>
  <div class="card" v-show="showCardFlag"  >
    <div class="menu-container">
        <el-menu mode="horizontal" :default-active="activeIndex" @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-bell"></i>
            未读信息
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-message-solid"></i>
            已读信息
          </el-menu-item>
          <!-- <el-tooltip content="一键已读" placement="top" > -->
            <el-button @click="changeAllMessage" style="margin-top: 12px; margin-left: 10px; " type="info" icon="el-icon-message" round>一键已读</el-button>
          <!-- </el-tooltip> -->
          <!-- <el-tooltip content="一键删除已读" placement="top" > -->
            <el-button @click="deleteAllMessage" style="margin-top: 12px;  margin-left: 10px;" type="danger" icon="el-icon-delete" round>一键删除</el-button>
          <!-- </el-tooltip> -->
        </el-menu>
    </div>
    <el-skeleton :loading="loading" style="width: 100%" animated v-if="activeIndex === '1'">
      <div class="messageContainer" v-for="(item, index) in messages" :key="index">
        <el-card>
          <div class="message-wrapper" @click="changeMessage(item)">
            <div class="message-content" @click="jump(item)">{{ item.content }}</div>
            <div style="justify-content: flex-end;">
              <el-button v-if="item.isInvited" style="font-size: 20px; float: right; padding: 20px 0px 20px 0px; margin-right: 0px; margin-left: 5px; color: red;" class="delete-button" type="text" icon="el-icon-close" @click="refuseInvite(item)"></el-button>
              <el-button v-if="item.isInvited" style="font-size: 20px; float: right; padding: 20px 0px 20px 0px; margin-right: 0px; margin-left: 5px; color: green;" class="delete-button" type="text" icon="el-icon-check" @click="acceptInvite(item)"></el-button>
            </div>
            <el-button v-if="!item.isInvited" style="font-size: 20px; float: right; padding: 20px 0px 20px 20px; margin-right: 15px; margin-left: 5px; color: red;" class="delete-button" type="text" icon="el-icon-delete" @click="deleteMessage(item)"></el-button>
            
          </div>
          <div class="message-time">{{ item.time.replace("T", " ") }}</div>
        </el-card>
      </div>
    </el-skeleton>
    <el-skeleton :loading="loading" style="width: 100%" animated v-if="activeIndex === '2'">
      <div class="messageContainer" v-for="(item, index) in readMessages" :key="index">
        <el-card>
          <div class="message-wrapper" @click="changeMessage(item)">
            <div class="message-content" @click="jump(item)">{{ item.content }}</div>
            <div style="justify-content: flex-end;">
              <el-button v-if="item.isInvited" style="font-size: 20px; float: right; padding: 20px 0px 20px 0px; margin-right: 0px; margin-left: 5px; color: red;" class="delete-button" type="text" icon="el-icon-close" @click="refuseInvite(item)"></el-button>
              <el-button v-if="item.isInvited" style="font-size: 20px; float: right; padding: 20px 0px 20px 0px; margin-right: 0px; margin-left: 5px; color: green;" class="delete-button" type="text" icon="el-icon-check" @click="acceptInvite(item)"></el-button>
              
            </div>
            
            
            <el-button v-if="!item.isInvited" style="font-size: 20px; float: right; padding: 20px 0px 20px 20px; margin-right: 15px; margin-left: 5px; color: red;" class="delete-button" type="text" icon="el-icon-delete" @click="deleteMessage(item)"></el-button>
            
          </div>
          <div class="message-time">{{ item.time.replace("T", " ") }}</div>
        </el-card>
      </div>
    </el-skeleton>
  </div>                
</template>

<script>
import qs from "qs"
import axios from 'axios'
export default {
  data() {
      return {
          showCardFlag: true,
          messages: [],
          readMessages: [],
          activeIndex: 0,
          loading:false,
          id:0,
          ws:'',
          data:'',
      }
  },
  computed: {
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key; // 更新activeIndex的值
      // if (key === "1") {
      //   this.fetchMessages();
      // } else if (key === "2") {
      //   this.fetchReadMessages();
      // } 
      console.log(key, keyPath);
    },
    fetchMessages(){
      axios.get('http://43.143.140.26/api/user/message', {
        params: {
          userId: this.id,
        }
      })
      .then((response) => {
          this.messages=response.data.unread;
          // console.log(response.data.unread);
        })
        .catch((error) => {
          // 请求出错时的处理
          console.error('请求出错:', error);
        });
    },
    fetchReadMessages(){
      axios.get('http://43.143.140.26/api/user/readMessage', {
        params: {
          userId: this.id,
        }
      })
      .then((response) => {
          this.readMessages=response.data.read;
          // console.log(this.readMessages+'123456');
        })
        .catch((error) => {
          // 请求出错时的处理
          console.error('请求出错:', error);
        });
      
    },
    changeMessage(message){
      const formData= new FormData();
      formData.append('messageId',message.messageId);
      axios.post('http://43.143.140.26/api/user/changeMessage',formData,{
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(res => {              /* res 是 response 的缩写 */
          switch (res.data.errno) {
            case 0:
              this.fetchMessages();
              this.fetchReadMessages();
              
              break;
            case 401:
              this.$message.error("未知错误！");
              break;
          }
      })
    },
    jump(item){
      if(item.link!==null){
        this.$router.push(item.link);
      }
      else{
        alert('114');
      }
    },
    deleteMessage(message){
      const formData= new FormData();
      formData.append('messageId',message.messageId);
      axios.post('http://43.143.140.26/api/user/deleteMessage',formData,{
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then(res => {              /* res 是 response 的缩写 */
            switch (res.data.errno) {
              case 0:
                this.$message.success("删除成功！");
                this.fetchMessages();
                this.fetchReadMessages();
                break;
              case 401:
                this.$message.error("删除失败！");
                break;
            }
        })
    },
    changeAllMessage(){
      const formData= new FormData();
      formData.append('userId',this.id);
      axios.post('http://43.143.140.26/api/user/changeAllMessage',formData,{
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then(res => {              /* res 是 response 的缩写 */
            switch (res.data.errno) {
              case 0:
                this.fetchMessages();
                this.fetchReadMessages();
                break;
              case 401:
                this.$message.error("未知错误！");
                break;
            }
        })
    },
    deleteAllMessage(){
      const formData= new FormData();
      formData.append('userId',this.id);
      axios.post('http://43.143.140.26/api/user/deleteAllMessage',formData,{
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then(res => {              /* res 是 response 的缩写 */
            switch (res.data.errno) {
              case 0:
                this.$message.success("删除成功！");
                this.fetchMessages();
                this.fetchReadMessages();
                break;
              case 401:
                this.$message.error("删除失败！");
                break;
            }
        })
    },
    refuseInvite(item){
      const formData= new FormData();
      formData.append('id',this.id);
      formData.append('message_id',item.messageId);
      axios.post('http://43.143.140.26/api/team/refuse',formData,{
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then(res => {              /* res 是 response 的缩写 */
            switch (res.data.errno) {
              case 0:
                this.$message.success("已拒绝邀请！");
                this.fetchMessages();
                this.fetchReadMessages();
                break;
              case 401:
                this.$message.error("未知错误！");
                break;
            }
        })
    },
    acceptInvite(item){
      const formData= new FormData();
      formData.append('id',this.id);
      formData.append('message_id',item.messageId);
      axios.post('http://43.143.140.26/api/team/receive',formData,{
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then(res => {              /* res 是 response 的缩写 */
            switch (res.data.errno) {
              case 0:
                this.$message.success("成功加入！");
                this.fetchMessages();
                this.fetchReadMessages();
                break;
              case 401:
                this.$message.error("未知错误！");
                break;
            }
        })
    }

  },
  // mounted(){
  //   let socketUrl = "ws://43.143.140.26:7002/ws/message/?userId=" +  sessionStorage.getItem('userId');
  //     this.ws = new WebSocket(socketUrl);
  //     this.ws.addEventListener("open", () => {
  //       console.log("websocket已打开");
  //     });
  //     this.ws.addEventListener("message", (respond) => {
  //       console.log("收到websocket消息"+respond.data);
  //       this.data=JSON.parse(respond.data);
  //       this.readMessages=this.data;
  //     });
  // },
  created(){
    this.id=sessionStorage.getItem("userId");
    this.fetchMessages(); // 初始获取消息数组信息
    this.fetchReadMessages(); // 初始获取消息数组信息
    setInterval(() => {
      this.fetchMessages();
      this.fetchReadMessages();
    }, 1000);
  }
}
</script>

<style>
.card {
  background-color: white;
/* position: absolute;
top: calc(100% - 5px);
right: -13.7%;
transform: translateX(-50%); */
width: 400px;
height: 600px;

border-radius: 4px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
padding: 10px;
display: flex;
flex-direction: column;

border-radius:18px
}

.menu-container{
  width:100%;
  margin-left: 0%;
}

.messageContainer{
  width:100%;
  overflow-y: auto;
  max-height: 520px;
}

.message-content {
  display: flex;
  flex-direction: column;
  padding: 20px 30px 10px 10px;
  overflow: auto; 
  text-overflow: ellipsis; /* 使用省略号显示溢出部分 */
  text-align: left;
}

.message-wrapper a {
  color: inherit;  /* 继承父元素的字体颜色 */
  text-decoration: none;  /* 移除下划线效果 */
}

.message-time {
  font-size: 12px;
  color: #999;
  /* border-bottom: 1px solid #ccc; */
  text-align: left;
  padding: 0px 0px 5px 10px;
}

.message-wrapper {
  display: flex;
  justify-content: space-between
}
</style>

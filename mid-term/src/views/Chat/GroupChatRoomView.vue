<template>
  <div class="home">
    <el-container height="100%">
      <el-aside width="100px">
        <Nav></Nav>
      </el-aside>
      <el-main>
        <div class="chatHome">
          <div class="chatLeft">
            <div class="title">
              <h1 v-if="$route.params.groupID == 0">多人聊天室</h1>
              <h1 v-else>团队聊天室</h1>
            </div>
            <div class="online-person">
              <span class="onlin-text">聊天列表</span>
              <div class="person-cards-wrapper">
                <div
                  class="personList"
                  v-for="personInfo in personList"
                  :key="personInfo.id"
                  @click="clickPerson(personInfo)"
                >
                  <PersonCard
                    :personInfo="personInfo"
                    :pcCurrent="pcCurrent"
                  ></PersonCard>
                </div>
                <div style="
                  height: 80px; width: 250px; 
                  background-color: rgb(50, 54, 68); 
                  border-radius: 10px;
                  display: flex; align-items: center;" 
                  v-if="$route.params.groupID == 0">
                  <div style="font-size: 65px; height: 70px; width: 70px; 
                    border: 1px solid rgb(200, 195, 195); 
                    border-radius: 10px;
                    display: flex; justify-content: center; align-items: center; 
                    margin-left: 7px; margin-right: 10px;"
                    >
                    <i class="el-icon-plus" style="color: grey;"></i>
                  </div>
                  <el-button type="text" @click="createNewGroupChat" style="height: 100%; width: 160px; font-size: 23px; color: gray;">创建新群聊</el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="chatRight">
            <div v-if="showChatWindow">
              <ChatWindow
                :frinedInfo="chatWindowInfo"
                @personCardSort="personCardSort"
              ></ChatWindow>
            </div>
            <div class="showIcon" v-else>
              <span class="iconfont icon-snapchat"></span>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';
import PersonCard from "@/components/PersonCard.vue";
import Nav from "@/components/Nav.vue";
import ChatWindow from "./ChatWindow.vue";
export default {
  name: "App",
  components: {
    PersonCard,
    ChatWindow,
    Nav,
  },
  watch: {
    "$route.params.groupID"(newval, oldval) { //团队聊天与多人聊天相互切换时，刷新聊天室列表
      // this.$router.go(0);
      this.$forceUpdate();
      this.updateRoomList();
    },
  },
  data() {
    return {
      pcCurrent: "",
      personList: [],
      showChatWindow: false,
      chatWindowInfo: {},
      userInfo: null,
      groupRoomList: [], //多人群聊
      teamRoomList: [], //团队群聊
      personRoomList: [], //团队内成员私聊
    };
  },
  mounted() {
    // 获取用户信息userInfo
    const userId = sessionStorage.getItem('userId');
    if (userId != null) {
      axios.get('http://43.143.140.26/api/user/showinfo', {
        params: {
          id: userId
        }
      }).then((response) => {
        console.log('用户信息userInfo:', response.data);
        this.userInfo = response.data;
      }).catch(function (error) {
        console.error('请求出错:', error);
      });
    } else {
      console.log("还未登录，获取用户信息失败");
    }
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("groupId", this.$route.params.groupID);
    axios.post('http://43.143.140.26/api/chat/list/', formData, {
    }).then((response) => {
      console.log('获取的三种聊天室列表:', response.data);
      this.groupRoomList = response.data.groupRooms;
      this.teamRoomList = response.data.teamRooms;
      this.personRoomList = response.data.personalRooms;
      if (this.$route.params.groupID == 0) { //多人群聊
        this.personList = this.groupRoomList
      } else { //团队群聊
        this.personList = [...this.teamRoomList, ...this.personRoomList];
      }
      console.log('实际显示的聊天室列表:', this.personList);
    }).catch(function (error) {
      console.error('请求出错:', error);
    });
  },
  updated() {
  },
  methods: {
    clickPerson(info) {
      this.showChatWindow = true;
      this.chatWindowInfo = info;
      this.personInfo = info;
      this.pcCurrent = info.roomId;
    },
    personCardSort(id) {
      if (id !== this.personList[0].roomId) {
        console.log(id);
        let nowPersonInfo;
        for (let i = 0; i < this.personList.length; i++) {
          if (this.personList[i].roomId == id) {
            nowPersonInfo = this.personList[i];
            this.personList.splice(i, 1);
            break;
          }
        }
        this.personList.unshift(nowPersonInfo);
      }
    },
    createNewGroupChat() {
      this.$prompt('请输入群聊名称', '创建多人群聊', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        const formData = new FormData();
        formData.append("userId", sessionStorage.getItem('userId'));
        formData.append("teamId", sessionStorage.getItem('historyChatGroupId'));
        formData.append("groupName", value);
        axios.post('http://43.143.140.26/api/chat/group/make', formData, {
        }).then((response) => {
          console.log('创建多人群聊成功！');
          this.$message({
            type: 'success',
            message: '你已创建群聊：' + value
          });
          this.updateRoomList();
        }).catch(function (error) {
          console.error('请求出错:', error);
        });
      }).catch(() => {      
      });

      // const formData = new FormData();
      // formData.append("userId", sessionStorage.getItem('userId'));
      // formData.append("teamId", sessionStorage.getItem('historyChatGroupId'));
      // formData.append("groupName", "Test Group 1");
      // axios.post('http://43.143.140.26/api/chat/group/make', formData, {
      // }).then((response) => {
      //   console.log('创建多人群聊成功！');
      //   this.updateRoomList();
      // }).catch(function (error) {
      //   console.error('请求出错:', error);
      // });
    },
    updateRoomList() {
      const formData = new FormData();
      formData.append("userId", sessionStorage.getItem('userId'));
      formData.append("groupId", this.$route.params.groupID);
      axios.post('http://43.143.140.26/api/chat/list/', formData, {
      }).then((response) => {
        console.log('获取的三种聊天室列表:', response.data);
        this.groupRoomList = response.data.groupRooms;
        this.teamRoomList = response.data.teamRooms;
        this.personRoomList = response.data.personalRooms;
        if (this.$route.params.groupID == 0) { //多人群聊
          this.personList = this.groupRoomList
        } else { //团队群聊
          this.personList = [...this.teamRoomList, ...this.personRoomList];
        }
        console.log('实际显示的聊天室列表:', this.personList);
      }).catch(function (error) {
        console.error('请求出错:', error);
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 90vw;
  height: 90vh;
  background-color: rgb(39, 42, 55);
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.chatHome {
  // margin-top: 20px;
  display: flex;
  .chatLeft {
    width: 280px;
    .title {
      color: #fff;
      padding-left: 10px;
    }
    .online-person {
      margin-top: 10px;
      .onlin-text {
        padding-left: 10px;
        color: rgb(176, 178, 189);
      }
      .person-cards-wrapper {
        padding-left: 10px;
        height: 65vh;
        margin-top: 0px;
        overflow: hidden;
        overflow-y: scroll;
        box-sizing: border-box;
        &::-webkit-scrollbar {
          width: 0; /* Safari,Chrome 隐藏滚动条 */
          height: 0; /* Safari,Chrome 隐藏滚动条 */
          display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
        }
      }
    }
  }

  .chatRight {
    flex: 1;
    padding-right: 30px;
    .showIcon {
      position: absolute;
      top: calc(50% - 150px); /*垂直居中 */
      left: calc(50% - 50px); /*水平居中 */
      .icon-snapchat {
        width: 300px;
        height: 300px;
        font-size: 300px;
        // color: rgb(28, 30, 44);
      }
    }
  }
}
</style>
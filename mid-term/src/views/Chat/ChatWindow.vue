<template>
  <div class="chat-window">
    <div class="top">
      <div class="head-pic">
        <HeadPortrait :imgUrl="frinedInfo.headImg"></HeadPortrait>
      </div>
      <div class="info-detail">
        <div class="name">{{ frinedInfo.roomName }}</div>
        <!-- <div class="detail">{{ frinedInfo.detail }}</div> -->
      </div>
      <div class="other-fun">
        <!-- <span class="iconfont icon-shipin function_icon" @click="video"> </span> -->
        <!-- <span class="iconfont icon-gf-telephone function_icon" @click="telephone"></span> -->
        <label for="docFile">
          <span class="iconfont icon-wenjian function_icon"></span>
        </label>
        <label for="imgFile">
          <span class="iconfont icon-tupian function_icon"></span>
        </label>
        <input
          type="file"
          name=""
          id="imgFile"
          @change="sendImg"
          accept="image/*"
        />
        <input
          type="file"
          name=""
          id="docFile"
          @change="sendFile"
          accept="application/*,text/*"
        />
        <span v-if="roomType != 'personal'" 
          class="el-icon-more" 
          style="color: gray;" @click="showChatSetting"
        ></span>
      </div>
    </div>
    <div class="botoom">
      <div class="chat-content" ref="chatContent">
        <div class="chat-wrapper" v-for="item in chatList" :key="item.id">
          <!-- 对方发出的信息 -->
          <div class="chat-friend" v-if="item.authorId != userInfo.id">
            <div class="chat-text" v-if="item.type == 'text'">
              {{ item.content }}
            </div>
            <div class="chat-img" v-if="(item.type == 'image' || item.type == 'emoji')">
              <img
                :src="item.content"
                alt="表情"
                v-if="item.type == 'emoji'"
                style="width: 100px; height: 100px"
              />
              <el-image style="max-width: 300px; border-radius: 10px" :src="item.image" :preview-src-list="srcImgList" v-else>
              </el-image>
            </div>
            <div class="chat-img" v-if="item.type == 'file'">
              <div class="word-file">
                <FileCard
                  :fileType="item.fileType"
                  :file="item.file"
                  :fileName="item.fileName"
                ></FileCard>
              </div>
            </div>
            <div class="info-time">
              <img :src="item.avatar" alt="" />
              <span>{{ item.authorName }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
          <!-- 用户发出的信息 -->
          <div class="chat-me" v-else>
            <div class="chat-text" v-if="item.type == 'text'">
              {{ item.content }}
            </div>
            <div class="chat-img" v-if="(item.type == 'image' || item.type == 'emoji')">
              <img
                :src="item.content"
                alt="表情"
                v-if="item.type == 'emoji'"
                style="width: 100px; height: 100px"
              />
              <el-image
                style="max-width: 300px; border-radius: 10px"
                :src="item.image"
                :preview-src-list="srcImgList"
                v-else
              >
              </el-image>
            </div>
            <div class="chat-img" v-if="item.type == 'file'">
              <div class="word-file">
                <FileCard
                  :fileType="item.fileType"
                  :file="item.file"
                  :fileName="item.fileName"
                ></FileCard>
              </div>
            </div>
            <div class="info-time">
              <span>{{ item.authorName }}</span>
              <span>{{ item.time }}</span>
              <img :src="item.avatar" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="chatInputs">
        <!-- emoji选择框 -->
        <div class="emoji boxinput" @click="clickEmoji">
          <img src="@/assets/img/emoji/smiling-face.png" alt="" />
        </div>
        <div class="emoji-content">
          <Emoji
            v-show="showEmoji"
            @sendEmoji="sendEmoji"
            @closeEmoji="clickEmoji"
          ></Emoji>
        </div>
        <!-- 输入框 -->
        <at-ta :members="AtListsForMember" name-key="name" v-if="identity == '成员'">
          <template slot="item" slot-scope="s">
            <img :src="s.item.avatar">
            <span v-text="s.item.name"></span>
          </template>
          <el-input 
            class="messegeBox" 
            v-model="inputMsg" 
            type="textarea" 
            resize="none"
            @keyup.enter.native="sendText()"
            style="width: 48vw;"
            >
          </el-input>
        </at-ta>
        <at-ta :members="AtListsForAdmin" name-key="name" v-else>
          <template slot="item" slot-scope="s">
            <img :src="s.item.avatar">
            <span v-text="s.item.name"></span>
          </template>
          <el-input 
            class="messegeBox" 
            v-model="inputMsg" 
            type="textarea" 
            resize="none"
            @keyup.enter.native="sendText()"
            style="width: 48vw;"
            >
          </el-input>
        </at-ta>
        <div class="send boxinput" @click="sendText">
          <img src="@/assets/img/emoji/rocket.png" alt="" />
        </div>
      </div>
    </div>
    <!-- 群聊设置卡片 -->
    <transition name="el-fade-in-linear">
      <el-card v-show="showChatSettingFlag" class="chat-setting-box">
        <div class="card_team_member">
          <!-- Title -->
          <div style="text-align: left; padding-left: 20px; padding-top: 10px; font-size: 15px; height: 30px;">群成员
          </div>
          <div style="display: flex; flex-wrap: wrap;">
            <!-- 群成员信息列表 -->
            <div class="groupMemberAvatar"
              v-for="(item, index) in roomMembers" :key="index"
              style="display: flex;">
              <el-avatar :size="36" :src="item.avatar"></el-avatar>
              <span> {{ item.nickname }} </span>
            </div>
            <!-- 邀请新成员 div -->
            <div  @click="openInviteDialog" v-if="identity == '创建者' && roomType == 'group'" class="groupMemberFunction">
              <div style="font-size: 27px; height: 36px; width: 36px; border: 1px solid rgb(200, 195, 195); display: flex; justify-content: center; align-items: center;">
                <i class="el-icon-plus" style="color: grey;"></i>
              </div>
              <span>邀请</span>
            </div>
            <!-- 删除新成员 div -->
            <div  @click="removeDialogVisible = true" v-if="identity == '创建者' && roomType == 'group'" class="groupMemberFunction">
              <div style="font-size: 27px; height: 36px; width: 36px; border: 1px solid rgb(200, 195, 195); display: flex; justify-content: center; align-items: center;">
                <i class="el-icon-minus" style="color: grey;"></i>
              </div>
              <span>删除</span>
            </div>
          </div>
        </div>
        <el-button type="text" v-if="identity == '创建者'" @click="dissolveGroup" class="leave-group-button">解散群聊</el-button>
        <el-button type="text" v-else @click="leaveGroup" class="leave-group-button">离开群聊</el-button>
      </el-card>
    </transition>
    <!-- 邀请成员dialog -->
    <el-dialog :visible.sync="inviteDialogVisible" :modal-append-to-body="false" width="600px">
      <div style="height: 300px; width: 500px; position: relative;">
        <!-- Select member box -->
        <div class="select-left-box">
          <el-select v-model="selectOperationMember" multiple placeholder="请选择" @change="selectMemberChange">
            <el-option
              v-for="item in teamMembersForInvite"
              :key="item.id"
              :label="item.nickname"
              :value="item.id">
              <span style="float: left"><el-avatar :src="item.avatar"></el-avatar></span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.nickname }}</span>
            </el-option>
          </el-select>
        </div>
        <el-divider direction="vertical"></el-divider>
        <!-- selected member list -->
        <div class="select-right-box">
          <div style="height: 10%; width: 100%; position: absolute; top: 0; text-align: left; padding-left: 20px;">
            选择新成员
          </div>
          <div style="height: 70%; width: 100%; position: absolute; top: 10%;">
            <div v-for="(item, index) in selectedMemberDetail" :key="index">
              <div
                style="height: 60px; width: 60px; float: left; display: flex; flex-direction:column; align-items: center;">
                <el-avatar :size="36" :src="item.avatar"></el-avatar>
                <span> {{ item.nickname }} </span>
              </div>
            </div>
          </div>
          <div style="height: 20%; width: 300px; position: absolute; bottom: 0;">
            <el-divider></el-divider>
            <el-button type="primary" @click="inviteMemberToGroups">确认</el-button>
            <el-button type="success" @click="cancelSelectedMembers">取消</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 删除成员 dialog -->
    <el-dialog :visible.sync="removeDialogVisible" :modal-append-to-body="false" width="600px">
      <div style="height: 300px; width: 500px; position: relative;">
        <!-- Select member box -->
        <div class="select-left-box">
          <el-select v-model="selectOperationMember" multiple placeholder="请选择" @change="selectMemberChange">
            <el-option
              v-for="item in roomMembersForRemove"
              :key="item.id"
              :label="item.nickname"
              :value="item.id">
              <span style="float: left"><el-avatar :src="item.avatar"></el-avatar></span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.nickname }}</span>
            </el-option>
          </el-select>
        </div>
        <el-divider direction="vertical"></el-divider>
        <!-- selected member list -->
        <div class="select-right-box">
          <div style="height: 10%; width: 100%; position: absolute; top: 0; text-align: left; padding-left: 20px;">
            移出群成员
          </div>
          <div style="height: 70%; width: 100%; position: absolute; top: 10%;">
            <div v-for="(item, index) in selectedMemberDetail" :key="index">
              <div
                style="height: 60px; width: 60px; float: left; display: flex; flex-direction:column; align-items: center;">
                <el-avatar :size="36" :src="item.avatar"></el-avatar>
                <span> {{ item.nickname }} </span>
              </div>
            </div>
          </div>
          <div style="height: 20%; width: 300px; position: absolute; bottom: 0;">
            <el-divider></el-divider>
            <el-button type="primary" @click="removeMemberFromGroups">确认</el-button>
            <el-button type="success" @click="cancelSelectedMembers">取消</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { animation } from "@/util/util";

import HeadPortrait from "@/components/HeadPortrait";
import Emoji from "@/components/Emoji";
import FileCard from "@/components/FileCard.vue";
import AtTa from 'vue-at/dist/vue-at-textarea';
import At from 'vue-at';
export default {
  components: {
    HeadPortrait,
    Emoji,
    FileCard,
    AtTa,
    At,
  },
  props: {
    frinedInfo: Object,
    default() {
      return {};
    },
  },
  watch: {
    frinedInfo() {
      this.getFriendChatMsg();
      // this.getTeamMemberList();
      this.getMemberList()
      this.init();
    },
  },
  data() {
    return {
      chatList: [],
      inputMsg: "",
      showEmoji: false,
      friendInfo: {},
      srcImgList: [],
      ws: '',
      userInfo: null,
      groupMembers: [], //团队成员
      AtListsForMember: [], //房间内普通成员@弹出的列表
      AtListsForAdmin: [], //房间内管理员@弹出的列表（包含"所有人"）
      roomMembers: [], // 房间成员
      teamMembersForInvite: [], // 不在房间内的其他团队成员 : groupMembers - roomMembers
      roomMembersForRemove: [], // 不包含自己的房间成员
      groupMembersForAdmin: [], // replaced by: AtListsForAdmin
      groupMembersForSetting: [], // replaced by: roomMembers
      identity: "",
      showChatSettingFlag: false, //控制群聊信息卡片显示
      removeDialogVisible: false, //控制删除成员dialog显示
      inviteDialogVisible: false, //控制邀请成员dialog显示
      selectOperationMember: [], // el-select选择的（邀请/删除）成员的id列表
      selectedMemberDetail: [], // el-select选择的（邀请/删除）成员的对象列表
      roomType: "",
    };
  },
  created() {
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
        console.log('成功响应:', response.data);
        this.userInfo = response.data;
      }).catch(function (error) {
        console.error('请求出错:', error);
      });
    } else {
      console.log("has not login");
    }
    // 初始化时，获取房间的聊天记录和
    this.getFriendChatMsg();
    // this.getTeamMemberList();
    this.getMemberList();
    this.init();
  },
  methods: {
    // 连接Websocket
    init() {
      let socketUrl = "ws://43.143.140.26:7002/ws/chat/?roomId=" + this.frinedInfo.roomId + "&userId=" + sessionStorage.getItem('userId');
      this.ws = new WebSocket(socketUrl);
      this.ws.addEventListener("open", () => {
        console.log("websocket已打开,当前RoomId为" + this.frinedInfo.roomId);
      });
      this.ws.addEventListener("message", (e) => {
        console.log("收到websocket消息:" + e.data);
        const data = JSON.parse(e.data)
        this.chatList.push(data);
        this.scrollBottom();
      });
    },
    //获取团队内的成员列表
    getTeamMemberList() {
      axios.get('http://43.143.140.26/api/team/list', {
        params: {
          team_id: this.$route.params.groupID,
          id: sessionStorage.getItem('userId')
        }
      }).then((response) => {
        this.groupMembers = response.data.members;
        this.groupMembersForAdmin = JSON.parse(JSON.stringify(response.data.members));
        this.groupMembersForSetting = JSON.parse(JSON.stringify(response.data.members));
        const indexToDelete = this.groupMembers.findIndex(member => member.id == sessionStorage.getItem('userId'));
        this.groupMembers.splice(indexToDelete, 1); // 删除当前用户后，groupMembers包含除当前用户外的所有人
        this.groupMembersForAdmin.splice(indexToDelete, 1);
        this.groupMembersForAdmin.unshift({
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
          nickname: '所有人'
        }); // 删除当前用户并加入”所有人“对象后，groupMembersForAdmin包含团队内除当前用户外的所有人 & ”所有人“
        this.groupMembers = this.groupMembers.map(item=>({
            avatar:item.avatar,
            name:item.nickname,
        }));
        this.groupMembersForAdmin = this.groupMembersForAdmin.map(item=>({
            avatar:item.avatar,
            name:item.nickname,
        }));
        this.identity = response.data.role;
        console.log("members:" + this.groupMembers);
        console.log("membersplus:" + this.groupMembersForAdmin);
        console.log("groupMembersForSetting:" + this.groupMembersForSetting);
      }).catch(function (error) {
        console.error('请求出错:', error);
      });
    },
    // 获取团队 & 房间成员
    getMemberList() {
      console.log("getTeamMemberList");
      var teamID = this.$route.params.groupID;
      const userID = sessionStorage.getItem('userId');
      if (teamID == 0) {
        teamID = sessionStorage.getItem('historyChatGroupId');
      }
      console.log("获取的teamID为：" + teamID);
      // 团队成员相关列表，暴露出groupMembers
      axios.get('http://43.143.140.26/api/team/list', {
        params: {
          team_id: teamID,
          id: userID
        }
      }).then((response) => {
        this.groupMembers = response.data.members;
        console.log("团队成员 groupMembers:" + this.groupMembers);
      }).catch(function (error) {
        console.error('请求出错:', error);
      });
      console.log("getRoomMemberList");
      // 房间成员相关列表，暴露出 identity roomMembers AtListsForMember AtListsForAdmin
      const formData = new FormData();
      formData.append("roomId", this.frinedInfo.roomId);
      formData.append("userId", userID);
      axios.post('http://43.143.140.26/api/chat/room/', formData, {
      }).then((response) => {
        this.identity = response.data.role; //当前用户在房间内身份
        this.roomMembers = response.data.members; // 房间全部成员列表
        this.roomMembersForRemove = JSON.parse(JSON.stringify(response.data.members)); //房间内其他成员列表
        this.AtListsForMember = JSON.parse(JSON.stringify(response.data.members));
        this.AtListsForAdmin = JSON.parse(JSON.stringify(response.data.members));
        const indexToDelete = this.AtListsForMember.findIndex(member => member.id == sessionStorage.getItem('userId'));
        this.AtListsForMember.splice(indexToDelete, 1); // 成员看到的@列表
        this.AtListsForAdmin.splice(indexToDelete, 1); 
        this.roomMembersForRemove.splice(indexToDelete, 1); 
        this.AtListsForAdmin.unshift({
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
          nickname: '所有人'
        }); // 管理员看到的@列表
        this.AtListsForMember = this.AtListsForMember.map(item=>({
            avatar:item.avatar,
            name:item.nickname,
        }));
        this.AtListsForAdmin = this.AtListsForAdmin.map(item=>({
            avatar:item.avatar,
            name:item.nickname,
        }));
        console.log("用户身份 identity:" + this.identity);
        console.log("房间成员 roomMembers:" + this.roomMembers);
        console.log("房间其他成员 roomMembersForRemove:" + this.roomMembersForRemove);
        console.log("成员@列表 AtListsForMember:" + this.AtListsForMember);
        console.log("管理员@列表 AtListsForAdmin:" + this.AtListsForAdmin);
      }).catch(function (error) {
        console.error('请求出错:', error);
      });
    },
    //获取聊天记录
    getFriendChatMsg() {
      const formData = new FormData();
      formData.append("userId", sessionStorage.getItem('userId'));
      formData.append("roomId", this.frinedInfo.roomId);
      axios.post('http://43.143.140.26/api/chat/message/', formData, {
      }).then((response) => {
        console.log('聊天室的聊天记录', response.data);
        this.chatList = response.data.messages;
        this.identity = response.data.permission;
        this.roomType = response.data.type;
        console.log("获取聊天记录时为身份赋值为：" + this.identity);
        this.scrollBottom();
        // console.log('fitendInfo:', this.frinedInfo);
        // console.log('chatList:', this.chatList);
      }).catch(function (error) {
        console.error('请求出错:', error);
      });
      // 预览图片功能
      this.chatList.forEach((item) => {
        if (item.type == 'image') {
          this.srcImgList.push(item.content);
        }
      });
    },
    //发送信息
    sendMsg(msgList) {
      // console.log("试图发送的消息内容:" + msgList);
      // console.log("实际发送的Json:" + JSON.stringify(msgList));
      this.ws.send(JSON.stringify(msgList));
      this.scrollBottom();
    },
    //获取窗口高度并滚动至最底层
    scrollBottom() {
      this.$nextTick(() => {
        const scrollDom = this.$refs.chatContent;
        animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
      });
    },
    //关闭标签框
    clickEmoji() {
      this.showEmoji = !this.showEmoji;
    },
    //发送文字信息
    sendText() {
      if (this.inputMsg) {
        let chatMsg = {
          text: this.inputMsg,
          type: 'text'
        };
        this.sendMsg(chatMsg);
        this.$emit('personCardSort', this.frinedInfo.roomId)
        this.inputMsg = "";
      } else {
        this.$message({
          message: "消息不能为空哦~",
          type: "warning",
        });
      }
    },
    //发送表情
    sendEmoji(msg) {
      // let chatMsg = {
      //   avatar: this.userInfo.avatar_url,
      //   authorName: this.userInfo.nickname,
      //   content: msg,
      //   type: "emoji", //信息类型，0文字，1图片
      // };
      let chatMsg = {
        emoji: msg,
        type: 'emoji'
      };
      this.sendMsg(chatMsg);
      this.clickEmoji();
    },
    //发送本地图片
    sendImg(e) {
      // let chatMsg = {
      //   avatar: this.userInfo.avatar_url,
      //   authorName: this.userInfo.nickname,
      //   content: "",
      //   type: "image", //信息类型，0文字，1图片, 2文件
      // };
      let chatMsg = {
        image: "",
        type: 'image'
      };
      let file = e.target.files[0]; //获取的图片文件
      if (!e || !window.FileReader) {
        console.log("不支持File Reader捏");
        return; // 看是否支持FileReader
      }
      if (window.FileReader) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
            let base64String = e.target.result;
            chatMsg.image = base64String; //取base64传入后端
            this.sendMsg(chatMsg);
            e.target.files = null;
        }
      } 
    },
    //发送文件
    sendFile(e) {
      // let chatMsg = {
      //   avatar: this.userInfo.avatar_url,
      //   authorName: this.userInfo.nickname,
      //   content: "",
      //   type: "file", //信息类型，0文字，1图片, 2文件
      //   extend: {
      //     fileType: "", //(1word，2excel，3ppt，4pdf，5zpi, 6txt)
      //   },
      // };
      let chatMsg = {
        file: "",
        type: 'file',
        fileName: '',
        fileType: "", //(1word，2excel，3ppt，4pdf，5zpi, 6txt),
      };
      let file = e.target.files[0]; //文件
      chatMsg.fileName = file.name;
      if (!e || !window.FileReader) {
        console.log("不支持File Reader捏");
        return; // 看是否支持FileReader
      }
      switch (file.type) {
        case "application/msword":
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          chatMsg.fileType = 1;
          break;
        case "application/vnd.ms-excel":
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          chatMsg.fileType = 2;
          break;
        case "application/vnd.ms-powerpoint":
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          chatMsg.fileType = 3;
          break;
        case "application/pdf":
          chatMsg.fileType = 4;
          break;
        case "application/zip":
        case "application/x-zip-compressed":
          chatMsg.fileType = 5;
          break;
        case "text/plain":
          chatMsg.fileType = 6;
          break;
        default:
          chatMsg.fileType = 0;
      }
      if (window.FileReader) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
            let base64String = e.target.result;
            chatMsg.file = base64String; //取base64传入后端
            // console.log("文件base64编码：", base64String);
            this.sendMsg(chatMsg);
            e.target.files = null;
        }
      }
    },
    // 打开群聊设置
    showChatSetting() {
      // this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
      if (this.showChatSettingFlag == true) {
        this.showChatSettingFlag = false
      } else {
        this.showChatSettingFlag = true;
      }
    },
    // 邀请成员进入群聊
    inviteMemberToGroups() {
      const formData = new FormData();
      formData.append("roomId", this.frinedInfo.roomId);
      formData.append("userId", sessionStorage.getItem('userId'));
      formData.append("invite", JSON.stringify(this.selectOperationMember));
      axios.post('http://43.143.140.26/api/chat/group/invite', formData, {
      }).then((response) => {
        this.$message('邀请成员成功');
        this.getMemberList();
        this.cancelSelectedMembers();
        this.inviteDialogVisible = false;
      }).catch(function (error) {
        console.error('请求出错:', error);
      });
    },
    // 将群聊成员移出群聊
    removeMemberFromGroups() {
      const formData = new FormData();
      formData.append("roomId", this.frinedInfo.roomId);
      formData.append("userId", sessionStorage.getItem('userId'));
      formData.append("delete", JSON.stringify(this.selectOperationMember));
      axios.post('http://43.143.140.26/api/chat/group/delete', formData, {
      }).then((response) => {
        this.$message('移除成员成功');
        this.getMemberList();
        this.cancelSelectedMembers();
        this.removeDialogVisible = false;
      }).catch(function (error) {
        console.error('请求出错:', error);
      });
    },
    // “取消”按钮，关闭弹出的 邀请/删除 dialog
    cancelSelectedMembers() {
      this.selectOperationMember = [];
      this.selectedMemberDetail = [];
      this.removeDialogVisible = false;
      this.inviteDialogVisible = false;
    },
    // 解散群聊
    dissolveGroup() {
      const formData = new FormData();
      formData.append("roomId", this.frinedInfo.roomId);
      formData.append("userId", sessionStorage.getItem('userId'));
      axios.post('http://43.143.140.26/api/chat/group/room/remove', formData, {
      }).then((response) => {
        console.log('解散群聊成功', response.data);
        this.$router.go(0);
      }).catch(function (error) {
        console.error('请求出错:', error);
      });
    },
    // 普通成员离开群聊
    leaveGroup() {
      const formData = new FormData();
      const leaveGroupId = sessionStorage.getItem('userId');
      const leaveGroupIdList = [ leaveGroupId ];
      formData.append("roomId", this.frinedInfo.roomId);
      formData.append("userId", sessionStorage.getItem('userId'));
      formData.append("delete", JSON.stringify(leaveGroupIdList));
      axios.post('http://43.143.140.26/api/chat/group/delete', formData, {
      }).then((response) => {
        this.$message('离开群聊成功');
        this.$router.go(0);
      }).catch(function (error) {
        console.error('请求出错:', error);
      });
    },
    // 当选择的邀请/移除成员变化时，为右边的detail列表进行更改
    selectMemberChange() {
      this.selectedMemberDetail = this.groupMembers.filter(item => this.selectOperationMember.includes(item.id));
    },
    // 点击邀请时，更新当前可邀请的用户列表
    openInviteDialog() {
      this.teamMembersForInvite = this.groupMembers.filter(item1 => {
        return !this.roomMembers.some(item2 => item2.id === item1.id);
      });
      console.log("teamMembersForInvite:" + this.teamMembersForInvite);
      this.inviteDialogVisible = true;
    },
  },
  beforeDestroy() {
    this.ws.close();
  },
};
</script>

<style lang="scss" scoped>
.chat-window {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  position: relative;

  .top {
    margin-bottom: 50px;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .head-pic {
      float: left;
    }
    .info-detail {
      float: left;
      margin: 5px 20px 0;
      .name {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
      }
      .detail {
        color: #9e9e9e;
        font-size: 12px;
        margin-top: 2px;
      }
    }
    .other-fun {
      float: right;
      margin-top: 20px;
      span {
        margin-left: 30px;
        cursor: pointer;
      }
      // .icon-tupian {

      // }
      input {
        display: none;
      }
    }
  }
  .botoom {
    width: 100%;
    height: 70vh;
    background-color: rgb(50, 54, 68);
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    .chat-content {
      width: 100%;
      height: 85%;
      overflow-y: scroll;
      padding: 20px;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 0; /* Safari,Chrome 隐藏滚动条 */
        height: 0; /* Safari,Chrome 隐藏滚动条 */
        display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
      }
      .chat-wrapper {
        position: relative;
        word-break: break-all;
        .chat-friend {
          width: 100%;
          float: left;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          .chat-text {
            max-width: 90%;
            padding: 20px;
            border-radius: 20px 20px 20px 5px;
            background-color: rgb(56, 60, 75);
            color: #fff;
            &:hover {
              background-color: rgb(39, 42, 55);
            }
          }
          .chat-img {
            img {
              width: 100px;
              height: 100px;
            }
          }
          .info-time {
            margin: 10px 0;
            color: #fff;
            font-size: 14px;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 10px;
            }
            span:last-child {
              color: rgb(101, 104, 115);
              margin-left: 10px;
              vertical-align: middle;
            }
          }
        }
        .chat-me {
          width: 100%;
          float: right;
          margin-bottom: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          .chat-text {
            float: right;
            max-width: 90%;
            padding: 20px;
            border-radius: 20px 20px 5px 20px;
            background-color: rgb(29, 144, 245);
            color: #fff;
            &:hover {
              background-color: rgb(26, 129, 219);
            }
          }
          .chat-img {
            img {
              max-width: 300px;
              max-height: 200px;
              border-radius: 10px;
            }
          }
          .info-time {
            margin: 10px 0;
            color: #fff;
            font-size: 14px;
            display: flex;
            justify-content: flex-end;

            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-left: 10px;
            }
            span {
              line-height: 30px;
            }
            span:first-child {
              color: rgb(101, 104, 115);
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .chatInputs {
      width: 90%;
      position: absolute;
      bottom: 0;
      margin: 3%;
      display: flex;
      .boxinput {
        width: 50px;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 1px solid rgb(80, 85, 103);
        position: relative;
        cursor: pointer;
        img {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .emoji {
        transition: 0.3s;
        &:hover {
          background-color: rgb(46, 49, 61);
          border: 1px solid rgb(71, 73, 82);
        }
      }

      .inputs {
        width: 90%;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 2px solid rgb(34, 135, 225);
        padding: 10px;
        box-sizing: border-box;
        transition: 0.2s;
        font-size: 20px;
        color: #fff;
        font-weight: 100;
        margin: 0 20px;
        &:focus {
          outline: none;
        }
      }
      .send {
        background-color: rgb(29, 144, 245);
        border: 0;
        transition: 0.3s;
        box-shadow: 0px 0px 5px 0px rgba(0, 136, 255, 1);
        &:hover {
          box-shadow: 0px 0px 10px 0px rgba(0, 136, 255, 1);
        }
      }
    }

    .messegeBox {
      width: 400px;
      height: 50px;
      background-color: white;
      border-radius: 50%;
      margin-left: 7px;
      margin-right: 7px;
    }
  }
}
.chat-setting-box {
  position: absolute;
  right: 0%;
  top: 15%;
  height: 500px;
  width: 350px;
  // background-color: blue;
}

.groupMemberAvatar {
  height: 60px; 
  width: 60px; 
  float: left; 
  display: flex; 
  flex-direction:column; 
  align-items: center;
  margin-top: 10px;
  margin-left: 10px;
}

.groupMemberFunction {
  height: 60px; 
  width: 60px; 
  float: left; 
  display: flex; 
  flex-direction:column; 
  align-items: center;
  margin-top: 6px;
  margin-left: 10px;
}

.el-divider--vertical{
  display:inline-block;
  width:1px;
  height:100%;
  position: absolute;
  left: 240px;
  // margin:0 8px;
  // vertical-align:middle;
  // position:fixed;
  // left: 250px;
}

.leave-group-button {
  position: absolute;
  bottom: 30px;
  left: 40%;
  color: red;
  font-size: 18px;
}

.select-left-box {
  width: 50%; 
  height: 100%; 
  float: left; 
  position: relative;
}
.select-right-box {
  width: 50%; 
  height: 100%; 
  float: left; 
  position: relative;
}
#app .atwho-li img {
  width: 20px;
  height: 20px;
  border-radius: 20%;
  margin-left: -10%;
}
// #app .atwho-li template {
//   margin-left: 500px;
//   z-index: 999;
// }
</style>
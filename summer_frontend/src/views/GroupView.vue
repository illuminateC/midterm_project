<template>
  <div>
    <el-container>
      <el-header class="my_header" height=48px>
        <HeaderComponent />
      </el-header>
      <el-main class="groupBox">
        <div class="PageTitle">团队管理</div>
        <div class="PageMain">
          <div class="groupMainLeft">
            <!-- 团队信息 -->
            <el-card :body-style="{ padding: '0px' }" class="groupViewCard">
              <div class="card_header">
                <div>
                  <img :src=teamDetail.avatar style="height: 110px; width: 110px; margin-left: 20px; margin-top: 60px;">
                </div>
                <div>
                  <h2 style="position: absolute; margin-left: 30px; margin-top: -10px;">{{ teamDetail.team_name }}</h2>
                </div>
                <el-tooltip class="item" effect="light" content="聊天室" placement="top">
                  <el-button 
                    class="el-icon-s-comment el-icon-button" round: true type="text" @click="enterTeamChat"
                    style="position: absolute; right: 20px; top: 2px; font-size: 40px;"
                  ></el-button>
                </el-tooltip>
                <!-- <el-button 
                  @click="enterTeamChat"
                  style="position: absolute; top: 20px; right: 10%; height: 50px; width: 100px;"
                >团队群聊
                </el-button> -->
              </div>
              <div style="width: 100%; position: absolute; bottom: 0;">
                <h4 style="position: absolute; left: 16%; bottom: 40px;">团队创建人：{{ teamDetail.creator_name }}</h4>
                <h4 style="position: absolute; left: 16%; bottom: 5px;" v-if="teamDetail.description">
                  团队描述：{{ teamDetail.description }}</h4>
                <h4 style="position: absolute; left: 16%; bottom: 5px;" v-else>团队描述：暂无描述</h4>
              </div>
            </el-card>
            <!-- 团队项目 -->
            <el-card :body-style="{ padding: '0px' }" class="groupViewCard">
              <div class="card_header_title">项目</div>
              <el-tooltip content="项目管理" placement="top" effect="light">
                <el-button class="el-icon-setting el-icon-button" round: true type="text" @click="enterProjectManagement"
                  style="position: absolute; right: 20px; top: 2px;"></el-button>
              </el-tooltip>
              <div v-for="(item, index) in projectList" :key="index">
                <router-link :to='"/project/" + item.project_id'>
                  <el-card :body-style="{ padding: '0px' }" class="projectCard">
                    <img src="../assets/background/BG16.webp" width="78" height="78" style="border-radius: 10%;">
                    <div style="padding: 14px; max-height: 2em; overflow: hidden; position: relative;">
                      <span style="display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;"> {{ item.project_name }} </span>
                    </div>
                  </el-card>
                </router-link>
              </div>
              <div v-if="projectList.length == 0"
                style="height: 160px; width: 140px; position: absolute; left: 40%; bottom: 10%;">
                <div style="height: 140px; width: 140px;">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 240 240">
                    <path fill="#C6CDD4" fill-opacity=".2" d="M43 40H118V116.5H43z"></path>
                    <path fill="#C6CDD4" fill-opacity=".2" d="M43 121.5H118V198H43z"
                      data-spm-anchor-id="a2cl9.projex_devops2020_goldlog_projectList.0.i9.68b81b578CclBQ"></path>
                    <path fill="#C6CDD4" fill-opacity=".2" d="M123 40H198V116.5H123z"
                      data-spm-anchor-id="a2cl9.projex_devops2020_goldlog_projectList.0.i1.68b81b578CclBQ"></path>
                    <path fill="#C6CDD4" fill-opacity=".4" fill-rule="evenodd" d="M198 121.5h-75V198h59v-16h16v-60.5Z"
                      clip-rule="evenodd"></path>
                    <path fill="#C6CDD4" d="M182 182h16l-8 8-8 8v-16Z"></path>
                    <path fill="currentColor" d="M47 174H57V184H47z"></path>
                    <path fill="#fff" fill-opacity=".4" d="M47 174H57V184H47z"></path>
                    <path fill="currentColor" d="M57 164H67V174H57z"></path>
                    <path fill="#fff" fill-opacity=".4" d="M57 164H67V174H57z"></path>
                    <path fill="currentColor" d="M37 164H47V174H37z"></path>
                    <path fill="#000" fill-opacity=".2" d="M37 164H47V174H37z"></path>
                    <path fill="#C6CDD4" d="M59 56H102V57H59z"></path>
                    <path fill="#C6CDD4" d="M59 65H102V66H59z"></path>
                    <path fill="#C6CDD4" d="M59 74H102V75H59z"></path>
                  </svg>
                </div>
                <div style="height: 20px; width: 140px; font-size: 15px; color: grey;">该团队目前暂无项目</div>
              </div>
            </el-card>
          </div>
          <div class="groupMainRight">
            <!-- 公告 -->
            <el-card :body-style="{ padding: '0px' }" class="groupViewCard">
              <div class="card_header_title">公告</div>
              <el-tooltip content="公告编辑" placement="top" effect="light">
                <el-button class="el-icon-edit el-icon-button" round: true type="text" @click="editGroupAnnoucement"
                  style="position: absolute; right: 20px; top: 2px;"></el-button>
              </el-tooltip>
              <div style="position: relative;">
                <span style="margin-top: 20px; font-weight: bold;">{{ teamDetail.notice }}</span>
              </div>
              <div v-if="teamDetail.notice == null" style="height: 160px; width: 140px; position: absolute; left: 40%; bottom: 10%;">
                <div style="height: 140px; width: 140px;">
                  <svg width="100%" height="100%" 
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 240 240"
                  >
                    <path fill="#C6CDD4" fill-opacity=".2" d="M43 40H118V116.5H43z"></path>
                    <path fill="#C6CDD4" fill-opacity=".2" d="M43 121.5H118V198H43z" data-spm-anchor-id="a2cl9.projex_devops2020_goldlog_projectList.0.i9.68b81b578CclBQ"></path>
                    <path fill="#C6CDD4" fill-opacity=".2" d="M123 40H198V116.5H123z" data-spm-anchor-id="a2cl9.projex_devops2020_goldlog_projectList.0.i1.68b81b578CclBQ"></path>
                    <path fill="#C6CDD4" fill-opacity=".4" fill-rule="evenodd" d="M198 121.5h-75V198h59v-16h16v-60.5Z" clip-rule="evenodd"></path>
                    <path fill="#C6CDD4" d="M182 182h16l-8 8-8 8v-16Z"></path>
                    <path fill="currentColor" d="M47 174H57V184H47z"></path>
                    <path fill="#fff" fill-opacity=".4" d="M47 174H57V184H47z"></path>
                    <path fill="currentColor" d="M57 164H67V174H57z"></path>
                    <path fill="#fff" fill-opacity=".4" d="M57 164H67V174H57z"></path>
                    <path fill="currentColor" d="M37 164H47V174H37z"></path>
                    <path fill="#000" fill-opacity=".2" d="M37 164H47V174H37z"></path>
                    <path fill="#C6CDD4" d="M59 56H102V57H59z"></path><path fill="#C6CDD4" d="M59 65H102V66H59z"></path>
                    <path fill="#C6CDD4" d="M59 74H102V75H59z"></path>
                  </svg>
                </div>
                <div style="height: 20px; width: 140px; font-size: 15px; color: grey;">该团队目前暂无公告</div>
              </div>
            </el-card>
            <!-- 成员 -->
            <el-card :body-style="{ padding: '0px' }" class="groupViewCard">
              <div class="card_header_title">
                <span>成员</span>
                <el-tooltip content="邀请新成员" placement="top" effect="light">
                  <el-button class="el-icon-plus el-icon-button" round: true type="text"
                    @click="dialogFormVisibleMember = true" style="position: absolute; right: 70px; top: 2px;"></el-button>
                </el-tooltip>
                <el-dialog title="邀请新成员" :visible.sync="dialogFormVisibleMember">
                  <el-form :model="formMember">
                    <el-form-item label="搜索成员信息" :label-width="formLabelWidth">
                      <el-input v-model="search_member" auto-complete="off">
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="searchMember"></i>
                      </el-input>
                    </el-form-item>
                    <el-table :data="searchData" style="width: 100%" size="medium" @cell-mouse-enter="handleRowMouseEnter"
                      @cell-mouse-leave="handleRowMouseLeave" v-if="showMemberTable === true">
                      <el-table-column prop="nickname" label="用户昵称" sortable width="180">
                      </el-table-column>
                      <el-table-column prop="realname" label="用户真实姓名" sortable width="180">
                      </el-table-column>
                      <el-table-column prop="email" label="用户email" sortable width="240">
                      </el-table-column>
                      <el-table-column label="" width="120">
                        <template slot-scope="scope">
                          <el-button v-if="scope.row.hover" round @click="sendInvitation(scope.row.id)"
                            style="float: left; border: none; margin-top: 2px;" size="medium">
                            邀请
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleMember = false">关 闭</el-button>
                  </div>
                </el-dialog>
                <el-tooltip content="成员管理" placement="top" effect="light">
                  <el-button class="el-icon-setting el-icon-button" round: true type="text" @click="enterMemberView"
                    style="position: absolute; right: 20px; top: 2px;">
                  </el-button>
                </el-tooltip>
              </div>
              <div class="card_team_member">
                <div style="text-align: left; padding-left: 20px; padding-top: 10px; font-size: 15px; height: 30px;">创始人
                </div>
                <div v-for="(item, index) in memberList" :key="index" v-if="item.role === '创建者'">
                  <div class="groupMemberAvatar">
                    <!-- <img :src="item.avatar" style="height: 36px; width: 36px;"> -->
                    <el-avatar :size="36" :src="item.avatar"></el-avatar>
                    <span> {{ item.nickname }} </span>
                  </div>
                </div>
              </div>
              <div class="card_team_member">
                <div style="text-align: left; padding-left: 20px; padding-top: 10px; font-size: 15px; height: 30px;">管理员
                </div>
                <div v-for="(item, index) in memberList" :key="index" v-if="item.role === '管理员'">
                  <div class="groupMemberAvatar">
                    <!-- <img :src="item.avatar" style="height: 36px; width: 36px;"> -->
                    <el-avatar :size="36" :src="item.avatar"></el-avatar>
                    <span> {{ item.nickname }} </span>
                  </div>
                </div>
              </div>
              <div class="card_team_member">
                <div style="text-align: left; padding-left: 20px; padding-top: 10px; font-size: 15px; height: 30px;">普通成员
                </div>
                <div v-for="(item, index) in memberList" :key="index" v-if="item.role === '成员'">
                  <div class="groupMemberAvatar">
                    <!-- <img :src="item.avatar" style="height: 36px; width: 36px;"> -->
                    <el-avatar :size="36" :src="item.avatar"></el-avatar>
                    <span> {{ item.nickname }} </span>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '@/components/HeaderComponent.vue';
export default {
  components: {
    HeaderComponent
  },
  props: {},
  data() {
    return {
      formLabelWidth: '120px',
      showMemberTable: false,
      search_member: '',
      searchData: [],
      testProjectList: Array(30).fill({
        projectName: "项目name ",
        coverUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      }),
      invitedID: '',
      projectList: [],
      memberList: [],
      teamDetail: [],
      dialogFormVisibleMember: false,
      formMember: {
        id: ''
      },
      groupAnnouncement: null,
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleRowMouseEnter(row, column, event) {
      row.hover = true;
    },
    handleRowMouseLeave(row, column, event) {
      row.hover = false;
    },
    searchMember() {
      let formData = new FormData();
      formData.append('info', this.search_member);
      axios.post('http://43.143.140.26/api/user/search', formData)
        .then(res => {              /* res 是 response 的缩写 */
          switch (res.data.errno) {
            case 0: {
              console.log(res.data)
              this.searchData = res.data.search_list;
              this.showMemberTable = true;
              break;
            }
            default: {
              this.$message.warning("搜索失败！");
              break;
            }
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    enterProjectManagement() {
      let userID = sessionStorage.getItem('userId');
      // return '/manage/' + userID + '&' + this.$route.params.groupID;
      this.$router.push('/manage/' + userID + '&' + this.$route.params.groupID);
    },
    sendInvitation(id) {
      const formData = new FormData();
      formData.append("id_1", sessionStorage.getItem('userId'));
      formData.append("id_2", id);
      formData.append("team_id", this.$route.params.groupID);
      axios.post('http://43.143.140.26/api/team/invite', formData, {
      }).then((response) => {
        this.dialogFormVisibleMember = false;
        this.formMember.id = '';
        this.showMemberTable = false,
          this.search_member = '',
          console.log('成功响应:', response.data);
      }).catch(function (error) {
        console.error('请求出错:', error);
      })
    },
    enterTeamChat() {
      this.$router.push("/group/chat/" + this.$route.params.groupID);
    },
    enterMemberView() {
      this.$router.push("/group/member/" + this.$route.params.groupID);
    },
    editGroupAnnoucement() {
      this.$prompt('请输入公告内容', '编辑团队公告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        const formData = new FormData();
        formData.append("team_id", this.$route.params.groupID);
        formData.append("notice", value);
        axios.post('http://43.143.140.26/api/team/edit', formData, {
        }).then((response) => {
          console.log('修改公告成功！');
          this.updateGroupDetail();
        }).catch(function (error) {
          console.error('请求出错:', error);
        });
      }).catch(() => {      
      });
    },
    updateMemberList() {
      axios.get('http://43.143.140.26/api/team/list', {
        params: {
          team_id: this.$route.params.groupID,
          id: sessionStorage.getItem('userId')
        }
      }).then((response) => {
        console.log('成功响应成员列表:', response.data);
        this.memberList = response.data.members;
      }).catch(function (error) {
        console.error('请求出错:', error);
      });
    },
    updateGroupDetail() {
      axios.get('http://43.143.140.26/api/team/showdetail', {
        params: {
          team_id: this.$route.params.groupID
        }
      }).then((response) => {
        console.log('成功响应:', response.data);
        this.teamDetail = response.data.team_info;
      }).catch(function (error) {
        console.error('请求出错:', error);
      });
    },
    updateProjectList() {
      axios.get('http://43.143.140.26/api/project/list', {
        params: {
          team_id: this.$route.params.groupID
        }
      }).then(res => {              /* res 是 response 的缩写 */
        console.log(res.data);
        this.projectList = res.data.project_list;
      }).catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
    },
  },
  created() { },
  mounted() {
    this.updateMemberList(); // 成员列表
    this.updateGroupDetail(); // 团队信息
    this.updateProjectList(); // 团队项目
    
    // axios.get('http://43.143.140.26/api/team/list', {
    //   params: {
    //     team_id: this.$route.params.groupID,
    //     id: sessionStorage.getItem('userId')
    //   }
    // }).then((response) => {
    //   console.log('成功响应成员列表:', response.data);
    //   this.memberList = response.data.members;
    // }).catch(function (error) {
    //   console.error('请求出错:', error);
    // });
    
    // axios.get('http://43.143.140.26/api/team/showdetail', {
    //   params: {
    //     team_id: this.$route.params.groupID
    //   }
    // }).then((response) => {
    //   console.log('成功响应:', response.data);
    //   this.teamDetail = response.data.team_info;
    // }).catch(function (error) {
    //   console.error('请求出错:', error);
    // });
    
    // axios.get('http://43.143.140.26/api/project/list', {
    //   params: {
    //     team_id: this.$route.params.groupID
    //   }
    // }).then(res => {              /* res 是 response 的缩写 */
    //   console.log(res.data);
    //   this.projectList = res.data.project_list;
    // }).catch(err => {
    //   console.log(err);         /* 若出现异常则在终端输出相关信息 */
    // });
  }
};
</script>
<style>
.groupBox {
  display: flex;
  flex-direction: column;
  /* -webkit-box-orient: vertical; */
}

.groupViewCard {
  position: relative;
  min-height: 200px;
  margin-top: 20px;
  /* borderRadius: 10px; */
  border-radius: 10px;
}

.el-icon-button {
  max-height: 22px;
  min-height: 22px;
  min-width: 22px;
  font-size: 18px;
}

.groupMemberAvatar {
  height: 60px;
  width: 60px;
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-left: 10px;
}

.PageTitle {
  height: 10px;
  width: 100%;
  padding-left: 10px;
  height: 20px;
  text-align: left;
  padding-left: 20px;
  font-size: 20px;
  font-weight: bold;
}

.PageMain {
  display: flex;
  flex-direction: row;
}

.groupMainLeft {
  width: calc(66% - 7px);
  margin-right: 14px;
  /* background-color: grey; */
}

.groupMainRight {
  width: calc(34% - 7px);
  min-width: 390px;
  /* background-color: red; */
}

.groupDetailBlock {
  position: absolute;
  top: 50px;
  left: 100px;
  margin-bottom: 16px;
  min-width: 100px;
  min-height: 100px;
  background-color: yellow;
}

.card_header {
  position: relative;
  height: 85px;
  width: 100%;
  display: flex;
  align-items: center;
}

.projectCard {
  height: 130px;
  width: 100px;
  margin-left: 5px;
  float: left;
}

.card_header_title {
  position: relative;
  text-align: left;
  padding-left: 20px;
  padding-top: 10px;
  font-size: 20px;
  height: 30px;
  margin-bottom: 10px;
}

.card_team_member {
  height: 100px;
  width: 100%;
}

.little_button {
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: yellow;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<template>
  <div id="groupMemberBackground">
    <el-container>
      <el-header class="my_header" height=48px>
        <HeaderComponent/>
      </el-header>
      <el-main>
        <el-card style="height: 500px; width: 1200px; position: relative; left: 150px; border-radius: 10px;">
          <div style="height: 100px; text-align: left;">
            <span style="font-size: 20px;">{{ teamDetail.creator_name }}:</span>
            <span style="font-size: 20px; font-weight: bold;"> {{ teamDetail.team_name }}的成员管理</span>
            <!-- <span> {{ this.teamDetail.num }}</span> -->
          </div>
          <div style="width: 100%;">
            <el-table
              :data="memberList"
              border
              style="width: 100%">
              <!-- prop="nickname" -->
              <el-table-column
                label="昵称"
                width="180">
                <template slot-scope="scope">
                  <div style="height: 100%; float: left; margin-top: 10px; margin-right: 5px;">
                    <el-avatar :size="36" :src="scope.row.avatar" fit="fill"></el-avatar>
                  </div>
                  <div style="height: 100%; float: left;">
                    <h5> {{ scope.row.nickname }} </h5>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="realname"
                label="真名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
                width="270"  
              >
              </el-table-column>
              <el-table-column
                label="身份"
                width="90">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.role == '创建者'">{{ scope.row.role }}</el-tag>
                  <el-tag type="success" v-if="scope.row.role == '管理员'">{{ scope.row.role }}</el-tag>
                  <el-tag type="info" v-if="scope.row.role == '成员'">{{ scope.row.role }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                v-if="identity == '创建者' || identity == '管理员'"
              >
                <template slot-scope="scope">
                  <!-- && scope.row.nickname != teamDetail.creator_name -->
                  <el-button 
                    type="success" @click="setAdmin(scope.row.id)" 
                    v-if="scope.row.id != nowUserId && scope.row.role != '创建者' && scope.row.role == '成员'"
                  >设为管理员</el-button>
                  <el-button 
                    type="warning" @click="removeAdmin(scope.row.id)" 
                    v-if="scope.row.id != nowUserId && scope.row.role != '创建者' && identity == '创建者' && scope.row.role == '管理员'"
                  >降为普通成员</el-button>
                  <el-button 
                    type="danger" @click="removeMember(scope.row.id)" 
                    v-if="scope.row.id != nowUserId && scope.row.role != '创建者' && scope.row.role == '成员'"
                  >移除成员</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
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
      memberList: [],
      teamDetail: {},
      roleList: ['创建者','管理员','成员'],
      identity: "",
      nowUserId: null,
    };
  },
  watch: {},
  computed: {},
  methods: {
    setAdmin: function (toUserID) {
      console.log("setAdmin toUserID:" + toUserID);
      const formData = new FormData();
      formData.append("id_1", this.nowUserId);
      formData.append("id_2", toUserID);
      formData.append("team_id", this.$route.params.groupID);
      axios.post('http://43.143.140.26/api/team/changerole', formData, {
      }).then((response) => {
        console.log('成功响应:', response.data);
        this.$router.go(0);
      }).catch(function (error) {
        console.error('请求出错:', error);
      })
    },
    removeAdmin: function (toUserID) {
      console.log("removeAdmin toUserID:" + toUserID);
      const formData = new FormData();
      formData.append("id_1", this.nowUserId);
      formData.append("id_2", toUserID);
      formData.append("team_id", this.$route.params.groupID);
      axios.post('http://43.143.140.26/api/team/changerole', formData, {
      }).then((response) => {
        console.log('成功响应:', response.data);
        this.$router.go(0);
      }).catch(function (error) {
        console.error('请求出错:', error);
      })
    },
    removeMember: function (toUserID) {
      console.log("removeMember toUserID:" + toUserID);
      const formData = new FormData();
      formData.append("id_1", this.nowUserId);
      formData.append("id_2", toUserID);
      formData.append("team_id", this.$route.params.groupID);
      axios.post('http://43.143.140.26/api/team/remove', formData, {
      }).then((response) => {
        console.log('成功响应:', response.data);
        this.$router.go(0);
      }).catch(function (error) {
        console.error('请求出错:', error);
      })
    },
  },
  created() {},
  mounted() {
    // 团队信息
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
    // 成员列表
    axios.get('http://43.143.140.26/api/team/list', {
      params: {
        team_id: this.$route.params.groupID,
        id: sessionStorage.getItem('userId')
      }
    }).then((response) => {
      console.log('成功响应:', response.data);
      this.memberList = response.data.members;
      this.identity = response.data.role;
    }).catch(function (error) {
      console.error('请求出错:', error);
    });
    this.nowUserId = sessionStorage.getItem('userId');
  }
};
</script>
<style>
#groupMemberBackground {
  height: 100vh;
  width: 100vw;
  background-image: url('../assets/background/BG4.jpg'); /*68 12*/
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100%;
}
</style>
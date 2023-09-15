<template>
  <el-container style="width: 100%; height: 100%;">
    <el-header class="my_header" height=48px>
      <HeaderComponent/>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu class="el-menu-vertical">
          <el-menu-item style="margin-top: 20px;">
            <i class="el-icon-office-building"></i>
            <span slot="title">我的团队</span>
          </el-menu-item>
        </el-menu>
        <el-divider></el-divider>
        <div style="width: 100%; height: 50px">
          <span slot="title">团队管理</span>
        </div>
        <el-menu class="el-menu-vertical" :router="true">
          <el-menu-item index="/homepage/1">
            <i class="el-icon-folder-add"></i>
            <span slot="title">我创建的</span>
          </el-menu-item>
          <el-menu-item index="/homepage/2">
            <i class="el-icon-s-check"></i>
            <span slot="title">我管理的</span>
          </el-menu-item>
          <el-menu-item index="/homepage/3">
            <i class="el-icon-user"></i>
            <span slot="title">我参与的</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="my_main">
          <div v-for="(item, index) in groups" :key="index">
            <router-link :to='"/group/detail/"+item.team_id'>
              <!-- <el-card :style="{ borderRadius: '20px' }" :body-style="{ padding: '0px' }" class="groupCard" shadow="hover"
                v-if="(item.role === '创建者' && showType == 1) || ((item.role === '管理员' || item.role === '创建者') && showType == 2) || (showType == 3)"
              >
                <img :src="item.avatar" class="image" width="200" height="150" style="object-fit: cover;">
                <div style="padding: 14px;">
                  <span> {{ item.teamname }} </span>
                </div>
              </el-card> -->
              <div class="group_card"
                v-if="(item.role === '创建者' && showType == 1) || ((item.role === '管理员' || item.role === '创建者') && showType == 2) || (showType == 3)"
              >
                <img :src="item.avatar" class="image" style="object-fit: cover; width: 100%; height: 150px; border-radius: 6% 6% 0 0;">
                <div style="padding: 14px;">
                  <span> {{ item.teamname }} </span>
                </div>
              </div>
            </router-link>
          </div>
          <router-link :to='"/group/create"' style="text-decoration: none">
            <div class="group_card" 
              style="background-color: #d2e8f8; height: 200px; display: flex; justify-content: center; align-items: center;">
              <div style="padding: 14px;">
                <i class="el-icon-circle-plus" style="color: blue; font-size: 30px;"></i>
                <br/>
                <span> 创建新团队 </span>
              </div>
            </div>
          </router-link>
          
          <!-- <el-card :body-style="{ padding: '0px' }" class="groupCard">
            <router-link :to='"/group/create"' style="text-decoration: none">
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" width="200" height="150">
              <div style="padding: 14px;">
                <span> 建立新团队 </span>
              </div>
            </router-link>
          </el-card> -->
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import HeaderComponent from '@/components/HeaderComponent.vue';
export default {
  name: 'HomeView',
  components: {
    HeaderComponent,
  },
  data() {
    return {
      groups: [],
      testList: Array(20).fill({
          groupName: "团队name ",
          coverUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          groupMember: 5
      }),
      showType: 0,
      userInfo: null,
    }
  },
  methods: {
  },
  watch: {
    "$route.params.type"(newval, oldval) {
      this.$router.go(0);
    },
  },
  created() {
    document.querySelector('body').setAttribute('style', 'overflow: auto;');
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
    axios.get('http://43.143.140.26/api/team/teamlist', {
      params: {
        id: userId
      }
    }).then((response) => {
      console.log('成功响应:', response.data);
      this.groups = response.data.teams;
      this.showType = this.$route.params.type;
      console.log(this.showType);
      console.log(response.data.teams);
    }).catch(function (error) {
      console.error('请求出错:', error);
    });
  }
}
</script>

<style>
.my_header {
}
.my_main {
  /* height: 500px; */
  /* background-color: grey; */
}
.router-link-active {
  text-decoration: none;
  color: grey;
}

.group_card{
  height: 25%;
  width: 16%;
  border-radius: 6%;
  transition: 0.4s ease-in-out;
  box-shadow: 0 0 5px 2px rgb(163, 163, 163);
  float: left;
  margin: 1% 2%;
}
.group_card:hover{
  transform: translate(-5px,-5px);
  box-shadow: 4px 4px 6px 3px gray;
}
</style>

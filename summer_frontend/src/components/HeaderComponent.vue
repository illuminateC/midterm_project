<template>
  <el-row class="header_row" type="flex" style="align-items: center;">
    <el-col :span="3">
      <div class="header_col">
        <router-link to="/homepage/3" class="header-router" style="margin-left: -25px;">
          <i class="el-icon-s-home"> 首页 </i>
        </router-link>
      </div>
    </el-col>
    <el-col :span="18" style="border:1px solid transparent;">
      <div class="header_col"></div>
    </el-col>
    <el-col :span="3" style="border:1px solid transparent;">
      <div class="header_col">
        <!-- 通知按钮 -->
        <el-col :span="8" style="display: flex; justify-content: center;">
          <div class="header_little_button">
            <el-popover 
              placement="bottom" 
              width="100" 
              trigger="hover" 
            >
              <HeaderVue 
                style="position: absolute; right: -10%; top: 0px;  width: 500px; min-height: 300px; z-index: 99999;" 
                >
              </HeaderVue>
              <i class="el-icon-bell" slot="reference"></i>
            </el-popover>
          </div>     
        </el-col>
        <!-- 帮助中心按钮 -->
        <el-col :span="8" style="display: flex; justify-content: center;">
          <el-tooltip content="帮助" placement="bottom" effect="light">
            <div class="header_little_button" @click="enterHelpCenter">
              <i class="el-icon-question"></i>
            </div>     
          </el-tooltip>
        </el-col>
        <!-- 个人头像 -->
        <el-col :span="8" style="display: flex; justify-content: center;">
          <div class="header_little_button" @click="showPersonalCard">
            <el-popover placement="bottom-end" width="200" trigger="click" style="padding: 0;">
              <el-card class="personCard">
                <div style="position: relative; top: -20px; left: 0; height: 40px; width: 200px; background-color: rgb(210, 250, 250);"></div>
                <div style="display: flex; justify-content: center; z-index: 999; position: absolute; top: 20px; left: 40%;">
                  <el-avatar shape="circle" :size="40" :src="avatarUrl"></el-avatar>
                </div>
                <!-- display: flex; align-items: center; -->
                <div style="padding: 14px;">  
                  <ul class="user-function-list">
                    <li @click="enterProfile" style="font-size: 16px; color: grey;">个人中心</li>
                    <li 
                      v-if="has_login_flag" 
                      @click="quitTheAccount" 
                      style="font-size: 16px; color: grey;"
                    >退出登录</li>
                    <li 
                      v-else 
                      @click="loginTheAccount" 
                      style="font-size: 16px; color: grey;"
                    >注册/登录</li>
                  </ul>
                  <!-- <div>
                    <el-button type="text" @click="enterProfile" style="font-size: 16px; color: grey;">个人中心</el-button>
                  </div>
                  <div>
                    <el-button type="text"  v-if="has_login_flag" @click="quitTheAccount" style="font-size: 16px; color: grey;">退出登录</el-button>
                    <el-button type="text" v-else @click="loginTheAccount" style="font-size: 16px; color: grey;">注册/登录</el-button>
                  </div> -->
                </div>
              </el-card>
              <!-- <div class="personCard">
                <el-avatar shape="circle" :size="40" :src="avatarUrl"></el-avatar>
              </div> -->
              <el-avatar shape="circle" :size="28" :src="avatarUrl" slot="reference"></el-avatar>
            </el-popover>            
          </div>
        </el-col>
      </div>
    </el-col>
    <!-- 通知中心 -->
    <!-- <div>
      <HeaderVue 
        style="position: absolute; right: 0%; top: 48px;  width: 500px; min-height: 300px; z-index: 99999;" 
        v-if="showInformCardFlag">
      </HeaderVue>
    </div> -->
  </el-row>
</template>

<script>
import HeaderVue from '@/components/HeaderVue.vue';
import axios from 'axios';
export default {
  components: {
    HeaderVue
  },
  props: {},
  data() {
    return {
      avatarUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      showPersonalCardFlag: false,
      showInformCardFlag: false,
      userInfo: null,
      has_login_flag: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    showPersonalCard() {
      if (this.showPersonalCardFlag === true) {
        this.showPersonalCardFlag = false;
      } else {
        this.showPersonalCardFlag = true;
      }
    },
    showInformCard() {
      if (this.showInformCardFlag === true) {
        this.showInformCardFlag = false;
      } else {
        this.showInformCardFlag = true;
      }
    },
    enterProfile() {
      this.$router.push("/userProfile");
    },
    quitTheAccount() {
      sessionStorage.clear();
      this.has_login_flag = false;
      this.$router.go(0);
    },
    loginTheAccount() {
      this.$router.push("/login");
    },
    enterHelpCenter() {
      let { href } = this.$router.resolve('/help');
      window.open(href, `_blank`);
      // window.open(this.$router.resolve('/help'),`_blank`);
    }
  },
  created() {},
  mounted() {
    const userId = sessionStorage.getItem('userId');
    console.log("userId is " + userId);
    if (userId != null) {
      console.log("userId is not null");
      axios.get('http://43.143.140.26/api/user/showinfo', {
        params: {
          id: userId
        }
      }).then((response) => {
        console.log('成功响应userInfo:', response.data);
        this.has_login_flag = true;
        this.userInfo = response.data;
        this.avatarUrl = this.userInfo.avatar_url
      }).catch(function (error) {
        console.error('请求出错:', error);
      });
    } else {
      this.has_login_flag = false;
      console.log("has not login");
    }
  }
};
</script>
<style lang="scss" scoped>
.header_row {
  box-shadow: 0 2px 0px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  position: relative;
}
.header_col {
  /* border-radius: 4px; */
  min-height: 48px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.router-link-active {
  text-decoration: none;
  color: grey;
}
.header-router {
  text-decoration: none;
  color: grey;
}
.header_little_button {
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.personCard {
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 12px 24px 0px; 
  background: rgb(255, 255, 255); 
  border-radius: 4px; */
  margin-top: -12px;
  margin-bottom: -12px;
  margin-left: -12px;
  height: 100%; 
  width: 200px; 
  display: flex; 
  justify-content: center;
}
.user-function-list {
  li {
    margin: 3px 0 0 0;
    list-style: none;
    cursor: pointer;
    position: relative;
    height: 32px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding-left: 12px;
    // background-color: yellow;
    &:hover {
      background-color: #bcbfc2;
      transition: 0.3s;
    }
  }
}
</style>
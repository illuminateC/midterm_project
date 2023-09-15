<template>
  <div class="nav">
    <div class="nav-menu-wrapper">
      <ul class="menu-list">
        <li
          v-for="(item, index) in menuList"
          :key="index"
          :class="{ activeNav: index == current }"
          @click="changeMenu(index)"
        >
          <el-tooltip effect="dark" placement="right">
            <div slot="content">
              <span v-if="item == 'icon-xinxi'">团队群聊</span>
              <span v-else>多人群聊</span>
            </div>
            <div>
              <div class="block"></div>
              <span class="iconfont" :class="item"></span>
            </div>
          </el-tooltip>
        </li>
      </ul>
    </div>
    <div class="back-button">
      <el-tooltip class="item" effect="dark" content="返回" placement="right">
        <el-button @click="backFromChat" icon="el-icon-caret-left" type="text" style="font-size: 30px;"></el-button>
      </el-tooltip>
    </div>
    <div class="own-pic">
        <HeadPortrait :imgUrl="imgUrl"></HeadPortrait>
    </div>
  </div>
</template>

<script>
import HeadPortrait from "./HeadPortrait.vue";
import axios from 'axios';
export default {
  components: {
    HeadPortrait,
  },
  data() {
    return {
      menuList: [
        "icon-xinxi",
        "icon-shu",
      ],
      current: 0,
      imgUrl: require('@/assets/img/head_portrait.jpg'),
      userInfo: null,
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
        console.log('成功响应:', response.data);
        this.userInfo = response.data;
        this.imgUrl = this.userInfo.avatar_url;
      }).catch(function (error) {
        console.error('请求出错:', error);
      });
    } else {
      console.log("has not login");
    }
    if (this.$route.params.groupID == 0) {
      this.current = 1;
    }
  },
  methods: {
    changeMenu(index) {
      switch (index) {
        case 0:
          const historyChatGroupId = sessionStorage.getItem('historyChatGroupId');
          this.$router.push("/group/chat/" + historyChatGroupId);
          break;
        case 1:
          sessionStorage.setItem('historyChatGroupId', this.$route.params.groupID);
          this.$router.push("/group/chat/0");
          break;
        default:
          this.$router.push({
            name: "ChatHome",
          });
      }

      this.current = index;
    },
    backFromChat() {
      if (this.$route.params.groupID == 0) {
        this.$router.push("/group/detail/" + sessionStorage.getItem('historyChatGroupId'));
      }
      else {
        this.$router.push("/group/detail/" + this.$route.params.groupID);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 90vh;
  position: relative;
  border-radius: 20px 0 0 20px;
  .nav-menu-wrapper {
    position: absolute;
    top: 40%;
    transform: translate(0, -50%);
    .menu-list {
      margin-left: 10px;

      li {
        margin: 40px 0 0 30px;
        list-style: none;
        cursor: pointer;
        position: relative;
        .block {
          background-color: rgb(29, 144, 245);
          position: absolute;
          left: -40px;
          width: 6px;
          height: 25px;
          transition: 0.5s;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          opacity: 0;
        }
        &:hover {
          span {
            color: rgb(29, 144, 245);
          }
          .block {
            opacity: 1;
          }
        }
      }
    }
  }
  .back-button {
    position: absolute;
    top: 10%;
    margin-left: 30px;
  }
  .own-pic {
    position: absolute;
    bottom: 10%;
    margin-left: 25px;
  }
}
.activeNav {
  span {
    color: rgb(29, 144, 245);
  }
  .block {
    opacity: 1 !important;
  }
}
</style>
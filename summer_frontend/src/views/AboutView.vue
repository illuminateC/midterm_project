<template>
  <div id="bg">
  </div>
</template>

<script>
import At from 'vue-at';
import AtTa from 'vue-at/dist/vue-at-textarea';

export default {
  components: { At, AtTa },
  data () {
    return {
      members: ['Roxie Miles', 'grace.carroll', '小浩'],
      picMembers: [
        {
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
          name: 'myrtie.green'
        },
        {
          avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
          name: '椿木'
        },
        {
          avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
          name: 'xxi'
        },
        {
          avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
          name: 'hxsh'
        },
      ]
    }
  }
}
</script>

<style>
#app .atwho-li img {
  width: 20px;
  height: 20px;
  border-radius: 20%;
  margin-left: -10%;
}
#app .atwho-view { /* more */ }
#app .atwho-ul { /* more */ }
.testBox {
  height: 100px;
  width: 500px;
  background-color: gray;
}
.left_at {
  position: absolute;
  left: 50px;
  top: 200px;
}
#bg {
  height: 100vh;
  width: 100vw;
  background-image: url('../assets/background/BG5.jpg'); /*68 12*/
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100%;
}
</style>
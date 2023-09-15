<template>
  <el-container>
    <el-header>
      <h3>帮助中心</h3>
      <el-divider></el-divider>
    </el-header>
    <el-container>
      <el-aside style="min-height: 600px;">
        <div style="width: 100%; margin-top: 50px;">
          <h3>产品文档</h3>
        </div>
        <el-divider></el-divider>
        <div>
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <el-tree 
            class="filter-tree" :data="data" :props="defaultProps" node-key="id"
            @node-click="handleNodeClick" :filter-node-method="filterNode"
            ref="tree"
            style="min-height: 600px;"
          ></el-tree>
        </div>
      </el-aside>
      <el-main>
        <el-divider direction="vertical" style="height: 100%;"></el-divider>
        <div style="min-height: 400px; min-width: 400px;" class="markdown-body">
          <!-- <v-md-preview :text="text"></v-md-preview> -->
          <MarkdownWord :showMarkdownId="showMdId"/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MarkdownWord from '@/components/HelpMarkdown.vue'
export default {
  components: {
    MarkdownWord,
  },
  props: {},
  data() {
    return {
      filterText: '',
      data: [{
        id: 1,
        label: '产品概述'
      }, {
        id: 2,
        label: '快速入门',
        children: [
          {
            id: 21,
            label: '快速新建团队',
          },{
            id: 22,
            label: '快速新建项目',
          },{
            id: 23,
            label: '新建设计原型',
          },{
            id: 24,
            label: '新建项目文档',
          },{
            id: 25,
            label: '进入群聊',
          },
        ]
      }, {
        id: 3,
        label: '操作指南',
        children: [{
          id: 31,
          label: '个人管理',
          children: [{
            id: 311,
            label: '个人账号登录'
          }, {
            id: 312,
            label: '个人中心'
          }]
        }, {
          id: 32,
          label: '团队管理',
          children: [{
            id: 321,
            label: '邀请新成员'
          },{
            id: 322,
            label: '成员权限管理'
          }]
        }, {
          id: 33,
          label: '项目管理',
          children: [{
            id: 331,
            label: '新建项目'
          },{
            id: 332,
            label: '原型设计'
          },{
            id: 333,
            label: '项目文档'
          }]
        }, {
          id: 34,
          label: '聊天室',
          children: [{
            id: 341,
            label: '群聊功能'
          },{
            id: 342,
            label: '切换群聊'
          },{
            id: 343,
            label: '群聊管理'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      showMdId: 0,
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {},
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      console.log(data.id);
      this.showMdId = data.id;
    },
  },
  created() {},
  mounted() {
    document.querySelector('body').setAttribute('style', 'overflow: auto;');
  }
};
</script>
<style scoped>
.el-tree-node__label {
  font-size: 18px;
  margin-top: 12px;
  margin-bottom: 12px;
}
.markdown-body {
  /* float: right; */
  /* position: absolute;
  top: 5%; */
  /* margin-top: 50px; */
  /* height: 100%;
  width: 100%; */
}
.el-divider--vertical{
  display:inline-block;
  width:1px;
  height:100%;
  margin:0 8px;
  vertical-align:middle;
  position:fixed;
  left: 300px;
}
/* .el-header {
  position: fixed;
  z-index: 1000;
  width: 100%;
}
.el-aside {
    position: fixed;
    z-index: 1000;
    height: calc(100vh - 60px);
}
.el-main {
    position: fixed;
    z-index: 999;
} */
.el-header {
    height: 60px;
}
.el-aside {
    height: calc(100vh - 65px);
    overflow: hidden;
}
.el-main {
    height: calc(100vh - 80px);
    position: relative;
    margin-top: 20px;
}
</style>
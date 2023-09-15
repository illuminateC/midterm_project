<template>
  <el-container>
    <el-header>
      <HeaderComponentVue style="z-index:inherit"/>
    </el-header>
    <el-main>
      <div>
    <div class="title-container">
      <h2>文档标题</h2>
      <el-button class="save-button" type="primary" icon="el-icon-check" @click="saveDocumentDetail" v-if="this.$route.params.isManager === '1'">一键保存</el-button>
    </div>
    <el-input type="text" v-model="title" maxlength="30" show-word-limit style="font-weight:bolder;" :disabled="this.$route.params.isManager !== '1'"></el-input>
    <h2 style="text-align: left;">文档正文</h2>
    <el-tiptap v-model="content" :extensions="extensions"  />
    <el-select
      v-model="value2"
      multiple
      collapse-tags
      style="position: absolute; top: 267px; right:75px; width:165px;"
      placeholder="选择@对象"
      :disabled="this.$route.params.isManager !== '1'">
      <el-option
        v-for="item in options"
        :key="item.user_id"
        :label="item.nickname"
        :value="item.user_id">
      </el-option>
    </el-select>
    <el-tooltip content="发送@" placement="top" >
      <el-button type="info" icon="el-icon-message" circle style="position: absolute; top: 267px; right:25px;" @click="handleBlur" :disabled="this.$route.params.isManager !== '1'"></el-button>
    </el-tooltip>
    <div>{{ content }}</div>
  </div>
    </el-main>
  </el-container>
  
</template>

  <script>
  import axios from 'axios'
  import HeaderComponentVue from '@/components/HeaderComponent.vue';
  import {
    // 需要的 extensions
    Doc,
    Text,
    Paragraph,
    Heading,
    Bold,
    Italic,
    Strike,
    Underline,
    Link,
    Image,
    Iframe,
    CodeBlock,
    Blockquote,
    ListItem,
    BulletList,
    OrderedList,
    TodoItem,
    TodoList,
    TextAlign,
    Indent,
    LineHeight,
    HorizontalRule,
    HardBreak,
    TrailingNode,
    History,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    FormatClear,
    TextColor,
    TextHighlight,
    Preview,
    Print,
    Fullscreen,
    SelectAll,
    FontType,
    FontSize,
    CodeView,
  } from 'element-tiptap';
import { createDeleteSet } from 'yjs';
  
  export default {
    components:{
      HeaderComponentVue,
    },
    data () {
      // 编辑器的 extensions
      // 它们将会按照你声明的顺序被添加到菜单栏和气泡菜单中
      return {
        userId:'',
        options:[],
        // options: [{
        //   value: '1',
        //   label: '黄金糕'
        // }, {
        //   value: '2',
        //   label: '双皮奶'
        // }, {
        //   value: '3',
        //   label: '蚵仔煎'
        // }, {
        //   value: '4',
        //   label: '龙须面'
        // }, {
        //   value: '5',
        //   label: '北京烤鸭'
        // }],
        value2: [],
        title:'默认标题',
        extensions: [
          new Doc(),
          new Text(),
          new Paragraph(),
          new Heading({ level: 5 }),
          new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
          new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
          new Italic(),
          new Strike(),
          new ListItem(),
          new BulletList(),
          new OrderedList(),
          new Link(),
          new CodeBlock(),
          new Blockquote(),
          new TodoItem(),
          new TodoList(),
          new TextAlign(),
          
          new LineHeight(),
          new  HorizontalRule(),
          new HardBreak(),
          new TrailingNode(),
          new History(),
          new Table(),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
          new FormatClear(),
          new TextColor(),
          new TextHighlight(),
          new Preview(),
          new Print(),
          new Fullscreen(),
          new SelectAll(),
          new FontType(),
          new FontSize(),
          new CodeView(),
        ],
        // 编辑器的内容
        content: 
            '请在此编辑'
        ,
      };
    },
    methods: {
      getDocumentDetail(){
        console.log("userId"+this.userId);
        axios.get('http://43.143.140.26/api/document/detail', {
          params: {
            ID: this.userId,
            document_id: this.$route.params.documentId,
          }
        })
        .then((response) => {
          this.title = response.data.document_info.name;
          
          this.content = response.data.document_info.content;
          this.options = response.data.member_list;
          console.log(this.options);
        })
        .catch((error) => {
          // 请求出错时的处理
          console.error('请求出错:', error);
        });
        
      },
      saveDocumentDetail(){
        
        const formData= new FormData();
        formData.append('document_id',this.$route.params.documentId);
        formData.append('name',this.title);
        formData.append('content',this.content);
        axios.post('http://43.143.140.26/api/document/save',formData,{
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then(res => {              /* res 是 response 的缩写 */
            switch (res.data.errno) {
              case 0:
                
                this.$message.success("保存成功！");
                break;
              case 401:
                this.$message.error("保存失败！");
                break;
            }
        })
      },
      handleBlur() {
      if (this.value2.length > 0) {
        const formData= new FormData();
        formData.append('receive_id',this.value2);
        formData.append('send_id',this.userId);
        formData.append('document_id',this.$route.params.documentId);
        formData.append('project_id',this.$route.params.projectId);
        axios.post('http://43.143.140.26/api/document/remind',formData,{
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then(res => {              /* res 是 response 的缩写 */
            switch (res.data.errno) {
              case 0:
                this.$message.success("发送成功！");
                break;
              case 401:
                break;
            }
        })
      }
    }
    },
    created(){
      this.userId=sessionStorage.getItem("userId");
      this.getDocumentDetail();
      
    },
  }
  </script>

<style>
.title-container {
  display: flex;
  align-items: center;
  
}

.save-button {
  margin-left: 85%;
  
}
</style>
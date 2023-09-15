<template>
  <el-container>
    <el-header>
      <HeaderComponentVue style="z-index:inherit"/>
    </el-header>
    <el-main>
    <el-input type="text" v-model="title" maxlength="30" show-word-limit style="font-weight:bolder; width:25%; position: absolute; top:75px; left: 20px;" :disabled="this.$route.params.isManager !== '1'" > </el-input>
    <div class="title-container">
      <el-dropdown @command="handleDropdownCommand1" style="margin-left: 0%; margin-top: 50px; margin-bottom: 10px;" :disabled="this.$route.params.isManager !== '1'">
        <el-button type="primary">
          模板选择<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="module1">项目计划</el-dropdown-item>
          <el-dropdown-item command="module2">工作周报</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown @command="handleDropdownCommand" style="margin-left: 1%; margin-top: 50px; margin-bottom: 10px;" :disabled="this.$route.params.isManager !== '1'">
        <el-button type="primary" >
          <i class="el-icon-download" ></i>导出为<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="exportToWord">word</el-dropdown-item>
          <el-dropdown-item command="exportToPdf">pdf</el-dropdown-item>
          <el-dropdown-item command="exportToMarkdown">markdown</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button class="save-button" type="primary" icon="el-icon-check" @click="saveDocumentDetail" v-if="this.$route.params.isManager === '1'">一键保存</el-button>
    </div>
    
    <!-- <el-tiptap v-model="content" :extensions="extensions" :readonly="this.$route.params.isManager !== '1'" /> -->
    <div class="editor-container" >
      <div class="editor" v-if="editor" >
        <menu-bar class="editor__header" :editor="editor" />
        <editor-content class="editor__content" :editor="editor" />
        <!-- <div>{{ content }}</div> -->
        <!-- <div class="editor__word-count">字数: {{ wordCount }}</div> 添加字数统计元素 -->
      </div>
    </div>
    <el-select
      v-model="value2"
      multiple
      collapse-tags
      style="position: absolute; top: 176px; right:75px; width:165px;"
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
      <el-button type="info" icon="el-icon-message" circle style="position: absolute; top: 176px; right:25px;" @click="handleBlur" :disabled="this.$route.params.isManager !== '1'"></el-button>
    </el-tooltip>
    <el-select v-model="versionLists" placeholder="选择文档版本" @change="handleOptionClick" style="position: absolute; top: 176px; right:300px;" :disabled="this.$route.params.isManager !== '1'">
      <el-option
        v-for="item in versions"
        :key="item.edited_time"
        :label="item.edited_time"
        :value="item">
      </el-option>
    </el-select>
    
    </el-main>
  </el-container>
  
</template>

<script scoped>
import axios from 'axios';
import HeaderComponentVue from '@/components/HeaderComponent.vue';
import { DOMSerializer } from 'prosemirror-model';
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import CharacterCount from '@tiptap/extension-character-count'
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import { HocuspocusProvider } from '@hocuspocus/provider'
import MenuBar from './MenuBar.vue'
import BubbleMenu from '@tiptap/extension-bubble-menu'
import Highlight from '@tiptap/extension-highlight'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import turndown from 'turndown';
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import exportWord from 'js-export-word'

export default {
  components: {
    EditorContent,
    MenuBar,
    HeaderComponentVue,
  },
  data() {
    const colors = ['#958DF1', '#F98181', '#FBBC88', '#FAF594', '#70CFF8', '#94FADB', '#B9F18D'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return {
      selectedValue: null,
      userId:'',
      username:'',
      versionLists:[],
      versions:[],
      options:[],
      value2: [],
      title:'默认标题',
      content:'',
      editor: null,
      provider: null,
      wordCount: 0, // 添加wordCount属性
      ws:'',
      color:randomColor,
    };
  },
  mounted() {
    // Set up the Hocuspocus WebSocket provider
    this.userId=sessionStorage.getItem("userId");
    this.username=sessionStorage.getItem("username");
    console.log(this.username);
    this.provider = new HocuspocusProvider({
      url: 'ws://43.143.140.26:1234/',
      name: 'example-document'+this.$route.params.documentId,
    });
    this.editor = new Editor({
      extensions: [
        StarterKit.configure({
          // The Collaboration extension comes with its own history handling
          history: false,
        }),
        Highlight,
        TaskList,
        TaskItem,
        // Register the document with Tiptap
        Collaboration.configure({
          document: this.provider.document,
        }),
        CollaborationCursor.configure({
          provider: this.provider,
          user: {
            name: this.username,
            color: this.color,
          },
        }),
        BubbleMenu.configure({
          element: document.querySelector('.menu'),
        }),
        CharacterCount.configure({
          limit: 10000,
        }),
      ],
      
    });
    this.getDocumentDetail();
    const customSerializer = DOMSerializer.fromSchema(this.editor.schema, {
      // 配置空白字符的处理方式
      text(node) {
        return node.text.replace(/\u00a0/g, ' '); // 将非断行空格替换为普通空格
      },
    });
    
    this.editor.on('update', ({ editor }) => {
      this.content = editor.getHTML({ serializer: customSerializer }); // 更新content属性为编辑器的HTML内容
      this.wordCount = this.editor.storage.characterCount.characters();
    });
  },
  methods: {
    getRandomColor() {
      return getRandomElement([
        '#958DF1',
        '#F98181',
        '#FBBC88',
        '#FAF594',
        '#70CFF8',
        '#94FADB',
        '#B9F18D',
      ])
    },
    handleOptionClick() {
      this.editor.commands.setContent('');
      this.content='';
      this.editor.commands.setContent(this.versionLists.content);
      this.content=this.versionLists.content;
      const formData= new FormData();
      formData.append('document_id',this.$route.params.documentId);
      formData.append('version_id',this.versionLists.version_id); 
      axios.post('http://43.143.140.26/api/document/recover',formData,{
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .then(res => {              /* res 是 response 的缩写 */
          switch (res.data.errno) {
            case 0:
              break;
            case 401:
              this.$message.error("保存失败！");
              break;
          }
      })
    },
    module1(){
      this.editor.commands.setContent('');
      this.content='';
      this.editor.commands.setContent('<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;项目计划</h2><p><strong>一、产品介绍</strong></p><p>1.产品的概念</p><p></p><p>2.产品的发展阶段</p><p></p><p>3.产品的生命周期</p><p></p><p><strong>二、市场调研</strong></p><p>1.市场对产品的需求情况</p><p></p><p>2.产品的目标用户群体</p><p></p><p>3.产品的市场竞争力、预计的市场占有率和前景预测</p><p></p>');
      this.content='<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;项目计划</h2><p><strong>一、产品介绍</strong></p><p>1.产品的概念</p><p></p><p>2.产品的发展阶段</p><p></p><p>3.产品的生命周期</p><p></p><p><strong>二、市场调研</strong></p><p>1.市场对产品的需求情况</p><p></p><p>2.产品的目标用户群体</p><p></p><p>3.产品的市场竞争力、预计的市场占有率和前景预测</p><p></p>';
    },
    module2(){
      this.editor.commands.setContent('');
      this.content='';
      this.content='<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工作周报</h2><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：</p><p><strong>一、本周工作小结</strong></p><p></p><p><strong>二、重要情况说明</strong></p><p></p><p><strong>三、本周计划完成进度</strong></p><p>1.原定计划</p><p>2.实际完成情况</p><p>3.变更原因</p><p></p><p><strong>四、项目负责人批示</strong></p>';
      this.editor.commands.setContent('<h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工作周报</h2><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：</p><p><strong>一、本周工作小结</strong></p><p></p><p><strong>二、重要情况说明</strong></p><p></p><p><strong>三、本周计划完成进度</strong></p><p>1.原定计划</p><p>2.实际完成情况</p><p>3.变更原因</p><p></p><p><strong>四、项目负责人批示</strong></p>');
    },
      getDocumentDetail(){
        
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
          if (this.editor.getText().trim() === '') {
            this.editor.commands.setContent(this.content);
          }  
          if(this.content==null){
            this.editor.commands.setContent('<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>');
          }
        })
        .catch((error) => {
          // 请求出错时的处理
          console.error('请求出错:', error);
        });
        
      },
      getDocumentVersion(){
        axios.get('http://43.143.140.26/api/document/versionlist/', {
          params: {
            document_id:this.$route.params.documentId,
          }
        })
        .then((response) => {
          this.versions=response.data.version_list;
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
        this.content = this.editor.getHTML();
        formData.append('content',this.content);
        
        axios.post('http://43.143.140.26/api/document/save',formData,{
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
        .then(res => {              /* res 是 response 的缩写 */
            switch (res.data.errno) {
              case 0:
                
                this.$message.success("保存成功！");
                this.getDocumentVersion();
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
        const Url='/project/'+this.$route.params.projectId+'/document/1/'+this.$route.params.documentId;
        formData.append('link',Url);
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
    },
    handleDropdownCommand(command){
      if (command === 'exportToWord') {
        this.exportToWord();
      }
      if (command === 'exportToPdf') {
        this.exportToPdf();
      }
      if (command === 'exportToMarkdown') {
        this.exportToMarkdown();
      }
    },
    handleDropdownCommand1(command){
      if (command === 'module1') {
        this.module1();
      }
      if (command === 'module2') {
        this.module2();
      }
    },
    exportToWord() {
      const wrap = document.querySelector('.editor__content');
      const config = {
            addStyle:true, // 是否导出样式，默认为true，此操作会将所有样式转换成行内样式导出
            fileName:'测试文件', // 导出文件名
            success(){} // 完成之后回调，一般页面篇幅比较大，时间比较长
      }
      exportWord(wrap,config)
    },
    exportToPdf() {
      // 获取文档容器的DOM元素
      const container = document.querySelector('.el-main');

      // 使用html2canvas将DOM元素转换为canvas
      html2canvas(container).then((canvas) => {
        // 创建一个新的jsPDF实例
        const pdf = new jsPDF({
          orientation: 'p',
          unit: 'mm',
          format: 'a4',
        });

        // 获取canvas的宽度和高度
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // 计算一页A4纸的大小
        const pdfWidth = 210;
        const pdfHeight = (canvasHeight * pdfWidth) / canvasWidth;

        // 将canvas转换为图像，并添加到PDF中
        const imageData = canvas.toDataURL('image/png');
        pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // 保存PDF文件
        pdf.save('document.pdf');
      });
    },
    exportToMarkdown() {
      // 获取 tiptap 编辑器的 HTML 内容
      const editorContent = this.editor.getHTML();

      // 创建一个 turndown 实例
      const turndownService = new turndown();

      // 将 HTML 内容转换为 Markdown
      const markdownText = turndownService.turndown(editorContent);

      // 创建一个 Blob 对象
      const blob = new Blob([markdownText], { type: 'text/plain' });

      // 创建一个临时的 URL 对象
      const url = URL.createObjectURL(blob);

      // 创建一个链接元素
      const link = document.createElement('a');
      link.href = url;
      link.download = 'document.md'; // 下载的文件名
      link.style.display = 'none';

      // 将链接元素添加到文档中并模拟点击
      document.body.appendChild(link);
      link.click();

      // 清理临时的 URL 对象
      URL.revokeObjectURL(url);
    },
  },
  created(){
    this.userId=sessionStorage.getItem("userId");
    this.getDocumentVersion();
  },
}
</script>

<style lang="scss">
.title-container {
  display: flex;
  align-items: center;
  
}

.save-button {
  margin-left: 79%;
  
}

.editor-container {
  height: 500px; /* 设置初始高度 */
}

.editor {
  background-color: #FFF;
  border: 3px solid #0D0D0D;
  border-radius: 0.75rem;
  color: #0D0D0D;
  display: flex;
  flex-direction: column;
  max-height: 34rem;
  height: 500px;

  &__header {
    align-items: center;
    background: #0d0d0d;
    border-bottom: 3px solid #0d0d0d;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
  }

  &__content {
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1rem 1rem;
    -webkit-overflow-scrolling: touch;
    text-indent: 0.5em;
    text-align: left;
    height: 400px;
  }

  
}

.collaboration-cursor__caret {
  border-left: 1px solid #0D0D0D;
  border-right: 1px solid #0D0D0D;
  margin-left: -1px;
  margin-right: -1px;
  pointer-events: none;
  position: relative;
  word-break: normal;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  border-radius: 3px 3px 3px 0;
  color: #0D0D0D;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  left: -1px;
  line-height: normal;
  padding: 0.1rem 0.3rem;
  position: absolute;
  top: -1.4em;
  user-select: none;
  white-space: nowrap;
}

/* Basic editor styles */
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    border-radius: 0.5rem;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  mark {
    background-color: #FAF594;
  }

  img {
    height: auto;
    max-width: 100%;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    border-left: 2px solid rgba(#0D0D0D, 0.1);
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      align-items: center;
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }

    table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 0.75em;
  }

  th,
  td {
    border: 1px solid rgba(#0D0D0D, 0.1);
    padding: 0.5em;
  }

  th {
    font-weight: bold;
    background-color: rgba(#0D0D0D, 0.1);
  }
}

.editor__word-count{
  text-align: right;
  padding-right: 0.5rem;
}
</style>
<template>
    <div>
      <el-tiptap v-model="content" :extensions="extensions" />
    </div>
  </template>
  
  <script>
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
  
  export default {
    data () {
      // 编辑器的 extensions
      // 它们将会按照你声明的顺序被添加到菜单栏和气泡菜单中
      return {
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
          new Image(),
          new CodeBlock(),
          new Blockquote(),
          new TodoItem(),
          new TodoList(),
          new TextAlign(),
          new Indent(),
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
  }
  </script>
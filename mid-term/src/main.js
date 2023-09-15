import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import '@/custom-component' // 注册自定义组件
import 'element-theme-chalk'
import 'element-ui/lib/theme-chalk/index.css'
import { ElementTiptapPlugin } from 'element-tiptap'
import 'element-tiptap/lib/index.css';
import '@/assets/iconfont/iconfont.css'
import '@/styles/animate.scss'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'
import '@/styles/global.scss'

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';
VueMarkdownEditor.use(vuepressTheme);
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

Vue.use(VMdPreview);
Vue.use(VueMarkdownEditor);


Vue.use(ElementUI, { size: 'small' })
Vue.use(ElementTiptapPlugin, { /* plugin options */ });
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://43.143.140.26/api/'
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})

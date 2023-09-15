/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import { Message } from 'element-ui';

Vue.use(Router)

const routes = [
    {
        path: '/design/:prototypeID&:projectID',
        name: 'design',
        component: () => import('@/views/Design'),
    },
    {
        path: '/manage/:userID&:teamID',
        name: 'manage',
        component: () => import('@/views/ProjectManage'),
    },
    {
        path: '/project/:projectID',
        name: 'project',
        component: () => import('@/views/Project'),
    },
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/Home'),
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/documentList',
      name: 'DocumentList',
      component: () => import(/* webpackChunkName: "about" */ '../views/DocumentList.vue'),
    },
    {
      path: '/project/:projectId/document/:isManager/:documentId',
      // path: '/documentList/document',
      name: 'Docunment',
      component: () => import(/* webpackChunkName: "about" */ '../views/Document.vue'),
      meta: {
        requireAuth: false
      }
    },
    {
      path:'/userProfile',
      name:'userProfile',
      component: () => import(/* webpackChunkName: "about" */ '../views/userProfile.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
      path: '/homepage/:type',
      name: 'HomePage',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/group/detail/:groupID',
      name: 'GroupPage',
      component: () => import('../views/GroupView.vue')
    },
    {
      path: '/group/create',
      name: 'GroupCreatePage',
      component: () => import('../views/UploadView.vue')
    },
    {
      path: '/group/member/:groupID',
      name: 'GroupMemberPage',
      component: () => import('../views/GroupMemberView.vue')
    },
    {
      path: '/group/chat/:groupID',
      name: 'GroupMemberPage',
      component: () => import('../views/Chat/GroupChatRoomView.vue')
    },
    {
      path: '/help',
      name: 'HelpPage',
      component: () => import('../views/HelpView.vue')
    },
    {
      path: '/test/:prototypeID',
      name: 'test',
      component: () => import('@/views/test'),
    },
    {
      path: '/visit/:projectID',
      name: 'visit',
      component: () => import('@/views/Visit'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home'),
    },
    // {
    //   path: '/test',
    //   name: 'testPage',
    //   component: () => import('../views/UploadView.vue')
    // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 记得将LoginPage名字登记正确
  const userInfo = sessionStorage.getItem('userId')
  if (to.path === '/login') {
    sessionStorage.setItem("preRoute", router.currentRoute.fullPath);
  }
  // 若用户未登录且访问的页面需要登录，则跳转至登录页面
  if (userInfo == null && to.meta.requireAuth) {
    Message({
      type: 'warning',
      message: '请先登录！'
    })
    // next({name: 'Login',})
    next('/login')
    setTimeout('console.clear()', 300)
  }
  next()
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
return originalPush.call(this, location).catch(err => err)
}

export default router

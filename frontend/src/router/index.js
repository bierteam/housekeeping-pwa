import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Tasks from '../views/Tasks.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/templates',
    name: 'Templates',
    // route level code-splitting
    // this generates a separate chunk (templates.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Templates.vue')
  },
  {
    path: '/verify',
    name: 'Verify',
    // route level code-splitting
    // this generates a separate chunk (templates.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Verify.vue')
  },
  {
    path: '/peter',
    name: 'Peter',
    // route level code-splitting
    // this generates a separate chunk (templates.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/peter.vue')
  },
  {
    path: '/test',
    name: 'Test',
    // route level code-splitting
    // this generates a separate chunk (templates.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/test.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

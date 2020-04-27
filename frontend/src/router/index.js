import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Tasks from '../views/Tasks.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from '../store'

Vue.use(VueRouter)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const routes = [
  {
    path: '/',
    name: 'Tasks',
    meta: {
      requiresAuth: true
    },
    component: Tasks
  },
  {
    path: '/templates',
    name: 'Templates',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (templates.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Templates.vue')
  },
  {
    path: '/verify',
    name: 'Verify',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (templates.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Verify.vue')
  },
  {
    path: '/signin',
    name: 'Sign in',
    meta: {
      guest: true
    },
    // route level code-splitting
    // this generates a separate chunk (templates.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signin.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      guest: true
    },
    // route level code-splitting
    // this generates a separate chunk (templates.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  { path: '/login', redirect: '/signin' },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "about" */ '../components/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.jwt === '') {
      next({
        name: 'Sign in',
        params: { nextUri: to.fullPath }
      })
    } else {
      const user = JSON.parse(localStorage.getItem('user')) // TODO fix this copy/paste shit
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin === true) { // maybe store.getters.isAdmin (extract admin status out jwt)
          next()
        } else {
          next({ name: 'Tasks' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (store.state.jwt === '') {
      next()
    } else {
      next({ name: 'Tasks' })
    }
  } else {
    next()
  }
})

export default router

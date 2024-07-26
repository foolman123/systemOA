import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/Login/LoginView.vue'
import Layout from '../views/Layout/Index-view.vue'
import Home from '../views/Material management/Domain-name-management.vue'
// import { component } from 'vue/types/umd'
const Statistical =()=>import('../views/Data analysis/Statistical-table.vue')
const Real =()=>import('../views/Data analysis/Real-time-data-statistics.vue')
const Materral =()=>import('../views/Data analysis/Material-data-analysis.vue')
const Domain =()=>import('../views/Material management/Domain-name-management.vue')
const Keyword =()=>import('../views/Material management/Keyword-management.vue')
const Drop =()=>import('../views/Material management/Drop-link-management.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Layout,
    children:[
      {
        path:'/',
        name:'Home',
        component:Home
      },
      {
        path:'/statistical',
        name:'Statistical',
        component:Statistical
      },
      {
        path:'/real',
        name:'Real',
        component:Real
      },
      {
        path:'/materral',
        name:'Materral',
        component:Materral
      },
      {
        path:'/keyword',
        name:'Keyword',
        component:Keyword
      },
      {
        path:'/domain',
        name:'Domain',
        component:Domain
      },
      {
        path:'/drop',
        name:'Drop',
        component:Drop
      },
    ]
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

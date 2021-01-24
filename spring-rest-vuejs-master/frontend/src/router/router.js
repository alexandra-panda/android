import Vue from 'vue'
import VueRouter from 'vue-router'
import MessagesList from '@/pages/MessageList.vue'
import Profile from '@/pages/Profile.vue'
import Subscriptions from '@/pages/Subscriptions.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: MessagesList},
  { path: '/subscriptions/:id', component: Subscriptions },
  { path: '/user/:id?', component: Profile },
]

export default new VueRouter({
  mode: 'history',
  routes
})
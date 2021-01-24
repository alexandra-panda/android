import Vue from 'vue'
import App from '@/main/App.vue'
import vuetify from '@/plugin/vuetify.js'
import '@/api/resource'
import router from '@/router/router'
import store from '@/store/store'
import { connect } from '@/util/ws'

if (profile) {
  connect()
}


new Vue({
  el: '#root',
  vuetify,
  store,
  router,
  render: a => a(App)
})
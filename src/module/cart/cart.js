import Vue from 'vue'
import App from './app'
import vueTap from 'v-tap'
import Resource from 'vue-resource'
Vue.use(Resource)
Vue.http.headers.common["x-user-token"] = JSON.parse(localStorage.getItem("user")).token

Vue.use(vueTap)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

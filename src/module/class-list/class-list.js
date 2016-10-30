import Vue from 'vue'
import App from './app'
import vueTap from 'v-tap'
import Resource from 'vue-resource'
Vue.use(Resource)
Vue.use(vueTap)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

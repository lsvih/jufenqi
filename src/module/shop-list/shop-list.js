import Vue from 'vue'
import App from './app'
import vueTap from 'v-tap'
Vue.use(vueTap)
import Resource from 'vue-resource'

Vue.use(Resource)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

import Vue from 'assets/vue.min.js'
import App from './app'
import vueTap from 'v-tap'
Vue.use(vueTap)

/* eslint-disable no-new */
let $vm = new Vue({
  el: 'body',
  components: {
    App
  }
})

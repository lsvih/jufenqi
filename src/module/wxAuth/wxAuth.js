import Vue from 'vue'
import App from './app'
import Resourse from 'vue-resource'
Vue.use(Resourse)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

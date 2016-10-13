import Vue from 'vue'
import App from './app'
import Resource from 'vue-resource'

Vue.use(Resource)


/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

import Vue from 'vue'
import App from './app'
import vueTap from 'v-tap'
Vue.use(vueTap)
if (!window.localStorage.getItem('user')) {
  window.location.href = `./wxAuth.html?url=index.html`
}
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

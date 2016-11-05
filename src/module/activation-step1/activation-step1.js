import Vue from 'vue'
import App from './app'
import vueTap from 'v-tap'
import Resource from 'vue-resource'
Vue.use(Resource)
try{
  Vue.http.headers.common["x-user-token"] = JSON.parse(localStorage.getItem("user")).token
}catch(e){
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}

Vue.use(vueTap)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

<template>
  <div class="content">
    <img :src="">
  </div>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
try {
  let now = Number(new Date().getTime())
  if (Number(JSON.parse(localStorage.user).expiredAt) < now||!JSON.parse(localStorage.user).profile.mobile) {
    localStorage.removeItem('user')
    location.href = './wxAuth.html?url=' + encodeURIComponent(location.href)
  }
  axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user")).tokenType + ' ' + JSON.parse(localStorage.getItem("user")).token
} catch (e) {
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
export default {
  data() {
    return {
      cateId: Lib.M.GetRequest().id,
      brandList: [],
      img: Lib.C.imgUrl,
      categories: [],
      selectedCate: [],
      showSelect: false,
      showLoading: false,
        //brandList:[{id,name,img,description}]
    }
  },
  components: {
  },
  ready() {
    // this.getData(this.cateId)
    // let that = this
    // axios.get(`${Lib.C.merApi}categories`).then((res) => {
    //   res.data.data.map((e) => {
    //     that.categories.push({
    //       name: e.name,
    //       value: String(e.id),
    //       parent: e.parent === null ? 0 : String(e.parent.id)
    //     })
    //   })
    // }).catch((err) => {
    //   throw err //error
    // })
  }
}
</script>

<style scoped lang="less">
.content {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>

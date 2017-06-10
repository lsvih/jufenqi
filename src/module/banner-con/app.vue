<template>
  <div class="contentWrapper">
    <div class="content" v-html="bannerContent.descriptionRich"></div>
  </div>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
Lib.M.auth(axios)
export default {
  data() {
    return {
      id: Lib.M.GetRequest().id,
      bannerContent: {},
      title: ""
    }
  },
  ready() {
    axios.get(`${Lib.C.homeApi}operations?filter=id:${this.id}`).then((res) => {
      this.bannerContent = res.data.data[0]
      this.title = res.data.data[0].title
      document.title = this.title
    }).catch((err) => {
      throw err
    })
  }
}
</script>

<style lang="less">
.contentWrapper {
  width: 100%;
  overflow: hidden;
  .content {
    width: 100%;
    p {
      width: 100%;
      margin: 0;
      img {
        width: 100%;
      }
    }
  }
}
</style>

<template>
  <div class="content">
    <img :src="picOne">
  </div>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
import picOne from "./bannerone.png";
Lib.M.auth(axios)
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
      picOne
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

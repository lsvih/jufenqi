<template>
<header>
  <div class="select-address" v-tap="(selectType = 0,isShow=true)">{{selectedAddress}}<img src="select.png" class="select-icon"></div>
  <div class="sort" v-tap="(selectType = 1,isShow=true)">{{selectedSortType}}<img src="select.png" class="select-icon"></div>
  <span class="cart" v-tap="goto('./cart.html?type=2')"><img src="cart.png"></span>
</header>
<div class="content">
  <group style="margin-top:-1.17647059em;">
    <!-- <cell v-for="worker in workerList" class="cell-item"> -->
      <!-- <img :src="imgUrl + worker.profileImage" class="worker-logo" width="120px" height="80px">
      <div class="worker-name">{{worker.nickname}}</div>
      <div class="worker-address">{{worker.nativePlace}}</div> -->
      <!-- <div class="worker-rank">评分:5.0</div> -->
      <!-- <div class="detail-click-area" v-tap="gotoDetail(worker.userId)"></div>
      <div class="favorite-click-area" v-tap="worker.favorite?cancelFavorite(worker.userId,$index):addFavorite($index)"></div>
      <img v-if="worker.favorite" class="worker-is-favorite" src="star-fill.png">
      <img v-else class="worker-is-favorite" src="star.png">
    </cell> -->
    <div class="newWorker" v-for="worker in newWorkerList">
      <img :src="worker.url" v-tap="gotoDetail(worker.id)">
    </div>
  </group>
</div>
<j-select :show="isShow" :num="selectType==0?address.length:sortTypeList.length">
  <j-select-item v-show="selectType == 0" v-for="add in address">{{add}}</j-select-item>
  <j-select-item v-show="selectType == 1" v-for="sortType in sortTypeList" v-tap="sortBy(sortType)">{{sortType}}</j-select-item>
</j-select>
<loading :show="loading" text="正在加载..."></loading>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import JSelect from 'components/j-select'
import JSelectItem from 'components/j-select-item'
import Loading from 'vux-components/loading'
import axios from 'axios'
try {
  let now = Number(new Date().getTime())
  if (Number(JSON.parse(localStorage.user).expiredAt) < now
    // ||!JSON.parse(localStorage.user).profile.mobile
    ) {
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
      workerList: [],
      //Loading
      newWorkerList: [
      {url : '/static/images/工长demo/彭学勇.jpg', id: 26},
      {url : '/static/images/工长demo/仰宗龙.jpg', id: 27},
      {url : '/static/images/工长demo/杨爱军.jpg', id: 23},
      {url : '/static/images/工长demo/雍自民.jpg', id: 25},
      {url : '/static/images/工长demo/张林.jpg', id: 24}
      ],
      loading: true,
      //Select
      selectedAddress: "北京市",
      selectedSortType: "综合排序",
      address: ["北京市"],
      // sortTypeList: ["综合排序", "评价最高"],
      sortTypeList: ["综合排序"],
      isShow: false,
      selectType: 0,
      imgUrl: Lib.C.imgUrl
    }
  },
  components: {
    Group,
    Cell,
    JSelect,
    JSelectItem,
    Loading
  },
  methods: {
    getWorkerData(sortOption) {
      this.workerList = [];
      axios.get(`${Lib.C.userApi}workmanProfiles`,{
        params: sortOption
      }).then((res) => {
        let data = res.data.data
        data.map((e)=>{
          e.favorite = this.isFavorite(e.userId)
        })
        this.workerList = data
        this.loading = false
      }).catch((err) => {
        this.loading = false
        alert("网络连接失败，请刷新重试")
        throw err
      })
    },
    isFavorite(workerId) {
      if (!localStorage.getItem('favorite')) {
        localStorage.setItem('favorite', JSON.stringify({
          worker: [],
          shop: []
        }))
        return false
      }
      return findSameWorker(workerId, JSON.parse(localStorage.getItem('favorite')).worker)
    },
    addFavorite(index) {
      let list = JSON.parse(window.localStorage.getItem('favorite'))
      list.worker.push(this.workerList[index])
      window.localStorage.setItem('favorite', JSON.stringify(list))
      this.workerList[index].favorite = true
    },
    cancelFavorite(workerId,index) {
      let list = JSON.parse(window.localStorage.getItem('favorite'))
      for (let i in list.worker) {
        if (list.worker[i].userId === workerId) {
          list.worker.$remove(list.worker[i])
        }
      }
      this.workerList[index].favorite = false
      window.localStorage.setItem('favorite', JSON.stringify(list))
    },
    sortBy(sortType) {
      if (sortType == this.selectedSortType) {
        this.isShow = false
        return false
      } else {
        this.loading = true
        switch (sortType) {
          case "综合排序":
            this.getWorkerData()
            this.isShow = false
            break
          case "评价最高":
            this.getWorkerData({
              sort: "foremanRate,desc"
            })
            this.isShow = false
            break
          default:
            return false
        }
      }
    },
    gotoDetail(workerId) {
      window.location.href = `./worker-detail.html?id=${workerId}`
    },
    goto(url){
      window.location.href = url
    }
  },
  ready() {
    this.getWorkerData()
  }
}
/**
 * 在列表中找到userId相同的项
 */
function findSameWorker(userId, workerList) {
  for (let worker of workerList) {
    if (worker.userId === userId) {
      return true
    }
  }
  return false
}
</script>

<style>
body {
  background-color: #eee;
}
</style>
<style scoped lang="less">
.cell-item {
    position: relative;
    height: 80px;
    .worker-logo {
        position: absolute;
        top: 10px;
        left: 15px;
        width: auto;
        height: 80px;
    }
    .worker-name {
        position: absolute;
        top: 10px;
        left: 100px;
        font-size: 12px;
        color: #393939;
    }
    .worker-address {
        position: absolute;
        top: 44px;
        left: 100px;
        font-size: 12px;
        color: #999;
    }
    .worker-rank {
        position: absolute;
        bottom: 10px;
        left: 100px;
        font-size: 12px;
        color: #5965B2;
    }
    .worker-is-favorite {
        position: absolute;
        top: 40px;
        right: 15px;
        width: 20px;
        height: 20px;
    }
}
.content {
    padding-top: 44px;
    .newWorker {
      width: 100%;
      height: auto;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: auto;
      }
    }
}
header {
    position: fixed;
    height: 12px;
    width: 100%;
    left: 0;
    top: 0;
    padding: 16px 0;
    z-index: 20;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    .cart {
        position: absolute;
        right: 0;
        top: 0;
        height: 44px;
        width: 44px;
        img {
            height: 100%;
            width: 100%;
        }
    }
    div {
        position: absolute;
        height: 12px;
        line-height: 12px;
        width: calc( ~"(100% - 44px - 3px )/2");
        text-align: center;
        font-size: 12px;
        .select-icon {
            vertical-align: middle;
            width: 6px;
            height: 4px;
            margin-left: 10px;
        }
    }
    .select-address {
        top: 16px;
        left: 0;
        border-right: 1px solid #eee;
    }
    .sort {
        top: 16px;
        left: calc( ~"(100% - 47px )/2 " );
    }
}
.favorite-click-area {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 100%;
    z-index: 1;
}
.detail-click-area {
    position: absolute;
    left: 0;
    top: 0;
    width: calc(~"100% - 50px");
    height: 100%;
    z-index: 1;
}

</style>

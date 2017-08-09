<style scoped lang="less">
.content {
  width: 100%;
  position: relative;
  img {
    width: 100%;
  }
  .btn {
    text-align: center;
    position: absolute;
    bottom: 10%;
    left: 75px;
    margin: auto;
    width: calc(~"100% - 150px");
    height: 44px;
    margin: 10px auto;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 0;
    }
    .btn-text {
      position: absolute;
      text-align: center;
      width: 100%;
      height: 44px;
      line-height: 44px;
      left: 0;
      top: 0;
      z-index: 1;
      font-size: 18px;
      color: #fff;
    }
  }
}
// .btn {
//   text-align: center;
//   position: absolute;
//   bottom: 10px;
//   margin: auto;
//   width: calc(~"100% - 150px");
//   height: 44px;
//   margin: 10px auto;
//   img {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     left: 0;
//     top: 0;
//     z-index: 0;
//   }
//   .btn-text {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     left: 0;
//     top: 30%;
//     z-index: 1;
//     font-size: 18px;
//     color: #fff;
//   }
// }
</style>
<style lang="less">
  p {
    margin: 0;
  }
  .shop-list{
    padding: 15px;
    overflow: hidden;
  }
  .goods-info{
    &>img{
      width: 100%;
      height: 184px;
    }
    &>div{
      position: relative;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: 16px;
      &>span{
        position: absolute;
        left: 0;
        height: 20px;
        line-height: 20px;
        text-align: center;
        top: 50%;
        margin-top: -10px;
        border-radius: 8px;
        border: 1px solid #ff9736;
        color: #ff9736;
        font-size: 12px;
        display: inline-block;
        padding: 0 4px;
      }
      &>div{
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -8px;
        width: 115px;
        height: 16px;
        line-height: 16px;
        display: flex;
        justify-content: space-between;
        div{
          width: 55px;
          img{
            height: 16px;
            width: 16px;
            float: left;
            margin-right: 5px;
          }
          span{
            float: left;
            display: block;
            width: 16px;
            height: 16px;
            font-size: 12px;
            text-align: center;
            line-height: 14px;
            border-radius: 3px;
          }
          p{
            font-size: 12px;
          }
          &:nth-child(1){
            span{
              border: 1px solid #999;
              color: #999;
            }
            p{
              color: #999;
              text-decoration: line-through;
            }
          }
          &:nth-child(2){
            span{
              border: 1px solid #eb3416;
              color: #eb3416;
            }
            p{
              color: #eb3416;
              font-size: 16px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div class="shop-list">
    <div class="goods-info" v-for="shopList in itemList">
      <img :src="shopList.coverImg" v-tap="goto(shopList.id)">
      <div>
        {{shopList.name}}
        <span>
          销量 {{shopList.sellOut}}
        </span>
        <div>
          <div>
            <span>
              原
            </span>
            <p>
              ¥{{shopList.countBefore}}
            </p>
          </div>
          <div>
            <span>
              促
            </span>
            <p>
              ¥{{shopList.countAfter}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Lib from 'assets/Lib.js'
  import PopupPicker from 'vux-components/popup-picker'
  import Loading from 'vux-components/loading'
  import axios from 'axios'
  import picTwo from './bannertwo.png'
  Lib.M.auth(axios)
  export default {
    data () {
      return {
        imgUrl: Lib.C.imgUrl,
        // shopLists: [{
        //   coverImg: '',
        //   name: "小黑的大床！",
        //   sellOut: 99999,
        //   countBefore: 999,
        //   countAfter: 1
        // }],
        itemList: [],
      }
    },
    methods: {
      goto(id) {
        location.href = `./good-detail.html?itemId=${id}`
      }
    },
    ready() {
      axios.get(`${Lib.C.mOrderApi}items`).then((res) => {
        console.log(res.data.data)
        res.data.data.map((item) => {
          this.itemList.push({
            id: item.id,
            coverImg: this.imgUrl + item.bannerImgs,
            name: item.itemName,
            sellOut: item.turnoverCount?item.turnoverCount:0,
            countBefore: item.originalPrice,
            countAfter: item.price
          })
        })
      }).catch((err) => {
        alert('获取信息失败，请稍后再试。。')
        throw err
      })
    }
  }
</script>
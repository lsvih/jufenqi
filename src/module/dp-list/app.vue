<style scoped lang="less">
.content {
  width: 100%;
  position: relative;
  padding-top: 30px;
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
    overflow: hidden;
    background-color: #f9f9f9;
    padding-top: 30px;
    .tabs {
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      .tab {
        width: 50%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        color: #333;
        background-color: #ccc;
      }
      .tab-act {
        background-color: #ff9736;
        color: #fff;
      }
    }
  }
  .goods-info{
    box-shadow: 2px 2px 12px 1px rgba(0, 0, 0, 0.1);
    width: calc(~"100% - 30px");
    margin: 0 auto;
    &>img{
      width: 100%;
      height: auto;
      display: block;
    }
    &>div{
      position: relative;
      height: 70px;
      line-height: 30px;
      text-align: left;
      font-size: 16px;
      margin-bottom: 20px;
      background-color: #fff;
      text-indent: 15px;
      &>span{
        position: absolute;
        height: 20px;
        line-height: 20px;
        bottom: 16px;
        left: 0px;
        color: #ff9736;
        font-size: 12px;
      }
      &>div{
        position: absolute;
        right: 15px;
        top: 7px;
        width: 120px;
        height: 16px;
        line-height: 16px;
        display: flex;
        justify-content: space-between;
        div{
          width: 60px;
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
              font-size: 14px;
              font-weight: bold;
            }
          }
        }
      }
      &>p {
        position: absolute;
        width: fit-content;
        color: #ff9736;
        bottom: 10px;
        right: 15px;
      }
    }
  }
</style>

<template>
  <div class="shop-list">
    <!-- <div class="tabs">
      <div class="tab" v-for="tab in tabArr" track-by="$index" v-tap="tabIndex = $index" :class="{'tab-act': $index == tabIndex}">{{tab}}</div>
    </div> -->
    <div>
      <div class="goods-info" v-for="shopList in itemList">
      <img :src="shopList.coverImg">
      <div v-tap="goto(shopList.id)">
        {{shopList.name}}
        <span>
          销量 {{shopList.sellOut}}
        </span>
        <div>
          <div>
            <!-- <span>
              原
            </span> -->
            <p>
              ¥{{shopList.countBefore}}
            </p>
          </div>
          <div>
            <!-- <span>
              促
            </span> -->
            <p>
              ¥{{shopList.countAfter}}
            </p>
          </div>
        </div>
        <p>
          查看详情
        </p>
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
  Lib.M.auth(axios, true)
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
        freeList: [],
        point: 200,
        tabArr: ['积分加价购', '积分直接换'],
        tabIndex: 0,
      }
    },
    methods: {
      goto(id) {
        location.href = `./good-detail.html?itemId=${id}&pointNeed=false`
      }
    },
    ready() {
      axios.get(`${Lib.C.mOrderApi}items?filter=available:true&sort=createdAt,DESC&size=1000`).then((res) => {
        console.log(res.data.data)
        res.data.data.map((item) => {
          if (item.bonusPointsCost == 0) {
            this.itemList.push({
              id: item.id,
              coverImg: this.imgUrl + item.bannerImgs,
              name: item.itemName,
              sellOut: item.turnoverCount?item.turnoverCount:0,
              countBefore: item.originalPrice,
              countAfter: item.price,
              bonusPointsCost: item.bonusPointsCost,
            })
          }
        })
      }).catch((err) => {
        alert('获取信息失败，请稍后再试。。')
        throw err
      })
    }
  }
</script>
<style lang="less">
.headline {
  padding: 0 16px;
}
.content {
  width: 100%;
  p {
    width: 100%;
    img {
      width: 100% !important;
      height: auto !important;
    }
    strong {
      width: 100%;
      img {
        width: 100% !important;
        height: auto !important;
      }
    }

  }
  img {
    width: 100%;
  }
  a {
    text-decoration: none;
    color: #ff9736;
  }
}
.tabName {
  font-size: 12px;
  color: #ff9736;
  width: 60px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border: 1px solid #ff9736;
  margin-bottom: 8px;
}
.source {
  color: #393939;
  font-size: 12px;
  margin-right: 20px;
}
.timeStamp {
  font-size: 12px;
}
.link {
  margin-top: 10px;
  margin-bottom: 20px;
  a {
    text-decoration: none;
    color: #ff9736;
  }
}
.left-bac{
    width: 100%;
    .art_section {
      padding-bottom: 97px;
    }
    .art_title {
      font-size: 24px;
      color: #333;
      margin-bottom: 39px;
      text-align: center;
    }
    .art_subtitle {
      font-size: 18px;
      color: #333;
      margin-bottom: 30px;
    }
    .art_intro {
      font-size: 16px;
      color: #999;
      text-indent: 16px;
      width: 80%;
      margin: 30px auto;
    }
    .art_text {
      font-size: 14px;
      color: #666;
      text-indent: 16px;
      width: 80%;
      margin: 0 auto;
    }
    .art_img_wp {
      width: 50%;
      margin: 30px auto;
      img {
        display: block;
        width: 100%;
      }
    }
    .content {
      width: 100%;
      padding-bottom: 50px;
    }
    p {
      font-size: 14px;
      color: #666;
      font-weight: 300;
    }
    &>img {
      display: block;
      width: 50%;
      margin: 10px auto;
    }
  }
</style>

<template>
  <div class="headline">
    <!-- <div class="head-titie"><h2>{{(headlineContent.title)}}</h2></div>
    <div class="tabName">{{headlineContent.tabName}}</div>
    <div style="display: flex;">
      <div class="source">来源：{{headlineContent.source}}</div>
      <div class="timeStamp">{{getTime(headlineContent.publishedAt)}}</div>
    </div>
    <div class="content" v-html="headlineContent.contentRich"></div>
    <div class="link"><a :href="headlineContent.sourceUrl">查看原文</a></div> -->
    <div class="left-bac">
        <div class="art_title">{{artTitle}}</div>
        <div class="content" v-html="artHtml"></div>
      </div>
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
      headlineContent: {},
      title: "",
      artTitle: '',
      artHtml: ''
    }
  },
  components: {
  },
  ready() {
    // axios.get(`http://wx.jufenqi.com:8080//content/api/headlines/${this.id}`).then((res) => {
    //   if (res.data.data.source == '土巴兔') {
    //     res.data.data.contentRich = res.data.data.contentRich.replace(/^\s*setInterval\([\s\(\)a-zA-Z0-9\{\},;\\:.\-='"]*\);/, "")
    //   } //判断当遇到显锋的土巴兔，富文本里还有计时器，用正则替换
    //   this.headlineContent = res.data.data
    // }).catch((err) => {
    //   alert('获取详情失败，请稍后重试')
    // })
    this.getArticle(this.id)
  },
  methods: {
    titleTransform(string) {
      return string.split(' ')[0]
    },
    getTime:Lib.M.getTime,
    getArticle(id) {
      axios.get(`http://wx.jufenqi.com:8080/content/api/articles/${id}`).then((res) => {
        this.artHtml = res.data.data.contentHtml
        this.artTitle = res.data.data.title
      }).catch((err) => {
        console.log(err)
        throw err
      })
    },
  }
}
</script>

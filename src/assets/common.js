var Rxports = {
  /**
   * 获得当前页面的文件名
   */
  GetThisPage: () => {
    var urlArr = location.href.split("/")
    var fileName = urlArr[urlArr.length - 1]
    var thisPage = fileName.split(".html")[0]
    return thisPage
  },
  /**
   * 获取当前页面所带的参数
   */
  GetRequest: () => {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var strs = url.substr(1).split("&");
      for (let str of strs) {
        theRequest[str.split("=")[0]] = unescape(str.split("=")[1]);
      }
    }
    return theRequest;
  }
}

module.exports = Rxports

var Rxports = {
  /**
   * 获得当前页面的文件名
   */
  GetThisPage: () => {
    let urlArr = location.href.split("/")
    let fileName = urlArr[urlArr.length - 1]
    return fileName.split(".html")[0]
  },
  /**
   * 获取当前页面所带的参数
   */
  GetRequest: () => {
    let url = location.search
    let theRequest = new Object()
    if (url.indexOf("?") != -1) {
      let strs = url.substr(1).split("&")
      for (let str of strs) {
        theRequest[str.split("=")[0]] = decodeURIComponent(str.split("=")[1])
      }
    }
    return theRequest;
  },
  /**
   * 设置localStorage中的数据
   * @param {String}   item
   * @param {String}   key
   * @param {String|Object|Array}   data
   * @param {Function} cb
   */
  SetLocalData: (item, key, data, cb) => {
    let tempdata;
    if (localStorage.getItem(item) == undefined) {
      localStorage.setItem(item, "{}")
      tempdata = JSON.parse(localStorage.getItem(item))
    } else {
      tempdata = JSON.parse(localStorage.getItem(item))
    }
    tempdata[key] = data
    localStorage.setItem(item, JSON.stringify(tempdata))
    cb()
  }
}

module.exports = Rxports

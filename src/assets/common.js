const Rxports = {
  /**
   * 获得当前页面的文件名
   */
  GetThisPage: () => {
    let urlArr = window.location.href.split('/')
    let fileName = urlArr[urlArr.length - 1]
    return fileName.split('.html')[0]
  },
  /**
   * 获取当前页面所带的参数
   */
  GetRequest: () => {
    let url = window.location.search
    let theRequest = {}
    if (url.includes('?')) {
      let strs = url.substr(1).split('&')
      for (let str of strs) {
        theRequest[str.split('=')[0]] = decodeURIComponent(str.split('=')[1])
      }
    }
    return theRequest
  },
  /**
   * 设置localStorage中的数据
   * @param {String}   item
   * @param {String}   key
   * @param {String|Object|Array}   data
   * @param {Function} cb
   */
  SetLocalData: (item, key, data, cb) => {
    let tempdata
    if (window.localStorage.getItem(item) === undefined) {
      window.localStorage.setItem(item, '{}')
      tempdata = JSON.parse(window.localStorage.getItem(item))
    } else {
      tempdata = JSON.parse(window.localStorage.getItem(item))
    }
    tempdata[key] = data
    window.localStorage.setItem(item, JSON.stringify(tempdata))
    cb()
  },
  /**
   * 鉴权
   * @param {Module}   axios 将jwt鉴权相关注入axios common header中
   * @param {Boolean}  requirePhone 是否需要验证手机
   */
  auth: (axios, requirePhone) => {
    try {
      let now = Number(new Date().getTime())
      if (Number(JSON.parse(localStorage.user).expiredAt) < now || (!!requirePhone && !JSON.parse(localStorage.user).profile.mobile)) {
        localStorage.removeItem('user')
        location.href = `./wxAuth.html?url=${encodeURIComponent(location.href)}`
      }
      axios.defaults.headers.common['Authorization'] = `${JSON.parse(localStorage.getItem('user')).tokenType} ${JSON.parse(localStorage.getItem('user')).token}`
    } catch (e) {
      localStorage.clear()
      location.href = `./wxAuth.html?url=${encodeURIComponent(location.href)}`
    }
  },
  authOnlyPhone: (axios) => {
    if (!JSON.parse(localStorage.user).profile.mobile) {
      localStorage.removeItem('user')
      location.href = `./wxAuth.html?url${encodeURIComponent(location.href)}`
    }
  },
  /**
   * 获取日期字符串
   * @param {timeStamp}
   * @return {string}
   */
  getTime: (timeStamp) => {
    const d = new Date(timeStamp * 1000)
    const Y = `${d.getFullYear()}-`
    const M = `${d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}-`
    const D = (d.getDate() < 10 ? `0${d.getDate()}` : d.getDate())
    return Y + M + D
  }
}

export default Rxports

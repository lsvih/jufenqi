

var Rxports = {
	GetThisPage : () => {
	    var urlArr = location.href.split("/")
			var fileName = urlArr[urlArr.length-1]
			var thisPage = fileName.split(".html")[0]
	    return thisPage
	}
}

module.exports = Rxports

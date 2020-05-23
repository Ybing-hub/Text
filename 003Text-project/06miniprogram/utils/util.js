function getMovieList(url,success){
  wx.request({
    url: url,
    success: function (res) {
      var data = formatMovieList(res.data.subjects)
      success(data)
    }
  })
}

function formatMovieList(data){
  return data.map(function (item) {
    return {
      coverImage: item.images.large,
      title: item.title,
      score: item.rating.average,
      stars: coverStarsToArray(item.rating.stars)
    }
  })
}

function coverStarsToArray(stars){
  var arr = []
  var num = parseInt(stars.substring(0,1))
  for(var i = 1 ; i<=5;i++){
    if(i<=num){
      arr.push(1)
    }else(
      arr.push(0)
    )
  }
  return arr
}
module.exports = {
  getMovieList: getMovieList
}
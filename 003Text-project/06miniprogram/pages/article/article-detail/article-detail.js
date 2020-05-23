var { articles } = require('../../../data/db.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var articleId = options.articleId
    var article = articles[articleId]

    //设置收藏
    var isCollected = true;
    //获取收藏状态
    var articles_collections = wx.getStorageSync('articles_collections')
    if(articles_collections){
      //文章被收藏
      isCollected = !!articles_collections[articleId]
    }else{
      //文章没有收藏--初始化文章
      var data = {}
      data[articleId]=false
      wx.setStorageSync('articles_collections',data)
    }
   
    //同步处理背景音乐图标变化
    var backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.onPlay(function(){
      this.setData({isPlaying:true})
    }.bind(this))
    backgroundAudioManager.onPause(function(){
      this.setData({ isPlaying :false})
    }.bind(this))
     //加载文章详情
     this.setData({...article,isCollected:isCollected})
  },
  tapCollection:function(){
    //获取所有文章状态
    var articles_collections = wx.getStorageSync('articles_collections')
    //获取当前文章状态
    var currentCollection = articles_collections[this.data.articleId]
    //改变收藏状态
    articles_collections[this.data.articleId] = !currentCollection;
    wx.setStorageSync('articles_collections',articles_collections)
    //同步改变收藏图标
    this.setData({isCollected:!currentCollection},function(){
      wx.showToast({
        title:currentCollection?'取消收藏':'收藏成功',
        duration:2000
      })
    })
  },
  tapShare:function(){
    var itemList = ['分享到QQ','分享朋友圈','分享到微信']
    wx.showActionSheet({
      itemList:itemList,
      success:function(res){
        wx.showToast({
          title:itemList[res.tapIndex]+'成功',
          duration:2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tapMusic:function(){
    var backgroundAudioManager = wx.getBackgroundAudioManager()
    if(this.data.isPlaying){//正在播放
      backgroundAudioManager.pause()
      //改变播放状态
      //this.setData({isPlaying:false})
    }else{//没有播放
      backgroundAudioManager.src = this.data.music.src
      backgroundAudioManager.title = this.data.music.title
      backgroundAudioManager.coverImgUrl = this.data.music.coverImgUrl
      //改变播放状态
      //this.setData({isPlaying:true})
    }
  }
})
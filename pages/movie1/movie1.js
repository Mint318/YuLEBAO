// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    movie: {},
    isOpen: false  // 保存简介是否是打开状态
  },

  /** 切换简介的显示与隐藏状态 */
  tapDesc(){
    this.setData({isOpen : !this.data.isOpen});
  },

  /** 大图预览剧照图片列表 */
  tapShowImage(event){
    // 获取当前选中项的下标索引
    let index = event.target.dataset.i;
    let urls = this.data.movie.thumb;
    let newurls = [];
    urls.forEach((item, i)=>{
      newurls[i] = item.substring(
                0, item.lastIndexOf('@'));
    });
    wx.previewImage({
      current: newurls[index],
      urls: newurls,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    console.log(id);
    // 发送请求，获取电影详情
    wx.request({
      url: 'https://api.tedu.cn/detail.php',
      data: {id: id},
      success: (res)=>{
        console.log(res);
        this.setData({movie: res.data});
      }
    });
    // 访问云数据库，加载当前电影下的所有评论。
    // 1. 获取db
    let db = wx.cloud.database();
    // 2. 调用API，执行查询操作
    db.collection('comments').where({
      movieid: id
    })
    .skip(0)   // 从索引为0的位置开始查
    .limit(4)  // 向后查4条
    .get().then(res=>{
      console.log(res);
      // 将评论列表res.data存入data中
      this.setData({comments: res.data});
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

  }
})
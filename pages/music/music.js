// pages/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:'',
    songs:'',
    showSongs:[],
    index:4,
    value:'张杰'
  },
  /**
   * 跳转到播放页进行歌曲播放
   * @param {*} e 
   */
  play(e){
    console.log("进来了")
    console.log(e)
    //当前音乐的下标
    let myIndex=e.target.dataset.index
    //当前列表中所有音乐
    let mySongs=this.data.showSongs
    //JSON对象转换为字符串
    let strSongs=JSON.stringify(mySongs)
    wx.navigateTo({
      url: '../../pages/play/play?index='+myIndex+"&mySongs="+encodeURIComponent(strSongs),//把json字符串进行编码
    })
  },
  /**
   * 用来实时回去输入框中的值
   * @param {*} e 
   */
  getSerValue(e){
    let serV=e.detail.value
    console.log(serV)
    if(serV!=null || serV!=''){
      this.setData({
        value:serV
      })
    }
    console.log(this.data.value)
  },
  /**
   * 通过搜索获取值
   */
  ser(){
    //获取搜索的值
    let serV=this.data.value
    console.log(serV+"......")
    //根据搜索的值获取音乐
    this.getSongs(serV,4)
  },
  showSongs(index){
    //查询总音乐数组
    let mySongs=this.data.songs
    let show=this.data.showSongs
    for(var i=index;i<index+4;i++){
      //给数组中追加值
      show.push(mySongs[i])
    }
    this.setData({
      showSongs:show
    })
  },
  /**
   * 请求音乐列表信息
   */
  getSongs(serName,index){
    let songsUrl='https://music.163.com/api/search/get?s='+serName+'&type=1&limit=30'
    var that=this
    var mySongs=[]
    wx.request({
      url: songsUrl,
      success:function(res){
        //获取歌曲的数据
        let serSongs=res.data.result.songs
        for(let i=0;i<serSongs.length;i++){
          wx.request({
            url: 'https://music.163.com/api/song/detail/?id=1359595520&ids=['+serSongs[i].id+']',
            success:function(result){
              //用来展示数组
              var show=[]
              var musicImg=result.data.songs[0].album.blurPicUrl
              //push给数组中追加值
              mySongs.push({"id":serSongs[i].id,"name":serSongs[i].name,"singer":serSongs[i].artists[0].name,"musicImg":musicImg})
              if(i==3){
                that.setData({
                  showSongs:mySongs
                })
              }
              that.setData({
                songs:mySongs
              })
            }
          })
        }
      }
    })
  },
  /**
   * 请求网上banner图资源
   */
  getBanners(){
    // let bannerUrl='https://autumnfish.cn/banner?type=1'
    // //用来请求网上资源
    // wx.request({
    //   url:bannerUrl,
    //   success:function(result){
    //     console.log(result)
    //   }
    // })
    this.setData({
      banners:[
        {
          id:1,
          bannerUrl:'http://p1.music.126.net/7oVPnI3PTrg1SaaoZS91cg==/109951167555216416.jpg'
        },
        {
          id:2,
          bannerUrl:'http://p1.music.126.net/PJNPtvCNX-EDRSYAoF8vBw==/109951167555213504.jpg'
        },
        {
          id:3,
          bannerUrl:'http://p1.music.126.net/IscY7mXza5HGliBIsPjaxA==/109951167555227816.jpg'
        },
        {
          id:4,
          bannerUrl:'http://p1.music.126.net/D5T51x9ejt_A0yV3D9-xKw==/109951167555231403.jpg'
        }
      ]
    })
  },
  /**
   * 初始化页面方法
   */
  init(){
     //获取banner图
     this.getBanners()
     //查询音乐
     this.getSongs("薛之谦")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init()//初始页面
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    //初始化页面
    this.init()
    //下拉时候进行弹出刷新提示框
    wx.showLoading({
      title: '加载中...',
    })
    //窗口进行刷新动画
    wx.showNavigationBarLoading()
    //延时3秒进行关闭动画效果
    setTimeout(function(){
      //关闭微信点showLoading特效
      wx.hideLoading()
      //关闭窗口刷新的特效
      wx.hideNavigationBarLoading()
    },3000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    let newindex=this.data.index
    if(newindex>30){
      wx.showToast({
        title: '到底了，别划了',
      })
    }else{
      this.showSongs(newindex)
      newindex=newindex+4
      this.setData({
        index:newindex
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
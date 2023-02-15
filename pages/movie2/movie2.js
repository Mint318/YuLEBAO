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
      value:'复仇者联盟',
      pro_list:{}
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
      this.getmovies(serV,4)
    },
   
    /**
     * 请求音乐列表信息
     */
    getmovies(serName,index){
      let moviesUrl='https://api.pingcc.cn/video/search/title/'+serName+'/1/10' 
      var that=this
      var mySongs=[]
      var sermovie
      wx.request({
        url: moviesUrl,
       
        success:function(res){
          //获取歌曲的数据
          console.log(res)
          let pro_list=res.data.data
            that.setData({
                pro_list:res.data.data
            })
            console.log(pro_list)
            }
            }
          
        
      )
    },
   
    /**
     * 初始化页面方法
     */
    init(){
       
       this.getmovies("复仇者联盟")
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
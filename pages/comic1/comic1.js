// pages/comic1/comic1.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pro_list:{},
    },
    getnovel(id){
        let that=this
        console.log(this.options.id)
        let novelUrl='https://api.pingcc.cn/comicChapter/search/'+this.options.id
        wx.showLoading({
          title: '加载中哦',
        })
        wx.request({
          url: novelUrl,
          success:(res)=>{
              console.log(res)
              let pro_list=res.data.data
            that.setData({
                pro_list:res.data.data
            })
            console.log(pro_list)
              wx.hideLoading({
                success: (res) => {},
              })
          },
         
        })
    },
    init(){
        //获取banner图
        this.getnovel("id")
        //查询音乐
     },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.init()
        let that =this
        that.getnovel(options.id)
        console.log(options.id)
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})
// pages/comic1/comic1.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        banners: '',
        novel: '',
        pro_list: {},
        index: 4,
        value: '校园',
        

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
    getSongs(serName) {
        let songsUrl = 'https://api.pingcc.cn/comic/search/title/' + serName + '/1/20'
        var that = this
        var mynovel = []
        var pro_list = []
        wx.request({
            url: songsUrl,
            success: (res) => {
                //获取歌曲的数据
                console.log(res)
                let pro_list = res.data.data
                that.setData({
                    pro_list: res.data.data
                })
                console.log(pro_list)
            }

        })
    },
    getBanners() {
        this.setData({
            banners: [{
                    id: 1,
                    bannerUrl: 'https://img0.baidu.com/it/u=2364358471,2840010700&fm=253&fmt=auto&app=138&f=PNG?w=960&h=300'
                },
                {
                    id: 2,
                    bannerUrl: 'https://img0.baidu.com/it/u=2364358471,2840010700&fm=253&fmt=auto&app=138&f=PNG?w=960&h=300'
                },
                {
                    id: 3,
                    bannerUrl: 'https://img0.baidu.com/it/u=2364358471,2840010700&fm=253&fmt=auto&app=138&f=PNG?w=960&h=300'
                },
                {
                    id: 4,
                    bannerUrl: 'https://img0.baidu.com/it/u=2364358471,2840010700&fm=253&fmt=auto&app=138&f=PNG?w=960&h=300'
                }
            ]
        })
    },
    init() {
        //获取banner图
        this.getBanners()
        this.getSongs("校园")
        //查询音乐
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.init()
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
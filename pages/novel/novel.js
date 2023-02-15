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
        value: '万古神帝',
        

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
        let songsUrl = 'https://api.pingcc.cn/fiction/search/title/' + serName + '/1/20'
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
                    bannerUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F6a31d4be88ce30935cc25298e60b6351f150d2ae12d54-kclOor_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658729857&t=41a2eb6a125a0b334ba8044c21ef5652'
                },
                {
                    id: 2,
                    bannerUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F415c8b91fdee3b5011a5b0cade6cc9e20097402f16fdd-V2apRj_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658729857&t=dd35ad629ac736b8a66b69b749fe0524'
                },
                {
                    id: 3,
                    bannerUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F073476ab9514cd4756a6b82ff872028acd4864b1117a3-hSciwo_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658729857&t=9979043ac41ddd51dccdff36b87e216a'
                },
                {
                    id: 4,
                    bannerUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.99ttsc.com%2Fuploads%2Fslider%2F20190125%2F2356e25f8027f1223dcb8509d35d2f26.jpg&refer=http%3A%2F%2Fwww.99ttsc.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658729857&t=00fe65345d29c33a71e3b6fea99e5575'
                }
            ]
        })
    },
    init() {
        //获取banner图
        this.getBanners()
        this.getSongs("龙族")
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
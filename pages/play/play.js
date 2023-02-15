// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songs: '',
    index: '',
    song: '',
    action:'play'
  },
  //确保在页面是独一无二的
  innerAudio: '',
  pre(){
    let innerAudio=this.innerAudio
    //获取当前歌曲的索引
    let index=parseInt(this.data.index)
    //获取当前音乐列表
    let songs=this.data.songs
    if(index<=1){
      index=1
      wx.showToast({
        title: '到顶了，别点了',
      })
    }else{
      index=index-1
      this.setData({
        song:songs[index],
        index:index,
        action:'play'
      })
      innerAudio.src='https://music.163.com/song/media/outer/url?id='+songs[index].id+'.mp3'
    }
  },
  next(){
    let innerAudio=this.innerAudio
    //获取当前歌曲的索引
    let index=parseInt(this.data.index)
    //获取当前音乐列表
    let songs=this.data.songs
    if(index>=songs.length-1){
      index=songs.length-1
      wx.showToast({
        title: '到底了，别点了',
      })
    }else{
      index=index+1
      this.setData({
        song:songs[index],
        index:index,
        action:'play'
      })
      innerAudio.src='https://music.163.com/song/media/outer/url?id='+songs[index].id+'.mp3'
    }
  },
  /**
   * 切换当前的播放状态
   */
  action(e){
    let myInnerAudio=this.innerAudio
    //获取当前的播放状态
    let state = e.target.dataset.state
    if(state=='play'){
      //让音乐暂停
      myInnerAudio.pause()
      this.setData({
        action:'pause'
      })
    }else{
      //让音乐开始
      myInnerAudio.play()
      this.setData({
        action:'play'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let index = options.index
    //把传递数据进行解码字符串，字符串转换json对象
    let mySongs = JSON.parse(decodeURIComponent(options.mySongs))
    console.log(mySongs)
    //当前播放音乐
    let song = mySongs[index]
    //初始化数据
    this.setData({
      songs: mySongs,
      index: index,
      song: song
    })
    //创建播放音乐音频
    const innerAudio = wx.createInnerAudioContext("audio")
    innerAudio.src='https://music.163.com/song/media/outer/url?id='+song.id+'.mp3'
    //设置自动播放
    innerAudio.autoplay=true
    //设置循环播放
    innerAudio.loop=true
    //赋值当前page中innerAudio对象
    this.innerAudio = innerAudio
    
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
    let innerAudio = this.innerAudio
    //停止音乐
    innerAudio.stop()
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
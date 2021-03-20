const app = <MyAppOption>getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      id: 1,
      username: 'username',
      avatar: '',
      gender: 'MALE',
      birthday: '1997/06/14'
    },
    menus: [
      {
        id: '',
        name: '题库管理',
        cover: 'question',
        page: '',
      },
      {
        id: '',
        name: '人员管理',
        cover: 'staff',
        page: '',
      },
      {
        id: '',
        name: '收藏',
        cover: 'star',
        page: '',
      },
      {
        id: '',
        name: '浏览历史',
        cover: 'history',
        page: '',
      },
      {
        id: '',
        name: '设置',
        cover: 'settings',
        page: '',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: any) {

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
    this.setData({
      user: app.user
    });
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
  onShareAppMessage(opts: any): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opts.target)
    return {}
  },

  navigateToPage(event: any) {
    let page = <string>event.currentTarget.dataset.page;
    wx.navigateTo({
      url: page
    });
  }
})
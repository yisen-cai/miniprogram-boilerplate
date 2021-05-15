type TCompletePageData = {
  message: string,
  url: string
}


Page<TCompletePageData, WechatMiniprogram.Page.CustomOption>({

  /**
   * 页面的初始数据
   */
  data: {
    message: '测评',
    url: 'url'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: CompleteParam) {
    this.setData({
      message: options.message,
      url: options.url
    });
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

  }
})
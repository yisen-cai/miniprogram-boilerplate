type TCompletePageData = {
  message: string,
  url: string,
  next: string,
}


Page<TCompletePageData, WechatMiniprogram.Page.CustomOption>({

  /**
   * 页面的初始数据
   */
  data: {
    message: '测评',
    url: 'url',
    next: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: CompleteParam) {
    let url = options.url.replace("^^", "?").replace("equals", "=");
    let next = options.next.replace("^^", "?").replace("equals", "=");
    this.setData({
      message: options.message,
      url: url,
      next: next
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

type TTestCaseAttentionData = {
  startTime: string,
  endTime: string,
  timeSpan: string,
  countDown: number,
  verify: boolean,
  counter: any | null,
  testId: string
}


Page<TTestCaseAttentionData, WechatMiniprogram.Page.CustomOption>({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: '19:00',
    endTime: '21:00',
    timeSpan: '120',
    countDown: 15,
    verify: false,
    testId: '',
    counter: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: BaseParam) {
    let testId = options.id;
    this.setData({
      testId: testId
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    clearInterval(this.data.counter);
  },

  startTest(event: any) {
    wx.navigateTo({
      url: `/pages/join-test/index?id=${this.data.testId}`
    });
  },

  onChange(event: any) {
    let res = !this.data.verify;
    let self = this;
    let counter;
    if (res) {
      counter = setInterval(() => {
        if (self.data.countDown > 0) {
          self.setData({
            countDown: self.data.countDown - 1
          });
        }
      }, 1000);
      this.setData({
        counter: counter
      })
    } else {
      this.setData({
        countDown: 15
      });
    }
    this.setData({
      verify: res
    });
  }
});
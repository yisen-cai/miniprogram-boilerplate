type TJoinTestData = {
  expandFold: boolean,
  questions: Array<QuestionResult>,
  currentQuestion: QuestionResult | null,
  currentIndex: number,
  question1: any,
  question2: any,
  question3: any,
  question4: any
}

Page<TJoinTestData, WechatMiniprogram.Page.CustomOption>({

  /**
   * 页面的初始数据
   */
  data: {
    expandFold: false,
    questions: [],
    currentQuestion: null,
    currentIndex: 0,
    question1: {
      index: 1,
      questionId: 11
    },
    question2: {
      index: 2,
      questionId: 11
    },
    question3: {
      index: 3,
      questionId: 11
    },
    question4: {
      index: 4,
      questionId: 11
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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

  expandFoldContent(event: any) {
    this.setData({
      expandFold: !this.data.expandFold
    })
  }
});
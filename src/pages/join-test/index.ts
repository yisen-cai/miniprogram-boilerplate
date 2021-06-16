import { getTestQuestions } from "../../api/api";

const app1 = <MyAppOption>getApp();


type TJoinTestData = {
  expandFold: boolean,
  questions: Array<QuestionResult>,
  currentQuestion: QuestionResult | null,
  currentIndex: number,
  timeLimit: number,
  startTime: number,
  activeIndex: number,
  activeQuestion?: QuestionResult,
  activeAnswer: number,
  answers: Array<QuestionAnswer>,
  optionTags: string
}

Page<TJoinTestData, WechatMiniprogram.Page.CustomOption>({

  /**
   * 页面的初始数据
   */
  data: {
    expandFold: false,
    questions: [],
    answers: [],
    startTime: 0,
    activeAnswer: -1,
    optionTags: 'ABCDEFG',
    currentQuestion: null,
    currentIndex: 0,
    timeLimit: 7200 * 1000,
    activeIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: BaseParam) {
    let testId = options.id;
    let self = this;
    app1.loginReadyCallback = (res: any) => {
      
    }
    this.setData({
      startTime: new Date().getTime()
    });
    getTestQuestions(testId).then(res => {
      let questions = <PageResult<QuestionResult>>res.data;
      self.setData({
        questions: questions.entities,
        activeQuestion: questions.entities[0]
      })
    }).catch(err => {

    })
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

  activeQuestion(event: any) {
    let index = event.currentTarget.dataset.index;
    let question = this.data.questions[index];
    this.setData({
      activeQuestion: question,
      activeIndex: index + 1
    });
  },

  prev(event: any) {
    let activeIndex = this.data.activeIndex - 1;
    if(activeIndex >= 1) {
      let question = this.data.questions[activeIndex - 1]
      this.setData({
        activeQuestion: question,
        activeIndex: activeIndex,
        activeAnswer: -1
      });
    }
  },

  next(event: any) {
    let activeIndex = this.data.activeIndex + 1;
    if(activeIndex <= this.data.questions.length) {
      let question = this.data.questions[activeIndex - 1]
      this.setData({
        activeQuestion: question,
        activeIndex: activeIndex,
        activeAnswer: -1
      });
    }
  },

  activeOption(event: any) {
    let index = event.currentTarget.dataset.index;
    this.setData({
      activeAnswer: index
    });
    let question = this.data.activeQuestion!!;
    this.addAnswer({
      index: index,
      content: question.options[index].content
    });
    let activeIndex = this.data.activeIndex + 1;
    if(activeIndex <= this.data.questions.length) {
      let question = this.data.questions[activeIndex - 1]
      this.setData({
        activeQuestion: question,
        activeIndex: activeIndex
      });
    }
  },

  addAnswer(answer: QuestionAnswer) {
    let answers = this.data.answers;
    answers.push(answer);
  },

  expandFoldContent(event: any) {
    this.setData({
      expandFold: !this.data.expandFold
    })
  },

  postAnswer(event: any) {
    wx.navigateTo({
      url: `/pages/complete/index?startTime=${this.data.startTime}`
    });
  }
});
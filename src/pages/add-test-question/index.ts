import { getTest, search, searchQuestion } from "../../api/api"

type TTestQuestionData = {
  questions: Array<QuestionMetaVO>,
  other: string,
  test?: TestDTO,
  leftScore: number,
  isShowAdd: boolean,
  addQuestionIndex: number,
  searchQuestionText: string,
  expandPanel: boolean,
  readyAddQuestion?: QuestionMetaVO,
  questionScore: number,
  searchQuestions: PageResult<QuestionDTO>
}

type TestQuestionOption = {
  id: string
}

Page<TTestQuestionData, WechatMiniprogram.Page.CustomOption>({
  /**
   * 页面的初始数据
   */
  data: {
    test: undefined,
    questions: [],
    searchQuestionText: '',
    questionScore: 0,
    other: '',
    searchQuestions: {
      total: 0,
      entities: [],
      hasNext: false,
    },
    expandPanel: false,
    leftScore: 0,
    addQuestionIndex: 0,
    isShowAdd: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: TestQuestionOption) {
    getTest(options.id).then(res => {
      let data = <TestDTO>res.data;
      this.setData({
        test: data,
        leftScore: data.totalScore
      });
    }).catch(res => {
      console.log(res);
    });
  },


  goQuestionDetail(event: any) {
    let id = event.currentTarget.dataset.questionId;
    wx.navigateTo({
      url: `/pages/question-detail?id=${id}`
    });
  },

  initData() {
    this.setData({
      readyAddQuestion: undefined
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

  addQuestion() {
    this.setData({
      isShowAdd: true
    });
  },

  addOneQuestion(event: any) {
    let id = event.currentTarget.dataset.questionId;
    let question: QuestionMetaVO;
    this.data.searchQuestions.entities.forEach(ele => {
      if (ele.id == id) {
        question.index = this.data.addQuestionIndex + 1;
        question.questionId = ele.id;
      }
      this.setData({
        readyAddQuestion: question
      });
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  searchQuestion(event: any) {
    // this.triggerEvent('search', { searchText: event.detail.value }, {});
    let text = event.detail.searchText;
    if (text == '') {
      this.setData({
        searchQuestionText: text,
        expandPanel: false
      });
    } else {
      this.setData({
        searchQuestionText: text,
        expandPanel: true
      });
      this.searchQuestionAction(text);
    }
  },

  searchQuestionAction(keyword: string) {
    let self = this;
    searchQuestion(keyword).then(res => {
      let questions = <SearchResult<QuestionDTO>>res.data;
      self.setData({
        searchQuestions: questions.questions
      });
    }).catch(err => {
      console.log(err);
    });
  },

  searchQuestionResult(event: any) {
    // this.triggerEvent('searchResult', { searchText: this.data.text }, {});
    let text = event.detail.searchText;
    this.setData({
      searchQuestionText: text
    });
  },

  clearQuestionText(event: any) {
    this.setData({
      searchQuestionText: '',
      expandPanel: false
    });
  },

  checkResult(event:any) {
    
  }
})
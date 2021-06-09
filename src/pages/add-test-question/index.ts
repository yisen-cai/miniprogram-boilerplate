import { addTestQuestion, getTest, search, searchQuestion } from "../../api/api";
import Notify from '@vant/weapp/notify/notify';

type TTestQuestionData = {
  questions: Array<QuestionMetaVO>,
  other: string,
  test?: TestDTO,
  leftScore: number,
  isShowAdd: boolean,
  addQuestionIndex: number,
  searchQuestionText: string,
  expandPanel: boolean,
  readyAddQuestion: QuestionMetaVO,
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
    readyAddQuestion: {
      index: 0,
      score: 10,
      questionId: ''
    },
    test: undefined,
    questions: [],
    searchQuestionText: '',
    other: '',
    searchQuestions: {
      total: 0,
      entities: [],
      hasNext: false,
    },
    expandPanel: false,
    leftScore: 100,
    addQuestionIndex: 0,
    isShowAdd: false
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


  closeInput(event:any) {
    this.setData({
      isShowAdd: false
    });
    this.initData();
  },

  goQuestionDetail(event: any) {
    let id = event.currentTarget.dataset.questionId;
    wx.navigateTo({
      url: `/pages/question-detail/index?id=${id}`
    });
  },

  initData() {
    this.setData({
      readyAddQuestion: {
        questionId: '',
        index: 0,
        score: 10
      },
      questionScore: 10
    });
  },

  bindKeyInput(event: any) {
    let question = this.data.readyAddQuestion;
    question.score = event.detail.value
    this.setData({
      readyAddQuestion: question
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
    let question = this.data.readyAddQuestion;
    this.data.searchQuestions.entities.forEach(ele => {
      if (ele.id == id) {
        question.index = this.data.addQuestionIndex + 1;
        question.questionId = ele.id;
        this.setData({
          readyAddQuestion: question
        });
      }
    });
    this.clearQuestionText();
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

  checkResult(event: any) {
    let readyScore = this.data.readyAddQuestion.score!!;
    let leftScore = this.data.leftScore;
    if (readyScore == 0) {
      Notify({ type: 'danger', message: '添加试题的分数不可为0!' });
    }
    if (leftScore - readyScore < 0) {
      Notify({ type: 'danger', message: '试题分数超过总分!' });
    }

    if (this.data.readyAddQuestion.questionId == '') {
      Notify({ type: 'danger', message: '请选择题目添加!' });
    }
    let self = this;
    addTestQuestion('60897eba03e081335f70fda0', this.data.readyAddQuestion).then(res => {
      Notify({ type: 'success', message: '添加试题成功!' });
      let questions = self.data.questions;
      questions.push(self.data.readyAddQuestion);
      self.setData({
        addQuestionIndex: self.data.addQuestionIndex + 1,
        questions: questions,
        isShowAdd: false
      });
      self.initData();
    }).catch(err=> {
      console.log(err);
    });
  }
})
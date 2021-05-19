import Notify from '@vant/weapp/notify/notify';

type TAddQuestion = {
  type: 'JUDGE' | 'SELECT' | 'CHECK' | ' INPUT' | 'ANSWER',
  description: string,
  options: Array<QuestionOption>,
  answers: Array<QuestionAnswer>,
  questionTypes: Array<string>,
  questionIndex: number,
  addLabel: string,
  questionInput: string,
  inputValid: boolean,
  showInput: boolean,
  tags: Array<string>,
  tagSearchText: string
}


Page<TAddQuestion, WechatMiniprogram.Page.CustomOption>({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'SELECT',
    description: '',
    options: [
    ],
    answers: [
    ],
    addLabel: '选项',
    questionInput: '',
    questionTypes: [
      '判断题',
      '选择题',
      '多选题',
      '填空题',
      '简答题'
    ],
    questionIndex: 1,
    inputValid: true,
    showInput: false,
    tags: [
      '英语'
    ],
    tagSearchText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let question: QuestionVO
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },


  /**
   * 删除问题选项
   * @param event 
   */
  deleteOption(event: any) {
    let index = event.detail.index;
    let options: Array<QuestionOption> = [];
    this.data.options.forEach(v => {
      if (v.index != index)
        options.push(v);
    });
    this.setData({
      options: options
    });
  },

  /**
   * search tag action, expand or fold
   * @param event 
   */
  searchTag(event: any) {

  },

  clearTagText(event: any) {

  },

  searchTagResult(event: any) {

  },

  deleteAnswer(event: any) {
    let index = event.detail.index;
    let answers: Array<QuestionAnswer> = [];
    this.data.answers.forEach(v => {
      if (v.index != index)
        answers.push(v);
    });
    this.setData({
      answers: answers
    });
  },

  addQuestionOption(event: any) {
    if (this.data.questionIndex != 0) {
      this.setData({
        addLabel: '选项',
        showInput: true
      });
    }
    else if (this.data.questionIndex == 0) {
      if (this.data.options.length < 2) {
        this.setData({
          addLabel: '选项',
          showInput: true
        });
      } else {
        Notify({ type: 'danger', message: '判断题只能为真或假!' });
      }
    }
  },

  addQuestionAnswer(event: any) {
    if (this.data.questionIndex == 0 || this.data.questionIndex == 1) {
if (this.data.options.length < 1) {
  this.setData({
    addLabel: '答案',
    showInput: true
  });
} else {
  // can't add
  Notify({ type: 'danger', message: '单选或判断只能有一个答案!' });
}
    } else {
      this.setData({
        addLabel: '答案',
        showInput: true
      });
    }
  },

  closeInput(event: any) {
    this.setData({
      showInput: false
    });
  },

  /**
   * add option or answer to question
   */
  addToQuestion(event: any) {
    if (this.data.questionInput == '') {
      this.setData({
        inputValid: false
      });
      return;
    }

    if (this.data.addLabel == '选项') {
      let maxInd = 0;
      this.data.options.forEach(v => {
        maxInd = v.index;
      });
      let options = this.data.options.concat({
        index: maxInd,
        content: this.data.questionInput
      });
      this.setData({
        options: options
      });
    } else {
      let maxInd = 0;
      this.data.answers.forEach(v => {
        maxInd = v.index;
      });
      let answers = this.data.answers.concat({
        index: maxInd,
        content: this.data.questionInput
      });
      this.setData({
        answers: answers
      });
    }

    this.setData({
      questionInput: '',
      showInput: false
    });
  },

  bindPickerChange(e: any) {
    this.setData({
      dialogShow: true
    });
    this.setData({
      questionIndex: e.detail.value
    });
  },

  updateDes(event: any) {
    this.setData({
      description: event.detail.description
    });
  }
});
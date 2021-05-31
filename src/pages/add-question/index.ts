import Notify from '@vant/weapp/notify/notify';
import { addQuestion, searchTags } from '../../api/api';

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
  tagSearchText: string,
  disableOption: boolean,
  disableAnswer: boolean,
  // 判断题默认选项
  judgeOptions: Array<string>,
  // 能否删除选项
  canDeleteOption: boolean,
  // 添加答案时是否是直接添加
  isAddOption: boolean,
  // 多选的index
  checkedOptions: Array<number>,
  searchTags: PageData<TagDTO>,
  expandPanel: boolean
}


Page<TAddQuestion, WechatMiniprogram.Page.CustomOption>({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'SELECT',
    checkedOptions: [],
    expandPanel: false,
    searchTags: {
      hasNext: false,
      entities: [],
      index: 0
    },
    description: '',
    disableAnswer: false,
    disableOption: false,
    isAddOption: true,
    canDeleteOption: true,
    judgeOptions: [
      '正确',
      '错误'
    ],
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
    if (this.data.questionIndex == 0) {
      Notify({ type: 'danger', message: '无法删除判断题选项!' });
      return;
    }
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
    let text = event.detail.searchText;
    let expandPanel = false;
    if (text !== '') {
      expandPanel = true;
    }
    this.setData({
      tagSearchText: text,
      expandPanel: expandPanel
    });
    let self = this;
    searchTags(text).then(res => {
      let page = <SearchResult<TagDTO>>res.data;
      let tags = self.data.searchTags;
      tags.entities = page.tags!!.entities;
      self.setData({
        searchTags: tags
      });
    }).catch(err => {
      console.log(err);
    })
  },

  clearTagText(event: any) {
    this.setData({
      tagSearchText: ''
    });
    this.setData({
      expandPanel: false
    });
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
      answers: answers,
      disableAnswer: false
    });
  },

  addQuestionTag(event: any) {
    let tag = event.currentTarget.dataset.tagName;
    let tags = this.data.tags;
    if (tags.indexOf(tag) == -1) {
      tags.push(tag);
      this.setData({
        tags: tags
      });
    }
  },

  addQuestionOption(event: any) {
    if (this.data.disableOption) {
      return;
    }
    switch (this.data.questionIndex) {
      case 0:
        Notify({ type: 'danger', message: '判断题只能为真或假!' });
        return;
        break;
      default:
        break;
    }
    this.setData({
      addLabel: '选项',
      showInput: true,
      isAddOption: false
    });
  },

  /**
   * 
   */
  addQuestionAnswer(event: any) {
    let isAddOption = false;
    switch (this.data.questionIndex) {
      case 0:
      case 1:
        if (this.data.answers.length >= 1) {
          Notify({ type: 'danger', message: '单选或判断只能有一个答案!' });
          return;
        }
        isAddOption = true;
        break;
      case 2:
        isAddOption = true;
        break;
      default:
        break;
    }
    this.setData({
      addLabel: '答案',
      showInput: true,
      isAddOption: isAddOption
    });
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
    if (this.data.questionIndex > 2 && this.data.questionInput == '') {
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
      maxInd++;
      let options = this.data.options.concat({
        index: maxInd,
        content: this.data.questionInput
      });
      this.setData({
        options: options,
        isAddOption: false
      });
    } else {
      if (this.data.questionIndex > 2) {
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
      if ((this.data.questionIndex == 0 || this.data.questionIndex == 1) && this.data.answers.length >= 1) {
        this.setData({
          disableAnswer: true
        });
      }
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
    this.initPickerChangeData(parseInt(e.detail.value));
  },

  initPickerChangeData(index: number) {
    // clear data
    this.setData({
      options: [],
      answers: [],
      questionIndex: index,
      disableOption: false,
      disableAnswer: false
    });
    switch (index) {
      case 0:
        let options: Array<QuestionOption> = [];
        this.data.judgeOptions.forEach((item, ind) => {
          options.push({
            index: ind,
            content: item
          });
        });
        this.setData({
          options: options,
          questionIndex: index,
          disableOption: true
        });
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
      case 4:
        this.setData({
          disableOption: true
        });
        break;
      default:
        break;
    }
  },


  onChangeAnswer(event: any) {
    let index = event.detail;
    let answers: Array<QuestionAnswer> = [];
    switch (this.data.questionIndex) {
      case 0:
        answers.push({
          index: index,
          content: this.data.options[index].content
        });
        this.setData({
          answers: answers
        });
        break;
      case 1:
        answers.push({
          index: index,
          content: this.data.options[index - 1].content
        });
        this.setData({
          answers: answers
        });
        break;
      default:
        break;
    }

  },

  /**
   * update disable option or answer
   */
  updateDisable(event: any) {

  },


  deleteTag(event: any) {
    let tagName = event.detail.tagName;
    let ind = this.data.tags.indexOf(tagName);
    let tags = this.data.tags;
    tags.splice(ind, 1);
    this.setData({
      tags: tags
    });
  },

  onCheckedOption(event: any) {
    let index = event.currentTarget.dataset.optionIndex;
    let checkedOptions = this.data.checkedOptions;
    let answers = this.data.answers;
    if (checkedOptions.indexOf(index) == -1) {
      checkedOptions.push(index);
      answers.push({
        index: index,
        content: this.data.options[index - 1].content
      });
    } else {
      checkedOptions.splice(checkedOptions.indexOf(index), 1);
      let temp: Array<QuestionAnswer> = [];
      answers.forEach(ans => {
        if (ans.index != index)
          temp.push(ans);
      });
      answers = temp;
    }
    this.setData({
      checkedOptions: checkedOptions,
      answers: answers
    });
  },

  updateDes(event: any) {
    this.setData({
      description: event.detail.description
    });
  },


  validateForm(event: any) {
    if (this.data.description == '') {
      Notify({ type: 'danger', message: '问题描述不可为空!' });
      return;
    }
    if (this.data.answers.length == 0) {
      Notify({ type: 'danger', message: '至少包含一个答案!' });
      return;
    }
    let question: QuestionVO = {
      description: this.data.description,
      content: this.data.description,
      options: this.data.options,
      answers: this.data.answers,
      tags: this.data.tags.join(','),
      type: this.data.type
    }
    addQuestion(question).then(res => {
      let url = `/pages/test-detail/index?id=${res.data}`
      wx.navigateTo({
        url: `/pages/complete-page/index?message=试题&url=`
      });
    }).catch(err => {
      Notify({type: 'danger', message: '创建试题失败!'});
      console.log(err);
    })
  }
});
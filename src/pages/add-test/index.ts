import { addTest } from "../../api/api";
import { notEmptyString } from "../../utils/util";
import Notify from '@vant/weapp/notify/notify';
import { addQuestion, searchTags } from '../../api/api';
// import Notify from '@vant/weapp/dist/notify/notify';

type TAddTestData = {
  name: string,
  cover: string,
  description: string,
  totalScore: number,
  accessToken: string,
  timeLimit: number,
  questions: Array<QuestionVO>,
  tags: Array<string>,
  isShowed: boolean,
  tagSearchText: string,
  searchTags: PageData<TagDTO>,
  expandPanel: boolean
}

Page<TAddTestData, WechatMiniprogram.Page.CustomOption>({
  data: {
    name: '',
    cover: 'https://oss.yisen614.top/background/image-back.png',
    description: '',
    totalScore: 100,
    accessToken: '',
    questions: [],
    tagSearchText: '',
    timeLimit: 120,
    tags: [],
    isShowed: false,
    expandPanel: false,
    searchTags: {
      hasNext: false,
      entities: [],
      index: 0
    },
  },

  onLoad() {

  },


  finishUpload(event: any) {
    this.setData({
      cover: event.detail.src
    });
  },

  updateDes(event: any) {
    this.setData({
      description: event.detail.description
    });
  },

  addTest() {
    addTest({
      name: this.data.name,
      cover: this.data.cover,
      description: this.data.description,
      totalScore: this.data.totalScore,
      timeLimit: this.data.timeLimit,
      accessToken: this.data.accessToken,
      questions: null
    }).then(res => {
      let location: string = (<API.CreatedDTO>res.data).location;
      let testId = location.split('/')[2];

      let url = `/pages/test-detail/index^^idequals${testId}`

      let next = `/pages/add-test-question/index^^idequals${testId}`

      wx.navigateTo({
        url: `/pages/complete-page/index?message=测评&url=${url}&next=${next}`
      });
    }).catch(err => {
      Notify({ type: 'danger', message: '创建测评失败!' });
    });
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

  validateForm(event: any) {
    if (notEmptyString(this.data.name) && this.data.totalScore != null && this.data.timeLimit > 0) {
      this.addTest();
    } else {
      Notify({ type: 'danger', message: '请把信息填写完整!' });
    }
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

  addTag(event: any) {
    let tag = event.currentTarget.dataset.tagName;
    let tags = this.data.tags;
    if (tags.indexOf(tag) == -1) {
      tags.push(tag);
      this.setData({
        tags: tags
      });
    }
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
});
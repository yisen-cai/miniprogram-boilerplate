import { addTest } from "../../../api/api";
import { notEmptyString } from "../../../utils/util";
import Notify from '@vant/weapp/notify/notify';
// import Notify from '@vant/weapp/dist/notify/notify';

Page({
  data: {
    name: '',
    cover: 'https://oss.yisen614.top/background/image-back.png',
    description: '',
    totalScore: 100,
    accessToken: '',
    questions: [{}]
  },

  onLoad() {
    this.setData({
      questions: []
    });
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
      accessToken: this.data.accessToken,
      questions: null
    }).then(res => {

    }).catch(err => {

    });
  },

  validateForm(event: any) {
    if (notEmptyString(this.data.name) && this.data.totalScore != null) {
      this.addTest();
    } else {
      Notify({type: 'danger', message: '请把信息填写完整!'});
    }
  }

});
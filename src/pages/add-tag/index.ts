
import Notify from '@vant/weapp/notify/notify';
import { addTag } from "../../api/api";


type TAddTagData = {
  addedId: string,
  cover: string,
  name: string,
  description: string,
  complete: boolean
}


Page<TAddTagData, WechatMiniprogram.Page.CustomOption>({

  /**
   * 页面的初始数据
   */
  data: {
    cover: 'https://oss.yisen614.top/background/image-back.png',
    name: '',
    description: '',
    complete: false,
    addedId: ''
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

  finishUpload(event: any) {
    this.setData({
      cover: event.detail.src
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  initData() {
    this.setData({
      cover: 'https://oss.yisen614.top/background/image-back.png',
      name: '',
      description: '',
      complete: false
    });
  },

  validateData() {
    if (this.data.name == '') {
      Notify({ type: 'danger', message: '标签名称不可为空!' });
      throw 'input data not valid!';
    }
  },

  updateDes(event: any) {
    this.setData({
      description: event.detail.description
    });
  },

  addTag(event: any) {
    this.validateData();
    addTag({
      cover: this.data.cover,
      name: this.data.name,
      description: this.data.description
    }).then(res => {
      this.setData({
        complete: true
      });
    }).catch(err => {
      console.log(err);
      Notify({ type: 'danger', message: '错误，无法创建!' });
    });
  },

  checkTag(event: any) {
    wx.navigateTo({
      url: `/pages/tag/index?id=${this.data.addedId}`
    });
  },

  backToHome(event: any) {
    wx.navigateTo({
      url: '/pages/main/index'
    })
  }
})
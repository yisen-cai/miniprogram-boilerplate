import Notify from '@vant/weapp/notify/notify';
import { addArticle } from  "../../api/api";

type TAddArticleData = {
  cover: string,
  title: string,
  content: string,
  tags: Array<string>,
  complete: boolean
}


Page<TAddArticleData, WechatMiniprogram.Page.CustomOption>({

  /**
   * 页面的初始数据
   */
  data: {
    cover: 'https://oss.yisen614.top/background/image-back.png',
    title: '',
    content: '',
    tags: [
      '英语'
    ],
    complete: false
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


  initData() {
    this.setData({
      cover: 'https://oss.yisen614.top/background/image-back.png',
      title: '',
      content: '',
      tags: [],
      complete: false
    });
  },

  validateData() {
    if (this.data.title == '') {
      Notify({ type: 'danger', message: '单选或判断只能有一个答案!' });
      throw 'input data not valid!';
    }
  },

  updateDes(event: any) {
    this.setData({
      content: event.detail.description
    });
  },

  addArticle(event: any) {
    this.validateData();
    let tags = this.data.tags.join(',');
    addArticle({
      title: this.data.title,
      tags: tags,
      content: this.data.content,
      cover: this.data.cover
    }).then(res => {
      this.setData({
        complete: true
      });
    }).catch(err => {
      console.log(err);
      Notify({ type: 'danger', message: '添加文章错误!' });
    });
  },

  checkResult(event: any) {

  },

  backToHome(event: any) {

  },

  addArticleTag(event: any) {

  },
})
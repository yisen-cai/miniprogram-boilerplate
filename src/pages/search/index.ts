import { getArticles } from "../../api/api";
import { pageParamsOf } from "../../utils/util";

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText: '',
    showSuggestions: false,
    tabs: [
      {
        title: '文章',
      },
      {
        title: '标签',
      },
      {
        title: '试题',
      },
      {
        title: '测评',
      },
      {
        title: '用户'
      }
    ],
    activeTab: 0,
    articles: {
      entities: [{}],
      index: 0,
      hasNext: true
    },
    tags: {
      entities: [{}],
      index: 0,
      hasNext: true
    },
    questions: {
      entities: [{}],
      index: 0,
      hasNext: true
    },
    tests: {
      entities: [{}],
      index: 0,
      hasNext: true
    },
    users: {
      entities: [{}],
      index: 0,
      hasNext: true
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
    let self = this;
    // app.loginReadyCallback = res => {
    //   global.indexPage().then(data => {
    //     this.setData(data)
    //     this.setData({
    //       loading: false
    //     })
    //   }).catch((res) => {
    //     console.log(res)
    //     this.setData({
    //       loading: false
    //     })
    //   });
    // }
    this.setData({
      'articles.entities': [],
      'tags.entities': [],
      'questions.entities': [],
      'tests.entities': [],
      'users.entities': []
    });
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(opts: any): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opts.target)
    return {}
  },

  toggleSuggestions(event: any) {
    this.setData({
      showSuggestions: !this.data.showSuggestions
    });
  },

  handleClick(event: any) {

  },

  onTabClick(event: any) {
    const index = event.detail.index;
    this.setData({
      activeTab: index
    });
  },

  search(event: any) {
    this.setData({
      searchText: event.detail.searchText
    });
  }
})
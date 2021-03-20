import { getTests } from "../../api/api";
import { pageParamsOf } from "../../utils/util";
const app = <MyAppOption>getApp();


Page({
  data: {
    tests: [
      {
      }
    ],
    // 0, 1, 2
    tabActive: 0
  },

  onLoad(options: any) {
    let self = this;
    this.initData();
    app.loginReadyCallback = (res: any) => {
      
    }
    getTests(pageParamsOf(0, 20, 'totalTested desc')).then(res => {
      let pageResult = <PageResult<TestResult>>res.data;
      self.setData({
        tests: pageResult.entities
      });
    }).catch(err => {
      console.error(err);
    });
  },

  openTab(event: any) {
    let value = parseInt(event.currentTarget.dataset.value);
    this.setData({
      tabActive: value
    });
  },

  initData() {
    this.setData({
      tests: []
    })
  },

  onReachBottom() {

  },
  
  navigateSearch(event: any) {
    wx.navigateTo({
      url: '/pages/search/index'
    });
  }
})
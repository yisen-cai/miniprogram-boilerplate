import { getTests } from "../../api/api";
import { pageParamsOf } from "../../utils/util";
const app = <MyAppOption>getApp();


Page({
  data: {
    tests: {
      entities: [{}],
      index: 0,
      hasNext: true
    },
    tabs: [
      {
        title: '热门'
      },
      {
        title: '未完成'
      },
      {
        title: '历史记录'
      }
    ],
    // 0, 1, 2
    activeTab: 0
  },

  onLoad(options: any) {
    let self = this;
    this.initData();
    app.loginReadyCallback = (res: any) => {
      this.loadHotTests();
    }
  },

  onTabClick(event: any) {
    const index = event.detail.index;
    this.setData({
      activeTab: index
    });
    // TODO: load first page data.
  },

  initData() {
    this.setData({
      tests: {
        entities: [],
        index: 0,
        hasNext: true
      }
    })
  },

  loadHotTests() {
    let self = this;
    getTests(pageParamsOf(self.data.tests.index, 20, 'totalTested desc')).then(res => {
      let pageResult = <PageResult<TestResult>>res.data;
      self.setData({
        tests: {
          entities: pageResult.entities,
          index: self.data.tests.index + 1,
          hasNext: pageResult.hasNext
        }
      });
    }).catch(err => {
      console.error(err);
    });
  },

  onReachBottom() {
    
  },

  navigateSearch(event: any) {
    wx.navigateTo({
      url: '/pages/search/index'
    });
  }
})
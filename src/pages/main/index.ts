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
    touchLocation: {
      x: 0,
      y: 0
    },
    showCreate: true,
    loading: true,
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
    activeTab: 0,
    swiperHeight: 260
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
      // set test height
      this.setData({
        swiperHeight: 260 * pageResult.entities.length
      });
    }).catch(err => {
      console.error(err);
    });
  },

  onReachBottom() {

  },

  handleTouchStart(event: any) {
    this.setData({
      touchLocation: {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      }
    });
  },

  handleTouchMove(event: any) {
    let currentX = event.touches[0].pageX
    let currentY = event.touches[0].pageY
    let tx = currentX - this.data.touchLocation.x
    let ty = currentY - this.data.touchLocation.y

    if (Math.abs(tx) > Math.abs(ty)) {
      //左右方向滑动
      if (tx < 0)
        // "向左滑动"
        console.log("scroll left");
      else if (tx > 0)
        // "向右滑动"
        console.log("scorll right");
    }
    else {
      //上下方向滑动
      if (ty < 0)
        // "向上滑动"
        this.setData({
          showCreate: true
        })
      else if (ty > 0)
        // "向下滑动"
        this.setData({
          showCreate: false
        });
    }
  },


  navigateCreate(event: any) {
    wx.navigateTo({
      url: '/pages/create/index'
    })
  },

  navigateSearch(event: any) {
    wx.navigateTo({
      url: '/pages/search/index'
    });
  }
})
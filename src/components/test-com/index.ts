Component({
  properties: {
    test: {
      type: Object,
      value: {
        id: '',
        name: "测试一之基础测试",
        cover: "https://oss.yisen614.top/background/oxxw29.jpg"
      }
    },
    scale: {
      type: Number,
      value: 1
    }
  },

  data: {

  },

  methods: {
    navigate(event:any) {
      wx.navigateTo({
        url: '/pages/test-detail/index?id=' + this.properties.test.id
      });
    }
  }
})
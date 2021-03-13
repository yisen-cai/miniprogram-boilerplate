Component({
  properties: {
    test: {
      type: Object,
      value: {
        id: '',
        name: "测试一之基础测试",
        cover: "https://oss.yisen614.top/background/oxxw29.jpg"
      }
    }
  },

  data: {

  },

  methods: {
    navigate(event) {
      wx.navigateTo({
        url: '/pages/test/test?id=' + this.properties.test.id
      });
    }
  }
})
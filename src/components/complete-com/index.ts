Component({
  properties: {
    message: {
      type: String,
      value: "测评"
    },
    url: {
      type: String,
      value: ''
    }
  },

  data: {

  },

  methods: {
    backHome() {
      wx.switchTab({
        url: '/pages/main/index'
      });
    },

    checkResult() {
      wx.navigateTo({
        url: this.data.url
      });
    }
  }
})
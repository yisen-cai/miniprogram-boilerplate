Component({
  properties: {
    message: {
      type: String,
      value: "测评"
    },
    url: {
      type: String,
      value: ''
    },
    next: {
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
        url: this.properties.url
      });
    },

    nextAction() {
      wx.navigateTo({
        url: this.properties.next
      })
    }
  }
})
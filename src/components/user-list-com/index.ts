Component({
  properties: {
    user: {
      type: Object,
      value: {
        id: '',
        avatar: 'https://yisen614.oss-cn-beijing.aliyuncs.com/background/oxxw29.jpg',
        username: 'Marry Bris',
        signature: 'Signature'
      }
    }
  },

  data: {

  },

  methods: {
    navigateUser(event: any) {
      wx.navigateTo({
        url: `/pages/user/user?id=${this.properties.user.id}`
      });
    }
  }
});
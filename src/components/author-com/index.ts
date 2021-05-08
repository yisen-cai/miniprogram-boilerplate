

Component({
  properties: {
    author: {
      type: Object,
      value: {
        id: '',
        avatar: '',
        username: ''
      }
    }
  },

  data: {
    
  },


  methods: {
    navigateToUser(event: any) {
      wx.navigateTo({
        url: `/pages/users/index?id=${this.properties.author.id}`
      })
    }
  }
});
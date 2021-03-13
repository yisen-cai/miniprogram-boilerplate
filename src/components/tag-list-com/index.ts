Component({
  properties: {
    tag: {
      type: Object,
      value: {
        id: 'tagid',
        name: 'Tag name',
        cover: 'https://yisen614.oss-cn-beijing.aliyuncs.com/background/oxxw29.jpg',
        description: 'This is a tag description.'
      }
    }
  },

  data: {

  },

  methods: {
    navigateTag(event: any) {
      wx.navigateTo({
        url: `/pages/tag/tag?id=${this.properties.tag.id}`
      })
    }
  }
});
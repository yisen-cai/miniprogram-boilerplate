Component({
  properties: {
    article: {
      type: Object,
      value: {
        id: '123',
        title: '测试文章',
        cover: 'https://yisen614.oss-cn-beijing.aliyuncs.com/background/oxxw29.jpg',
        rating: 0,
        content: '人们总是对遥远的国度有着不切实际的梦，若是哪天混不下去了人们总是对遥远的国度有着不切实际的梦，若是哪天混不下去了…',
        likeCount: 0,
        dislikeCount: 0,
        readCount: 0
      }
    }
  },

  data: {

  },

  methods: {
    navigateArticle(event: any) {
      wx.navigateTo({
        url: `/pages/article/article?id=${this.properties.article.id}`
      })
    }
  }
});
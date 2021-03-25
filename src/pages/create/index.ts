Page({
  data: {
    items: [
      {
        name: '添加测评',
        page: '/pages/add-test/index',
        coverClass: 'add-test'
      },
      {
        name: '添加试题',
        page: '/pages/add-question/index',
        coverClass: 'add-question'
      },
      {
        name: '添加标签',
        page: '/pages/add-tag/index',
        coverClass: 'add-tag'
      },
      {
        name: '添加用户',
        page: '/pages/add-user/index',
        coverClass: 'add-user'
      },
      {
        name: '添加文章',
        page: '/pages/add-article/index',
        coverClass: 'add-article'
      }
    ]
  },


  onLoad() {

  },


  navigateTo(event: any) {
    let page = <string>event.currentTarget.dataset.page;
    wx.navigateTo({
      url: page
    });
  }

});
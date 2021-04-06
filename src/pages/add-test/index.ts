Page({
  data: {
    name: '',
    cover: '',
    description: '<p>1111</p>',
    totalScore: 100,
    accessToken: '',
    questions: [{}]
  },

  finishUpload(event: any) {
    this.setData({
      cover: event.detail.src
    });
  },

  updateDes(event: any) {
    this.setData({
      description: event.detail.description
    });
  }
})
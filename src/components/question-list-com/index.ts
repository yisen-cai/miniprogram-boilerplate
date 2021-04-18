type QuestionListDataOption = {
  tags: Array<string>
}


Component
  <QuestionListDataOption,
    WechatMiniprogram.Component.PropertyOption,
    WechatMiniprogram.Component.MethodOption | any
  >
  ({
    data: {
      tags: []
    },

    properties: {
      question: {
        type: Object,
        value: {
          id: '',
          content: '计算机程序中Bug的由来是?',
          tags: '计算机,历史冷知识,历史冷知识',
        },
      }
    },

    lifetimes: {
      attached() {
        let tags: string = this.properties.question.tags;
        this.setData({
          tags: tags.split(',')
        });
      }
    },

    methods: {
      navigateQuestion(event: any) {
        wx.navigateTo({
          url: `/pages/question/question?id=${this.properties.question.id}`
        });
      },

      navigateTag(event: any) {
        let tagName = event.currentTarget.dataset.tag;
        console.log(tagName);
        wx.navigateTo({
          url: `/pages/tag/tag?tagName=${this.properties.question.id}`
        });
      }
    }
  });
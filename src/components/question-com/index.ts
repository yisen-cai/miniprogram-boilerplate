Component({
  properties: {
    question: {
      type: Object,
      value: {
        index: 0,
        questionId: ""
      }
    },
    action: {
      type: Boolean,
      value: false
    },
    canDelete: {
      type: Boolean,
      value: true
    },
    selected: {
      type: Boolean,
      value: true
    },
    index: {
      type: Number,
      value: 0
    }
  },

  data: {

  },

  methods: {
    checkDetails(event: any) {
      if (!this.properties.action) {
        wx.navigateTo({
          url: `/pages/question-detail/index?id=${this.properties.question.questionId}`
        });
      } else {
        this.triggerEvent('click', { questionId: this.properties.question.id }, {});
      }
    }
  }
})
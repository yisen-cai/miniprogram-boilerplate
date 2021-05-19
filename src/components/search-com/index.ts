Component({
  properties: {
    active: {
      type: Boolean,
      value: false
    },
    text: {
      type: String,
      value: ''
    },
    inputShowed: {
      type: Boolean,
      value: false,
    },
    scaleStyle: {
      type: Number,
      value: 1
    },
    cusStyle: {
      type: Object,
      value: {
        width: '600rpx',
        height: '104rpx',
        iconWidth: '44rpx',
        iconHeight: '44rpx',
        boxShadow: '20rpx'
      }
    }
  },

  data: {
  },


  lifetimes: {
    ready() {
    },
  },

  methods: {
    bindInput(event: any) {
      // trigger parent event
      this.triggerEvent('search', { searchText: event.detail.value }, {});
    },

    clear(event: any) {
      this.triggerEvent('clear', {}, {});
    },

    search(event: any) {
      this.triggerEvent('searchResult', { searchText: this.data.text }, {});
    }
  }
})
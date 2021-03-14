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
    cusStyle: {
      type: Object,
      value: {
        width: '600rpx',
        height: '104rpx',
        iconWidth: '44rpx',
        iconHeight: '44rpx',
        boxShadow: '10rpx'
      }
    }
  },

  data: {
    searchText: ''
  },


  lifetimes: {
    ready() {
      this.setData({
        searchText: this.properties.text
      });
    },
  },

  methods: {
    bindInput(event:any) {
      this.setData({
        searchText: event.detail.value
      });
      // trigger parent event
      this.triggerEvent('search', {searchText: event.detail.value}, {});
    }
  }
})
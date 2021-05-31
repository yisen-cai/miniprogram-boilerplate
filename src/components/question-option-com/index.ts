Component({
  properties: {
    optionContent: {
      type: String,
      value: ''
    },
    optionIndex: {
      type: Number,
      value: 0
    },
    hintText: {
      type: String,
      value: '选项'
    }
  },

  data: {

  },

  methods: {
    deleteOption(event: any) {
      this.triggerEvent('deleteOption', { index: this.properties.optionIndex }, {});
    }
  }
});
Component({
  properties: {
    optionContent: {
      type: String,
      value: ''
    },
    optionIndex: {
      type: Number,
      value: 0
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
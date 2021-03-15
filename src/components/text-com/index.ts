Component({
  properties: {
    text: {
      type: String,
      value: ''
    },
    canDelete: {
      type: Boolean,
      value: true
    }
  },

  data: {

  },

  methods: {
    delete(event) {
      // TODO: trigger delete operation
    },

    search(event: any) {
      this.triggerEvent('search', {searchText: this.data.text}, {});
    }
  }
});
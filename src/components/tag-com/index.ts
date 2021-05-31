
Component({
  properties: {
    tag: {
      type: Object,
    },
    canDelete: {
      type: Boolean,
      value: false
    }
  },

  data: {

  },

  methods: {
    delete(event: any) {
      this.triggerEvent('deleteTag', {
        tagName: this.properties.tag.name,
        tagId: this.properties.tag.id
      }, {});
    }
  }
})
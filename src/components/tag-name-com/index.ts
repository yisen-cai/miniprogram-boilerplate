import { getTagByName } from "../../api/api";


Component({
  properties: {
    tagName: {
      type: String,
      value: ''
    }
  },

  data: {
    tag: {}
  },

  lifetimes: {
    attached() {
    },

    ready() {
      getTagByName(this.properties.tagName).then(res => {
        this.setData({
          tag: <Object>res.data
        });
      }).catch(res => {
      });
    }
  },

  methods: {
  }
});


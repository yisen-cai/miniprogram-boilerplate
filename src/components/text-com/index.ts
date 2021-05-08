import { deleteHistory } from "../../api/api";

Component({
  properties: {
    history: {
      type: Object,
      value: {
        id: '',
        word: null,
      }
    },
    index: {
      type: Number,
      value: 0
    },
    canDelete: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    deleteHistory(event: any) {
      deleteHistory(this.properties.history.id).then(res => {
        // trigger parent update
        this.triggerEvent('deleteUserHistory',
          {
            historyId: this.properties.history.id,
            index: this.properties.index
          }, {});
      }).catch(err => {
        console.error(err);
      });
    },

    search(event: any) {
      this.triggerEvent('search', { searchText: this.data.history.word.keyword }, {});
    }
  }
});
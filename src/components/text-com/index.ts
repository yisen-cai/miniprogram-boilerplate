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
    searchWord: {
      type: Object,
      value: {
        id: '',
        keyword: ''
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
      if (this.properties.canDelete) {
        this.triggerEvent('search', { searchText: this.properties.history.word.keyword }, {});
      } else {
        this.triggerEvent('search', { searchText: this.properties.searchWord.keyword }, {});
      }
    }
  }
});
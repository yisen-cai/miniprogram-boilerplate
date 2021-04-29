

Component({

  properties: {
    rating: {
      type: Object,
      value: {
        id: '',
        content: '',
        entityId: '',
        author: {
          id: '',
          username: '',
          avatar: ''
        },
        score: 0,
        createTime: 0,
        isDelete: false
      }
    },
    authorId: {
      type: String,
      value: ''
    }
  },

  data: {

  },


  methods: {

  }

})
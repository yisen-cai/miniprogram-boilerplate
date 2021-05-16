import { formatTime, getTimeInfo } from "../../utils/util";

Component({
  properties: {
    notification: {
      type: Object,
      value: {
        type: 0,
        message: '这是一条通知',
        readed: false,
        createTime: 1621173564294
      }
    }
  },

  data: {
    types: [
      '个人通知',
      '系统通知'
    ],
    timestamp: '刚刚'
  },

  methods: {
    attached() {
      this.setData({
        timestamp: getTimeInfo(this.properties.notification.createTime)
      });
    }
  }
});
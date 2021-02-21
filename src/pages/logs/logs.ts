// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from '../../utils/util'
import { hello } from "../../api/hello"

Page({
  data: {
    logs: [],
  },

  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log: string) => {
        return formatTime(new Date(log))
      }),
    })
  },

  btnRequest() {
    // hello().then(res => {
    //   console.log(res);
    // }).catch(res => {
    //   console.log(res);
    // });
  },
})


type TInfoData = {
  userOrders: Array<UserDTO>,
  messages: Array<string>
}


Page<TInfoData, WechatMiniprogram.Page.CustomOption>({
  data: {
    userOrders: [],
    messages: []
  },



  moreOrders(event: any) {
    wx.navigateTo({
      url: '/pages/user-order/index'
    });
  }
});
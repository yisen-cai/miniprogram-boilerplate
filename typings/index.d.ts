/// <reference path="./types/index.d.ts" />
/// <reference path="../src/types/api/index.d.ts"/>

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
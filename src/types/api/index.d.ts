/// <reference path="networks.d.ts"/>
/// <reference path="response.d.ts"/>
/// <reference path="entity.d.ts"/>


// interface IAppOption {
//   globalData: {
//     userInfo?: WechatMiniprogram.UserInfo,
//   }
//   userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
// }


interface MyAppOption extends IAppOption {
  user?: any,
  auth?: AuthResult,
  loginReadyCallback?: Function
}